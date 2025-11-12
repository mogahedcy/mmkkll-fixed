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
    
    if (suggestions.length === 0) {
      console.warn('⚠️ فشل في اقتراح الصور من AI');
      return [];
    }

    const images: Array<{ src: string; alt: string; description: string; type: 'IMAGE' | 'VIDEO' }> = [];
    
    for (const suggestion of suggestions) {
      let imageFound = false;

      console.log(`🔍 البحث عن صورة: ${suggestion.query}`);

      const rightsOptions: Array<string | null> = [
        'cc_publicdomain,cc_attribute,cc_sharealike,cc_noncommercial',
        'cc_publicdomain,cc_attribute',
        null,
      ];

      for (let attemptIndex = 0; attemptIndex < rightsOptions.length && !imageFound; attemptIndex++) {
        try {
          const rights = rightsOptions[attemptIndex];
          const rightsLabel = rights === null ? 'جميع الصور' : rights;
          
          console.log(`  🔄 المحاولة ${attemptIndex + 1}: البحث في (${rightsLabel})`);

          const searchResults = await googleImageSearch.searchImages(suggestion.query, {
            num: 3,
            imageSize: 'large',
            imageType: 'photo',
            safe: 'active',
            rights: rights,
          });

          if (searchResults.length > 0) {
            for (const result of searchResults) {
              try {
                const uploadedUrl = await googleImageSearch.downloadAndUploadImage(
                  result.url,
                  suggestion.alt_text
                );

                if (uploadedUrl) {
                  images.push({
                    src: uploadedUrl,
                    alt: suggestion.alt_text,
                    description: suggestion.description,
                    type: 'IMAGE' as const
                  });
                  console.log(`  ✅ تمت إضافة الصورة من (${rightsLabel}): ${suggestion.alt_text}`);
                  imageFound = true;
                  break;
                }
              } catch (uploadError) {
                console.warn(`  ⚠️ فشل رفع صورة، جرب التالية...`);
                continue;
              }
            }
          } else {
            console.log(`  ⚠️ لم يتم العثور على نتائج في هذه الفئة`);
          }
        } catch (error) {
          console.error(`  ❌ خطأ في المحاولة ${attemptIndex + 1}:`, error);
        }
      }

      if (!imageFound) {
        console.warn(`❌ فشل الحصول على صورة لـ: ${suggestion.query} بعد كل المحاولات`);
      }
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
