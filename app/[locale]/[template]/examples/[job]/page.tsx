import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CvSheet } from '@/components/home/LiveCvHero';
import { CV_EXAMPLES_EN, exampleH1En as exampleH1, exampleLabelEn as exampleLabel, getCvExampleEn as getCvExample } from '@/lib/cv-examples/en';
import { cvKit } from '@/lib/cv-examples/kit';

interface Props {
  params: Promise<{ locale: string; template: string; job: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CV_EXAMPLES_EN.map((e) => ({ locale: 'en', template: 'cv', job: e.slug }));
}

function resolve(locale: string, template: string, job: string) {
  if (locale !== 'en' || template !== 'cv') return undefined;
  return getCvExample(job);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) return {};
  const url = `${siteConfig.url}/en/cv/examples/${ex.slug}`;
  const og = `${siteConfig.url}/api/og?title=${encodeURIComponent(exampleH1(ex))}`;
  return {
    title: ex.metaTitle,
    description: ex.metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      ...(ex.fr
        ? { languages: { en: url, fr: `${siteConfig.url}/fr/cv/exemples/${ex.fr}`, 'x-default': url } }
        : {}),
    },
    openGraph: {
      title: ex.metaTitle,
      description: ex.metaDescription,
      url,
      siteName: siteConfig.name,
      type: 'article',
      locale: 'en_GB',
      images: [{ url: og, width: 1200, height: 630, alt: ex.metaTitle }],
    },
    twitter: { card: 'summary_large_image', title: ex.metaTitle, description: ex.metaDescription, images: [og] },
  };
}

export default async function CvExamplePageEn({ params }: Props) {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) notFound();

  const startHref = `/en/cv?example=${ex.slug}`;
  const others = CV_EXAMPLES_EN.filter((e) => e.slug !== ex.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'LogoLoom', item: `${siteConfig.url}/en` },
        { '@type': 'ListItem', position: 2, name: 'CV maker', item: `${siteConfig.url}/en/cv` },
        { '@type': 'ListItem', position: 3, name: 'CV examples', item: `${siteConfig.url}/en/cv/examples` },
        { '@type': 'ListItem', position: 4, name: ex.job, item: `${siteConfig.url}/en/cv/examples/${ex.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ex.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHeader lang="en" />

      <main>
        {/* Hero: the example itself */}
        <section className="bg-slate-100 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-14 sm:pb-20">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/en/cv" className="hover:text-slate-900 dark:hover:text-white">CV maker</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/en/cv/examples" className="hover:text-slate-900 dark:hover:text-white">CV examples</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span aria-current="page" className="text-slate-700 dark:text-slate-200">{ex.short}</span>
            </nav>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start">
              <div className="lg:pt-6">
                <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white [text-wrap:balance] [hyphens:manual]">
                  {exampleH1(ex)}
                </h1>
                <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[52ch]">{ex.intro}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={startHref}
                    className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold"
                  >
                    Start from this example
                  </Link>
                  <Link
                    href="/en/cv"
                    className="h-12 px-5 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-white dark:hover:bg-slate-800"
                  >
                    Start from scratch
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Free, no account. Replace the details with your own, then download the PDF.
                </p>
              </div>

              <figure>
                <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_16px_40px_-16px_rgba(27,29,33,0.3)] bg-white">
                  <CvSheet kit={cvKit(ex.cv, ex.color, 'en')} />
                </div>
                <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Fictional person and companies. Every detail can be edited in the editor.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-16">
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">What makes the difference</h2>
            <dl className="mt-6 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
              {ex.tips.map((t) => (
                <div key={t.title} className="py-5 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-bold text-slate-900 dark:text-white">{t.title}</dt>
                  <dd className="mt-1 sm:mt-0 text-slate-600 dark:text-slate-300 leading-relaxed">{t.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Profile examples to adapt</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Your profile is the two or three sentences under your name. Use these for inspiration, then write your own.</p>
            <div className="mt-6 space-y-4">
              {ex.summaries.map((s) => (
                <blockquote key={s} className="border-l-4 border-ink-600 pl-5 py-1 font-display text-xl leading-relaxed text-slate-800 dark:text-slate-100">
                  {s}
                </blockquote>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Keywords recruiters look for</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Use the ones that are genuinely true for you, in your skills and duties. Applicant tracking systems scan for them.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {ex.keywords.map((k) => (
                <li key={k} className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-[15px] text-slate-700 dark:text-slate-200">
                  {k}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Frequently asked questions</h2>
            <div className="mt-6 border-t border-slate-200 dark:border-slate-800">
              {ex.faq.map((f) => (
                <details key={f.q} className="group border-b border-slate-200 dark:border-slate-800">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-bold text-slate-900 dark:text-white">
                    {f.q}
                    <Plus className="w-5 h-5 shrink-0 text-slate-400 transition-transform group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="pb-5 -mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-slate-900 dark:bg-slate-800 text-white p-8 sm:p-10">
            <h2 className="font-display text-3xl font-semibold">Your CV ready in ten minutes</h2>
            <p className="mt-3 text-slate-300 max-w-[50ch]">
              The example opens in the editor. Change the name, experience and colour, then download the PDF.
            </p>
            <Link
              href={startHref}
              className="mt-6 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold"
            >
              Start from this example
            </Link>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">More CV examples</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-slate-200 dark:border-slate-800">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-slate-200 dark:border-slate-800">
                  <Link href={`/en/cv/examples/${o.slug}`} className="flex items-center justify-between py-3.5 font-bold text-slate-800 dark:text-slate-100 hover:text-ink-700 dark:hover:text-ink-300">
                    {exampleLabel(o)}
                    <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
