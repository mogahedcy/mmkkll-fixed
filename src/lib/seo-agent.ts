import ai, { GEMINI_MODEL } from './gemini-client';

export interface KeywordAnalysis {
  primary_keywords: string[];
  secondary_keywords: string[];
  long_tail_keywords: string[];
  keyword_density: { [key: string]: number };
  search_intent: string;
  difficulty_score: number;
  opportunity_score: number;
}

export interface ContentAnalysis {
  seo_score: number;
  readability_score: number;
  keyword_optimization: string;
  content_gaps: string[];
  suggestions: string[];
  meta_title_suggestion: string;
  meta_description_suggestion: string;
  h1_suggestions: string[];
  internal_linking_opportunities: string[];
}

export interface CompetitorInsight {
  top_keywords: string[];
  content_strategy: string;
  content_gaps: string[];
  backlink_opportunities: string[];
  improvement_areas: string[];
}

export class SEOAgent {
  async analyzeKeywords(content: string, targetKeywords: string[], language: string = 'ar'): Promise<KeywordAnalysis> {
    try {
      const prompt = `أنت خبير SEO متقدم متخصص في السوق السعودي. حلل المحتوى التالي واستخرج الكلمات المفتاحية:

المحتوى: ${content}

الكلمات المفتاحية المستهدفة: ${targetKeywords.join(', ')}

قدم تحليلاً شاملاً بصيغة JSON يتضمن:
- primary_keywords: الكلمات الأساسية عالية الأهمية (3-5 كلمات)
- secondary_keywords: كلمات ثانوية مرتبطة (5-10 كلمات)
- long_tail_keywords: كلمات طويلة محددة (5-10 عبارات)
- keyword_density: كثافة كل كلمة رئيسية في المحتوى
- search_intent: نية البحث (معلوماتي، تجاري، معاملات)
- difficulty_score: درجة صعوبة المنافسة (1-100)
- opportunity_score: درجة الفرصة للترتيب (1-100)

تأكد من أن الكلمات المفتاحية متوافقة مع السوق السعودي واللهجة المحلية.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير SEO محترف متخصص في تحسين محركات البحث للسوق السعودي. قدم استجابة JSON دقيقة ومفصلة.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      return result as KeywordAnalysis;
    } catch (error) {
      console.error('Error analyzing keywords:', error);
      throw new Error('فشل تحليل الكلمات المفتاحية');
    }
  }

  async analyzeContent(content: string, targetKeywords: string[], url?: string): Promise<ContentAnalysis> {
    try {
      const prompt = `أنت خبير SEO متقدم. حلل هذا المحتوى وقدم تقييماً شاملاً:

المحتوى: ${content}

الكلمات المفتاحية المستهدفة: ${targetKeywords.join(', ')}
${url ? `الرابط: ${url}` : ''}

قدم تحليلاً بصيغة JSON يشمل:
- seo_score: درجة SEO الإجمالية (1-100)
- readability_score: درجة سهولة القراءة (1-100)
- keyword_optimization: تقييم استخدام الكلمات المفتاحية
- content_gaps: الفجوات في المحتوى التي يجب تغطيتها
- suggestions: اقتراحات محددة للتحسين
- meta_title_suggestion: عنوان meta محسّن (50-60 حرف)
- meta_description_suggestion: وصف meta محسّن (150-160 حرف)
- h1_suggestions: اقتراحات لعناوين H1 جذابة
- internal_linking_opportunities: فرص للربط الداخلي

ركز على تقنيات SEO القوية والفعالة.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير SEO استراتيجي متخصص في تحليل وتحسين المحتوى لمحركات البحث.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      return result as ContentAnalysis;
    } catch (error) {
      console.error('Error analyzing content:', error);
      throw new Error('فشل تحليل المحتوى');
    }
  }

