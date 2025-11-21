import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Contact form submission:', data);
    
    return NextResponse.json(
      { success: true, message: 'تم استقبال طلبك بنجاح' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في المعالجة' },
      { status: 500 }
    );
  }
}
