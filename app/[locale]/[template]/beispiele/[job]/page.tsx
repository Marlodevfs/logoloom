import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CvSheet } from '@/components/home/LiveCvHero';
import { CV_EXAMPLES_DE, exampleH1De as exampleH1, exampleLabelDe as exampleLabel, getCvExampleDe as getCvExample } from '@/lib/cv-examples/de';
import { cvKit } from '@/lib/cv-examples/kit';
import { exampleLanguages } from '@/lib/cv-examples/alternates';

interface Props {
  params: Promise<{ locale: string; template: string; job: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CV_EXAMPLES_DE.map((e) => ({ locale: 'de', template: 'cv', job: e.slug }));
}

function resolve(locale: string, template: string, job: string) {
  if (locale !== 'de' || template !== 'cv') return undefined;
  return getCvExample(job);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) return {};
  const url = `${siteConfig.url}/de/cv/beispiele/${ex.slug}`;
  const languages = exampleLanguages('de', ex.slug);
  const og = `${siteConfig.url}/api/og?title=${encodeURIComponent(exampleH1(ex))}`;
  return {
    title: ex.metaTitle,
    description: ex.metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: ex.metaTitle,
      description: ex.metaDescription,
      url,
      siteName: siteConfig.name,
      type: 'article',
      locale: 'de_DE',
      images: [{ url: og, width: 1200, height: 630, alt: ex.metaTitle }],
    },
    twitter: { card: 'summary_large_image', title: ex.metaTitle, description: ex.metaDescription, images: [og] },
  };
}

export default async function CvExamplePageDe({ params }: Props) {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) notFound();

  const startHref = `/de/cv?beispiel=${ex.slug}`;
  const others = CV_EXAMPLES_DE.filter((e) => e.slug !== ex.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'LogoLoom', item: `${siteConfig.url}/de` },
        { '@type': 'ListItem', position: 2, name: 'Lebenslauf erstellen', item: `${siteConfig.url}/de/cv` },
        { '@type': 'ListItem', position: 3, name: 'Lebenslauf-Beispiele', item: `${siteConfig.url}/de/cv/beispiele` },
        { '@type': 'ListItem', position: 4, name: ex.job, item: `${siteConfig.url}/de/cv/beispiele/${ex.slug}` },
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
      <HomeHeader lang="de" />

      <main>
        {/* Hero: the example itself */}
        <section className="bg-slate-100 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-14 sm:pb-20">
            <nav aria-label="Brotkrumen" className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/de/cv" className="hover:text-slate-900 dark:hover:text-white">Lebenslauf erstellen</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/de/cv/beispiele" className="hover:text-slate-900 dark:hover:text-white">Lebenslauf-Beispiele</Link>
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
                    Mit diesem Muster starten
                  </Link>
                  <Link
                    href="/de/cv"
                    className="h-12 px-5 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-white dark:hover:bg-slate-800"
                  >
                    Leeren Lebenslauf beginnen
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Kostenlos, ohne Anmeldung. Ersetzen Sie die Angaben durch Ihre eigenen und laden Sie das PDF herunter.
                </p>
              </div>

              <figure>
                <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_16px_40px_-16px_rgba(27,29,33,0.3)] bg-white">
                  <CvSheet kit={cvKit(ex.cv, ex.color, 'de')} />
                </div>
                <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Erfundene Person und Firmen. Alle Angaben lassen sich im Editor ändern.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-16">
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Darauf kommt es an</h2>
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
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Kurzprofile zum Anpassen</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Das Kurzprofil sind die zwei, drei Sätze unter Ihrem Namen. Lassen Sie sich inspirieren und schreiben Sie dann Ihr eigenes.</p>
            <div className="mt-6 space-y-4">
              {ex.summaries.map((s) => (
                <blockquote key={s} className="border-l-4 border-ink-600 pl-5 py-1 font-display text-xl leading-relaxed text-slate-800 dark:text-slate-100">
                  {s}
                </blockquote>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Schlüsselwörter, auf die Personaler achten</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Verwenden Sie die, die wirklich auf Sie zutreffen, bei Kenntnissen und Aufgaben. Bewerbermanagementsysteme suchen danach.
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
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Häufige Fragen</h2>
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
            <h2 className="font-display text-3xl font-semibold">Ihr Lebenslauf in zehn Minuten</h2>
            <p className="mt-3 text-slate-300 max-w-[50ch]">
              Das Muster öffnet sich im Editor. Ändern Sie Name, Stationen und Farbe, setzen Sie Ihre Unterschrift und laden Sie das PDF herunter.
            </p>
            <Link
              href={startHref}
              className="mt-6 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold"
            >
              Mit diesem Muster starten
            </Link>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Weitere Lebenslauf-Beispiele</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-slate-200 dark:border-slate-800">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-slate-200 dark:border-slate-800">
                  <Link href={`/de/cv/beispiele/${o.slug}`} className="flex items-center justify-between py-3.5 font-bold text-slate-800 dark:text-slate-100 hover:text-ink-700 dark:hover:text-ink-300">
                    {exampleLabel(o)}
                    <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>

      <SiteFooter lang="de" />
    </div>
  );
}
