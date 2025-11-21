import { NextResponse } from 'next/server';

/**
 * Smart Image Selection from Cloudinary
 * اختيار صور مناسبة تلقائياً من Cloudinary
 */

export async function POST(request: Request) {
  try {
    const { content, projectType, count = 3 } = await request.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'API key غير مكون' }, { status: 500 });
    }

    // تحليل المحتوى واختيار كلمات بحث مناسبة
    const prompt = `أنت متخصص في اختيار الصور المناسبة للمحتوى.

المحتوى: ${content.substring(0, 500)}
نوع المشروع: ${projectType}

أعطني ${count} كلمات بحث دقيقة جداً لاختيار صور مناسبة:

{
  "searchTerms": ["...", "...", "..."],
  "imageAltTexts": ["...", "...", "..."]
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
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      throw new Error('Groq API error');
    }

    const data = await response.json();
    const content_text = data.choices[0]?.message?.content || '{}';
    
    const jsonMatch = content_text.match(/\{[\s\S]*\}/);
    const imageSelection = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

    // بناء URLs من Cloudinary
    const cloudinaryCloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dj6gk4wmy';
    
    const images = (imageSelection.searchTerms || []).map((term: string, idx: number) => ({
      searchTerm: term,
      url: `https://res.cloudinary.com/${cloudinaryCloud}/image/fetch/w_800,h_600,c_fill,q_auto,f_auto/https://source.unsplash.com/800x600/?${encodeURIComponent(term)}`,
      altText: imageSelection.imageAltTexts?.[idx] || term,
    }));

    return NextResponse.json({ success: true, images, selection: imageSelection });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'فشل اختيار الصور' },
      { status: 500 }
    );
  }
}
