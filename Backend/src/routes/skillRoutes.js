import express from "express";
import { 
    getAllBooks, createBook, updateBook, deleteBook, 
    getProjectStats, getSkillRoadmap, getBookById 
} from "../controllers/skillController.js";

const router = express.Router();


router.get("/stats", getProjectStats);
router.get("/roadmap/:skillName", getSkillRoadmap);


router.get("/", getAllBooks);
router.post("/", createBook);


router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;