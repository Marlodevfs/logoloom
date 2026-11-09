import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, FileText, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { InterfaceLang } from '@/types';
import { LOCALES_METADATA, getHreflangAlternates } from '@/lib/i18n/meta';
import {
  CANONICAL_TEMPLATE_SLUGS,
  TEMPLATE_SLUGS,
  TEMPLATES_SEO_DATA,
} from '@/lib/seo/templates-metadata';
import { Studio } from '@/components/Studio';

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

  const otherTemplates = CANONICAL_TEMPLATE_SLUGS.filter((t) => t.slug !== slug);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Crawlable Header Banner & Breadcrumbs */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400">
            <Link href={`/${lang}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              LogoLoom
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 dark:text-slate-200 font-bold capitalize">
              {slug.replace(/-/g, ' ')}
            </span>
          </nav>

          {/* Quick badge */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200/60 dark:border-emerald-800/40">
              Free Vector PDF • 300 DPI
            </span>
            <span>A4 & US Letter</span>
          </div>
        </div>
      </header>

      {/* Semantic Top Content for Search Crawlers and First-time Visitors */}
      <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 text-[11px] text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Printable PDF Template</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {data.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {data.intro}
          </p>

          {/* Key printable features strip */}
          <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
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

      {/* Noscript Banner */}
      <noscript>
        <div className="max-w-5xl mx-auto px-4 py-3 my-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs">
          <p className="font-bold">JavaScript is disabled in your browser.</p>
          <p className="mt-1">
            LogoLoom provides free printable PDF planners and business templates. Enable JavaScript to customize colors, add an optional logo, and download print-ready vector PDFs directly in your browser.
          </p>
        </div>
      </noscript>

      {/* Main Interactive Editor Studio (Pre-initialized with this specific template!) */}
      <main className="flex-1 w-full">
        <Studio initialLang={lang} initialTemplate={data.templateId} />

        {/* Detailed Crawlable Content: How it works & FAQ */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
          {/* How to use this template */}
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                Simple 3-Step Guide
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                How to customize and print your {slug.replace(/-/g, ' ')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-2xs"
                >
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Step {sIdx + 1}
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
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Questions about printing and personalizing this template
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

          {/* Internal Links to Other Templates */}
          <section className="space-y-6 border-t border-slate-200/80 dark:border-slate-800 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Explore other free printable templates
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  All templates are 100% free, minimalist, and print-ready in A4 and US Letter.
                </p>
              </div>
              <Link
                href={`/${lang}`}
                className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>View all templates</span>
                <ArrowRight className="w-3 h-3" />
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
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {itemData?.category === 'business' ? 'Business' : 'Planner'}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mt-1 capitalize">
                        {item.slug.replace(/-/g, ' ')}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center space-x-0.5 mt-3">
                      <span>Customize</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
