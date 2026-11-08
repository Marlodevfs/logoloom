export const siteConfig = {
  name: 'LogoLoom',
  shortName: 'LogoLoom',
  domain: 'logoloom.app',
  url: 'https://logoloom.app',
  ogImage: 'https://logoloom.app/api/og',
  description:
    'Brand client documents in under 2 minutes. Free, zero account, in-browser privacy-first vector PDF generator for coaches, consultants, and freelancers.',
  tagline: 'Brand Client Documents in 2 Minutes',
  defaultTitle: 'LogoLoom — Brand Client Documents in 2 Minutes (Zero Friction)',
  social: {
    github: 'https://github.com/Marlodevfs/logoloom',
    twitter: 'https://twitter.com/logoloom',
  },
  contact: {
    email: 'support@logoloom.app',
  },
  locales: ['en', 'fr', 'es', 'de', 'pt', 'it'] as const,
  defaultLocale: 'en' as const,
};

export type SiteConfig = typeof siteConfig;
