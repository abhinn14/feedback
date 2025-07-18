import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ['text', 'mcq'],
        required: true
    },
    options: {
        type: [String], 
        default: []
    }
});

const formSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: [questionSchema],
    publicUrl: {
        type: String,
        unique: true,
        required: true
    }
    }, {
        timestamps: true
});

const Form = mongoose.model("Form",formSchema);

export default Form;
