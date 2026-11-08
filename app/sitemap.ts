import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales = siteConfig.locales;

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  for (const locale of locales) {
    entries.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === 'en' ? 0.9 : 0.8,
    });
  }

  return entries;
}
