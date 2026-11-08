import { InterfaceLang } from '@/types';

export interface UIStrings {
  appTitle: string;
  appTagline: string;
  privacyBadge: string;
  privacyTooltip: string;
  
  // Left Panel: Steps
  stepLogo: string;
  stepLogoSub: string;
  dragDropLogo: string;
  clickToUpload: string;
  supportedFormats: string;
  colorExtracted: string;
  removeLogo: string;

  stepColor: string;
  stepColorSub: string;
  extractedFromLogo: string;
  curatedPalettes: string;
  customHex: string;
  contrastNoticeGood: string;
  contrastNoticeAdjusted: string;

  stepTemplate: string;
  templateHabitTitle: string;
  templateHabitDesc: string;
  templateRoadmapTitle: string;
  templateRoadmapDesc: string;
  templateWelcomeTitle: string;
  templateWelcomeDesc: string;

  // More options
  moreOptions: string;
  hideOptions: string;
  paperFormat: string;
  formatA4: string;
  formatLetter: string;
  documentLanguage: string;
  companyNameLabel: string;
  companyNamePlaceholder: string;
  coachNameLabel: string;
  coachNamePlaceholder: string;
  clientNameLabel: string;
  clientNamePlaceholder: string;
  qrCodeLabel: string;
  qrCodePlaceholder: string;
  qrCodeHint: string;

  // Actions
  downloadPdf: string;
  generatingPdf: string;
  downloadSuccess: string;
  
  // Preview
  livePreview: string;
  zoomFit: string;
  zoom100: string;
  instantUpdate: string;
  mobileEditButton: string;
  mobileCloseButton: string;

  // Pro Banner / White-label
  whiteLabelPro: string;
  proBadge: string;
  removeFooterWatermark: string;
}

