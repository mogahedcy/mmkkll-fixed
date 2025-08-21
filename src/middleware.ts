
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/security';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // المسارات المحمية
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch (error) {
      // Token غير صالح، إعادة توجيه لصفحة الدخول
      const response = NextResponse.redirect(new URL('/login', request.url));
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
