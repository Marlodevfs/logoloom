import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { LOCALES_METADATA, getHreflangAlternates } from '@/lib/i18n/meta';
import { InterfaceLang, TemplateFamily, TemplateId } from '@/types';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { CATALOG, CATEGORY_COPY } from '@/lib/catalog';
import { CheckCircle2, FileText, HelpCircle, ArrowRight, CalendarDays, House } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as InterfaceLang;
  const meta = LOCALES_METADATA[lang];

  if (!meta) {
    return {};
  }

  const otherLocales = siteConfig.locales
    .filter((l) => l !== lang)
    .map((l) => LOCALES_METADATA[l]?.ogLocale || 'en_US');

  const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(meta.title)}`;
  const canonicalUrl = `${siteConfig.url}/${lang}`;

  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: `${siteConfig.name} Team`, url: siteConfig.url }],
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      languages: getHreflangAlternates(),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      locale: meta.ogLocale,
      alternateLocale: otherLocales,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      shortcut: '/favicon.ico',
    },
  };
}

const HOME_I18N: Record<
  InterfaceLang,
  {
    h1: string;
    intro: string;
    trust: [string, string, string];
    otherTools: string;
    aboutTitle: string;
    about: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  fr: {
    h1: 'Vos documents du quotidien, prêts à imprimer ou à envoyer',
    intro: 'CV, plannings, menus, budget : remplissez, choisissez votre couleur, téléchargez un PDF propre. Gratuit et sans compte.',
    trust: ['Gratuit, sans abonnement', 'Sans compte', 'Rien ne quitte votre navigateur'],
    otherTools: 'Aussi dans cette rubrique',
    aboutTitle: 'À propos de LogoLoom',
    about: [
      'LogoLoom rassemble les documents que l’on remplit dans la vie de tous les jours : un CV pour chercher un emploi, des plannings pour s’organiser, des menus, un budget et des checklists pour la maison. Chaque outil affiche un aperçu en direct et produit un PDF net, en A4 ou en US Letter.',
      'Tout se passe dans votre navigateur : vos textes, votre photo et vos choix ne sont jamais envoyés sur nos serveurs, et il n’y a pas de compte à créer. Les outils sont gratuits, sans essai qui se transforme en abonnement.',
    ],
    faqs: [
      { q: 'LogoLoom est-il vraiment gratuit ?', a: 'Oui. Vous pouvez créer et télécharger vos documents gratuitement, sans compte et sans abonnement.' },
      { q: 'Où sont stockées mes données ?', a: 'Uniquement dans votre navigateur. Rien n’est envoyé sur nos serveurs.' },
      { q: 'Mon CV sera-t-il lu par les logiciels de recrutement ?', a: 'Oui. Le PDF contient du vrai texte, pas une image, donc les logiciels de tri des candidatures peuvent le lire.' },
      { q: 'Dans quels formats sont les PDF ?', a: 'A4 ou US Letter, en vectoriel : ils restent nets à l’impression comme à l’écran.' },
    ],
  },
  en: {
    h1: 'Your everyday documents, ready to print or send',
    intro: 'CVs, planners, meal plans, budgets: fill them in, pick your colour, download a clean PDF. Free, no account.',
    trust: ['Free, no subscription', 'No account', 'Nothing leaves your browser'],
    otherTools: 'Also in this section',
    aboutTitle: 'About LogoLoom',
    about: [
      'LogoLoom brings together the documents people fill in every day: a CV to find a job, planners to get organised, meal plans, a budget and checklists for the home. Every tool shows a live preview and produces a sharp PDF, in A4 or US Letter.',
      'Everything happens in your browser: your text, your photo and your choices are never sent to our servers, and there is no account to create. The tools are free, with no trial that turns into a subscription.',
    ],
    faqs: [
      { q: 'Is LogoLoom really free?', a: 'Yes. You can create and download your documents for free, with no account and no subscription.' },
      { q: 'Where is my data stored?', a: 'Only in your browser. Nothing is sent to our servers.' },
      { q: 'Can recruiting software read my CV?', a: 'Yes. The PDF contains real text, not an image, so applicant tracking systems can read it.' },
      { q: 'What formats are the PDFs?', a: 'A4 or US Letter, in vector format: sharp on paper and on screen.' },
    ],
  },
  de: {
    h1: 'Ihre Alltagsdokumente, bereit zum Drucken oder Versenden',
    intro: 'Lebenslauf, Planer, Essenspläne, Budget: ausfüllen, Farbe wählen, sauberes PDF herunterladen. Kostenlos, ohne Konto.',
    trust: ['Kostenlos, ohne Abo', 'Ohne Konto', 'Nichts verlässt Ihren Browser'],
    otherTools: 'Ebenfalls in diesem Bereich',
    aboutTitle: 'Über LogoLoom',
    about: [
      'LogoLoom vereint die Dokumente, die man im Alltag ausfüllt: einen Lebenslauf für die Jobsuche, Planer zur Organisation, Essenspläne, ein Budget und Checklisten für den Haushalt. Jedes Tool zeigt eine Live-Vorschau und erzeugt ein scharfes PDF in A4 oder US Letter.',
      'Alles passiert in Ihrem Browser: Texte, Foto und Einstellungen werden nie an unsere Server gesendet, und es gibt kein Konto. Die Tools sind kostenlos, ohne Probeabo, das zum Abo wird.',
    ],
    faqs: [
      { q: 'Ist LogoLoom wirklich kostenlos?', a: 'Ja. Sie können Ihre Dokumente kostenlos erstellen und herunterladen, ohne Konto und ohne Abo.' },
      { q: 'Wo werden meine Daten gespeichert?', a: 'Nur in Ihrem Browser. Nichts wird an unsere Server gesendet.' },
      { q: 'Können Bewerbungssysteme meinen Lebenslauf lesen?', a: 'Ja. Das PDF enthält echten Text, kein Bild.' },
      { q: 'In welchen Formaten sind die PDFs?', a: 'A4 oder US Letter, als Vektor: scharf auf Papier und Bildschirm.' },
    ],
  },
  es: {
    h1: 'Tus documentos del día a día, listos para imprimir o enviar',
    intro: 'CV, planificadores, menús, presupuesto: rellena, elige tu color y descarga un PDF limpio. Gratis y sin cuenta.',
    trust: ['Gratis, sin suscripción', 'Sin cuenta', 'Nada sale de tu navegador'],
    otherTools: 'También en esta sección',
    aboutTitle: 'Sobre LogoLoom',
    about: [
      'LogoLoom reúne los documentos que se rellenan en el día a día: un CV para buscar empleo, planificadores para organizarse, menús, un presupuesto y checklists para casa. Cada herramienta muestra una vista previa en directo y genera un PDF nítido, en A4 o Carta.',
      'Todo ocurre en tu navegador: tus textos, tu foto y tus elecciones nunca se envían a nuestros servidores, y no hay que crear cuenta. Las herramientas son gratuitas, sin pruebas que se convierten en suscripción.',
    ],
    faqs: [
      { q: '¿LogoLoom es realmente gratis?', a: 'Sí. Puedes crear y descargar tus documentos gratis, sin cuenta y sin suscripción.' },
      { q: '¿Dónde se guardan mis datos?', a: 'Solo en tu navegador. No se envía nada a nuestros servidores.' },
      { q: '¿Los programas de selección pueden leer mi CV?', a: 'Sí. El PDF contiene texto real, no una imagen.' },
      { q: '¿En qué formatos están los PDF?', a: 'A4 o Carta, en vectorial: nítidos en papel y en pantalla.' },
    ],
  },
  it: {
    h1: 'I tuoi documenti di tutti i giorni, pronti da stampare o inviare',
    intro: 'CV, planner, menù, budget: compila, scegli il colore e scarica un PDF pulito. Gratis e senza account.',
    trust: ['Gratis, senza abbonamento', 'Senza account', 'Nulla lascia il browser'],
    otherTools: 'Anche in questa sezione',
    aboutTitle: 'Informazioni su LogoLoom',
    about: [
      'LogoLoom riunisce i documenti che si compilano ogni giorno: un CV per cercare lavoro, planner per organizzarsi, menù, un budget e checklist per la casa. Ogni strumento mostra un’anteprima in tempo reale e genera un PDF nitido, in A4 o Letter.',
      'Tutto avviene nel tuo browser: testi, foto e scelte non vengono mai inviati ai nostri server, e non serve un account. Gli strumenti sono gratuiti, senza prove che diventano abbonamenti.',
    ],
    faqs: [
      { q: 'LogoLoom è davvero gratis?', a: 'Sì. Puoi creare e scaricare i tuoi documenti gratis, senza account e senza abbonamento.' },
      { q: 'Dove vengono salvati i miei dati?', a: 'Solo nel tuo browser. Nulla viene inviato ai nostri server.' },
      { q: 'I software di selezione possono leggere il mio CV?', a: 'Sì. Il PDF contiene testo reale, non un’immagine.' },
      { q: 'In che formati sono i PDF?', a: 'A4 o Letter, vettoriali: nitidi su carta e su schermo.' },
    ],
  },
  pt: {
    h1: 'Os seus documentos do dia a dia, prontos a imprimir ou enviar',
    intro: 'CV, planeadores, ementas, orçamento: preencha, escolha a cor e descarregue um PDF limpo. Grátis e sem conta.',
    trust: ['Grátis, sem assinatura', 'Sem conta', 'Nada sai do seu navegador'],
    otherTools: 'Também nesta secção',
    aboutTitle: 'Sobre o LogoLoom',
    about: [
      'O LogoLoom reúne os documentos que se preenchem no dia a dia: um CV para procurar emprego, planeadores para se organizar, ementas, um orçamento e checklists para a casa. Cada ferramenta mostra uma pré-visualização em direto e gera um PDF nítido, em A4 ou Letter.',
      'Tudo acontece no seu navegador: textos, foto e escolhas nunca são enviados para os nossos servidores, e não é preciso criar conta. As ferramentas são gratuitas, sem testes que se transformam em assinatura.',
    ],
    faqs: [
      { q: 'O LogoLoom é mesmo grátis?', a: 'Sim. Pode criar e descarregar os seus documentos grátis, sem conta e sem assinatura.' },
      { q: 'Onde ficam os meus dados?', a: 'Apenas no seu navegador. Nada é enviado para os nossos servidores.' },
      { q: 'O software de recrutamento consegue ler o meu CV?', a: 'Sim. O PDF contém texto real, não uma imagem.' },
      { q: 'Em que formatos estão os PDF?', a: 'A4 ou Letter, em vetorial: nítidos em papel e no ecrã.' },
    ],
  },
};

const CATEGORY_ICONS = { career: FileText, organisation: CalendarDays, home: House } as const;

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;

  if (!siteConfig.locales.includes(locale as any)) {
    notFound();
  }

  const lang = locale as InterfaceLang;
  const t = HOME_I18N[lang] || HOME_I18N.en;
  const chrome = getSiteChrome(lang);
  const cats = CATEGORY_COPY[lang] || CATEGORY_COPY.en;
  const toolsOf = (cat: TemplateFamily) => CATALOG.filter((x) => x.category === cat);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${siteConfig.url}/${lang}#webapp`,
        name: siteConfig.name,
        url: `${siteConfig.url}/${lang}`,
        description: t.intro,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: lang === 'en' ? 'USD' : 'EUR' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/${lang}#faq`,
        mainEntity: t.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  const toolLink = (slug: string, id: TemplateId) => (
    <Link
      key={slug}
      href={`/${lang}/${slug}`}
      className="group flex items-center justify-between gap-2 px-3.5 py-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
    >
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{chrome.templateNames[id]}</span>
      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <HomeHeader lang={lang} />

      <main className="flex-1 w-full">
        {/* Hero: one promise */}
        <section className="px-4 sm:px-6 pt-10 sm:pt-16 pb-8 text-center">
          <h1 className="max-w-3xl mx-auto text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {t.h1}
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.intro}
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
            {t.trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* The 3 sections of the site */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 space-y-6">
          {/* Career: the CV, highlighted */}
          <section id="career" className="scroll-mt-24 rounded-2xl border-2 border-indigo-500/70 bg-white dark:bg-slate-900 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{cats.career.name}</p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{chrome.templateNames.cv}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{cats.career.pitch}</p>
            </div>
            <Link
              href={`/${lang}/cv`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors shrink-0"
            >
              {cats.career.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Organisation and home */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(['organisation', 'home'] as const).map((cat) => {
              const Icon = CATEGORY_ICONS[cat];
              return (
                <section key={cat} id={cat} className="scroll-mt-24 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/50 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center border border-slate-200/80 dark:border-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{cats[cat].name}</h2>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{cats[cat].pitch}</p>
                  <div className="grid grid-cols-1 gap-2">{toolsOf(cat).map((x) => toolLink(x.slug, x.id))}</div>
                </section>
              );
            })}
          </div>
        </div>

        <noscript>
          <div className="max-w-5xl mx-auto px-4 py-3 mb-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs">
            <p className="font-bold">{chrome.noscriptTitle}</p>
            <p className="mt-1">{chrome.noscriptBody}</p>
          </div>
        </noscript>

        {/* About + FAQ: real text for visitors and search engines */}
        <section className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.aboutTitle}</h2>
              {t.about.map((paragraph) => (
                <p key={paragraph} className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="space-y-3">
              {t.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-3 text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                    <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
