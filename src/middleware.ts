import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

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
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Middleware: Token verified for admin:', (decoded as any).adminId);
    } catch (error) {
      console.log('Middleware: Token verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};