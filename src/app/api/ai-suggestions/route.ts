import { NextRequest, NextResponse } from 'next/server';
import { SEOAgent } from '@/lib/seo-agent';

const seoAgent = new SEOAgent();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, location, type = 'project' } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'العنوان مطلوب' },
        { status: 400 }
      );
    }

    console.log('🤖 طلب اقتراحات AI:', { title, category, location, type });

    const suggestions: any = {
      keywords: [],
      titleSuggestions: [],
      descriptionSuggestions: [],
      metaTags: null,
      contentSuggestions: null
    };

    // تجهيز المحتوى للتحليل
    const content = `${title}. ${description || ''}. الفئة: ${category || 'غير محدد'}. الموقع: ${location || 'السعودية'}.`;

    // 1. توليد الكلمات المفتاحية
    const initialKeywords = [
      category || 'مشاريع',
      location || 'السعودية',
      'جدة',
      'محترفين الديار'
    ];
    
    try {
      const keywordAnalysis = await seoAgent.analyzeKeywords(content, initialKeywords);
      const allKeywords = [
        ...keywordAnalysis.primary_keywords,
        ...keywordAnalysis.secondary_keywords.slice(0, 5)
      ];
      suggestions.keywords = allKeywords;
      console.log('✅ تم توليد الكلمات المفتاحية:', allKeywords.length);
    } catch (error) {
      console.error('خطأ في توليد الكلمات المفتاحية:', error);
      suggestions.keywords = [
        category || 'مشاريع',
        location || 'السعودية',
        'جدة',
        'محترفين الديار',
        title.split(' ').slice(0, 3).join(' ')
      ];
    }

    // 2. توليد اقتراحات للعناوين
    try {
      suggestions.titleSuggestions = [
        `${title} في ${location || 'السعودية'} - محترفين الديار`,
        `${category || 'مشروع'} احترافي: ${title} | ${location || 'جدة'}`,
        `تنفيذ ${category || 'مشروع'} ${title} بأعلى جودة في ${location || 'السعودية'}`
      ];
      console.log('✅ تم توليد اقتراحات العناوين:', suggestions.titleSuggestions.length);
    } catch (error) {
      console.error('خطأ في توليد العناوين:', error);
      suggestions.titleSuggestions = [
        `${title} في ${location || 'السعودية'} - محترفين الديار`,
        `${category || 'مشروع'} احترافي: ${title}`,
        `تنفيذ ${category || 'مشروع'} ${title} بأعلى جودة`
      ];
    }

    // 3. توليد اقتراحات لتحسين الوصف
    if (description) {
      try {
        const contentAnalysis = await seoAgent.analyzeContent(
          description,
          suggestions.keywords.slice(0, 5)
        );
        suggestions.descriptionSuggestions = contentAnalysis.suggestions || [];
        console.log('✅ تم تحليل الوصف:', suggestions.descriptionSuggestions.length);
      } catch (error) {
        console.error('خطأ في تحليل الوصف:', error);
      }
    } else {
      // إذا لم يكن هناك وصف، نقترح وصف أولي
      try {
        const generatedContent = await seoAgent.generateOptimizedContent(
          title,
          suggestions.keywords.slice(0, 5),
          'project_description',
          150
        );
        suggestions.contentSuggestions = generatedContent.content;
        console.log('✅ تم توليد اقتراح للوصف');
      } catch (error) {
        console.error('خطأ في توليد الوصف:', error);
        suggestions.contentSuggestions = `مشروع ${category || ''} ${title} في ${location || 'السعودية'}. تم تنفيذه بأعلى معايير الجودة والاحترافية من قبل محترفين الديار العالمية. نفخر بتقديم أفضل الحلول والخدمات المتميزة لعملائنا.`;
      }
    }

    // 4. توليد Meta Tags
    try {
      const metaTags = await seoAgent.generateMetaTags(
        content,
        suggestions.keywords.slice(0, 5),
        type === 'article' ? 'article' : 'project'
      );
      suggestions.metaTags = metaTags;
      console.log('✅ تم توليد Meta Tags');
    } catch (error) {
      console.error('خطأ في توليد Meta Tags:', error);
      suggestions.metaTags = {
        title: `${title} في ${location || 'السعودية'} | محترفين الديار العالمية`,
        description: description?.substring(0, 150) || `${title} - مشروع ${category || ''} تم تنفيذه بأعلى معايير الجودة في ${location || 'السعودية'}.`,
        og_title: title,
        og_description: description?.substring(0, 200) || `مشروع ${category || ''} احترافي`,
        twitter_title: title,
        twitter_description: description?.substring(0, 150) || `مشروع ${category || ''} احترافي`
      };
    }

    console.log('✅ تم إنشاء جميع الاقتراحات بنجاح');

    return NextResponse.json({
      success: true,
      suggestions
    });

  } catch (error) {
    console.error('❌ خطأ في API اقتراحات AI:', error);
    return NextResponse.json(
      {
        error: 'فشل في توليد الاقتراحات',
        details: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    );
  }
}
