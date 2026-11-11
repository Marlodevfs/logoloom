import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CV_GUIDES_FR } from '@/lib/cv-guides/fr';

interface Props {
  params: Promise<{ locale: string; template: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'fr', template: 'cv' }];
}

const TITLE = 'Conseils pour faire un bon CV – LogoLoom';
const DESCRIPTION =
  'Guides pratiques pour réussir votre CV : méthode, accroche, titre, compétences. Avec des exemples concrets, puis un créateur de CV gratuit, sans compte.';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template } = await params;
  if (locale !== 'fr' || template !== 'cv') return {};
  const url = `${siteConfig.url}/fr/cv/conseils`;
  return {
    title: TITLE,
    description: DESCRIPTION,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: { title: TITLE, description: DESCRIPTION, url, siteName: siteConfig.name, type: 'website', locale: 'fr_FR' },
  };
}

export default async function CvGuidesHub({ params }: Props) {
  const { locale, template } = await params;
  if (locale !== 'fr' || template !== 'cv') notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: CV_GUIDES_FR.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.h1,
      url: `${siteConfig.url}/fr/cv/conseils/${g.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHeader lang="fr" />

      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-8 pb-20">
        <nav aria-label="Fil d’Ariane" className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/fr/cv" className="hover:text-slate-900 dark:hover:text-white">Créer un CV</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-slate-700 dark:text-slate-200">Conseils CV</span>
        </nav>
        <h1 className="mt-8 font-display text-4xl sm:text-5xl leading-[1.08] font-semibold">Conseils pour faire un bon CV</h1>
        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Des guides courts et concrets, avec des exemples à reprendre. Quand vous êtes prêt, créez votre CV gratuitement et téléchargez-le en PDF.
        </p>

        <ul className="mt-10 border-t border-slate-200 dark:border-slate-800">
          {CV_GUIDES_FR.map((g) => (
            <li key={g.slug} className="border-b border-slate-200 dark:border-slate-800">
              <Link href={`/fr/cv/conseils/${g.slug}`} className="group flex items-start justify-between gap-6 py-6">
                <span>
                  <span className="block font-display text-2xl font-semibold text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-300">
                    {g.h1}
                  </span>
                  <span className="mt-2 block text-slate-600 dark:text-slate-300 leading-relaxed">{g.metaDescription}</span>
                </span>
                <ChevronRight className="w-5 h-5 mt-2 shrink-0 text-slate-400" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <Link href="/fr/cv" className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold">
            Créer mon CV gratuitement
          </Link>
          <Link
            href="/fr/cv/exemples"
            className="h-12 px-5 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Voir les exemples de CV
          </Link>
        </div>
      </main>

      <SiteFooter lang="fr" />
    </div>
  );
}
