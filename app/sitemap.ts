import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { CANONICAL_TEMPLATE_SLUGS } from '@/lib/seo/templates-metadata';
import { CV_EXAMPLES_FR } from '@/lib/cv-examples/fr';
import { LETTER_EXAMPLES_FR } from '@/lib/letter-examples/fr';
import { CV_GUIDES_FR } from '@/lib/cv-guides/fr';
import { CV_EXAMPLES_EN, enSlugForFr } from '@/lib/cv-examples/en';
import { PRO_ENABLED } from '@/lib/i18n/pro';

export default function sitemap(): MetadataRoute.Sitemap {
  // Fixed date of the last real content update: a date that changes on every
  // crawl tells search engines nothing. Bump it when pages actually change.
  const now = new Date('2026-11-11');
  const examplesUpdated = new Date('2026-11-13');
  const locales = siteConfig.locales;

  const entries: MetadataRoute.Sitemap = [];

  // Helper to build hreflang alternates object for sitemap
  const buildAlternates = (pathSuffix = '') => {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[l] = `${siteConfig.url}/${l}${pathSuffix ? `/${pathSuffix}` : ''}`;
    }
    languages['x-default'] = pathSuffix ? `${siteConfig.url}/en/${pathSuffix}` : `${siteConfig.url}/en`;
    return { languages };
  };

  // 1. Language homepages (6 languages).
  // The bare root "/" is a rewrite of "/en" whose canonical is "/en", so it is
  // intentionally NOT listed (sitemaps must only contain canonical URLs).
  for (const locale of locales) {
    entries.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: locale === 'en' ? 1.0 : 0.9,
      alternates: buildAlternates(),
    });
  }

  // 2. Template pages (12 templates x 6 languages = 72 pages)
  for (const { slug } of CANONICAL_TEMPLATE_SLUGS) {
    for (const locale of locales) {
      entries.push({
        url: `${siteConfig.url}/${locale}/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        // The CV maker is the core of the site; the printables are secondary.
        priority: slug === 'cv' ? 0.95 : 0.6,
        alternates: buildAlternates(slug),
      });
    }
  }

  // 3. Localized pricing pages (each one is its own canonical).
  // Only listed once Pro sales are open.
  for (const locale of PRO_ENABLED ? locales : []) {
    entries.push({
      url: `${siteConfig.url}/${locale}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: buildAlternates('pricing'),
    });
  }

  // 4. CV examples by job: French (33) and English (12). Pairs that exist in
  // both languages get hreflang alternates; the others stand alone.
  const hubAlternates = {
    languages: {
      fr: `${siteConfig.url}/fr/cv/exemples`,
      en: `${siteConfig.url}/en/cv/examples`,
      'x-default': `${siteConfig.url}/en/cv/examples`,
    },
  };
  for (const url of [`${siteConfig.url}/fr/cv/exemples`, `${siteConfig.url}/en/cv/examples`]) {
    entries.push({ url, lastModified: examplesUpdated, changeFrequency: 'weekly', priority: 0.8, alternates: hubAlternates });
  }
  const pairAlternates = (fr: string, en: string) => ({
    languages: {
      fr: `${siteConfig.url}/fr/cv/exemples/${fr}`,
      en: `${siteConfig.url}/en/cv/examples/${en}`,
      'x-default': `${siteConfig.url}/en/cv/examples/${en}`,
    },
  });
  for (const ex of CV_EXAMPLES_FR) {
    const en = enSlugForFr(ex.slug);
    entries.push({
      url: `${siteConfig.url}/fr/cv/exemples/${ex.slug}`,
      lastModified: en ? examplesUpdated : now,
      changeFrequency: 'monthly',
      priority: 0.75,
      ...(en ? { alternates: pairAlternates(ex.slug, en) } : {}),
    });
  }
  for (const ex of CV_EXAMPLES_EN) {
    entries.push({
      url: `${siteConfig.url}/en/cv/examples/${ex.slug}`,
      lastModified: examplesUpdated,
      changeFrequency: 'monthly',
      priority: 0.75,
      ...(ex.fr ? { alternates: pairAlternates(ex.fr, ex.slug) } : {}),
    });
  }

  // 4b. Cover letter hub and examples (French only)
  entries.push({ url: `${siteConfig.url}/fr/cv/lettre-de-motivation`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 });
  for (const ex of LETTER_EXAMPLES_FR) {
    entries.push({ url: `${siteConfig.url}/fr/cv/lettre-de-motivation/${ex.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 });
  }

  // 5. CV guides (French only)
  entries.push({
    url: `${siteConfig.url}/fr/cv/conseils`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  });
  for (const g of CV_GUIDES_FR) {
    entries.push({
      url: `${siteConfig.url}/fr/cv/conseils/${g.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
