/**
 * Groq Client - مركزي لكل عمليات Groq
 */

export const GROQ_MODELS = {
  MIXTRAL: 'mixtral-8x7b-32768',
  LLAMA2: 'llama2-70b-4096',
} as const;

export interface GroqResponse {
  success: boolean;
  message?: string;
  error?: string;
  tokensUsed?: number;
}

class GroqClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || '';
    if (!this.apiKey) {
      console.error('❌ GROQ_API_KEY غير متوفر');
    }
  }

  async chat(
    messages: Array<{ role: 'user' | 'system'; content: string }>,
    maxTokens: number = 1000
  ): Promise<GroqResponse> {
    try {
      if (!this.apiKey) {
        return { success: false, error: 'API key غير محدد' };
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODELS.MIXTRAL,
          messages,
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error?.message };
      }

      const data = await response.json();
      return {
        success: true,
        message: data.choices[0]?.message?.content,
        tokensUsed: data.usage?.total_tokens,
      };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async generateProjectSuggestions(desc: string): Promise<GroqResponse> {
    return this.chat([
      {
        role: 'user',
        content: `أعطني JSON للمشروع: ${desc}\n{"title":"...", "description":"...", "keywords":[...]}`,
      },
    ]);
  }

  async generateArticle(topic: string, keywords: string[]): Promise<GroqResponse> {
    return this.chat([
      {
        role: 'user',
        content: `اكتب مقالة: ${topic} بـ ${keywords.join(', ')}\n{"title":"...","content":"..."}`,
      },
    ], 2000);
  }
}

export function getGroqClient(apiKey?: string): GroqClient {
  return new GroqClient(apiKey);
}
