export const siteConfig = {
  name: 'LogoLoom',
  shortName: 'LogoLoom',
  domain: 'logoloom.app',
  url: 'https://logoloom.app',
  ogImage: 'https://logoloom.app/api/og',
  description:
    'Free online CV maker with no account and no subscription: pick a layout, fill it in, download a clean PDF. Your CV never leaves your browser. Free printable planners too.',
  tagline: 'Free CV Maker – No Account, No Subscription',
  defaultTitle: 'LogoLoom – Free CV Maker, PDF Without Subscription',
  social: {
    github: 'https://github.com/Marlodevfs/logoloom',
    twitter: 'https://twitter.com/logoloom',
  },
  contact: {
    email: 'support@logoloom.app',
  },
  /** Buy Me a Coffee page (https://www.buymeacoffee.com/<slug>) */
  buyMeACoffee: 'donotkyc',
  /** Google Tag Manager container. Loaded ONLY after the visitor accepts cookies. */
  gtmId: 'GTM-K28N223R',
  /**
   * Legal notice (mentions légales). TO FILL IN before going commercial:
   * French law (LCEN art. 6) requires the publisher's identity on the site.
   * Empty fields are simply not displayed.
   */
  legal: {
    publisherName: '', // e.g. "Prénom Nom" or company name
    publisherStatus: '', // e.g. "Entrepreneur individuel – SIREN 123 456 789"
    publisherAddress: '', // postal address
    publicationDirector: '', // usually the publisher's name
    host: {
      name: 'Vercel Inc.',
      address: '440 N Barranca Ave #4133, Covina, CA 91723, USA',
      url: 'https://vercel.com',
    },
  },
  locales: ['en', 'fr', 'es', 'de', 'pt', 'it'] as const,
  defaultLocale: 'en' as const,
};

export type SiteConfig = typeof siteConfig;
