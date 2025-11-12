import ai, { GEMINI_MODEL } from './gemini-client';
import { googleImageSearch } from './google-image-search';

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

  async selectImagesForArticle(
    title: string,
    content: string,
    keywords: string[],
    imageCount: number = 3
  ): Promise<Array<{ src: string; alt: string; description: string; type: 'IMAGE' | 'VIDEO' }>> {
    const suggestions = await this.suggestImages(title, content, keywords, imageCount);
    
    const images: Array<{ src: string; alt: string; description: string; type: 'IMAGE' | 'VIDEO' }> = [];
    
    for (const suggestion of suggestions) {
      try {
        console.log(`🔍 البحث عن صورة: ${suggestion.query}`);
        
        const searchResults = await googleImageSearch.searchImages(suggestion.query, {
          num: 1,
          imageSize: 'large',
          imageType: 'photo',
          safe: 'active',
          rights: 'cc_publicdomain',
        });
        
        if (searchResults.length > 0) {
          const imageUrl = searchResults[0].url;
          
          const uploadedUrl = await googleImageSearch.downloadAndUploadImage(
            imageUrl,
            suggestion.alt_text
          );
          
          if (uploadedUrl) {
            images.push({
              src: uploadedUrl,
              alt: suggestion.alt_text,
              description: suggestion.description,
              type: 'IMAGE' as const
            });
            console.log(`✅ تمت إضافة الصورة: ${suggestion.alt_text}`);
          }
        }
      } catch (error) {
        console.error(`❌ فشل الحصول على صورة لـ: ${suggestion.query}`, error);
      }
    }
    
    if (images.length === 0) {
      console.warn('⚠️ لم يتم العثور على صور، استخدام الصور الافتراضية');
      return suggestions.map(() => ({
        src: '/uploads/pergola-1.jpg',
        alt: 'صورة افتراضية',
        description: 'صورة افتراضية',
        type: 'IMAGE' as const
      }));
    }
    
    return images;
  }
}

export const imageSelector = new ImageSelector();
