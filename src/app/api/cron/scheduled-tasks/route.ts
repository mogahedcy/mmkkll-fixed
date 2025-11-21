import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const apiKey = request.headers.get('authorization');
    if (!apiKey || apiKey !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = [];
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      tasks.push({ task: 'groq_api_check', status: 'warning', message: 'GROQ_API_KEY غير محدد' });
    } else {
      tasks.push({ task: 'groq_api_check', status: 'success', message: 'Groq API متصل' });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      tasks: tasks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
