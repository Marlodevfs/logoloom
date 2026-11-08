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
  ],
  authors: [{ name: 'LogoLoom Team', url: 'https://logoloom.app' }],
  metadataBase: new URL('https://logoloom.app'),
  openGraph: {
    title: 'LogoLoom — Turn generic documents into branded client PDFs in 2 minutes',
    description: 'Zero signup, 100% private in-browser PDF branding tool for coaches and consultants.',
    url: 'https://logoloom.app',
    siteName: 'LogoLoom',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LogoLoom — Zero-Friction Branded Document Generator',
    description: 'Transform client documents into branded PDFs in 2 minutes. No account needed.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
