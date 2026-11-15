import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CvSheet } from '@/components/home/LiveCvHero';
import { CV_EXAMPLES_DE, exampleH1De as exampleH1, exampleLabelDe as exampleLabel } from '@/lib/cv-examples/de';
import { cvKit } from '@/lib/cv-examples/kit';
import { HUB_LANGUAGES } from '@/lib/cv-examples/alternates';

interface Props {
  params: Promise<{ locale: string; template: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'de', template: 'cv' }];
}

const TITLE = 'Lebenslauf-Beispiele nach Beruf – Muster kostenlos als PDF | LogoLoom';
const DESCRIPTION =
  `Kostenlose Lebenslauf-Muster für ${CV_EXAMPLES_DE.length} Berufe: Verkäufer, Pflegehelfer, Lagerist, Büromanagement, Ausbildung, Werkstudent, Schweiz und mehr. Muster wählen, anpassen, als PDF herunterladen, ohne Anmeldung.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template } = await params;
  if (locale !== 'de' || template !== 'cv') return {};
  const url = `${siteConfig.url}/de/cv/beispiele`;
  return {
    title: TITLE,
    description: DESCRIPTION,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: HUB_LANGUAGES,
    },
    openGraph: { title: TITLE, description: DESCRIPTION, url, siteName: siteConfig.name, type: 'website', locale: 'de_DE' },
  };
}

export default async function CvExamplesHubDe({ params }: Props) {
  const { locale, template } = await params;
  if (locale !== 'de' || template !== 'cv') notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: CV_EXAMPLES_DE.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: exampleH1(e),
      url: `${siteConfig.url}/de/cv/beispiele/${e.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHeader lang="de" />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-20">
        <nav aria-label="Brotkrumen" className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/de/cv" className="hover:text-slate-900 dark:hover:text-white">Lebenslauf erstellen</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-slate-700 dark:text-slate-200">Lebenslauf-Beispiele</span>
        </nav>

        <h1 className="mt-8 font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white max-w-[18ch]">
          Lebenslauf-Beispiele nach Beruf
        </h1>
        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[56ch]">
          Wählen Sie den Beruf, der Ihrem am nächsten kommt. Das Muster öffnet sich im Editor: Angaben ersetzen, unterschreiben, PDF herunterladen. Tabellarisch, antichronologisch, mit Ort, Datum und Unterschrift, so wie Personaler in Deutschland, Österreich und der Schweiz es erwarten.
        </p>

        <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {CV_EXAMPLES_DE.map((e) => (
            <li key={e.slug}>
              <Link href={`/de/cv/beispiele/${e.slug}`} className="group block">
                <span className="block bg-white shadow-[0_1px_2px_rgba(27,29,33,0.08),0_10px_24px_-14px_rgba(27,29,33,0.3)] transition-transform group-hover:-translate-y-0.5">
                  <CvSheet kit={cvKit(e.cv, e.color, 'de')} />
                </span>
                <span className="mt-3 block font-bold text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-300">
                  {exampleLabel(e)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-slate-600 dark:text-slate-300">
          Ihr Beruf ist nicht dabei?{' '}
          <Link href="/de/cv" className="font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4">
            Mit der Grundvorlage starten
          </Link>
          , sie passt für jeden Beruf.
        </p>
      </main>

      <SiteFooter lang="de" />
    </div>
  );
}
