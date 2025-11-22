import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query, count = 3 } = await request.json();
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json({ error: 'API key غير مكون' }, { status: 500 });
    }

    const prompt = `أنت متخصص في اختيار صور احترافية عالية الجودة.
    
البحث: ${query}

أعطني ${count} كلمات بحث دقيقة جداً بصيغة JSON:

{
  "searchTerms": ["صورة1", "صورة2"],
  "descriptions": ["وصف احترافي"]
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

    if (!response.ok) throw new Error('Groq API error');

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const imageData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    // Unsplash images
    const imageUrls = (imageData.searchTerms || [query]).slice(0, count).map(
      (term: string) => `https://images.unsplash.com/random?${new URLSearchParams({ q: term, w: '800', h: '600' }).toString()}`
    );

    return NextResponse.json({
      success: true,
      images: imageUrls,
      searchTerms: imageData.searchTerms || [],
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'فشل البحث' }, { status: 500 });
  }
}
