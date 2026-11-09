import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getHreflangAlternates } from '@/lib/i18n/meta';
import { PRO_I18N } from '@/lib/i18n/pro';
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

  return {
    title: `${getSiteChrome(lang).footer.pricing} – LogoLoom`,
    description: p.pageSubtitle,
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