export const UI_TRANSLATIONS: Record<InterfaceLang, UIStrings> = {
  en: {
    appTitle: 'LogoLoom',
    appTagline: 'Brand your client documents in 2 minutes',
    privacyBadge: '100% Client-Side & Private',
    privacyTooltip: 'Your logo and documents never leave your browser. Zero server uploads.',
    
    stepLogo: '1. Brand Logo',
    stepLogoSub: 'Drop your SVG, PNG or JPG logo',
    dragDropLogo: 'Drop your logo here, or',
    clickToUpload: 'browse file',
    supportedFormats: 'SVG, PNG, JPG (up to 5MB)',
    colorExtracted: 'Dominant color auto-extracted',
    removeLogo: 'Remove',

    stepColor: '2. Brand Accent Color',
    stepColorSub: 'Auto-extracted or curated palette',
    extractedFromLogo: 'Extracted from logo',
    curatedPalettes: 'Curated palettes',
    customHex: 'Custom HEX',
    contrastNoticeGood: 'Optimal contrast (WCAG AA)',
    contrastNoticeAdjusted: 'Color optimized for crisp readability on print',

    stepTemplate: '3. Document Template',
    templateHabitTitle: '30-Day Habit Tracker',
    templateHabitDesc: 'Habit grid with weekly reflections for fitness & mindset clients',
    templateRoadmapTitle: '90-Day Roadmap',
    templateRoadmapDesc: 'Strategic step-by-step action plan for consultants & coaching',
    templateWelcomeTitle: 'Client Welcome Packet',
    templateWelcomeDesc: 'Onboarding guide with rules of engagement & key milestones',

    moreOptions: 'More options & customization',
    hideOptions: 'Hide extra options',
    paperFormat: 'Paper Size',
    formatA4: 'A4 (International)',
    formatLetter: 'US Letter',
    documentLanguage: 'Document Content Language',
    companyNameLabel: 'Brand / Studio Name',
    companyNamePlaceholder: 'e.g. Apex Performance',
    coachNameLabel: 'Your Name / Title',
    coachNamePlaceholder: 'e.g. Coach Alex Martin',
    clientNameLabel: 'Client Name (Optional)',
    clientNamePlaceholder: 'e.g. For Sarah Jenkins',
    qrCodeLabel: 'Your Booking / Website QR Code',
    qrCodePlaceholder: 'https://calendly.com/your-name',
    qrCodeHint: 'Scans directly to your booking link or client portal on the printed page',

    downloadPdf: 'Download Ready PDF',
    generatingPdf: 'Weaving PDF (300 DPI)...',
    downloadSuccess: 'Downloaded!',

    livePreview: 'Live Print Preview',
    zoomFit: 'Fit screen',
    zoom100: '100% scale',
    instantUpdate: 'Updates live with every change',
    mobileEditButton: 'Customize Brand & Options',
    mobileCloseButton: 'View Live Preview',

    whiteLabelPro: 'Pro White-Label',
    proBadge: 'PRO',
    removeFooterWatermark: 'Remove "Made with LogoLoom" watermark & footer',
  },
  fr: {
    appTitle: 'LogoLoom',
    appTagline: 'Brandez vos documents clients en moins de 2 minutes',
    privacyBadge: '100% Local & Privé',
    privacyTooltip: 'Votre logo et vos documents ne quittent jamais votre navigateur.',
    
    stepLogo: '1. Logo de marque',
    stepLogoSub: 'Déposez votre logo SVG, PNG ou JPG',
    dragDropLogo: 'Glissez votre logo ici, ou',
    clickToUpload: 'parcourir',
    supportedFormats: 'SVG, PNG, JPG (jusqu\'à 5 Mo)',
    colorExtracted: 'Couleur dominante extraite automatiquement',
    removeLogo: 'Supprimer',

    stepColor: '2. Couleur d\'accent',
    stepColorSub: 'Extraite du logo ou palette signature',
    extractedFromLogo: 'Détectée sur le logo',
    curatedPalettes: 'Palettes recommandées',
    customHex: 'Code HEX personnalisé',
    contrastNoticeGood: 'Contraste optimal (WCAG AA)',
    contrastNoticeAdjusted: 'Nuance ajustée pour une lisibilité parfaite à l\'impression',

    stepTemplate: '3. Modèle de document',
    templateHabitTitle: 'Suivi d\'habitudes 30 jours',
    templateHabitDesc: 'Grille d\'objectifs et bilans hebdomadaires pour vos coachés',
    templateRoadmapTitle: 'Feuille de route 90 jours',
    templateRoadmapDesc: 'Plan d\'action stratégique pas à pas pour consultants & coachs',
    templateWelcomeTitle: 'Pack d\'accueil client',
    templateWelcomeDesc: 'Guide d\'onboarding avec règles de collaboration et étapes clés',

    moreOptions: 'Plus d\'options et personnalisation',
    hideOptions: 'Masquer les options',
    paperFormat: 'Format papier',
    formatA4: 'A4 (Standard France/Europe)',
    formatLetter: 'US Letter',
    documentLanguage: 'Langue du document imprimé',
    companyNameLabel: 'Nom de votre entreprise / studio',
    companyNamePlaceholder: 'ex. Studio Horizon',
    coachNameLabel: 'Votre nom / titre',
    coachNamePlaceholder: 'ex. Alexandre Martin',
    clientNameLabel: 'Nom du client (facultatif)',
    clientNamePlaceholder: 'ex. Pour Sophie Bernard',
    qrCodeLabel: 'QR Code vers votre site ou prise de RDV',
    qrCodePlaceholder: 'https://calendly.com/votre-lien',
    qrCodeHint: 'Scannable directement depuis le PDF imprimé par votre client',

    downloadPdf: 'Télécharger le PDF prêt à l\'envoi',
    generatingPdf: 'Génération haute définition (300 DPI)...',
    downloadSuccess: 'Téléchargé !',

    livePreview: 'Aperçu direct haute fidélité',
    zoomFit: 'Ajuster à l\'écran',
    zoom100: 'Échelle 100%',
    instantUpdate: 'Mise à jour instantanée',
    mobileEditButton: 'Modifier le style & options',
    mobileCloseButton: 'Voir l\'aperçu',

    whiteLabelPro: 'Pro White-Label',
    proBadge: 'PRO',
    removeFooterWatermark: 'Supprimer la mention discrète "Made with LogoLoom"',
  },
  // Placeholders for ES, DE, PT, IT (populated fully in Phase 2)
  es: {} as any,
  de: {} as any,
  pt: {} as any,
  it: {} as any,
};

// Fallback to English for incomplete translations in Phase 1
['es', 'de', 'pt', 'it'].forEach((l) => {
  UI_TRANSLATIONS[l as InterfaceLang] = UI_TRANSLATIONS.en;
});
