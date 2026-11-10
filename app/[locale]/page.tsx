import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { LOCALES_METADATA, getHreflangAlternates } from '@/lib/i18n/meta';
import { DocumentLang, InterfaceLang } from '@/types';
import { HomeHeader } from '@/components/HomeHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { getSiteChrome } from '@/lib/i18n/site-chrome';
import { CATALOG, CATEGORY_COPY } from '@/lib/catalog';
import { ChevronRight, Plus } from 'lucide-react';
import { LiveCvHero, CvLayoutsShowcase, type LiveCvHeroCopy } from '@/components/home/LiveCvHero';

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

type HomeCopy = LiveCvHeroCopy & {
  stepsTitle: string;
  steps: { title: string; desc: string }[];
  layoutsTitle: string;
  layoutsLead: string;
  captions: { sidebar: string; classic: string };
  honestTitle: string;
  honestLead: string;
  honest: string[];
  toolsTitle: string;
  toolsLead: string;
  aboutTitle: string;
  about: string[];
  faqs: { q: string; a: string }[];
};

const HOME_I18N: Record<InterfaceLang, HomeCopy> = {
  fr: {
    "h1": "Un CV propre en dix minutes.",
    "lead": "Remplissez, choisissez une mise en page, téléchargez le PDF. Gratuit, sans compte, sans abonnement.",
    "nameLabel": "Commencez par votre nom",
    "namePlaceholder": "Camille Martin",
    "cta": "Créer mon CV",
    "facts": [
        "Le PDF contient du vrai texte, lisible par les logiciels des recruteurs",
        "Votre CV reste dans votre navigateur, rien n’est envoyé",
        "Aucune carte bancaire demandée, à aucun moment"
    ],
    "sheetCaption": "Aperçu réel : le CV se met à jour pendant que vous tapez votre nom.",
    "stepsTitle": "Comment ça se passe",
    "steps": [
        {
            "title": "Remplissez vos informations",
            "desc": "Expériences, formation, compétences et langues, dans un formulaire en six étapes. La photo est facultative."
        },
        {
            "title": "Choisissez la mise en page",
            "desc": "Colonne latérale ou classique, et la couleur qui vous ressemble. L’aperçu suit chaque modification."
        },
        {
            "title": "Téléchargez le PDF",
            "desc": "Un fichier A4 nommé à votre nom, prêt à joindre à une candidature."
        }
    ],
    "layoutsTitle": "Deux mises en page, faites pour être lues",
    "layoutsLead": "Des CV sobres, sur une page, avec une hiérarchie claire : le recruteur trouve ce qu’il cherche en quelques secondes.",
    "captions": {
        "sidebar": "Colonne latérale : contact, compétences et langues à gauche, parcours à droite.",
        "classic": "Classique : tout sur une colonne, pour les parcours longs ou très textuels."
    },
    "honestTitle": "Ce que vous ne trouverez pas ici",
    "honestLead": "Beaucoup de créateurs de CV « gratuits » se rattrapent au moment du téléchargement. Ici, non.",
    "honest": [
        "Un essai à 1,95 € qui devient un abonnement à 25 € par mois",
        "Un bouton « Télécharger » qui demande une carte bancaire",
        "Un filigrane ou un logo sur votre CV",
        "Un compte à créer avant de voir le résultat"
    ],
    "toolsTitle": "Autres outils gratuits",
    "toolsLead": "Des documents à imprimer, avec la même règle : gratuit et sans compte.",
    "aboutTitle": "À propos de LogoLoom",
    "about": [
        "LogoLoom est un créateur de CV gratuit. Vous remplissez un formulaire, vous voyez votre CV prendre forme en direct, et vous téléchargez un PDF propre, en A4 ou en US Letter.",
        "Tout se passe dans votre navigateur : vos informations et votre photo ne sont jamais envoyées sur nos serveurs. Le site propose aussi quelques outils d’organisation à imprimer, gratuits eux aussi."
    ],
    "faqs": [
        {
            "q": "Est-ce vraiment gratuit ?",
            "a": "Oui. Vous créez et téléchargez votre CV gratuitement, sans compte, sans filigrane et sans abonnement."
        },
        {
            "q": "Mon CV sera-t-il lu par les logiciels de recrutement ?",
            "a": "Oui. Le PDF contient du vrai texte sélectionnable, pas une image : les logiciels de tri des candidatures peuvent le lire."
        },
        {
            "q": "Où sont stockées mes informations ?",
            "a": "Uniquement dans votre navigateur, sur votre appareil. Rien n’est envoyé sur nos serveurs."
        },
        {
            "q": "Faut-il mettre une photo ?",
            "a": "Ce n’est pas obligatoire en France. Vous pouvez en ajouter une ou non, le CV s’adapte."
        }
    ]
},
  en: {
    "h1": "A clean CV in ten minutes.",
    "lead": "Fill it in, pick a layout, download the PDF. Free, no account, no subscription.",
    "nameLabel": "Start with your name",
    "namePlaceholder": "Alex Morgan",
    "cta": "Create my CV",
    "facts": [
        "The PDF holds real text that recruiting software can read",
        "Your CV stays in your browser, nothing is uploaded",
        "No credit card, at any point"
    ],
    "sheetCaption": "Real preview: the CV updates as you type your name.",
    "stepsTitle": "How it works",
    "steps": [
        {
            "title": "Fill in your details",
            "desc": "Experience, education, skills and languages, in a six-step form. A photo is optional."
        },
        {
            "title": "Pick a layout",
            "desc": "Sidebar or classic, in the colour that suits you. The preview follows every change."
        },
        {
            "title": "Download the PDF",
            "desc": "An A4 file named after you, ready to attach to an application."
        }
    ],
    "layoutsTitle": "Two layouts, made to be read",
    "layoutsLead": "Plain one-page CVs with a clear hierarchy, so a recruiter finds what they need in seconds.",
    "captions": {
        "sidebar": "Sidebar: contact, skills and languages on the left, your path on the right.",
        "classic": "Classic: a single column, for long or text-heavy careers."
    },
    "honestTitle": "What you won’t find here",
    "honestLead": "Many “free” CV builders make their money at the download button. Not this one.",
    "honest": [
        "A $1.95 trial that turns into a $25 monthly subscription",
        "A Download button that asks for a credit card",
        "A watermark or logo on your CV",
        "An account to create before you see the result"
    ],
    "toolsTitle": "Other free tools",
    "toolsLead": "Printable documents, same rule: free and no account.",
    "aboutTitle": "About LogoLoom",
    "about": [
        "LogoLoom is a free CV maker. You fill in a form, watch your CV take shape live, and download a clean PDF in A4 or US Letter.",
        "Everything happens in your browser: your details and photo are never sent to our servers. The site also offers a few printable planning tools, free as well."
    ],
    "faqs": [
        {
            "q": "Is it really free?",
            "a": "Yes. You create and download your CV for free, with no account, no watermark and no subscription."
        },
        {
            "q": "Can recruiting software read my CV?",
            "a": "Yes. The PDF holds real, selectable text, not an image, so applicant tracking systems can read it."
        },
        {
            "q": "Where is my information stored?",
            "a": "Only in your browser, on your device. Nothing is sent to our servers."
        },
        {
            "q": "Should I add a photo?",
            "a": "It depends on the country. You can add one or leave it out; the CV adapts."
        }
    ]
},
  de: {
    "h1": "Ein sauberer Lebenslauf in zehn Minuten.",
    "lead": "Ausfüllen, Layout wählen, PDF herunterladen. Kostenlos, ohne Konto, ohne Abo.",
    "nameLabel": "Beginnen Sie mit Ihrem Namen",
    "namePlaceholder": "Lena Schneider",
    "cta": "Lebenslauf erstellen",
    "facts": [
        "Das PDF enthält echten Text, lesbar für Bewerbungssoftware",
        "Ihr Lebenslauf bleibt in Ihrem Browser, nichts wird hochgeladen",
        "Keine Kreditkarte, zu keinem Zeitpunkt"
    ],
    "sheetCaption": "Echte Vorschau: Der Lebenslauf ändert sich, während Sie Ihren Namen tippen.",
    "stepsTitle": "So funktioniert es",
    "steps": [
        {
            "title": "Angaben ausfüllen",
            "desc": "Berufserfahrung, Ausbildung, Kenntnisse und Sprachen in sechs Schritten. Foto optional."
        },
        {
            "title": "Layout wählen",
            "desc": "Seitenleiste oder klassisch, in Ihrer Farbe. Die Vorschau folgt jeder Änderung."
        },
        {
            "title": "PDF herunterladen",
            "desc": "Eine A4-Datei mit Ihrem Namen, bereit für die Bewerbung."
        }
    ],
    "layoutsTitle": "Zwei Layouts, gemacht zum Lesen",
    "layoutsLead": "Schlichte einseitige Lebensläufe mit klarer Gliederung: Personaler finden in Sekunden, was sie suchen.",
    "captions": {
        "sidebar": "Seitenleiste: Kontakt, Kenntnisse und Sprachen links, Werdegang rechts.",
        "classic": "Klassisch: eine Spalte, für lange oder textreiche Werdegänge."
    },
    "honestTitle": "Was Sie hier nicht finden",
    "honestLead": "Viele „kostenlose“ Lebenslauf-Tools kassieren beim Herunterladen. Hier nicht.",
    "honest": [
        "Ein Test für 1,95 €, der zum Abo für 25 € im Monat wird",
        "Einen Download-Button, der nach der Kreditkarte fragt",
        "Ein Wasserzeichen oder Logo auf Ihrem Lebenslauf",
        "Ein Konto, bevor Sie das Ergebnis sehen"
    ],
    "toolsTitle": "Weitere kostenlose Tools",
    "toolsLead": "Dokumente zum Ausdrucken, gleiche Regel: kostenlos und ohne Konto.",
    "aboutTitle": "Über LogoLoom",
    "about": [
        "LogoLoom ist ein kostenloser Lebenslauf-Generator. Sie füllen ein Formular aus, sehen Ihren Lebenslauf live entstehen und laden ein sauberes PDF in A4 oder US Letter herunter.",
        "Alles passiert in Ihrem Browser: Angaben und Foto werden nie an unsere Server gesendet. Dazu gibt es einige kostenlose Planungs-Tools zum Ausdrucken."
    ],
    "faqs": [
        {
            "q": "Ist das wirklich kostenlos?",
            "a": "Ja. Erstellen und Herunterladen sind kostenlos, ohne Konto, ohne Wasserzeichen und ohne Abo."
        },
        {
            "q": "Kann Bewerbungssoftware meinen Lebenslauf lesen?",
            "a": "Ja. Das PDF enthält echten, markierbaren Text, kein Bild."
        },
        {
            "q": "Wo werden meine Angaben gespeichert?",
            "a": "Nur in Ihrem Browser, auf Ihrem Gerät. Nichts wird an unsere Server gesendet."
        },
        {
            "q": "Sollte ich ein Foto hinzufügen?",
            "a": "Das ist optional. Der Lebenslauf passt sich an, mit oder ohne Foto."
        }
    ]
},
  es: {
    "h1": "Un CV limpio en diez minutos.",
    "lead": "Rellénalo, elige un diseño, descarga el PDF. Gratis, sin cuenta, sin suscripción.",
    "nameLabel": "Empieza por tu nombre",
    "namePlaceholder": "Lucía García",
    "cta": "Crear mi CV",
    "facts": [
        "El PDF contiene texto real, legible por los programas de selección",
        "Tu CV se queda en tu navegador, no se envía nada",
        "Ninguna tarjeta bancaria, en ningún momento"
    ],
    "sheetCaption": "Vista previa real: el CV cambia mientras escribes tu nombre.",
    "stepsTitle": "Cómo funciona",
    "steps": [
        {
            "title": "Rellena tus datos",
            "desc": "Experiencia, formación, competencias e idiomas, en un formulario de seis pasos. Foto opcional."
        },
        {
            "title": "Elige el diseño",
            "desc": "Columna lateral o clásico, con tu color. La vista previa sigue cada cambio."
        },
        {
            "title": "Descarga el PDF",
            "desc": "Un archivo A4 con tu nombre, listo para adjuntar a una candidatura."
        }
    ],
    "layoutsTitle": "Dos diseños, pensados para leerse",
    "layoutsLead": "CV sobrios de una página con una jerarquía clara: el reclutador encuentra lo que busca en segundos.",
    "captions": {
        "sidebar": "Columna lateral: contacto, competencias e idiomas a la izquierda, trayectoria a la derecha.",
        "classic": "Clásico: una sola columna, para trayectorias largas o con mucho texto."
    },
    "honestTitle": "Lo que no encontrarás aquí",
    "honestLead": "Muchos creadores de CV «gratis» cobran en el botón de descarga. Aquí no.",
    "honest": [
        "Una prueba de 1,95 € que se convierte en una suscripción de 25 € al mes",
        "Un botón de descarga que pide la tarjeta",
        "Una marca de agua o un logo en tu CV",
        "Una cuenta obligatoria antes de ver el resultado"
    ],
    "toolsTitle": "Otras herramientas gratis",
    "toolsLead": "Documentos para imprimir, misma regla: gratis y sin cuenta.",
    "aboutTitle": "Sobre LogoLoom",
    "about": [
        "LogoLoom es un creador de CV gratuito. Rellenas un formulario, ves tu CV tomar forma en directo y descargas un PDF limpio en A4 o Carta.",
        "Todo ocurre en tu navegador: tus datos y tu foto nunca se envían a nuestros servidores. También hay algunas herramientas de organización para imprimir, gratis."
    ],
    "faqs": [
        {
            "q": "¿Es realmente gratis?",
            "a": "Sí. Creas y descargas tu CV gratis, sin cuenta, sin marca de agua y sin suscripción."
        },
        {
            "q": "¿Lo pueden leer los programas de selección?",
            "a": "Sí. El PDF contiene texto real seleccionable, no una imagen."
        },
        {
            "q": "¿Dónde se guardan mis datos?",
            "a": "Solo en tu navegador, en tu dispositivo. No se envía nada a nuestros servidores."
        },
        {
            "q": "¿Hay que poner foto?",
            "a": "Es opcional. El CV se adapta con o sin foto."
        }
    ]
},
  it: {
    "h1": "Un CV pulito in dieci minuti.",
    "lead": "Compila, scegli un layout, scarica il PDF. Gratis, senza account, senza abbonamento.",
    "nameLabel": "Inizia dal tuo nome",
    "namePlaceholder": "Giulia Rossi",
    "cta": "Crea il mio CV",
    "facts": [
        "Il PDF contiene testo reale, leggibile dai software di selezione",
        "Il tuo CV resta nel browser, non viene inviato nulla",
        "Nessuna carta di credito, in nessun momento"
    ],
    "sheetCaption": "Anteprima reale: il CV cambia mentre scrivi il tuo nome.",
    "stepsTitle": "Come funziona",
    "steps": [
        {
            "title": "Inserisci i tuoi dati",
            "desc": "Esperienze, formazione, competenze e lingue, in un modulo in sei passi. Foto facoltativa."
        },
        {
            "title": "Scegli il layout",
            "desc": "Colonna laterale o classico, nel colore che preferisci. L’anteprima segue ogni modifica."
        },
        {
            "title": "Scarica il PDF",
            "desc": "Un file A4 con il tuo nome, pronto da allegare a una candidatura."
        }
    ],
    "layoutsTitle": "Due layout, fatti per essere letti",
    "layoutsLead": "CV sobri di una pagina con una gerarchia chiara: il selezionatore trova ciò che cerca in pochi secondi.",
    "captions": {
        "sidebar": "Colonna laterale: contatti, competenze e lingue a sinistra, percorso a destra.",
        "classic": "Classico: una sola colonna, per percorsi lunghi o ricchi di testo."
    },
    "honestTitle": "Cosa non troverai qui",
    "honestLead": "Molti creatori di CV «gratis» si fanno pagare al momento del download. Qui no.",
    "honest": [
        "Una prova da 1,95 € che diventa un abbonamento da 25 € al mese",
        "Un pulsante Scarica che chiede la carta",
        "Una filigrana o un logo sul tuo CV",
        "Un account obbligatorio prima di vedere il risultato"
    ],
    "toolsTitle": "Altri strumenti gratis",
    "toolsLead": "Documenti da stampare, stessa regola: gratis e senza account.",
    "aboutTitle": "Informazioni su LogoLoom",
    "about": [
        "LogoLoom è un creatore di CV gratuito. Compili un modulo, vedi il CV prendere forma in tempo reale e scarichi un PDF pulito in A4 o Letter.",
        "Tutto avviene nel tuo browser: dati e foto non vengono mai inviati ai nostri server. Ci sono anche alcuni strumenti di organizzazione da stampare, gratis."
    ],
    "faqs": [
        {
            "q": "È davvero gratis?",
            "a": "Sì. Crei e scarichi il CV gratis, senza account, senza filigrana e senza abbonamento."
        },
        {
            "q": "I software di selezione possono leggerlo?",
            "a": "Sì. Il PDF contiene testo reale selezionabile, non un’immagine."
        },
        {
            "q": "Dove vengono salvati i miei dati?",
            "a": "Solo nel tuo browser, sul tuo dispositivo. Nulla viene inviato ai nostri server."
        },
        {
            "q": "Devo mettere la foto?",
            "a": "È facoltativa. Il CV si adatta con o senza foto."
        }
    ]
},
  pt: {
    "h1": "Um CV limpo em dez minutos.",
    "lead": "Preencha, escolha um layout, descarregue o PDF. Grátis, sem conta, sem assinatura.",
    "nameLabel": "Comece pelo seu nome",
    "namePlaceholder": "Inês Costa",
    "cta": "Criar o meu CV",
    "facts": [
        "O PDF contém texto real, legível pelo software de recrutamento",
        "O seu CV fica no seu navegador, nada é enviado",
        "Nenhum cartão bancário, em momento algum"
    ],
    "sheetCaption": "Pré-visualização real: o CV muda enquanto escreve o seu nome.",
    "stepsTitle": "Como funciona",
    "steps": [
        {
            "title": "Preencha os seus dados",
            "desc": "Experiência, formação, competências e línguas, num formulário em seis passos. Foto opcional."
        },
        {
            "title": "Escolha o layout",
            "desc": "Coluna lateral ou clássico, na cor que preferir. A pré-visualização acompanha cada alteração."
        },
        {
            "title": "Descarregue o PDF",
            "desc": "Um ficheiro A4 com o seu nome, pronto a anexar a uma candidatura."
        }
    ],
    "layoutsTitle": "Dois layouts, feitos para serem lidos",
    "layoutsLead": "CV sóbrios de uma página com uma hierarquia clara: o recrutador encontra o que procura em segundos.",
    "captions": {
        "sidebar": "Coluna lateral: contactos, competências e línguas à esquerda, percurso à direita.",
        "classic": "Clássico: uma só coluna, para percursos longos ou com muito texto."
    },
    "honestTitle": "O que não vai encontrar aqui",
    "honestLead": "Muitos criadores de CV «grátis» cobram no botão de descarregar. Aqui não.",
    "honest": [
        "Um teste de 1,95 € que se torna uma assinatura de 25 € por mês",
        "Um botão Descarregar que pede o cartão",
        "Uma marca de água ou um logótipo no seu CV",
        "Uma conta obrigatória antes de ver o resultado"
    ],
    "toolsTitle": "Outras ferramentas grátis",
    "toolsLead": "Documentos para imprimir, mesma regra: grátis e sem conta.",
    "aboutTitle": "Sobre o LogoLoom",
    "about": [
        "O LogoLoom é um criador de CV gratuito. Preenche um formulário, vê o CV ganhar forma em direto e descarrega um PDF limpo em A4 ou Letter.",
        "Tudo acontece no seu navegador: os seus dados e a sua foto nunca são enviados para os nossos servidores. Há também algumas ferramentas de organização para imprimir, grátis."
    ],
    "faqs": [
        {
            "q": "É mesmo grátis?",
            "a": "Sim. Cria e descarrega o seu CV grátis, sem conta, sem marca de água e sem assinatura."
        },
        {
            "q": "O software de recrutamento consegue ler?",
            "a": "Sim. O PDF contém texto real selecionável, não uma imagem."
        },
        {
            "q": "Onde ficam os meus dados?",
            "a": "Apenas no seu navegador, no seu dispositivo. Nada é enviado para os nossos servidores."
        },
        {
            "q": "Devo pôr foto?",
            "a": "É opcional. O CV adapta-se com ou sem foto."
        }
    ]
},
};

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;

  if (!siteConfig.locales.includes(locale as any)) {
    notFound();
  }

  const lang = locale as InterfaceLang;
  const t = HOME_I18N[lang] || HOME_I18N.en;
  const chrome = getSiteChrome(lang);
  const cats = CATEGORY_COPY[lang] || CATEGORY_COPY.en;
  const otherTools = CATALOG.filter((x) => x.id !== 'cv');

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${siteConfig.url}/${lang}#webapp`,
        name: siteConfig.name,
        url: `${siteConfig.url}/${lang}`,
        description: t.lead,
        applicationCategory: 'BusinessApplication',
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

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <HomeHeader lang={lang} />

      <main className="flex-1 w-full">
        <LiveCvHero lang={lang as DocumentLang} copy={t} />

        {/* How it works: a real three-step sequence */}
        <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{t.stepsTitle}</h2>
            <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {t.steps.map((step, i) => (
                <li key={step.title}>
                  <span className="font-display text-5xl text-ink-600 dark:text-ink-300 leading-none">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-[38ch]">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The two layouts, as real sheets */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{t.layoutsTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-[40ch]">{t.layoutsLead}</p>
            <Link
              href={`/${lang}/cv`}
              className="mt-8 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-ink-600 hover:bg-ink-700 text-white font-bold transition-colors"
            >
              {t.cta}
            </Link>
          </div>
          <CvLayoutsShowcase lang={lang as DocumentLang} captions={t.captions} />
        </section>

        {/* The honest difference */}
        <section className="bg-slate-900 text-slate-100">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">{t.honestTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300 max-w-[40ch]">{t.honestLead}</p>
            </div>
            <ul className="divide-y divide-slate-700 border-y border-slate-700">
              {t.honest.map((item) => (
                <li key={item} className="py-4 text-lg text-slate-200 line-through decoration-slate-500 decoration-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Other free tools: secondary */}
        <section id="tools" className="scroll-mt-20 max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold">{t.toolsTitle}</h2>
          <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300">{t.toolsLead}</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {(['organisation', 'home'] as const).map((cat) => (
              <div key={cat}>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">{cats[cat].name}</h3>
                <ul className="mt-2 border-t border-slate-300/70 dark:border-slate-700">
                  {otherTools
                    .filter((x) => x.category === cat)
                    .map((x) => (
                      <li key={x.slug} className="border-b border-slate-300/70 dark:border-slate-700">
                        <Link
                          href={`/${lang}/${x.slug}`}
                          className="flex items-center justify-between py-3 text-[15px] font-bold text-slate-800 hover:text-ink-700 dark:text-slate-100 dark:hover:text-ink-300"
                        >
                          {chrome.templateNames[x.id]}
                          <ChevronRight aria-hidden="true" className="w-4 h-4 text-slate-400" />
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <noscript>
          <div className="max-w-5xl mx-auto px-4 py-3 mb-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm">
            <p className="font-bold">{chrome.noscriptTitle}</p>
            <p className="mt-1">{chrome.noscriptBody}</p>
          </div>
        </noscript>

        {/* About + FAQ */}
        <section className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">{t.aboutTitle}</h2>
            <div className="mt-4 space-y-4">
              {t.about.map((paragraph) => (
                <p key={paragraph} className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 border-t border-slate-200 dark:border-slate-800">
              {t.faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-slate-200 dark:border-slate-800">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 py-4 text-[16px] font-bold text-slate-900 dark:text-white">
                    {faq.q}
                    <Plus aria-hidden="true" className="w-4 h-4 text-slate-500 shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 -mt-1 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 max-w-[65ch]">{faq.a}</p>
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
