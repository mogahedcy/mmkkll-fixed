import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Debug log for visibility
  console.log('Middleware path:', request.nextUrl.pathname)
  const response = NextResponse.next()

  // Safe security headers that don't block iframe preview
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|images/|uploads/).*)',
  ],
}
