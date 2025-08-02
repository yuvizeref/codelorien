import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getReview = async (description, code) => {
  const prompt = `Review my code :
  ${code}
  for the problem statement: 
  ${description}
  If my solution doesn't work, Don't give me a working solution, give me hints.
  If my solution works, review it to improve it.
  Keep the response short and concise.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  } catch (err) {
    throw new Error("Failed to fetch AI review.");
  }
};
