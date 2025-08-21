import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });

    // حذف كوكيز التوثيق
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // انتهاء فوري
    });

    return response;

  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تسجيل الخروج' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { sessionManager, auditLogger, getClientIP } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('session-id')?.value;
    
    if (sessionId) {
      const session = sessionManager.validateSession(sessionId);
      if (session) {
        // تسجيل تسجيل الخروج
        auditLogger.log({
          adminId: session.adminId,
          action: 'LOGOUT',
          resource: 'auth',
          ipAddress: getClientIP(request),
          userAgent: request.headers.get('user-agent') || 'unknown',
          success: true
        });

        // إنهاء الجلسة
        sessionManager.destroySession(sessionId);
      }
    }

    // إنشاء response ومسح cookies
    const response = NextResponse.json(
      { success: true, message: 'تم تسجيل الخروج بنجاح' }
    );

    // مسح cookies
    response.cookies.delete('admin-token');
    response.cookies.delete('session-id');

    return response;

  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
