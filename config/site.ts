export const siteConfig = {
  name: 'LogoLoom',
  shortName: 'LogoLoom',
  domain: 'logoloom.app',
  url: 'https://logoloom.app',
  ogImage: 'https://logoloom.app/api/og',
  description:
    'Free printable planners and business documents you personalize in seconds. High-resolution vector PDFs, 100% private in browser, no signup.',
  tagline: 'Free Printable Planners & Business Documents',
  defaultTitle: 'LogoLoom – Free Printable Planners & Business Documents',
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
