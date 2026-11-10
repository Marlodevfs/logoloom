import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CvSheet } from '@/components/home/LiveCvHero';
import { CV_EXAMPLES_FR, exampleH1, exampleLabel } from '@/lib/cv-examples/fr';
import { cvKit } from '@/lib/cv-examples/kit';

interface Props {
  params: Promise<{ locale: string; template: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'fr', template: 'cv' }];
}

const TITLE = 'Exemples de CV par métier, gratuits en PDF – LogoLoom';
const DESCRIPTION =
  'Exemples de CV pour 13 métiers et situations : vendeur, caissier, aide-soignant, serveur, comptable, frontalier en Suisse, étudiant… Choisissez-en un, modifiez-le et téléchargez le PDF gratuitement, sans compte.';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template } = await params;
  if (locale !== 'fr' || template !== 'cv') return {};
  const url = `${siteConfig.url}/fr/cv/exemples`;
  return {
    title: TITLE,
    description: DESCRIPTION,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: { title: TITLE, description: DESCRIPTION, url, siteName: siteConfig.name, type: 'website', locale: 'fr_FR' },
  };
}

export default async function CvExamplesHub({ params }: Props) {
  const { locale, template } = await params;
  if (locale !== 'fr' || template !== 'cv') notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: CV_EXAMPLES_FR.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: exampleH1(e),
      url: `${siteConfig.url}/fr/cv/exemples/${e.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHeader lang="fr" />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-20">
        <nav aria-label="Fil d’Ariane" className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/fr/cv" className="hover:text-slate-900 dark:hover:text-white">Créer un CV</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-slate-700 dark:text-slate-200">Exemples de CV</span>
        </nav>

        <h1 className="mt-8 font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white max-w-[18ch]">
          Exemples de CV par métier
        </h1>
        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[56ch]">
          Choisissez le métier le plus proche du vôtre. L’exemple s’ouvre dans l’éditeur : vous remplacez les informations par les vôtres et vous téléchargez le PDF.
        </p>

        <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {CV_EXAMPLES_FR.map((e) => (
            <li key={e.slug}>
              <Link href={`/fr/cv/exemples/${e.slug}`} className="group block">
                <span className="block bg-white shadow-[0_1px_2px_rgba(27,29,33,0.08),0_10px_24px_-14px_rgba(27,29,33,0.3)] transition-transform group-hover:-translate-y-0.5">
                  <CvSheet kit={cvKit(e.cv, e.color)} />
                </span>
                <span className="mt-3 block font-bold text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-300">
                  {exampleLabel(e)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-slate-600 dark:text-slate-300">
          Votre métier n’est pas dans la liste ?{' '}
          <Link href="/fr/cv" className="font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4">
            Partez du modèle de base
          </Link>
          , il convient à tous les postes.
        </p>
      </main>

      <SiteFooter lang="fr" />
    </div>
  );
}
