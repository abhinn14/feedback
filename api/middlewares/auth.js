import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await Admin.findById(decoded.id).select("-password");
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute: ", error.message);
    res.status(500).json({message:"Internal server error"});
  }
};