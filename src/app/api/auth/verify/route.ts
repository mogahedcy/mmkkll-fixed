import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/security';
import jwt from 'jsonwebtoken'; // استيراد مكتبة jwt

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'غير مصرح لك بالوصول' },
        { status: 401 }
      );
    }

    // التحقق من JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    // يمكنك هنا استرداد معلومات المسؤول من قاعدة البيانات باستخدام decoded.userId أو ما شابه
    // كمثال، سنفترض وجود دالة authenticateAdmin التي تستخدم الـ token
    const admin = await authenticateAdmin(request); // استدعاء authenticateAdmin هنا

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.adminId,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Authentication error:', error); // تسجيل الخطأ لمزيد من التفاصيل
    return NextResponse.json(
      { error: 'غير مصرح' },
      { status: 401 }
    );
  }
}