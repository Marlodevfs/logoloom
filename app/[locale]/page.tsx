import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { LOCALES_METADATA, getHreflangAlternates } from '@/lib/i18n/meta';
import { InterfaceLang } from '@/types';
import { Studio } from '@/components/Studio';
import { SiteFooter } from '@/components/SiteFooter';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { CANONICAL_TEMPLATE_SLUGS, TEMPLATES_SEO_DATA } from '@/lib/seo/templates-metadata';
import { CheckCircle2, FileText, HelpCircle, ArrowRight } from 'lucide-react';

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

const HOME_HERO_I18N: Record<
  InterfaceLang,
  {
    badge: string;
    h1: string;
    intro: string;
    features: string[];
    faqTitle: string;
    about: string[];
    faqs: { q: string; a: string }[];
    catalogTitle: string;
    catalogSubtitle: string;
  }
> = {
  en: {
    badge: 'Free Printable Planners & Business Documents',
    h1: 'Free Printable Planners & Documents to Personalize in Seconds',
    intro:
      'Customize beautiful, ink-friendly printable PDFs directly in your browser. CVs, habit trackers, weekly planners, monthly calendars, budgets and checklists. 100% free, private on your device, optional logo.',
    features: [
      'Vector PDF, sharp at any size',
      'International A4 & US Letter sizes',
      'Low-ink minimalist design',
      '100% in-browser privacy • No signup',
    ],
    faqTitle: 'Frequently Asked Questions',
    about: [
      "LogoLoom is a free online studio for creating printable planners and business documents that look like they were made for you. Choose a template, add your logo, pick a brand color, and the whole document updates instantly. When you are happy with it, download a clean vector PDF ready for your home printer or a print shop.",
      "The templates cover both everyday organization and small-business paperwork: habit trackers, weekly and monthly planners, daily priorities, meal plans and budgets, as well as price lists and client trackers. Every layout is designed to use little ink, stay readable once printed, and work in both A4 and US Letter formats.",
      "Privacy is built in. There is no account to create and nothing to install: your logo and your text are processed directly in your browser and never sent to a server. Freelancers, coaches, small shops and anyone who likes paper planning can produce professional documents in a couple of minutes, for free.",
    ],
    faqs: [
      {
        q: 'What is LogoLoom?',
        a: 'LogoLoom is a free web tool to customize and print beautiful, minimal planners, calendars, and business documents. You can pick your brand color, add an optional logo, and download print-ready PDFs in seconds.',
      },
      {
        q: 'Is LogoLoom an AI logo generator?',
        a: 'No. LogoLoom is not an AI logo design app. It is a document personalization studio for printable planners (habit trackers, weekly schedules, calendars) and small business documents (price lists, client trackers). You can optionally drop your existing logo onto the documents.',
      },
      {
        q: 'Are exported PDFs high resolution for printing?',
        a: 'Yes, all PDFs are generated as pure vector documents with embedded fonts, crisp hairlines, and scalable QR codes, sharp at any print size.',
      },
      {
        q: 'Do you store any of my personal information?',
        a: 'Never. LogoLoom processes all document text and images 100% client-side in your browser memory. Nothing is sent to our servers.',
      },
    ],
    catalogTitle: 'Explore the 12 Print-Ready Templates',
    catalogSubtitle: 'Click any template to customize directly in the studio.',
  },
  fr: {
    badge: 'Planners et documents gratuits à imprimer',
    h1: 'Planners et documents professionnels gratuits à personnaliser en 2 minutes',
    intro:
      'Personnalisez des PDF imprimables élégants et économes en encre directement dans votre navigateur. CV, suivi d\'habitudes, plannings hebdomadaires, calendriers, budgets et checklists. 100% gratuit, privé sur votre machine, logo optionnel.',
    features: [
      'PDF vectoriel net à toute taille',
      'Formats A4 et US Letter',
      'Design minimaliste faible en encre',
      '100% privé dans le navigateur • Sans inscription',
    ],
    faqTitle: 'Questions fréquentes',
    about: [
      "LogoLoom est un atelier en ligne gratuit pour créer des planners et des documents professionnels à imprimer, à votre image. Choisissez un modèle, ajoutez votre logo, sélectionnez une couleur de marque : tout le document se met à jour instantanément. Une fois satisfait, téléchargez un PDF vectoriel propre, prêt pour votre imprimante ou un imprimeur.",
      "Les modèles couvrent l’organisation du quotidien comme la paperasse des petites entreprises : suivi d’habitudes, semainier, calendrier mensuel, priorités du jour, menus et budget, mais aussi grilles tarifaires et suivi client. Chaque mise en page consomme peu d’encre, reste lisible une fois imprimée et fonctionne en A4 comme en US Letter.",
      "La confidentialité est au cœur du projet. Aucun compte à créer, rien à installer : votre logo et vos textes sont traités directement dans votre navigateur et ne sont jamais envoyés sur un serveur. Indépendants, coachs, commerçants ou amoureux du papier peuvent ainsi produire des documents professionnels en deux minutes, gratuitement.",
    ],
    faqs: [
      {
        q: 'Qu\'est-ce que LogoLoom ?',
        a: 'LogoLoom est un outil en ligne gratuit pour personnaliser et imprimer des plannings, calendriers et documents professionnels au format PDF. Choisissez votre couleur d\'accent, ajoutez un logo optionnel et téléchargez en quelques secondes.',
      },
      {
        q: 'LogoLoom est-il un générateur de logos par IA ?',
        a: 'Non. LogoLoom n\'est pas un créateur de logo par intelligence artificielle. C\'est un atelier de personnalisation de documents imprimables (suivis d\'habitudes, plannings, calendriers, grilles tarifaires) sur lesquels vous pouvez intégrer votre propre logo.',
      },
      {
        q: 'Les PDF sont-ils adaptés à l\'impression professionnelle ?',
        a: 'Oui, tous les documents sont générés en vectoriel pur, nets à toute taille, avec polices intégrées, parfaits pour imprimantes de bureau.',
      },
      {
        q: 'Mes données personnelles sont-elles conservées ?',
        a: 'Jamais. Tout le traitement se fait à 100% dans votre navigateur sans aucun transfert de fichiers vers nos serveurs.',
      },
    ],
    catalogTitle: 'Découvrez les 12 modèles prêts à imprimer',
    catalogSubtitle: 'Cliquez sur un modèle pour le charger immédiatement dans l\'éditeur.',
  },
  de: {
    badge: 'Kostenlose druckbare Planer & Dokumente',
    h1: 'Kostenlose druckbare Planer & Vorlagen in Sekunden personalisieren',
    intro:
      'Erstellen Sie elegante, tintensparende druckbare PDFs direkt im Browser. Lebensläufe, Gewohnheitstracker, Wochenplaner, Monatskalender, Budgets und Checklisten. 100% kostenlos, lokal im Browser, optionales Logo.',
    features: [
      'Gestochen scharfe Vektor-PDFs',
      'DIN A4 & US Letter Formate',
      'Minimales, tintensparendes Design',
      '100% Datenschutz ohne Registrierung',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    about: [
      "LogoLoom ist ein kostenloses Online-Studio, mit dem Sie druckbare Planer und Geschäftsdokumente im eigenen Look erstellen. Wählen Sie eine Vorlage, fügen Sie Ihr Logo hinzu und bestimmen Sie Ihre Markenfarbe – das gesamte Dokument passt sich sofort an. Anschließend laden Sie ein sauberes Vektor-PDF herunter, bereit für Ihren Drucker oder die Druckerei.",
      "Die Vorlagen decken sowohl die Alltagsorganisation als auch den Papierkram kleiner Unternehmen ab: Gewohnheitstracker, Wochen- und Monatsplaner, Tagesprioritäten, Essens- und Budgetplaner sowie Preislisten und Kundenübersichten. Jedes Layout spart Tinte, bleibt gedruckt gut lesbar und funktioniert in A4 und US Letter.",
      "Datenschutz ist von Anfang an eingebaut. Kein Konto, keine Installation: Ihr Logo und Ihre Texte werden direkt in Ihrem Browser verarbeitet und nie an einen Server gesendet. So erstellen Freelancer, Coaches, kleine Geschäfte und alle, die gerne auf Papier planen, in wenigen Minuten kostenlos professionelle Dokumente.",
    ],
    faqs: [
      {
        q: 'Was ist LogoLoom?',
        a: 'LogoLoom ist ein kostenloses Webtool zum Erstellen und Ausdrucken von minimalistischen Planern und Geschäftsdokumenten als PDF.',
      },
      {
        q: 'Ist LogoLoom ein KI-Logo-Generator?',
        a: 'Nein. LogoLoom ist kein KI-Logo-Generator, sondern ein Personalisierungs-Tool für druckbare Dokumente (Gewohnheitstracker, Wochenplaner, Kalender, Preislisten).',
      },
    ],
    catalogTitle: 'Alle 12 druckfertigen Vorlagen entdecken',
    catalogSubtitle: 'Klicken Sie auf eine Vorlage, um sie direkt zu bearbeiten.',
  },
  es: {
    badge: 'Planificadores y documentos imprimibles gratis',
    h1: 'Planificadores y documentos imprimibles gratis listos en segundos',
    intro:
      'Personaliza hermosos PDFs imprimibles de bajo consumo de tinta directamente en tu navegador. Currículums, rastreadores de hábitos, planificadores semanales, calendarios, presupuestos y listas. 100% gratis, privado y sin registro.',
    features: [
      'PDF vectorial nítido a cualquier tamaño',
      'Tamaños A4 y Carta',
      'Diseño minimalista de bajo consumo de tinta',
      '100% Privado en tu equipo • Sin registro',
    ],
    faqTitle: 'Preguntas Frecuentes',
    about: [
      "LogoLoom es un estudio en línea gratuito para crear planificadores y documentos profesionales para imprimir con tu propia imagen. Elige una plantilla, añade tu logo y selecciona un color de marca: todo el documento se actualiza al instante. Cuando estés satisfecho, descarga un PDF vectorial limpio, listo para tu impresora o una imprenta.",
      "Las plantillas cubren tanto la organización diaria como el papeleo de los pequeños negocios: seguimiento de hábitos, planificadores semanales y mensuales, prioridades del día, menús y presupuestos, además de listas de precios y seguimiento de clientes. Cada diseño ahorra tinta, se lee bien impreso y funciona en A4 y US Letter.",
      "La privacidad viene de serie. Sin cuenta y sin instalar nada: tu logo y tus textos se procesan directamente en tu navegador y nunca se envían a un servidor. Freelancers, coaches, pequeños comercios y amantes de la planificación en papel pueden crear documentos profesionales en un par de minutos, gratis.",
    ],
    faqs: [
      {
        q: '¿Qué es LogoLoom?',
        a: 'LogoLoom es una herramienta web gratuita para personalizar e imprimir planificadores, calendarios y documentos profesionales en PDF.',
      },
      {
        q: '¿LogoLoom es un generador de logos con IA?',
        a: 'No. LogoLoom no crea logotipos con IA; es una herramienta para personalizar documentos imprimibles con tu propio logotipo.',
      },
    ],
    catalogTitle: 'Explora las 12 plantillas imprimibles',
    catalogSubtitle: 'Haz clic en una plantilla para personalizarla directamente en el editor.',
  },
  it: {
    badge: 'Planner e documenti stampabili gratuiti',
    h1: 'Planner e documenti professionali stampabili gratis in pochi secondi',
    intro:
      'Personalizza eleganti PDF stampabili a basso consumo d\'inchiostro direttamente nel tuo browser. CV, tracciatori di abitudini, planner settimanali, calendari, budget e checklist. 100% gratuito, privato e senza registrazione.',
    features: [
      'PDF vettoriale nitido a ogni formato',
      'Formati A4 e US Letter',
      'Design minimale con poco inchiostro',
      '100% Privato nel tuo browser • Senza login',
    ],
    faqTitle: 'Domande Frequenti',
    about: [
      "LogoLoom è uno studio online gratuito per creare planner e documenti professionali da stampare con la tua immagine. Scegli un modello, aggiungi il tuo logo e seleziona un colore del marchio: l’intero documento si aggiorna all’istante. Quando sei soddisfatto, scarica un PDF vettoriale pulito, pronto per la tua stampante o per una tipografia.",
      "I modelli coprono sia l’organizzazione quotidiana sia le pratiche delle piccole attività: tracker delle abitudini, planner settimanali e mensili, priorità del giorno, menù e budget, oltre a listini prezzi e registri clienti. Ogni impaginazione consuma poco inchiostro, resta leggibile una volta stampata e funziona in A4 e US Letter.",
      "La privacy è integrata. Nessun account da creare e niente da installare: il tuo logo e i tuoi testi vengono elaborati direttamente nel browser e non vengono mai inviati a un server. Freelance, coach, piccoli negozi e chi ama pianificare su carta possono creare documenti professionali in pochi minuti, gratuitamente.",
    ],
    faqs: [
      {
        q: 'Cos\'è LogoLoom?',
        a: 'LogoLoom è uno strumento gratuito per personalizzare e stampare planner, calendari e documenti aziendali in formato PDF.',
      },
      {
        q: 'LogoLoom è un generatore di loghi con intelligenza artificiale?',
        a: 'No. LogoLoom non genera loghi con IA, ma ti permette di personalizzare splendidi documenti stampabili applicando il tuo logo esistente.',
      },
    ],
    catalogTitle: 'Esplora tutti i 12 modelli stampabili',
    catalogSubtitle: 'Fai clic su un modello per aprirlo immediatamente nello studio.',
  },
  pt: {
    badge: 'Planejadores e modelos imprimíveis gratuitos',
    h1: 'Planejadores e documentos imprimíveis gratuitos personalizados em segundos',
    intro:
      'Personalize documentos em PDF para impressão diretamente no seu navegador. Currículos, rastreadores de hábitos, planejadores semanais, calendários, orçamentos e listas. 100% gratuito, privado no seu dispositivo e com logo opcional.',
    features: [
      'PDF vetorial nítido em qualquer tamanho',
      'Formatos A4 e US Letter',
      'Design minimalista e económico',
      '100% Privado no navegador • Sem cadastro',
    ],
    faqTitle: 'Perguntas Frequentes',
    about: [
      "O LogoLoom é um estúdio online gratuito para criar planeadores e documentos profissionais para imprimir com a sua imagem. Escolha um modelo, adicione o seu logo e selecione uma cor de marca: todo o documento é atualizado de imediato. Quando estiver satisfeito, descarregue um PDF vetorial limpo, pronto para a sua impressora ou para uma gráfica.",
      "Os modelos cobrem tanto a organização do dia a dia como a papelada dos pequenos negócios: registo de hábitos, planeadores semanais e mensais, prioridades do dia, menus e orçamentos, além de tabelas de preços e registo de clientes. Cada layout poupa tinta, mantém-se legível depois de impresso e funciona em A4 e US Letter.",
      "A privacidade vem de origem. Sem conta e sem instalar nada: o seu logo e os seus textos são processados diretamente no navegador e nunca são enviados para um servidor. Freelancers, coaches, pequenos comércios e quem gosta de planear em papel podem criar documentos profissionais em poucos minutos, gratuitamente.",
    ],
    faqs: [
      {
        q: 'O que é o LogoLoom?',
        a: 'LogoLoom é uma ferramenta online gratuita para personalizar e imprimir planejadores, calendários e documentos em PDF.',
      },
      {
        q: 'O LogoLoom é um gerador de logotipos por IA?',
        a: 'Não. O LogoLoom não cria logotipos por IA; é um estúdio de personalização de documentos imprimíveis onde pode incluir o seu próprio logo.',
      },
    ],
    catalogTitle: 'Descubra os 12 modelos prontos a imprimir',
    catalogSubtitle: 'Clique em qualquer modelo para abrir diretamente no editor.',
  },
};

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;

  if (!siteConfig.locales.includes(locale as any)) {
    notFound();
  }

  const lang = locale as InterfaceLang;
  const hero = HOME_HERO_I18N[lang] || HOME_HERO_I18N.en;
  const chrome = getSiteChrome(lang);
  const sortedTemplates = [...CANONICAL_TEMPLATE_SLUGS].sort((a, b) => {
    const ca = TEMPLATES_SEO_DATA.en[a.slug]?.category === 'business' ? 1 : 0;
    const cb = TEMPLATES_SEO_DATA.en[b.slug]?.category === 'business' ? 1 : 0;
    return ca - cb;
  });

  // WebApplication and FAQPage JSON-LD schema
  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${siteConfig.url}/${lang}#webapp`,
        name: siteConfig.name,
        url: `${siteConfig.url}/${lang}`,
        description: hero.intro,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: lang === 'en' ? 'USD' : 'EUR',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.url}/${lang}#faq`,
        mainEntity: hero.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  };

  const intro = (
    <>
      {/* Hero intro: compact on mobile so the editor is visible right away */}
      <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-4 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-2 sm:space-y-3">
          <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 text-[11px] text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>{hero.badge}</span>
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl">
            {hero.h1}
          </h1>

          <p className="hidden sm:block text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {hero.intro}
          </p>

          <div className="hidden sm:flex pt-2 flex-wrap gap-2 sm:gap-3">
            {hero.features.map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <noscript>
        <div className="max-w-5xl mx-auto px-4 py-3 my-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs">
          <p className="font-bold">{chrome.noscriptTitle}</p>
          <p className="mt-1">{chrome.noscriptBody}</p>
        </div>
      </noscript>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* Interactive Studio (Pre-rendered without layout shift or loading spinners!) */}
      <main className="flex-1 w-full">
        <Studio initialLang={lang} intro={intro} />

        {/* SEO FAQ & Full Template Catalog Internal Linking Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
          {/* FAQ Section */}
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{hero.faqTitle}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {chrome.aboutTitle}
              </h2>
            </div>

            {/* Real prose paragraphs: useful for visitors and search engines */}
            <div className="space-y-3 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {hero.about.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-3.5">
              {hero.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-2xs"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Complete 12-Template Directory with Crawlable Internal Links */}
          <section className="space-y-6 border-t border-slate-200/80 dark:border-slate-800 pt-12">
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {hero.catalogTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {hero.catalogSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {sortedTemplates.map((t) => {
                const itemData =
                  TEMPLATES_SEO_DATA[lang]?.[t.slug] || TEMPLATES_SEO_DATA.en[t.slug];
                return (
                  <Link
                    key={t.slug}
                    href={`/${lang}/${t.slug}`}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between group shadow-2xs"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {itemData?.category === 'business' ? chrome.categoryBusiness : chrome.categoryPersonal}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mt-1">
                        {chrome.templateNames[t.templateId]}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center space-x-0.5 mt-3">
                      <span>{chrome.viewCustomize}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter lang={lang} withStickyBar />
    </div>
  );
}
