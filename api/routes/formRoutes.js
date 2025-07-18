import express from "express";
import { createForm, showForms, getForm, getFormById, deleteForm } from "../controllers/formController.js"
import { protectRoute } from "../middlewares/auth.js";
const router = express.Router();


router.post("/create", protectRoute, createForm);
router.get("/show", protectRoute, showForms);
router.get('/get-by-id/:formId', protectRoute, getFormById);
router.delete("/delete/:formId", protectRoute, deleteForm);


router.get("/get/:publicUrl", getForm);

export default router;