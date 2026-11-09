import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { getHreflangAlternates } from '@/lib/i18n/meta';

export const metadata: Metadata = {
  title: 'Pricing & Pro White-Label — LogoLoom',
  description:
    'Simple, transparent pricing for LogoLoom. Start free forever or upgrade to Pro for 100% white-label vector PDF exports.',
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
    languages: getHreflangAlternates('pricing'),
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
