import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Plus, Check, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CV_GUIDES_FR, getCvGuide } from '@/lib/cv-guides/fr';
import { exampleLabel, getCvExample } from '@/lib/cv-examples/fr';

interface Props {
  params: Promise<{ locale: string; template: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CV_GUIDES_FR.map((g) => ({ locale: 'fr', template: 'cv', slug: g.slug }));
}

function resolve(locale: string, template: string, slug: string) {
  if (locale !== 'fr' || template !== 'cv') return undefined;
  return getCvGuide(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template, slug } = await params;
  const g = resolve(locale, template, slug);
  if (!g) return {};
  const url = `${siteConfig.url}/fr/cv/conseils/${g.slug}`;
  const og = `${siteConfig.url}/api/og?title=${encodeURIComponent(g.h1)}`;
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: g.metaTitle,
      description: g.metaDescription,
      url,
      siteName: siteConfig.name,
      type: 'article',
      locale: 'fr_FR',
      images: [{ url: og, width: 1200, height: 630, alt: g.h1 }],
    },
    twitter: { card: 'summary_large_image', title: g.metaTitle, description: g.metaDescription, images: [og] },
  };
}

export default async function CvGuidePage({ params }: Props) {
  const { locale, template, slug } = await params;
  const g = resolve(locale, template, slug);
  if (!g) notFound();

  const url = `${siteConfig.url}/fr/cv/conseils/${g.slug}`;
  const related = g.related.map(getCvExample).filter((e): e is NonNullable<typeof e> => Boolean(e));
  const otherGuides = CV_GUIDES_FR.filter((o) => o.slug !== g.slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.h1,
      description: g.metaDescription,
      inLanguage: 'fr',
      mainEntityOfPage: url,
      datePublished: '2026-11-11',
      dateModified: '2026-11-11',
      author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
      publisher: { '@id': `${siteConfig.url}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'LogoLoom', item: `${siteConfig.url}/fr` },
        { '@type': 'ListItem', position: 2, name: 'Créer un CV', item: `${siteConfig.url}/fr/cv` },
        { '@type': 'ListItem', position: 3, name: 'Conseils CV', item: `${siteConfig.url}/fr/cv/conseils` },
        { '@type': 'ListItem', position: 4, name: g.label, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: g.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHeader lang="fr" />

      <main>
        <section className="bg-slate-100 dark:bg-slate-900">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-8 pb-12 sm:pb-16">
            <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/fr/cv" className="hover:text-slate-900 dark:hover:text-white">Créer un CV</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/fr/cv/conseils" className="hover:text-slate-900 dark:hover:text-white">Conseils CV</Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span aria-current="page" className="text-slate-700 dark:text-slate-200">{g.label}</span>
            </nav>
            <h1 className="mt-8 font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white [text-wrap:balance]">
              {g.h1}
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{g.intro}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/fr/cv" className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold">
                Créer mon CV gratuitement
              </Link>
              <Link
                href="/fr/cv/exemples"
                className="h-12 px-5 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-white dark:hover:bg-slate-800"
              >
                Voir les exemples de CV
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-16 space-y-14">
          {g.sections.map((s) => (
            <section key={s.h2}>
              <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">{s.h2}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-5 space-y-2.5">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      <Check className="w-5 h-5 mt-0.5 shrink-0 text-ink-600" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.examples && (
                <div className="mt-6 space-y-4">
                  {s.examples.map((e) => (
                    <blockquote key={e} className="border-l-4 border-ink-600 pl-5 py-1 font-display text-xl leading-relaxed text-slate-800 dark:text-slate-100">
                      {e}
                    </blockquote>
                  ))}
                </div>
              )}
              {s.avoid && (
                <ul className="mt-5 space-y-2.5">
                  {s.avoid.map((item) => (
                    <li key={item} className="flex gap-3 text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      <X className="w-5 h-5 mt-0.5 shrink-0 text-rose-600" aria-label="À éviter" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Questions fréquentes</h2>
            <div className="mt-6 border-t border-slate-200 dark:border-slate-800">
              {g.faq.map((f) => (
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
            <h2 className="font-display text-3xl font-semibold">Mettez-le en pratique</h2>
            <p className="mt-3 text-slate-300 max-w-[50ch]">
              Remplissez votre CV, choisissez une mise en page et téléchargez le PDF. Gratuit, sans compte, sans abonnement.
            </p>
            <Link href="/fr/cv" className="mt-6 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold">
              Créer mon CV
            </Link>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Exemples de CV pour s’inspirer</h2>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-slate-200 dark:border-slate-800">
                {related.map((o) => (
                  <li key={o.slug} className="border-b border-slate-200 dark:border-slate-800">
                    <Link href={`/fr/cv/exemples/${o.slug}`} className="flex items-center justify-between py-3.5 font-bold text-slate-800 dark:text-slate-100 hover:text-ink-700 dark:hover:text-ink-300">
                      {exampleLabel(o)}
                      <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Autres conseils</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-slate-200 dark:border-slate-800">
              {otherGuides.map((o) => (
                <li key={o.slug} className="border-b border-slate-200 dark:border-slate-800">
                  <Link href={`/fr/cv/conseils/${o.slug}`} className="flex items-center justify-between py-3.5 font-bold text-slate-800 dark:text-slate-100 hover:text-ink-700 dark:hover:text-ink-300">
                    {o.label}
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
