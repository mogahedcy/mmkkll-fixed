
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export function middleware(request: NextRequest) {
  console.log('Middleware: Processing request for', request.nextUrl.pathname);
  
  // التحقق من المسارات المحمية
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('admin-token')?.value;
    console.log('Middleware: Token found:', !!token);

    if (!token) {
      console.log('Middleware: No token, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // استيراد jwt داخل الدالة لتجنب مشاكل Edge Runtime
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Middleware: Token verified for admin:', decoded.adminId);
      return NextResponse.next();
    } catch (error) {
      console.log('Middleware: Token verification failed:', error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      // مسح الكوكيز المنتهية الصلاحية
      response.cookies.delete('admin-token');
      response.cookies.delete('session-id');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
