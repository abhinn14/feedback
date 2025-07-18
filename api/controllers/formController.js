import Form from "../models/formModel.js";
import Response from "../models/responseModel.js";
import crypto from "crypto";

export const createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if(!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Title and questions are required" });
    }

    let publicUrl;
    
    // Handling collision
    let exists = true;
    let tries = 0;
    const MAX_TRIES = 5;
    while (exists && tries < MAX_TRIES) {
      publicUrl = crypto.randomBytes(8).toString("hex");
      exists = await Form.exists({ publicUrl });
      tries++;
    }
    if (exists) {
      return res.status(500).json({ message: "Could not generate a unique URL, please try again." });
    }

    const newForm = new Form({
      admin: req.user._id,
      title,
      questions,
      publicUrl
    });

    await newForm.save();

    return res.status(201).json({
      message: "Form created successfully",
      form: newForm
    });

    } catch (error) {
        console.error("Error creating form = ", error);
        res.status(500).json({message:"Server error"});
    }
};

export const showForms = async (req, res) => {
  try {
    const forms = await Form.find({ admin: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(forms); 
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getForm = async (req, res) => {
  try {
    const { publicUrl } = req.params;

    const form = await Form.findOne({ publicUrl })
      .select("title questions");

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(form);

  } catch (error) {
    console.error("Error fetching form:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFormById = async (req, res) => {
  try {
    const { formId } = req.params;

    const form = await Form.findById(formId).select("title publicUrl");
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form by ID:', error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: "Form not found" });
    if (!form.admin.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Response.deleteMany({ form: form._id });

    await form.deleteOne();
    return res.status(200).json({ message: "Form deleted" });
  } catch (err) {
    console.error("deleteForm error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};