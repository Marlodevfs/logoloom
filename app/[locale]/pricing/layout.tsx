import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getHreflangAlternates } from '@/lib/i18n/meta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = siteConfig.locales.includes(locale as any) ? locale : siteConfig.defaultLocale;

  return {
    title: 'Pricing & Pro White-Label — LogoLoom',
    description:
      'Simple, transparent pricing for LogoLoom. Start free forever or upgrade to Pro for 100% white-label vector PDF exports.',
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
