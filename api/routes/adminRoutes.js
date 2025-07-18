import express from "express";
import { login, signup, logout, checkAuth } from "../controllers/adminController.js";
import { protectRoute } from "../middlewares/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;