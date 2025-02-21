import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || ""; // Ensure you set this in your .env file
const genAI = new GoogleGenerativeAI(apiKey);

export const suggestTask = async (userInput: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(`Suggest tasks based on: ${userInput}`);
    const response = result.response.text();

    return response;
  } catch (error) {
    console.error("Error generating task suggestion:", error);
    return "Error generating task suggestions.";
  }
};