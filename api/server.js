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
const _dirname = path.resolve();


// ROUTING

app.use("/api/auth",authRoute);
app.use("/api/form",formRoute);
app.use("/api/response",responseRoute);

// DB
const connecty = await mongoose.connect(process.env.MONGOdb);
console.log(`Database connected!!!\n${connecty.connection.host}`);

// For deployment
app.use(express.static(path.join(_dirname,"/client/dist")));
app.get('/*\w',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
});


app.listen(PORT,()=>{
  console.log(`Server runnning on ${PORT}`);
})