  async generateOptimizedContent(
    topic: string,
    keywords: string[],
    contentType: 'article' | 'project_description' | 'service_page',
    wordCount: number = 800
  ): Promise<{ title: string; content: string; meta_description: string; tags: string[] }> {
    try {
      const contentTypeAr = {
        article: 'مقال',
        project_description: 'وصف مشروع',
        service_page: 'صفحة خدمة'
      };

      const prompt = `أنت كاتب محتوى SEO محترف متخصص في قطاع البناء والإنشاءات في السعودية.

اكتب ${contentTypeAr[contentType]} محسّن للـ SEO عن: ${topic}

الكلمات المفتاحية: ${keywords.join(', ')}
عدد الكلمات المطلوب: ${wordCount}

المتطلبات:
1. المحتوى يجب أن يكون أصلي 100% وليس منسوخاً
2. استخدم الكلمات المفتاحية بشكل طبيعي (كثافة 1-2%)
3. اجعل المحتوى غني بالمعلومات وقيم للقارئ
4. استخدم عناوين فرعية واضحة (H2, H3)
5. أضف قوائم نقطية حيثما كان مناسباً
6. اكتب بأسلوب احترافي يناسب السوق السعودي
7. ضمّن دعوة للعمل (CTA) في النهاية

قدم النتيجة بصيغة JSON تحتوي على:
- title: عنوان جذاب محسّن للSEO (50-60 حرف)
- content: المحتوى الكامل بتنسيق HTML
- meta_description: وصف meta محسّن (150-160 حرف)
- tags: 5-8 وسوم ذات صلة`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت كاتب محتوى SEO خبير تنشئ محتوى عالي الجودة محسّن لمحركات البحث.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      return result;
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('فشل توليد المحتوى');
    }
  }

  async analyzeCompetitor(competitorUrl: string, industry: string): Promise<CompetitorInsight> {
    try {
      const prompt = `أنت محلل SEO تنافسي محترف. حلل استراتيجية المنافس التالي:

رابط المنافس: ${competitorUrl}
المجال: ${industry}

بناءً على خبرتك في السوق، قدم تحليلاً استراتيجياً بصيغة JSON يتضمن:
- top_keywords: الكلمات المفتاحية التي من المحتمل أن يستهدفها (10-15 كلمة)
- content_strategy: وصف استراتيجية المحتوى المحتملة
- content_gaps: الفجوات في محتوى المنافس يمكن استغلالها
- backlink_opportunities: فرص الحصول على روابط خلفية
- improvement_areas: مجالات يمكن التفوق فيها

ركز على الاستراتيجيات القوية والفعالة للتفوق على المنافسين.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير تحليل تنافسي في SEO متخصص في إيجاد الفرص الاستراتيجية.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      return result as CompetitorInsight;
    } catch (error) {
      console.error('Error analyzing competitor:', error);
      throw new Error('فشل تحليل المنافس');
    }
  }

  async suggestInternalLinks(content: string, availablePages: { title: string; url: string; keywords: string[] }[]): Promise<{ suggestions: { anchor_text: string; target_url: string; position: string; relevance_score: number }[] }> {
    try {
      const prompt = `أنت خبير في بناء بنية الربط الداخلي. حلل المحتوى التالي واقترح روابط داخلية مناسبة:

المحتوى: ${content}

الصفحات المتاحة للربط:
${availablePages.map(p => `- ${p.title} (${p.url}): ${p.keywords.join(', ')}`).join('\n')}

قدم اقتراحات بصيغة JSON تحتوي على:
- suggestions: قائمة باقتراحات الروابط، كل اقتراح يحتوي على:
  * anchor_text: نص الرابط المقترح
  * target_url: الرابط الهدف
  * position: موقع الإدراج المقترح في المحتوى
  * relevance_score: درجة الملاءمة (1-100)

اختر 3-5 روابط داخلية ذات صلة قوية فقط. تأكد من أن نص الرابط (anchor text) طبيعي ومناسب.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير في استراتيجيات الربط الداخلي لتحسين SEO.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      return result;
    } catch (error) {
      console.error('Error suggesting internal links:', error);
      throw new Error('فشل اقتراح الروابط الداخلية');
    }
  }

