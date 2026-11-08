import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LogoLoom — Brand Client Documents in 2 Minutes (Zero Friction)',
  description:
    'Turn generic client documents into branded, print-ready PDFs in under two minutes. Drop your logo, pick your brand color, and download instant PDFs with zero account or signup.',
  keywords: [
    'LogoLoom',
    'branded documents',
    'habit tracker pdf',
    'consulting roadmap',
    'client welcome packet',
    'pdf brand generator',
    'freelance client onboarding',
    'coach printables',
  ],
  authors: [{ name: 'LogoLoom Team', url: 'https://logoloom.app' }],
  metadataBase: new URL('https://logoloom.app'),
  alternates: {
    canonical: 'https://logoloom.app',
    languages: {
      'en': 'https://logoloom.app/?lang=en',
      'fr': 'https://logoloom.app/?lang=fr',
      'es': 'https://logoloom.app/?lang=es',
      'de': 'https://logoloom.app/?lang=de',
      'pt': 'https://logoloom.app/?lang=pt',
      'it': 'https://logoloom.app/?lang=it',
      'x-default': 'https://logoloom.app',
    },
  },
  openGraph: {
    title: 'LogoLoom — Turn generic documents into branded client PDFs in 2 minutes',
    description: 'Zero signup, 100% private in-browser PDF branding tool for coaches and consultants.',
    url: 'https://logoloom.app',
    siteName: 'LogoLoom',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'es_ES', 'de_DE', 'pt_PT', 'it_IT'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LogoLoom — Zero-Friction Branded Document Generator',
    description: 'Transform client documents into branded PDFs in 2 minutes. No account needed.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LogoLoom',
  url: 'https://logoloom.app',
  description: 'In-browser tool letting freelancers and coaches brand client documents into print-ready PDFs in 2 minutes.',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Client-side 300 DPI PDF generation',
    'Dominant brand color auto-extraction',
    'Automated WCAG contrast checking',
    'Custom vector QR code embedding',
    '3 print-ready templates: Habit tracker, 90-day roadmap, client welcome packet',
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
      </body>
    </html>
  );
}
