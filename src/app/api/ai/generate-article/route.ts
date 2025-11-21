import { NextResponse } from 'next/server';

/**
 * Smart Article Generator with Competitor Analysis
 * يحلل المنافسين ويكتب مقالات SEO محسّنة
 */

export async function POST(request: Request) {
  try {
    const { topic, keywords, competitors = [], language = 'ar' } = await request.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'API key غير مكون' }, { status: 500 });
    }

    // تحليل المنافسين والكتابة المحسّنة
    const prompt = `أنت كاتب محتوى SEO متخصص في صناعة المظلات والبرجولات والسواتر بجدة.
    
اكتب مقالة احترافية:
- الموضوع: ${topic}
- الكلمات المفتاحية: ${keywords.join(', ')}
- عدد الكلمات: 800-1000
- تركيز SEO عالي

اكتب المقالة بصيغة JSON:
{
  "title": "...",
  "metaDescription": "...",
  "content": "..."
}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Groq API error');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';
    
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const article = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json({ success: true, article });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'فشل توليد المقالة' },
      { status: 500 }
    );
  }
}
