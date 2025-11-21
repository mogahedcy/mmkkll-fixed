import { NextResponse } from 'next/server';

/**
 * Smart Project Suggestions API
 * AI يقترح عناوين، وصفات، وكلمات مفتاحية عند إضافة مشروع
 */

export async function POST(request: Request) {
  try {
    const { projectType, location, budget, description } = await request.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'API key غير مكون' }, { status: 500 });
    }

    const prompt = `أنت متخصص في المظلات والبرجولات والسواتر في جدة.
    
المشروع:
- النوع: ${projectType}
- الموقع: ${location}
- الميزانية: ${budget}
- الوصف: ${description}

أعطني:
1. عنوان احترافي للمشروع (مختصر وجاذب)
2. وصف تسويقي احترافي (2-3 جمل)
3. 5 كلمات مفتاحية ذات صلة

ابدأ بـ JSON:
{
  "title": "...",
  "description": "...",
  "keywords": ["...", "..."]
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
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Groq API error');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';
    
    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const suggestions = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    return NextResponse.json({ success: true, suggestions });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'فشل توليد الاقتراحات' },
      { status: 500 }
    );
  }
}
