import { CATEGORY_COPY, catalogRank, categoryOf } from '@/lib/catalog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { InterfaceLang } from '@/types';
import { LOCALES_METADATA, getHreflangAlternates } from '@/lib/i18n/meta';
import {
  CANONICAL_TEMPLATE_SLUGS,
  TEMPLATE_SLUGS,
  TEMPLATES_SEO_DATA,
} from '@/lib/seo/templates-metadata';
import { Studio } from '@/components/Studio';
import { CvStudio } from '@/components/cv/CvStudio';
import { CV_EXAMPLES_FR, exampleLabel } from '@/lib/cv-examples/fr';
import { SiteFooter } from '@/components/SiteFooter';
import { getSiteChrome } from '@/lib/i18n/site-chrome';

interface Props {
  params: Promise<{ locale: string; template: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; template: string }[] = [];
  for (const locale of siteConfig.locales) {
    for (const { slug } of CANONICAL_TEMPLATE_SLUGS) {
      params.push({ locale, template: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template: slug } = await params;
  const lang = (siteConfig.locales.includes(locale as any) ? locale : 'en') as InterfaceLang;
  const templateId = TEMPLATE_SLUGS[slug];

  if (!templateId) {
    return {};
  }

  const langData = TEMPLATES_SEO_DATA[lang] || TEMPLATES_SEO_DATA.en;
  const data = langData[slug] || TEMPLATES_SEO_DATA.en[slug];

  if (!data) {
    return {};
  }

  const otherLocales = siteConfig.locales
    .filter((l) => l !== lang)
    .map((l) => LOCALES_METADATA[l]?.ogLocale || 'en_US');

  const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(data.title)}`;
  const canonicalUrl = `${siteConfig.url}/${lang}/${slug}`;

  return {
    title: data.title,
    description: data.description,
    authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates(slug),
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      locale: LOCALES_METADATA[lang]?.ogLocale || 'en_US',
      alternateLocale: otherLocales,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
    },
  };
}

export default async function TemplateLandingPage({ params }: Props) {
  const { locale, template: slug } = await params;

  if (!siteConfig.locales.includes(locale as any)) {
    notFound();
  }

  const lang = locale as InterfaceLang;
  const templateId = TEMPLATE_SLUGS[slug];

  if (!templateId) {
    notFound();
  }

  const langData = TEMPLATES_SEO_DATA[lang] || TEMPLATES_SEO_DATA.en;
  const data = langData[slug] || TEMPLATES_SEO_DATA.en[slug];

  if (!data) {
    notFound();
  }

  // Schema.org FAQPage data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const isCv = data.templateId === 'cv';
  // The CV page is the product itself: describe it as an app for search engines.
  const appSchema = isCv
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: `${siteConfig.name} – ${data.h1}`,
        url: `${siteConfig.url}/${lang}/${slug}`,
        description: data.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Any',
        inLanguage: lang,
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: lang === 'en' ? 'USD' : 'EUR' },
      }
    : null;
  const CV_HOWTO: Record<string, string> = {
    fr: 'Comment faire son CV en trois étapes',
    en: 'How to make your CV in three steps',
    de: 'So erstellen Sie Ihren Lebenslauf in drei Schritten',
    es: 'Cómo hacer tu currículum en tres pasos',
    it: 'Come fare il tuo CV in tre passaggi',
    pt: 'Como fazer o seu CV em três passos',
  };

  const otherTemplates = CANONICAL_TEMPLATE_SLUGS.filter((t) => t.slug !== slug).sort(
    (a, b) => catalogRank(a.templateId) - catalogRank(b.templateId)
  );
  const categoryCopy = CATEGORY_COPY[lang as InterfaceLang] || CATEGORY_COPY.en;
  const chrome = getSiteChrome(lang);
  const templateName = chrome.templateNames[data.templateId] || slug.replace(/-/g, ' ');

  const intro = (
    <>
      {/* Breadcrumb + hero intro, below the app header. Compact on mobile. */}
      <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-4 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-2 sm:space-y-3">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <Link href={`/${lang}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              LogoLoom
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span className="text-slate-700 dark:text-slate-200 font-bold" aria-current="page">
              {templateName}
            </span>
            <span className="hidden sm:inline-flex ml-2 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200/60 dark:border-emerald-800/40 text-[11px]">
              {chrome.freeVectorPdf} • {chrome.paperSizes}
            </span>
          </nav>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl">
            {data.h1}
          </h1>

          <p className="hidden sm:block text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {data.intro}
          </p>

          <div className="hidden sm:flex pt-2 flex-wrap gap-2 sm:gap-3">
            {data.features.map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{feature}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <noscript>
        <div className="max-w-5xl mx-auto px-4 py-3 my-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs">
          <p className="font-bold">{chrome.noscriptTitle}</p>
          <p className="mt-1">{chrome.noscriptBody}</p>
        </div>
      </noscript>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {appSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      )}

      {/* Main Interactive Editor Studio (Pre-initialized with this specific template!) */}
      <main className="flex-1 w-full">
        {data.templateId === 'cv' ? (
          <CvStudio initialLang={lang} title={data.h1} />
        ) : (
          <Studio initialLang={lang} initialTemplate={data.templateId} intro={intro} />
        )}

        {/* Detailed Crawlable Content: How it works & FAQ */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
          {/* How to use this template */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                {isCv ? CV_HOWTO[lang] || CV_HOWTO.en : chrome.howToTitle(templateName)}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-2xs"
                >
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {chrome.step(sIdx + 1)}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                {chrome.templateFaqTitle}
              </h2>
            </div>

            <div className="space-y-3.5">
              {data.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-2xs"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {isCv && lang === 'fr' && (
            <section className="space-y-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                  Exemples de CV par métier
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Partez d’un CV déjà rempli pour votre métier, puis remplacez les informations par les vôtres.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-slate-200 dark:border-slate-800">
                {CV_EXAMPLES_FR.map((e) => (
                  <li key={e.slug} className="border-b border-slate-200 dark:border-slate-800">
                    <Link href={`/fr/cv/exemples/${e.slug}`} className="flex items-center justify-between py-3 font-bold text-slate-800 dark:text-slate-100 hover:text-ink-700">
                      {exampleLabel(e)}
                      <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Internal Links to Other Templates */}
          <section className="space-y-6 border-t border-slate-200/80 dark:border-slate-800 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                  {chrome.exploreTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {chrome.exploreSubtitle}
                </p>
              </div>
              <Link
                href={`/${lang}`}
                className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>{chrome.viewAll}</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherTemplates.map((item) => {
                const itemData = langData[item.slug] || TEMPLATES_SEO_DATA.en[item.slug];
                return (
                  <Link
                    key={item.slug}
                    href={`/${lang}/${item.slug}`}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between group shadow-2xs"
                  >
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {categoryCopy[categoryOf(item.templateId)].name}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mt-1">
                        {chrome.templateNames[item.templateId]}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center space-x-0.5 mt-3">
                      <span>{chrome.viewCustomize}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter lang={lang} withStickyBar />
    </div>
  );
}
