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
    /** VAT mention shown in the terms of sale, e.g. "TVA non applicable, art. 293 B du CGI" (micro-entreprise). */
    vatMention: '',
    /** Consumer mediator (mandatory in France for B2C sales): name + website. */
    mediator: '',
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
