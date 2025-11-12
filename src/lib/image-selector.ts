import ai, { GEMINI_MODEL } from './gemini-client';

export interface ImageSuggestion {
  query: string;
  relevance_score: number;
  alt_text: string;
  description: string;
}

export class ImageSelector {
  async suggestImages(
    topic: string,
    content: string,
    keywords: string[],
    imageCount: number = 3
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

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير في اختيار الصور المناسبة للمحتوى التسويقي والتعليمي.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{"images": []}');
      return result.images || [];
    } catch (error) {
      console.error('Error suggesting images:', error);
      return [];
    }
  }

  private localImages = [
    '/uploads/pergola-1.jpg',
    '/uploads/pergola-2.jpg',
    '/uploads/mazallat-1.webp',
    '/uploads/mazallat-2.webp',
    '/uploads/sawater-1.webp',
    '/uploads/sawater-2.webp',
    '/uploads/khayyam-1.webp',
    '/uploads/byoot-shaar-1.webp',
    '/uploads/landscaping-1.webp',
    '/uploads/sandwich-panel-1.jpg',
    '/uploads/sandwich-panel-2.jpg',
    '/uploads/renovation-1.jpg',
    '/uploads/renovation-2.jpg',
  ];

  private getLocalImage(index: number): string {
    return this.localImages[index % this.localImages.length];
  }

  async selectImagesForArticle(
    title: string,
    content: string,
    keywords: string[],
    imageCount: number = 3
  ): Promise<Array<{ src: string; alt: string; description: string; type: 'IMAGE' | 'VIDEO' }>> {
    const suggestions = await this.suggestImages(title, content, keywords, imageCount);
    
    return suggestions.map((suggestion, index) => ({
      src: this.getLocalImage(index),
      alt: suggestion.alt_text,
      description: suggestion.description,
      type: 'IMAGE' as const
    }));
  }
}

export const imageSelector = new ImageSelector();
