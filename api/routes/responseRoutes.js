import express from "express";
import { writeResponse, showResponse, getSummary } from "../controllers/responseController.js";
import { protectRoute } from "../middlewares/auth.js";

const router = express.Router();

router.post("/write/:publicUrl", writeResponse);
router.get("/read/:formId", protectRoute, showResponse);
router.get("/summarize/:formId", protectRoute, getSummary);


export default router;
