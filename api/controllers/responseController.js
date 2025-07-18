import Response from "../models/responseModel.js";
import Form from "../models/formModel.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const writeResponse = async (req, res) => {
  try {
    const { publicUrl } = req.params;
    const { answers } = req.body;

    if(!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Answers are required" });
    }

    const form = await Form.findOne({ publicUrl });
    if(!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const newResponse = new Response({
      form: form._id,
      answers
    });

    await newResponse.save();

    return res.status(201).json({ message: "Response submitted successfully" });
    
  } catch (error) {
    console.error("Error submitting response: ", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const showResponse = async (req, res) => {
  try {
    const { formId } = req.params;

    // Checking if this form belongs to the logged-in admin
    const form = await Form.findById(formId);
    if(!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    if(!form.admin.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden: not your form" });
    }

    // All responses
    const responses = await Response.find({ form: formId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Responses fetched successfully",
      responses
    });

  } catch (error) {
    console.error("Error fetching responses: ", error);
    res.status(500).json({ message: "Server error" });
  }
};


const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

export const getSummary = async (req, res) => {
  try {
    const { formId } = req.params;

    // Loading form and responses
    const form = await Form.findById(formId).lean();
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const responses = await Response.find({ form: form._id }).lean();
    if (!responses.length) {
      return res
        .status(200)
        .json({ summary: "No responses yet to summarize." });
    }

    // Prompt
    let prompt = `You are a customer's response data summarizer of a feedback form. Your job is to summarize response which is customer feedback.\n
    For multiple-choice questions, give statistics.\n
    For text questions, describe the feedbacks in 2-5 lines depending on the size of responses\n
    Dont write anything in bold because this is API fetch and "**" doesnt make the text bold\n
    Give line spaces between responses of each question`;

    form.questions.forEach((q, qi) => {
      prompt += `Q${qi + 1}. ${q.questionText}\n`;
      if (q.questionType === "multiple-choice") {
        //Counting each option
        const counts = q.options.reduce((acc, opt) => {
          acc[opt] = 0;
          return acc;
        }, {});
        responses.forEach((r) => {
          const ans = r.answers.find((a) => a.questionId.toString() === q._id.toString());
          if (ans && counts.hasOwnProperty(ans.answerText)) {
            counts[ans.answerText]++;
          }
        });
        Object.entries(counts).forEach(([opt, cnt]) => {
          prompt += `  - ${opt}: ${cnt}\n`;
        });
      } else {
        // Listing text answers
        prompt += `  Answers:\n`;
        responses.forEach((r, ri) => {
          const ans = r.answers.find((a) => a.questionId.toString() === q._id.toString());
          prompt += `    ${ri + 1}. ${ans?.answerText || ""}\n`;
        });
      }
      prompt += `\n`;
    });

    // Calling OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    const summary = aiResponse.choices?.[0]?.message?.content?.trim();
    if (!summary) {
      throw new Error("Empty summary from OpenAI");
    }

    res.status(200).json({ summary });
  } catch (err) {
    console.error("Error in getSummary:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};