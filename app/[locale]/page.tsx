import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { LOCALES_METADATA, getHreflangAlternates } from '@/lib/i18n/meta';
import { InterfaceLang } from '@/types';
import { Studio } from '@/components/Studio';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as InterfaceLang;
  const meta = LOCALES_METADATA[lang];

  if (!meta) {
    return {};
  }

  const otherLocales = siteConfig.locales
    .filter((l) => l !== lang)
    .map((l) => LOCALES_METADATA[l].ogLocale);

  const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(meta.title)}`;

  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `${siteConfig.url}/${lang}`,
      languages: getHreflangAlternates(),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${lang}`,
      siteName: siteConfig.name,
      type: 'website',
      locale: meta.ogLocale,
      alternateLocale: otherLocales,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl],
    },
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
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  if (!siteConfig.locales.includes(locale as any)) {
    notFound();
  }

  return <Studio initialLang={locale as InterfaceLang} />;
}
