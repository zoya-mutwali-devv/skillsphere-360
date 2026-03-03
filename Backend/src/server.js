
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "node:dns";
import cors from "cors";  
import { connectDB } from "./config/db.js";
import skillRoutes from "./routes/skillRoutes.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

connectDB();

const app = express();
app.use(cors());       
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/skills", skillRoutes);  // Correct


app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Try checking stats at: http://localhost:${PORT}/skills/stats`);
});


