import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    instructorName: { type: String, required: true },
    studentName: { type: String, required: true },
    skillName: { type: String, required: true },
    category: { type: String, required: true },
    teachingMode: { type: String, required: true },
    language: { type: String, required: true },
    sessionFees: { type: Number, required: true },
    courseDescription: { type: String, required: true }
}, { timestamps: true }); 

const Book = mongoose.model("Book", bookSchema);
export default Book;     