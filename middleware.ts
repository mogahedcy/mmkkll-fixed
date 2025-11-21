import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // إعادة توجيه من aldeyarksa.tech إلى www.aldeyarksa.tech
  if (hostname === 'aldeyarksa.tech') {
    const url = new URL(request.url);
    url.hostname = 'www.aldeyarksa.tech';
    return NextResponse.redirect(url, { status: 301 });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
