import { Router } from "express";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";

const router = Router();

router.get("/", async (_req, res) => {
  const db = mongoose.connection.readyState === 1 ? "ok" : "down";

  let llm = "ok";
  try {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch {
    llm = "down";
  }

  res.json({
    backend: "ok",
    database: db,
    llm,
    timestamp: new Date(),
  });
});

export default router;
