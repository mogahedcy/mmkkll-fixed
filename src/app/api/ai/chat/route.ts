import { NextResponse } from 'next/server';

/**
 * AI Chat API using Groq (Free & Fast)
 * Groq: https://groq.com - Free API with fast inference
 * 
 * Get free API key: https://console.groq.com
 */

export async function POST(request: Request) {
  try {
    const { message, context = 'عام' } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'الرسالة مطلوبة' },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'API key غير مكون' },
        { status: 500 }
      );
    }

    // System prompt based on context
    const systemPrompts: Record<string, string> = {
      عام: 'أنت مساعد ذكي احترافي للشركة "محترفين الديار العالمية" المتخصصة في المظلات والبرجولات والسواتر في جدة. أجب بشكل مختصر واحترافي باللغة العربية.',
      خدمات: 'أنت مستشار متخصص في المظلات والبرجولات والسواتر. ساعد العميل في اختيار الخدمة المناسبة.',
      اسعار: 'أنت مستشار أسعار متخصص. قدم معلومات عن الأسعار والعروض الحالية.',
      مشاريع: 'أنت متخصص في عرض المشاريع السابقة والنتائج. شارك التفاصيل عن أعمالنا.',
    };

    const systemPrompt = systemPrompts[context] || systemPrompts['عام'];

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768', // Fast and free on Groq
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Groq API Error:', error);
      return NextResponse.json(
        { error: 'خطأ من خادم AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'لم أتمكن من الرد';

    return NextResponse.json({
      success: true,
      message: aiResponse,
      model: 'Groq Mixtral-8x7b',
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الرسالة' },
      { status: 500 }
    );
  }
}
