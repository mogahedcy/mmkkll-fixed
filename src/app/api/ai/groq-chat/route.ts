import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, context = 'عام', systemPrompt } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'الرسالة مطلوبة' }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'API key غير مكون' }, { status: 500 });
    }

    const systemPrompts: Record<string, string> = {
      عام: 'أنت مساعد ذكي احترافي للشركة "محترفين الديار العالمية" المتخصصة في المظلات والبرجولات والسواتر في جدة.',
      خدمات: 'أنت مستشار متخصص في المظلات والبرجولات والسواتر.',
      اسعار: 'أنت مستشار أسعار متخصص.',
      مشاريع: 'أنت متخصص في عرض المشاريع السابقة.',
      كاتب_محتوى: 'أنت كاتب محتوى احترافي متخصص في SEO.',
    };

    const finalSystemPrompt = systemPrompt || systemPrompts[context] || systemPrompts['عام'];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          { role: 'system', content: finalSystemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error('Groq API error');

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'لم أتمكن من الرد';

    return NextResponse.json({
      success: true,
      message: aiResponse,
      model: 'Groq Mixtral-8x7b',
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'خطأ في المعالجة' }, { status: 500 });
  }
}
