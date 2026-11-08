import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'de', 'pt', 'it'];
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const { pathname, search } = request.nextUrl;

  // 1. PHASE 3: Canonical Apex Host Enforcement (301 Permanent Redirect)
  if (
    host === 'www.logoloom.app' ||
    host === 'logoloom-one.vercel.app'
  ) {
    const canonicalUrl = new URL(`https://logoloom.app${pathname}${search}`);
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // 2. PHASE 4: Root Accept-Language Redirection
  if (pathname === '/') {
    const acceptLang = request.headers.get('accept-language') || '';
    let matchedLocale = DEFAULT_LOCALE;

    for (const locale of SUPPORTED_LOCALES) {
      if (acceptLang.toLowerCase().includes(locale)) {
        matchedLocale = locale;
        break;
      }
    }

    const targetUrl = new URL(`/${matchedLocale}${search}`, request.url);
    return NextResponse.redirect(targetUrl, 307);
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
     */
    '/((?!api|_next/static|_next/image|fonts|favicon.ico).*)',
  ],
};
