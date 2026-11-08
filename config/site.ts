export const siteConfig = {
  name: 'LogoLoom',
  shortName: 'LogoLoom',
  domain: 'logoloom.app',
  url: 'https://logoloom.app',
  ogImage: 'https://logoloom.app/api/og',
  description:
    'Turn generic client documents into branded, print-ready PDFs in 2 minutes. Add your logo, choose colors, and download vector PDFs with zero signup.',
  tagline: 'Brand Client Documents in 2 Minutes',
  defaultTitle: 'LogoLoom — Brand Client Documents in 2 Minutes',
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
