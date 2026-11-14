import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LetterSheet } from '@/components/templates/LetterTemplate';
import { LETTER_EXAMPLES_FR } from '@/lib/letter-examples/fr';
import { getCvExample } from '@/lib/cv-examples/fr';
import { letterKit, PLACEHOLDER_CV_FR } from '@/lib/cv-examples/kit';
import { getDefaultLetterContent } from '@/lib/i18n/letter-data';

interface Props {
  params: Promise<{ locale: string; template: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'fr', template: 'cv' }];
}

const TITLE = 'Lettre de motivation gratuite : modèle et exemples par métier (PDF) – LogoLoom';
const DESCRIPTION =
  'Écrivez votre lettre de motivation gratuitement : modèle prérempli, exemples pour vendeur, aide-soignante, alternance, job étudiant, candidature spontanée… Assortie à votre CV, en PDF, sans compte.';

const STEPS = [
  {
    title: '1. Pourquoi eux',
    body: 'Une ou deux phrases sur l’entreprise : un produit, un projet, une valeur. Le recruteur doit sentir que la lettre a été écrite pour lui, pas envoyée à cinquante entreprises.',
  },
  {
    title: '2. Ce que vous apportez',
    body: 'Votre expérience la plus utile pour ce poste, avec un fait précis : un chiffre, un résultat, une responsabilité. Un exemple concret vaut mieux que trois qualités.',
  },
  {
    title: '3. La suite',
    body: 'Vos disponibilités et une proposition simple : un entretien, un essai, un appel. Terminez par une formule de politesse adaptée au destinataire.',
  },
];

const MISTAKES = [
  'Recopier le CV phrase par phrase : la lettre doit expliquer, pas répéter.',
  'Commencer par « Je me permets de vous écrire… » : entrez directement dans le sujet.',
  'Une lettre générique : changez au moins le nom de l’entreprise, le poste et une phrase sur l’entreprise.',
  'Dépasser une page : trois paragraphes courts suffisent, le recruteur lit vite.',
  'Les fautes d’orthographe : relisez à voix haute, ou faites relire par quelqu’un.',
];

const FAQ = [
  {
    q: 'La lettre de motivation est-elle encore utile ?',
    a: 'Elle n’est pas toujours demandée, mais quand elle l’est, elle sert souvent à départager des CV proches. Une lettre courte et ciblée vous distingue des candidatures envoyées sans un mot.',
  },
  {
    q: 'Quelle longueur pour une lettre de motivation ?',
    a: 'Une page maximum, souvent une demi-page suffit : trois paragraphes courts, une formule d’appel et une formule de politesse.',
  },
  {
    q: 'Faut-il l’envoyer en PDF ou dans le corps du mail ?',
    a: 'Si vous postulez par email, écrivez un message court dans le mail et joignez la lettre en PDF avec le CV. Le PDF garde la mise en page sur tous les écrans.',
  },
  {
    q: 'La lettre de motivation est-elle vraiment gratuite ?',
    a: 'Oui. Vous l’écrivez dans le même outil que votre CV, vous téléchargez le PDF, sans compte et sans abonnement. Vos informations restent dans votre navigateur.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, template } = await params;
  if (locale !== 'fr' || template !== 'cv') return {};
  const url = `${siteConfig.url}/fr/cv/lettre-de-motivation`;
  const og = `${siteConfig.url}/api/og?title=${encodeURIComponent('Lettre de motivation gratuite')}`;
  return {
    title: TITLE,
    description: DESCRIPTION,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'fr_FR',
      images: [{ url: og, width: 1200, height: 630, alt: 'Lettre de motivation gratuite' }],
    },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [og] },
  };
}

export default async function LetterHub({ params }: Props) {
  const { locale, template } = await params;
  if (locale !== 'fr' || template !== 'cv') notFound();

  const heroKit = letterKit(PLACEHOLDER_CV_FR, getDefaultLetterContent('fr'), '#2340A8');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: LETTER_EXAMPLES_FR.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: e.h1,
        url: `${siteConfig.url}/fr/cv/lettre-de-motivation/${e.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
              <span aria-current="page" className="text-slate-700 dark:text-slate-200">Lettre de motivation</span>
            </nav>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start">
              <div className="lg:pt-6">
                <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] font-semibold text-slate-900 dark:text-white [text-wrap:balance]">
                  Lettre de motivation gratuite, assortie à votre CV
                </h1>
                <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[52ch]">
                  Un modèle déjà rédigé : vous remplacez les passages entre crochets par vos mots, votre nom et vos coordonnées viennent de votre CV, et vous téléchargez le PDF.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/fr/cv?lettre"
                    className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold"
                  >
                    Écrire ma lettre
                  </Link>
                  <a
                    href="#exemples"
                    className="h-12 px-5 inline-flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-white dark:hover:bg-slate-800"
                  >
                    Voir les exemples par métier
                  </a>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Gratuit, sans compte, sans abonnement. Rien n’est envoyé sur nos serveurs.</p>
              </div>

              <figure>
                <div className="shadow-[0_1px_2px_rgba(27,29,33,0.08),0_16px_40px_-16px_rgba(27,29,33,0.3)] bg-white">
                  <LetterSheet kit={heroKit} />
                </div>
                <figcaption className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Les passages surlignés sont à remplacer. Ils n’apparaissent pas surlignés dans le PDF.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-16">
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Une bonne lettre en trois paragraphes</h2>
            <dl className="mt-6 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
              {STEPS.map((s) => (
                <div key={s.title} className="py-5 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-bold text-slate-900 dark:text-white">{s.title}</dt>
                  <dd className="mt-1 sm:mt-0 text-slate-600 dark:text-slate-300 leading-relaxed">{s.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Les erreurs à éviter</h2>
            <ul className="mt-6 space-y-3 list-disc pl-5 text-slate-600 dark:text-slate-300 leading-relaxed">
              {MISTAKES.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>
        </div>

        <section id="exemples" className="bg-slate-100 dark:bg-slate-900 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">Exemples de lettres de motivation par métier</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-[56ch]">
              Chaque exemple s’ouvre dans l’éditeur avec le CV assorti. Remplacez les informations par les vôtres, puis téléchargez les deux PDF.
            </p>
            <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {LETTER_EXAMPLES_FR.map((e) => {
                const cv = (e.cvSlug && getCvExample(e.cvSlug)?.cv) || PLACEHOLDER_CV_FR;
                return (
                  <li key={e.slug}>
                    <Link href={`/fr/cv/lettre-de-motivation/${e.slug}`} className="group block">
                      <span className="block bg-white shadow-[0_1px_2px_rgba(27,29,33,0.08),0_10px_24px_-14px_rgba(27,29,33,0.3)] transition-transform group-hover:-translate-y-0.5">
                        <LetterSheet kit={letterKit(cv, e.letter, e.color)} />
                      </span>
                      <span className="mt-3 block font-bold text-slate-900 dark:text-white group-hover:text-ink-700 dark:group-hover:text-ink-300">
                        {e.short}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-16">
          <section>
            <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Questions fréquentes</h2>
            <div className="mt-6 border-t border-slate-200 dark:border-slate-800">
              {FAQ.map((f) => (
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
              Le modèle s’ouvre à côté de votre CV, avec vos coordonnées déjà en place. Il ne reste qu’à l’adapter au poste.
            </p>
            <Link
              href="/fr/cv?lettre"
              className="mt-6 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-bold"
            >
              Écrire ma lettre
            </Link>
          </section>
        </div>
      </main>

      <SiteFooter lang="fr" />
    </div>
  );
}
