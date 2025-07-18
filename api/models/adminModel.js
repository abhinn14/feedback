import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
},{ timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;