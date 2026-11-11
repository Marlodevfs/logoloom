import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { CANONICAL_TEMPLATE_SLUGS } from '@/lib/seo/templates-metadata';
import { CV_EXAMPLES_FR } from '@/lib/cv-examples/fr';
import { CV_GUIDES_FR } from '@/lib/cv-guides/fr';

export default function sitemap(): MetadataRoute.Sitemap {
  // Fixed date of the last real content update: a date that changes on every
  // crawl tells search engines nothing. Bump it when pages actually change.
  const now = new Date('2026-11-11');
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

  // 3. Localized pricing pages (each one is its own canonical)
  for (const locale of locales) {
    entries.push({
      url: `${siteConfig.url}/${locale}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: buildAlternates('pricing'),
    });
  }

  // 4. CV examples by job (French only for now, so no hreflang alternates)
  entries.push({
    url: `${siteConfig.url}/fr/cv/exemples`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  });
  for (const ex of CV_EXAMPLES_FR) {
    entries.push({
      url: `${siteConfig.url}/fr/cv/exemples/${ex.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
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
