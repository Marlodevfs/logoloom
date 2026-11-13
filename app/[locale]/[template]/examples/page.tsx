import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CvSheet } from '@/components/home/LiveCvHero';
import { CV_EXAMPLES_EN, exampleH1En as exampleH1, exampleLabelEn as exampleLabel } from '@/lib/cv-examples/en';
import { cvKit } from '@/lib/cv-examples/kit';

interface Props {
  params: Promise<{ locale: string; template: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en', template: 'cv' }];
}

const TITLE = 'CV Examples by Job – Free PDF Templates | LogoLoom';
const DESCRIPTION =
  `Free CV examples for ${CV_EXAMPLES_EN.length} jobs: sales assistant, healthcare assistant, care worker, warehouse operative, web developer, student and more. Pick one, edit it and download the PDF, no account needed.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template } = await params;
  if (locale !== 'en' || template !== 'cv') return {};
  const url = `${siteConfig.url}/en/cv/examples`;
  return {
    title: TITLE,
    description: DESCRIPTION,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: { en: url, fr: `${siteConfig.url}/fr/cv/exemples`, 'x-default': url },
    },
    openGraph: { title: TITLE, description: DESCRIPTION, url, siteName: siteConfig.name, type: 'website', locale: 'en_GB' },
  };
}

export default async function CvExamplesHubEn({ params }: Props) {
  const { locale, template } = await params;
  if (locale !== 'en' || template !== 'cv') notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: CV_EXAMPLES_EN.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: exampleH1(e),
      url: `${siteConfig.url}/en/cv/examples/${e.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHeader lang="en" />

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/en/cv" className="hover:text-slate-900 dark:hover:text-white">CV maker</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-slate-700 dark:text-slate-200">CV examples</span>
        </nav>

        <h1 className="mt-8 font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white max-w-[18ch]">
          CV examples by job
        </h1>
        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[56ch]">
          Pick the job closest to yours. The example opens in the editor: replace the details with your own and download the PDF.
        </p>

        <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {CV_EXAMPLES_EN.map((e) => (
            <li key={e.slug}>
              <Link href={`/en/cv/examples/${e.slug}`} className="group block">
                <span className="block bg-white shadow-[0_1px_2px_rgba(27,29,33,0.08),0_10px_24px_-14px_rgba(27,29,33,0.3)] transition-transform group-hover:-translate-y-0.5">
                  <CvSheet kit={cvKit(e.cv, e.color, 'en')} />
                </span>
                <span className="mt-3 block font-bold text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-300">
                  {exampleLabel(e)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-slate-600 dark:text-slate-300">
          Your job is not on the list?{' '}
          <Link href="/en/cv" className="font-bold text-ink-700 dark:text-ink-300 underline underline-offset-4">
            Start from the basic template
          </Link>
          , it works for any role.
        </p>
      </main>

      <SiteFooter lang="en" />
    </div>
  );
}
