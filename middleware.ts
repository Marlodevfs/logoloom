import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = 'logoloom.app';
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname, search } = request.nextUrl;

  // 1. Preview Host Redirect (Redirect vercel preview to production domain)
  if (host === 'logoloom-one.vercel.app') {
    const canonicalUrl = new URL(`https://${CANONICAL_HOST}${pathname}${search}`);
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // 2. Root URL serves default language without auto-redirecting crawlers
  if (pathname === '/') {
    return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${search}`, request.url));
  }

  // 3. /pricing rewrite to /en/pricing for localized routing
  if (pathname === '/pricing') {
    return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}/pricing${search}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - fonts/ (font files)
     * - api/ (API routes)
     * - sitemap.xml, robots.txt
     */
    '/((?!api|_next/static|_next/image|fonts|favicon.ico|icon.svg|apple-icon.png|apple-touch-icon.png|sitemap.xml|robots.txt).*)',
  ],
};
