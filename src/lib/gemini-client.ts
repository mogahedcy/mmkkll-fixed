import { GoogleGenAI } from "@google/genai";

// Initialize Google Gemini AI client with API key
const ai = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_AI_API_KEY || "" 
});

// Use Gemini 2.5 Flash for fast, cost-effective responses
export const GEMINI_MODEL = "gemini-2.5-flash";

// For more complex tasks that need better reasoning
export const GEMINI_PRO_MODEL = "gemini-2.5-pro";

export default ai;
