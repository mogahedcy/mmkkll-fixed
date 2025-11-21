import { GoogleGenAI } from "@google/genai";

// Use Gemini 2.5 Flash for fast, cost-effective responses
export const GEMINI_MODEL = "gemini-2.5-flash";

// For more complex tasks that need better reasoning
export const GEMINI_PRO_MODEL = "gemini-2.5-pro";

// Function to get a fresh Gemini AI client with current API key
function getGeminiClient() {
  const apiKey = process.env.GOOGLE_API_KEY || "";
  if (!apiKey) {
    console.error("❌ GOOGLE_API_KEY غير متوفر - يرجى إضافة المفتاح في Secrets");
  }
  return new GoogleGenAI({ apiKey });
}

// Export a proxy object that creates a fresh client on each access
const ai = new Proxy({} as GoogleGenAI, {
  get(target, prop) {
    const client = getGeminiClient();
    return (client as any)[prop];
  }
});

export default ai;
