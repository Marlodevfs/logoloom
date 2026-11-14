import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LetterSheet } from '@/components/templates/LetterTemplate';
import { LETTER_EXAMPLES_FR, getLetterExample } from '@/lib/letter-examples/fr';
import { getCvExample } from '@/lib/cv-examples/fr';
import { letterKit, PLACEHOLDER_CV_FR } from '@/lib/cv-examples/kit';
import { letterParagraphs } from '@/lib/i18n/letter-data';

interface Props {
  params: Promise<{ locale: string; template: string; job: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LETTER_EXAMPLES_FR.map((e) => ({ locale: 'fr', template: 'cv', job: e.slug }));
}

function resolve(locale: string, template: string, job: string) {
  if (locale !== 'fr' || template !== 'cv') return undefined;
  return getLetterExample(job);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) return {};
  const url = `${siteConfig.url}/fr/cv/lettre-de-motivation/${ex.slug}`;
  const og = `${siteConfig.url}/api/og?title=${encodeURIComponent(ex.h1)}`;
  return {
    title: ex.metaTitle,
    description: ex.metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: ex.metaTitle,
      description: ex.metaDescription,
      url,
      siteName: siteConfig.name,
      type: 'article',
      locale: 'fr_FR',
      images: [{ url: og, width: 1200, height: 630, alt: ex.metaTitle }],
    },
    twitter: { card: 'summary_large_image', title: ex.metaTitle, description: ex.metaDescription, images: [og] },
  };
}

export default async function LetterExamplePage({ params }: Props) {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) notFound();

  const cvEx = ex.cvSlug ? getCvExample(ex.cvSlug) : undefined;
  const cv = cvEx?.cv || PLACEHOLDER_CV_FR;
  const startHref = `/fr/cv?lettre=${ex.slug}`;
  const others = LETTER_EXAMPLES_FR.filter((e) => e.slug !== ex.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'LogoLoom', item: `${siteConfig.url}/fr` },
        { '@type': 'ListItem', position: 2, name: 'Créer un CV', item: `${siteConfig.url}/fr/cv` },
        { '@type': 'ListItem', position: 3, name: 'Lettre de motivation', item: `${siteConfig.url}/fr/cv/lettre-de-motivation` },
        { '@type': 'ListItem', position: 4, name: ex.job, item: `${siteConfig.url}/fr/cv/lettre-de-motivation/${ex.slug}` },
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
      <HomeHeader lang="fr" />

      <main>
        <section className="bg-slate-100 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-14 sm:pb-20">
            <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/fr/cv" className="hover:text-slate-900 dark:hover:text-white">Créer un CV</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/fr/cv/lettre-de-motivation" className="hover:text-slate-900 dark:hover:text-white">Lettre de motivation</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span aria-current="page" className="text-slate-700 dark:text-slate-200">{ex.short}</span>
            </nav>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start">
              <div className="lg:pt-6">
                <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white [text-wrap:balance] [hyphens:manual]">
                  {ex.h1}
                </h1>
                <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[52ch]">{ex.intro}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={startHref}
                    className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold"
                  >
                    Partir de cet exemple
                  </Link>
                  {cvEx && (
                    <Link
                      href={`/fr/cv/exemples/${cvEx.slug}`}
                      className="h-12 px-5 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-white dark:hover:bg-slate-800"
                    >
                      Voir le CV assorti
                    </Link>
                  )}
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  {cvEx
                    ? 'Gratuit, sans compte. La lettre et le CV assorti s’ouvrent ensemble dans l’éditeur.'
                    : 'Gratuit, sans compte. La lettre s’ouvre à côté de votre CV, avec vos coordonnées.'}
                </p>
              </div>

              <figure>
                <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_16px_40px_-16px_rgba(27,29,33,0.3)] bg-white">
                  <LetterSheet kit={letterKit(cv, ex.letter, ex.color)} />
                </div>
                <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Personne, entreprise et adresses fictives. Tout se modifie dans l’éditeur.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-16">
          {/* The letter as plain text: readable by search engines and easy to copy. */}
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Le texte de la lettre</h2>
            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4 text-slate-700 dark:text-slate-200 leading-relaxed">
              <p className="font-bold">Objet : {ex.letter.subject}</p>
              <p>{ex.letter.salutation}</p>
              {letterParagraphs(ex.letter.body).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <p>{ex.letter.closing}</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Ce qui fait la différence</h2>
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
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Questions fréquentes</h2>
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
            <h2 className="font-display text-3xl font-semibold">Votre lettre prête en dix minutes</h2>
            <p className="mt-3 text-slate-300 max-w-[50ch]">
              L’exemple s’ouvre dans l’éditeur. Remplacez le nom, l’entreprise et vos expériences, puis téléchargez le PDF.
            </p>
            <Link
              href={startHref}
              className="mt-6 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold"
            >
              Partir de cet exemple
            </Link>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Autres exemples de lettres</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-slate-200 dark:border-slate-800">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-slate-200 dark:border-slate-800">
                  <Link
                    href={`/fr/cv/lettre-de-motivation/${o.slug}`}
                    className="flex items-center justify-between py-3.5 font-bold text-slate-800 dark:text-slate-100 hover:text-ink-700 dark:hover:text-ink-300"
                  >
                    {o.short}
                    <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter lang="fr" />
    </div>
  );
}
