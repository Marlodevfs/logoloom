import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { CANONICAL_TEMPLATE_SLUGS } from '@/lib/seo/templates-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
        priority: 0.85,
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

  // 4. Legal pages
  for (const locale of locales) {
    for (const page of ['legal', 'privacy']) {
      entries.push({
        url: `${siteConfig.url}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.2,
      });
    }
  }

  return entries;
}
