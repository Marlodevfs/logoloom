import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { siteConfig } from '@/config/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en': `${siteConfig.url}/en`,
      'fr': `${siteConfig.url}/fr`,
      'es': `${siteConfig.url}/es`,
      'de': `${siteConfig.url}/de`,
      'pt': `${siteConfig.url}/pt`,
      'it': `${siteConfig.url}/it`,
      'x-default': siteConfig.url,
    },
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'es_ES', 'de_DE', 'pt_PT', 'it_IT'],
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${siteConfig.url}/#webapp`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Vector 300 DPI PDF generation with embedded fonts',
        'Dominant brand color auto-extraction with WCAG AA compliance',
        'Pure vector SVG QR code generation',
        'Zero-account & zero-signup privacy-first workflow',
        '3 print-ready templates: Habit tracker, 90-day roadmap, client welcome packet',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteConfig.url}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are my logos and client documents stored on your servers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Never. LogoLoom operates 100% locally in your browser. Your images and documents are processed in memory and never leave your machine.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is LogoLoom really free without signup or credit card?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, completely free. You can upload logos, pick brand colors, generate vector QR codes, and download high-resolution PDFs without creating an account or providing an email address.',
          },
        },
        {
          '@type': 'Question',
          name: 'What format are the exported PDFs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All PDFs are exported as pure vector documents with selectable text, embedded Unicode fonts, and sharp vector QR codes, ready for professional A4 and US Letter printing.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is LogoLoom Pro?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'LogoLoom Pro is an optional one-time upgrade for coaches and agencies who want 100% white-label exports without the discreet Made with LogoLoom footer tag.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">
        {children}
        {/* GoatCounter privacy-friendly analytics */}
        <Script
          data-goatcounter="https://logoloom.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
