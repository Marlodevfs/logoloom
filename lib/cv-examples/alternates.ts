import { siteConfig } from '@/config/site';
import { enSlugForFr, getCvExampleEn } from './en';
import { deSlugForEn, deSlugForFr, getCvExampleDe } from './de';

type Slugs = { fr?: string; en?: string; de?: string };

const URLS = {
  fr: (s: string) => `${siteConfig.url}/fr/cv/exemples/${s}`,
  en: (s: string) => `${siteConfig.url}/en/cv/examples/${s}`,
  de: (s: string) => `${siteConfig.url}/de/cv/beispiele/${s}`,
};

/** The same job in every language it exists in, starting from any one of them. */
export function exampleCluster(lang: 'fr' | 'en' | 'de', slug: string): Slugs {
  if (lang === 'fr') return { fr: slug, en: enSlugForFr(slug), de: deSlugForFr(slug) };
  if (lang === 'en') {
    const ex = getCvExampleEn(slug);
    return { fr: ex?.fr, en: slug, de: deSlugForEn(slug) };
  }
  const ex = getCvExampleDe(slug);
  return { fr: ex?.fr, en: ex?.en, de: slug };
}

/**
 * hreflang map for one job's example pages (reciprocal on every page of the cluster).
 * Undefined when the job exists in a single language.
 */
export function exampleLanguages(lang: 'fr' | 'en' | 'de', slug: string): Record<string, string> | undefined {
  const c = exampleCluster(lang, slug);
  const languages: Record<string, string> = {};
  if (c.fr) languages.fr = URLS.fr(c.fr);
  if (c.en) languages.en = URLS.en(c.en);
  if (c.de) languages.de = URLS.de(c.de);
  if (Object.keys(languages).length < 2) return undefined;
  languages['x-default'] = languages.en || languages.fr;
  return languages;
}

/** hreflang map shared by the three example hubs. */
export const HUB_LANGUAGES: Record<string, string> = {
  fr: `${siteConfig.url}/fr/cv/exemples`,
  en: `${siteConfig.url}/en/cv/examples`,
  de: `${siteConfig.url}/de/cv/beispiele`,
  'x-default': `${siteConfig.url}/en/cv/examples`,
};

