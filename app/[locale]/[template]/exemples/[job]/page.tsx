import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CvSheet } from '@/components/home/LiveCvHero';
import { CV_EXAMPLES_FR, getCvExample } from '@/lib/cv-examples/fr';
import { cvKit } from '@/lib/cv-examples/kit';

interface Props {
  params: Promise<{ locale: string; template: string; job: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CV_EXAMPLES_FR.map((e) => ({ locale: 'fr', template: 'cv', job: e.slug }));
}

function resolve(locale: string, template: string, job: string) {
  if (locale !== 'fr' || template !== 'cv') return undefined;
  return getCvExample(job);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) return {};
  const url = `${siteConfig.url}/fr/cv/exemples/${ex.slug}`;
  const og = `${siteConfig.url}/api/og?title=${encodeURIComponent(`Exemple de CV ${ex.short.toLowerCase()}`)}`;
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

export default async function CvExamplePage({ params }: Props) {
  const { locale, template, job } = await params;
  const ex = resolve(locale, template, job);
  if (!ex) notFound();

  const startHref = `/fr/cv?exemple=${ex.slug}`;
  const others = CV_EXAMPLES_FR.filter((e) => e.slug !== ex.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'LogoLoom', item: `${siteConfig.url}/fr` },
        { '@type': 'ListItem', position: 2, name: 'Créer un CV', item: `${siteConfig.url}/fr/cv` },
        { '@type': 'ListItem', position: 3, name: 'Exemples de CV', item: `${siteConfig.url}/fr/cv/exemples` },
        { '@type': 'ListItem', position: 4, name: ex.job, item: `${siteConfig.url}/fr/cv/exemples/${ex.slug}` },
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
        {/* Hero: the example itself */}
        <section className="bg-slate-100 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-14 sm:pb-20">
            <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/fr/cv" className="hover:text-slate-900 dark:hover:text-white">Créer un CV</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/fr/cv/exemples" className="hover:text-slate-900 dark:hover:text-white">Exemples de CV</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span aria-current="page" className="text-slate-700 dark:text-slate-200">{ex.short}</span>
            </nav>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start">
              <div className="lg:pt-6">
                <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white [text-wrap:balance] [hyphens:manual]">
                  Exemple de CV {ex.job.toLowerCase().startsWith('étudiant') ? 'étudiant sans expérience' : ex.job.toLowerCase()}
                </h1>
                <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[52ch]">{ex.intro}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={startHref}
                    className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold"
                  >
                    Partir de cet exemple
                  </Link>
                  <Link
                    href="/fr/cv"
                    className="h-12 px-5 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-white dark:hover:bg-slate-800"
                  >
                    Commencer de zéro
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Gratuit, sans compte. Vous remplacez les informations par les vôtres, puis vous téléchargez le PDF.
                </p>
              </div>

              <figure>
                <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_16px_40px_-16px_rgba(27,29,33,0.3)] bg-white">
                  <CvSheet kit={cvKit(ex.cv, ex.color)} />
                </div>
                <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Personne et entreprises fictives. Toutes les informations se modifient dans l’éditeur.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-16">
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
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Exemples de profil à adapter</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Le profil, c’est les deux ou trois phrases sous votre nom. Inspirez-vous-en, puis écrivez le vôtre.</p>
            <div className="mt-6 space-y-4">
              {ex.summaries.map((s) => (
                <blockquote key={s} className="border-l-4 border-ink-600 pl-5 py-1 font-display text-xl leading-relaxed text-slate-800 dark:text-slate-100">
                  {s}
                </blockquote>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Mots-clés que les recruteurs cherchent</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Reprenez ceux qui vous correspondent vraiment, dans vos compétences et vos missions. Les logiciels de tri des candidatures les repèrent.
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
            <h2 className="font-display text-3xl font-semibold">Votre CV prêt en dix minutes</h2>
            <p className="mt-3 text-slate-300 max-w-[50ch]">
              L’exemple s’ouvre dans l’éditeur. Changez le nom, les expériences et la couleur, puis téléchargez le PDF.
            </p>
            <Link
              href={startHref}
              className="mt-6 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold"
            >
              Partir de cet exemple
            </Link>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Autres exemples de CV</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-slate-200 dark:border-slate-800">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-slate-200 dark:border-slate-800">
                  <Link href={`/fr/cv/exemples/${o.slug}`} className="flex items-center justify-between py-3.5 font-bold text-slate-800 dark:text-slate-100 hover:text-ink-700 dark:hover:text-ink-300">
                    CV {o.short.toLowerCase()}
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
