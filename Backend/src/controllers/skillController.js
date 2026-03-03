import Book from "../models/bookModel.js";


export async function createBook(req, res) {
    try {
        const { instructorName, studentName, skillName, category, teachingMode, language, sessionFees, courseDescription } = req.body;
        if (!instructorName || !studentName || !skillName || !category || !teachingMode || !language || !sessionFees || !courseDescription) {
            return res.status(400).json({ message: "All Fields are required" });
        }
        const book = new Book({ instructorName, studentName, skillName, category, teachingMode, language, sessionFees, courseDescription });
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        console.error("Error in createBook controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function getAllBooks(req, res) {
    try {
        const { language, category, searchSkill } = req.query;
        let filter = {};

        if (language) filter.language = language;
        if (category) filter.category = category;
        if (searchSkill) filter.skillName = { $regex: searchSkill, $options: "i" };

        const books = await Book.find(filter).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function getProjectStats(req, res) {
    try {
        const instructors = await Book.distinct("instructorName");
        const languageStats = await Book.aggregate([
            { $group: { _id: "$language", totalStudents: { $sum: 1 } } }
        ]);
        res.status(200).json({
            totalNumberofInstructors: instructors.length,
            noOfStudentsByLanguage: languageStats
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats" });
    }
}


export async function getSkillRoadmap(req, res) {
    const { skillName } = req.params;
    let nextSteps = skillName.toLowerCase() === "python" 
        ? "Next: Django, Data Science, or AI." 
        : "Next: Master advanced projects and frameworks.";
    res.status(200).json({ skill: skillName, roadmap: nextSteps });
}


export async function updateBook(req, res) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: "Not found" });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function deleteBook(req, res) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function getBookById(req, res) {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}