/**
 * Image Selector - استخدام Groq AI لاختيار الصور
 */

export interface ImageSuggestion {
  query: string;
  relevance_score: number;
  alt_text: string;
  description: string;
}

async function groqGenerateContent(config: Record<string, unknown>): Promise<Record<string, unknown>> {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) throw new Error('Groq API key غير محدد');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: config.contents }],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error('Groq API error');
  const data = await response.json();
  return { text: data.choices[0]?.message?.content || '' };
}

export class ImageSelector {
  async suggestImages(
    topic: string,
    content: string,
    keywords: string[],
    imageCount = 3
  ): Promise<ImageSuggestion[]> {
    try {
      const prompt = `أنت خبير في اختيار الصور المناسبة للمقالات والمحتوى.

الموضوع: ${topic}
المحتوى: ${content.substring(0, 500)}
الكلمات المفتاحية: ${keywords.join(', ')}
عدد الصور المطلوبة: ${imageCount}

اقترح ${imageCount} صور مناسبة لهذا المحتوى. لكل صورة، قدم:
- query: استعلام بحث الصورة بالإنجليزية (3-5 كلمات رئيسية)
- relevance_score: درجة الملاءمة (1-100)
- alt_text: نص بديل محسّن بالعربية
- description: وصف الصورة بالعربية

قدم النتيجة بصيغة JSON:
{
  "images": [
    {
      "query": "modern pergola construction",
      "relevance_score": 95,
      "alt_text": "مظلات حديثة في جدة",
      "description": "صورة توضح تصميم مظلات عصرية"
    }
  ]
}`;

      const response = await groqGenerateContent({
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{"images": []}');
      return result.images || [];
    } catch (error) {
      console.error('Error suggesting images:', error);
      return [];
    }
  }

  async selectImagesForArticle(
    title: string,
    content: string,
    keywords: string[],
    imageCount = 3
  ): Promise<Array<{ src: string; alt: string; description: string; type: 'IMAGE' | 'VIDEO' }>> {
    const suggestions = await this.suggestImages(title, content, keywords, imageCount);
    
    if (suggestions.length === 0) {
      console.warn('⚠️ فشل في اقتراح الصور من AI');
      return [];
    }

    const images: Array<{ src: string; alt: string; description: string; type: 'IMAGE' | 'VIDEO' }> = [];
    
    for (const suggestion of suggestions) {
      console.log(`🖼️ إضافة صورة: ${suggestion.alt_text}`);
      
      // استخدام Unsplash للصور
      const unsplashUrl = `https://images.unsplash.com/random?${new URLSearchParams({
        q: suggestion.query,
        w: '800',
        h: '600'
      }).toString()}`;

      images.push({
        src: unsplashUrl,
        alt: suggestion.alt_text,
        description: suggestion.description,
        type: 'IMAGE' as const
      });
    }

    if (images.length === 0) {
      console.warn('⚠️ لم يتم العثور على أي صور، استخدام الصور الافتراضية');
      return suggestions.slice(0, imageCount).map(() => ({
        src: '/uploads/pergola-1.jpg',
        alt: 'صورة افتراضية',
        description: 'صورة افتراضية',
        type: 'IMAGE' as const
      }));
    }

    console.log(`✅ تم اختيار ${images.length} صورة بنجاح`);
    return images;
  }
}

export const imageSelector = new ImageSelector();
