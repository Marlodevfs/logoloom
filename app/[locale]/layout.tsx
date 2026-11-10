import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import '../globals.css';
import { siteConfig } from '@/config/site';
import { CookieConsent } from '@/components/CookieConsent';

const sans = localFont({
  src: [
    { path: '../fonts/Atkinson-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Atkinson-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/Atkinson-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const display = localFont({
  src: '../fonts/Literata-var.woff2',
  weight: '200 900',
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121416' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

// Site-wide identity. The WebApplication schema lives on the home page only
// (it was duplicated there before).
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: ['en', 'fr', 'es', 'de', 'pt', 'it'],
      publisher: { '@id': `${siteConfig.url}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/apple-touch-icon.png`,
      email: siteConfig.contact.email,
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = siteConfig.locales.includes(locale as any) ? locale : 'en';

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-200 selection:text-slate-900">
        {children}
        <CookieConsent lang={lang} />
        {/* GoatCounter privacy-friendly analytics */}
        <Script
          data-goatcounter="https://logoloom.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
