import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getHreflangAlternates } from '@/lib/i18n/meta';
import { PRO_ENABLED, PRO_I18N } from '@/lib/i18n/pro';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { InterfaceLang } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = siteConfig.locales.includes(locale as any) ? locale : siteConfig.defaultLocale;

  const p = PRO_I18N[lang as InterfaceLang] || PRO_I18N.en;

  const title = `${getSiteChrome(lang).footer.pricing}: ${p.freeName} & ${p.proName} | LogoLoom`;
  const ogImage = `${siteConfig.url}/api/og?title=${encodeURIComponent(p.pageTitle)}`;

  return {
    title,
    description: p.pageSubtitle,
    // Hidden from search engines until Pro sales are open.
    ...(PRO_ENABLED ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description: p.pageSubtitle,
      url: `${siteConfig.url}/${lang}/pricing`,
      siteName: siteConfig.name,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: p.pageSubtitle,
      images: [ogImage],
    },
    alternates: {
      // Each localized pricing page is its own canonical (consistent with hreflang)
      canonical: `${siteConfig.url}/${lang}/pricing`,
      languages: getHreflangAlternates('pricing'),
    },
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
