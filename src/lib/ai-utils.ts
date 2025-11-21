/**
 * AI Utils - Groq API Integration
 * 
 * Groq is a FREE AI API provider with extremely fast inference
 * - No credit card required for free tier
 * - 30 requests per minute (free tier)
 * - Models: mixtral-8x7b-32768, llama2-70b-4096
 * 
 * Get API key: https://console.groq.com
 */

export const GROQ_MODELS = {
  MIXTRAL: 'mixtral-8x7b-32768',     // Multi-lingual, 32K context
  LLAMA2: 'llama2-70b-4096',         // Powerful, 4K context
  GEMMA: 'gemma-7b-it',              // Lightweight, fast
} as const;

export interface AIResponse {
  success: boolean;
  message?: string;
  error?: string;
  model?: string;
}

export async function sendAIMessage(
  message: string,
  context: 'عام' | 'خدمات' | 'اسعار' | 'مشاريع' = 'عام'
): Promise<AIResponse> {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to get AI response' };
    }

    const data = await response.json();
    return { success: true, message: data.message, model: data.model };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

/**
 * AI Features you can add:
 * 
 * 1. Customer Support Chatbot
 * 2. Project Recommendations
 * 3. FAQ Auto-Generation
 * 4. Content Optimization
 * 5. Review Analysis
 * 6. Lead Qualification
 */

export const AI_FEATURES = {
  CHATBOT: 'Customer Support AI',
  RECOMMENDATIONS: 'Smart Project Recommendations',
  FAQ: 'Auto-generated FAQ',
  ANALYSIS: 'Customer Sentiment Analysis',
  CONTENT: 'Content Optimization Assistant',
};
