// utils/askGemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Bun loads .env automatically
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ⚡ Lighter model

export async function askGemini(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err: any) {
    if (err.message.includes("429")) {
      return "Gemini API quota exceeded. Please try again after a while.";
    }
    throw err;
  }
}
