import { InterfaceLang, TemplateId } from '@/types';

/** Localized strings for page "chrome": section titles, catalog cards, footer, legal pages. */
export interface SiteChromeStrings {
  slogan: string;
  aboutTitle: string;
  categoryPersonal: string;
  categoryBusiness: string;
  viewCustomize: string;
  printableTemplate: string;
  freeVectorPdf: string;
  paperSizes: string;
  guideEyebrow: string;
  howToTitle: (name: string) => string;
  step: (n: number) => string;
  faqEyebrow: string;
  templateFaqTitle: string;
  exploreTitle: string;
  exploreSubtitle: string;
  viewAll: string;
  noscriptTitle: string;
  noscriptBody: string;
  footer: {
    product: string;
    templates: string;
    pricing: string;
    legal: string;
    legalNotice: string;
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
  };
  templateNames: Record<TemplateId, string>;
}

export const SITE_CHROME: Record<InterfaceLang, SiteChromeStrings> = {
  en: {
    slogan: 'The free CV maker with no subscription and no account. Your CV never leaves your browser.',
    aboutTitle: 'About LogoLoom and our printable documents',
    categoryPersonal: 'Planner',
    categoryBusiness: 'Business',
    viewCustomize: 'View & customize',
    printableTemplate: 'Printable PDF template',
    freeVectorPdf: 'Free vector PDF',
    paperSizes: 'A4 & US Letter',
    guideEyebrow: 'Simple 3-step guide',
    howToTitle: (name) => `How to customize and print your ${name.toLowerCase()}`,
    step: (n) => `Step ${n}`,
    faqEyebrow: 'Frequently asked questions',
    templateFaqTitle: 'Questions about printing and personalizing this template',
    exploreTitle: 'Explore other free printable templates',
    exploreSubtitle: 'All templates are free, minimalist and print-ready in A4 and US Letter.',
    viewAll: 'View all templates',
    noscriptTitle: 'JavaScript is disabled in your browser.',
    noscriptBody: 'Enable JavaScript to customize colors, add your logo and download print-ready vector PDFs.',
    footer: {
      product: 'Product',
      templates: 'Templates',
      pricing: 'Pricing',
      legal: 'Legal',
      legalNotice: 'Legal notice',
      privacy: 'Privacy policy',
      terms: 'Terms of sale',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    templateNames: {
      'habit-tracker': 'Habit Tracker',
      'goal-planner-90': '90-Day Goal Planner',
      'weekly-planner': 'Weekly Planner',
      'monthly-calendar': 'Monthly Calendar',
      'daily-priorities': 'Daily Priorities',
      'meal-planner': 'Meal Planner',
      'budget-tracker': 'Budget Tracker',
      checklist: 'Checklist',
      cv: 'CV / Resume',
    },
  },
  fr: {
    slogan: 'Le créateur de CV gratuit, sans abonnement et sans compte. Votre CV ne quitte jamais votre navigateur.',
    aboutTitle: 'À propos de LogoLoom et de nos documents à imprimer',
    categoryPersonal: 'Organisation',
    categoryBusiness: 'Pro',
    viewCustomize: 'Voir et personnaliser',
    printableTemplate: 'Modèle PDF à imprimer',
    freeVectorPdf: 'PDF vectoriel gratuit',
    paperSizes: 'A4 et US Letter',
    guideEyebrow: 'Guide en 3 étapes',
    howToTitle: (name) => `Comment personnaliser et imprimer votre modèle « ${name} »`,
    step: (n) => `Étape ${n}`,
    faqEyebrow: 'Questions fréquentes',
    templateFaqTitle: 'Questions sur l’impression et la personnalisation de ce modèle',
    exploreTitle: 'Découvrez nos autres modèles gratuits',
    exploreSubtitle: 'Tous les modèles sont gratuits, minimalistes et prêts à imprimer en A4 et US Letter.',
    viewAll: 'Voir tous les modèles',
    noscriptTitle: 'JavaScript est désactivé dans votre navigateur.',
    noscriptBody: 'Activez JavaScript pour personnaliser les couleurs, ajouter votre logo et télécharger vos PDF vectoriels.',
    footer: {
      product: 'Produit',
      templates: 'Modèles',
      pricing: 'Tarifs',
      legal: 'Légal',
      legalNotice: 'Mentions légales',
      privacy: 'Confidentialité',
      terms: 'Conditions générales de vente',
      contact: 'Contact',
      rights: 'Tous droits réservés.',
    },
    templateNames: {
      'habit-tracker': 'Suivi d’habitudes',
      'goal-planner-90': 'Objectifs 90 jours',
      'weekly-planner': 'Semainier',
      'monthly-calendar': 'Calendrier mensuel',
      'daily-priorities': 'Priorités du jour',
      'meal-planner': 'Menu de la semaine',
      'budget-tracker': 'Budget mensuel',
      checklist: 'Checklist',
      cv: 'CV',
    },
  },
  de: {
    slogan: 'Der kostenlose Lebenslauf-Generator, ohne Abo und ohne Konto. Ihr Lebenslauf verlässt nie Ihren Browser.',
    aboutTitle: 'Über LogoLoom und unsere druckbaren Dokumente',
    categoryPersonal: 'Planer',
    categoryBusiness: 'Business',
    viewCustomize: 'Ansehen & anpassen',
    printableTemplate: 'Druckbare PDF-Vorlage',
    freeVectorPdf: 'Kostenloses Vektor-PDF',
    paperSizes: 'A4 & US Letter',
    guideEyebrow: 'Einfache Anleitung in 3 Schritten',
    howToTitle: (name) => `So passen Sie die Vorlage „${name}“ an und drucken sie`,
    step: (n) => `Schritt ${n}`,
    faqEyebrow: 'Häufige Fragen',
    templateFaqTitle: 'Fragen zum Drucken und Anpassen dieser Vorlage',
    exploreTitle: 'Weitere kostenlose Vorlagen entdecken',
    exploreSubtitle: 'Alle Vorlagen sind kostenlos, minimalistisch und druckfertig in A4 und US Letter.',
    viewAll: 'Alle Vorlagen ansehen',
    noscriptTitle: 'JavaScript ist in Ihrem Browser deaktiviert.',
    noscriptBody: 'Aktivieren Sie JavaScript, um Farben anzupassen, Ihr Logo hinzuzufügen und druckfertige Vektor-PDFs herunterzuladen.',
    footer: {
      product: 'Produkt',
      templates: 'Vorlagen',
      pricing: 'Preise',
      legal: 'Rechtliches',
      legalNotice: 'Impressum',
      privacy: 'Datenschutz',
      terms: 'AGB',
      contact: 'Kontakt',
      rights: 'Alle Rechte vorbehalten.',
    },
    templateNames: {
      'habit-tracker': 'Gewohnheitstracker',
      'goal-planner-90': '90-Tage-Zielplaner',
      'weekly-planner': 'Wochenplaner',
      'monthly-calendar': 'Monatskalender',
      'daily-priorities': 'Tagesprioritäten',
      'meal-planner': 'Essensplaner',
      'budget-tracker': 'Budgetplaner',
      checklist: 'Checkliste',
      cv: 'Lebenslauf',
    },
  },
  es: {
    slogan: 'El creador de CV gratuito, sin suscripción y sin cuenta. Tu CV nunca sale de tu navegador.',
    aboutTitle: 'Sobre LogoLoom y nuestros documentos imprimibles',
    categoryPersonal: 'Organización',
    categoryBusiness: 'Negocio',
    viewCustomize: 'Ver y personalizar',
    printableTemplate: 'Plantilla PDF imprimible',
    freeVectorPdf: 'PDF vectorial gratis',
    paperSizes: 'A4 y US Letter',
    guideEyebrow: 'Guía en 3 pasos',
    howToTitle: (name) => `Cómo personalizar e imprimir tu plantilla «${name}»`,
    step: (n) => `Paso ${n}`,
    faqEyebrow: 'Preguntas frecuentes',
    templateFaqTitle: 'Preguntas sobre la impresión y personalización de esta plantilla',
    exploreTitle: 'Descubre otras plantillas gratuitas',
    exploreSubtitle: 'Todas las plantillas son gratuitas, minimalistas y listas para imprimir en A4 y US Letter.',
    viewAll: 'Ver todas las plantillas',
    noscriptTitle: 'JavaScript está desactivado en tu navegador.',
    noscriptBody: 'Activa JavaScript para personalizar colores, añadir tu logo y descargar PDF vectoriales listos para imprimir.',
    footer: {
      product: 'Producto',
      templates: 'Plantillas',
      pricing: 'Precios',
      legal: 'Legal',
      legalNotice: 'Aviso legal',
      privacy: 'Privacidad',
      terms: 'Condiciones de venta',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
    },
    templateNames: {
      'habit-tracker': 'Seguimiento de hábitos',
      'goal-planner-90': 'Objetivos a 90 días',
      'weekly-planner': 'Planificador semanal',
      'monthly-calendar': 'Calendario mensual',
      'daily-priorities': 'Prioridades del día',
      'meal-planner': 'Menú semanal',
      'budget-tracker': 'Control de gastos',
      checklist: 'Checklist',
      cv: 'Currículum',
    },
  },
  it: {
    slogan: 'Il creatore di CV gratuito, senza abbonamento e senza account. Il tuo CV non lascia mai il browser.',
    aboutTitle: 'LogoLoom e i nostri documenti stampabili',
    categoryPersonal: 'Planner',
    categoryBusiness: 'Lavoro',
    viewCustomize: 'Vedi e personalizza',
    printableTemplate: 'Modello PDF stampabile',
    freeVectorPdf: 'PDF vettoriale gratuito',
    paperSizes: 'A4 e US Letter',
    guideEyebrow: 'Guida in 3 passaggi',
    howToTitle: (name) => `Come personalizzare e stampare il modello «${name}»`,
    step: (n) => `Passaggio ${n}`,
    faqEyebrow: 'Domande frequenti',
    templateFaqTitle: 'Domande sulla stampa e la personalizzazione di questo modello',
    exploreTitle: 'Scopri gli altri modelli gratuiti',
    exploreSubtitle: 'Tutti i modelli sono gratuiti, minimalisti e pronti per la stampa in A4 e US Letter.',
    viewAll: 'Vedi tutti i modelli',
    noscriptTitle: 'JavaScript è disattivato nel tuo browser.',
    noscriptBody: 'Attiva JavaScript per personalizzare i colori, aggiungere il tuo logo e scaricare PDF vettoriali pronti per la stampa.',
    footer: {
      product: 'Prodotto',
      templates: 'Modelli',
      pricing: 'Prezzi',
      legal: 'Note legali',
      legalNotice: 'Note legali',
      privacy: 'Privacy',
      terms: 'Termini di vendita',
      contact: 'Contatto',
      rights: 'Tutti i diritti riservati.',
    },
    templateNames: {
      'habit-tracker': 'Tracker abitudini',
      'goal-planner-90': 'Obiettivi 90 giorni',
      'weekly-planner': 'Planner settimanale',
      'monthly-calendar': 'Calendario mensile',
      'daily-priorities': 'Priorità del giorno',
      'meal-planner': 'Menù settimanale',
      'budget-tracker': 'Budget mensile',
      checklist: 'Checklist',
      cv: 'Curriculum',
    },
  },
  pt: {
    slogan: 'O criador de CV gratuito, sem assinatura e sem conta. O seu CV nunca sai do seu navegador.',
    aboutTitle: 'Sobre a LogoLoom e os nossos documentos para imprimir',
    categoryPersonal: 'Organização',
    categoryBusiness: 'Negócios',
    viewCustomize: 'Ver e personalizar',
    printableTemplate: 'Modelo PDF para imprimir',
    freeVectorPdf: 'PDF vetorial grátis',
    paperSizes: 'A4 e US Letter',
    guideEyebrow: 'Guia em 3 passos',
    howToTitle: (name) => `Como personalizar e imprimir o modelo «${name}»`,
    step: (n) => `Passo ${n}`,
    faqEyebrow: 'Perguntas frequentes',
    templateFaqTitle: 'Perguntas sobre a impressão e personalização deste modelo',
    exploreTitle: 'Descubra outros modelos gratuitos',
    exploreSubtitle: 'Todos os modelos são gratuitos, minimalistas e prontos a imprimir em A4 e US Letter.',
    viewAll: 'Ver todos os modelos',
    noscriptTitle: 'O JavaScript está desativado no seu navegador.',
    noscriptBody: 'Ative o JavaScript para personalizar cores, adicionar o seu logo e descarregar PDF vetoriais prontos a imprimir.',
    footer: {
      product: 'Produto',
      templates: 'Modelos',
      pricing: 'Preços',
      legal: 'Legal',
      legalNotice: 'Aviso legal',
      privacy: 'Privacidade',
      terms: 'Condições de venda',
      contact: 'Contacto',
      rights: 'Todos os direitos reservados.',
    },
    templateNames: {
      'habit-tracker': 'Registo de hábitos',
      'goal-planner-90': 'Objetivos 90 dias',
      'weekly-planner': 'Planeador semanal',
      'monthly-calendar': 'Calendário mensal',
      'daily-priorities': 'Prioridades do dia',
      'meal-planner': 'Menu semanal',
      'budget-tracker': 'Orçamento mensal',
      checklist: 'Checklist',
      cv: 'Currículo',
    },
  },
};

export function getSiteChrome(lang: string): SiteChromeStrings {
  return SITE_CHROME[lang as InterfaceLang] || SITE_CHROME.en;
}
