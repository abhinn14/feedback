// SETUP
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/adminRoutes.js";
import formRoute from "./routes/formRoutes.js";
import responseRoute from "./routes/responseRoutes.js";
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
const __dirname = path.resolve();


// ROUTING

app.use("/api/auth",authRoute);
app.use("/api/form",formRoute);
app.use("/api/response",responseRoute);

// For deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname,"../client","dist","index.html"));
    });
}


// RUN & DB CONNECTION

app.listen(PORT, async () => {
    try {
        const connecty = await mongoose.connect(process.env.MONGOdb);
        console.log(`Database connected!!!\n${connecty.connection.host}`);
    } catch(error) {
        console.log("Database Error: ", error);
    }
});