  async generateMetaTags(content: string, keywords: string[], pageType: string): Promise<{
    title: string;
    description: string;
    og_title: string;
    og_description: string;
    twitter_title: string;
    twitter_description: string;
  }> {
    try {
      const prompt = `أنت خبير في تحسين Meta Tags. قم بإنشاء meta tags محسّنة للصفحة التالية:

نوع الصفحة: ${pageType}
المحتوى: ${content.substring(0, 500)}...
الكلمات المفتاحية: ${keywords.join(', ')}

قدم meta tags بصيغة JSON تحتوي على:
- title: عنوان الصفحة (50-60 حرف)
- description: وصف الصفحة (150-160 حرف)
- og_title: عنوان Open Graph (يمكن أن يكون أطول قليلاً)
- og_description: وصف Open Graph (مشوق وجذاب)
- twitter_title: عنوان Twitter
- twitter_description: وصف Twitter

تأكد من:
1. تضمين الكلمات المفتاحية الرئيسية في العنوان
2. جعل الأوصاف جذابة لزيادة نسبة النقر (CTR)
3. استخدام أفعال دعوة للعمل حيثما أمكن`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير في كتابة meta tags محسّنة تزيد من نسبة النقر والظهور في محركات البحث.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      return result;
    } catch (error) {
      console.error('Error generating meta tags:', error);
      throw new Error('فشل توليد meta tags');
    }
  }

  async clusterKeywords(keywords: string[]): Promise<{
    clusters: {
      cluster_name: string;
      keywords: string[];
      search_intent: string;
      priority_score: number;
      content_ideas: string[];
    }[];
  }> {
    try {
      const prompt = `أنت خبير في تجميع الكلمات المفتاحية (Keyword Clustering). قم بتحليل وتجميع الكلمات التالية:

الكلمات المفتاحية: ${keywords.join(', ')}

قم بتجميعها إلى مجموعات منطقية بصيغة JSON:
- clusters: قائمة بالمجموعات، كل مجموعة تحتوي على:
  * cluster_name: اسم المجموعة
  * keywords: الكلمات المفتاحية في هذه المجموعة
  * search_intent: نية البحث للمجموعة
  * priority_score: درجة الأولوية (1-100)
  * content_ideas: 3-5 أفكار محتوى لهذه المجموعة

جمّع الكلمات المتشابهة في المعنى والنية معاً.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير في تجميع وتنظيم الكلمات المفتاحية لإنشاء استراتيجية محتوى فعالة.",
          responseMimeType: "application/json",
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{}');
      return result;
    } catch (error) {
      console.error('Error clustering keywords:', error);
      throw new Error('فشل تجميع الكلمات المفتاحية');
    }
  }

  async generateImageAltText(title: string, content: string, imageUrl: string): Promise<string> {
    try {
      const prompt = `أنت خبير في كتابة نصوص بديلة للصور (Alt Text) محسّنة للـ SEO.

العنوان: ${title}
المحتوى: ${content.substring(0, 300)}
رابط الصورة: ${imageUrl}

اكتب نص بديل (Alt Text) محسّن للصورة يكون:
1. وصفي ودقيق (30-100 حرف)
2. يحتوي على كلمات مفتاحية ذات صلة
3. طبيعي وسلس للقراءة
4. يفيد محركات البحث والمستخدمين ذوي الاحتياجات الخاصة

قدم فقط نص الـ Alt Text بدون أي شرح إضافي.`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        config: {
          systemInstruction: "أنت خبير في كتابة نصوص بديلة للصور محسّنة لمحركات البحث وإمكانية الوصول.",
        },
        contents: prompt,
      });

      const altText = response.text?.trim() || `صورة ${title}`;
      return altText.replace(/^["']|["']$/g, '');
    } catch (error) {
      console.error('Error generating image alt text:', error);
      return `صورة ${title}`;
    }
  }
}

export const seoAgent = new SEOAgent();
