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

  // Landing Page Sections
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  showcaseTitle: string;
  showcaseSubtitle: string;

  privacyTitle: string;
  privacyDesc: string;
  privacyPoint1: string;
  privacyPoint2: string;
  privacyPoint3: string;

  pricingTitle: string;
  pricingSubtitle: string;
  freeTierTitle: string;
  freeTierPrice: string;
  freeTierDesc: string;
  proTierTitle: string;
  proTierPrice: string;
  proTierDesc: string;

  footerPrivacy: string;
  footerTerms: string;
  footerRights: string;
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

    howItWorksTitle: 'How LogoLoom Works',
    howItWorksSubtitle: 'From raw generic files to branded, high-conversion PDFs in under 120 seconds.',
    step1Title: '1. Drop your logo',
    step1Desc: 'Upload your SVG, PNG, or JPG. We instantly extract your exact brand hue using computer vision.',
    step2Title: '2. Watch it weave live',
    step2Desc: 'Pick a template and see the typography, accents, and QR code update seamlessly in real time.',
    step3Title: '3. Instant PDF Download',
    step3Desc: 'Download ready-to-print 300 DPI documents for your clients. No signup, no account, zero delay.',

    showcaseTitle: 'Handcrafted Templates for Coaches & Consultants',
    showcaseSubtitle: 'Designed specifically for high-ticket service providers who value craft and clarity.',

    privacyTitle: 'Privacy by Design',
    privacyDesc: 'Your logo, client names, and generated documents never leave your device.',
    privacyPoint1: 'Zero Server Uploads: All rendering happens locally in your browser memory.',
    privacyPoint2: 'No Tracking Cookies: We collect zero invasive telemetry or client data.',
    privacyPoint3: 'Offline Capable: Once loaded, generate documents even without an active internet connection.',

    pricingTitle: 'Simple, Transparent Pricing',
    pricingSubtitle: 'Free forever for standard use. Upgrade only if you want full white-label branding.',
    freeTierTitle: 'Free Forever',
    freeTierPrice: '$0',
    freeTierDesc: 'Everything you need to send professional, branded documents to your clients.',
    proTierTitle: 'Pro White-Label',
    proTierPrice: '$9 / mo',
    proTierDesc: 'For established agencies and coaches who demand 100% white-label documents.',

    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerRights: 'All rights reserved. Designed for craft & speed.',
  },
  fr: {
    appTitle: 'LogoLoom',
    appTagline: 'Brandez vos documents clients en 2 minutes',
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

    howItWorksTitle: 'Comment fonctionne LogoLoom',
    howItWorksSubtitle: 'Passez d\'un fichier générique à un PDF brandé de prestige en moins de 120 secondes.',
    step1Title: '1. Déposez votre logo',
    step1Desc: 'Importez votre logo. Notre moteur analyse immédiatement les pixels pour extraire votre couleur de marque.',
    step2Title: '2. Prévisualisez en direct',
    step2Desc: 'Sélectionnez un modèle et admirez l\'alignement typographique, les contrastes et le QR code en temps réel.',
    step3Title: '3. Téléchargement immédiat',
    step3Desc: 'Téléchargez un PDF prêt à l\'impression (300 DPI). Sans création de compte, sans friction.',

    showcaseTitle: 'Des modèles d\'exception pour consultants & coachs',
    showcaseSubtitle: 'Créés sur mesure pour valoriser votre accompagnement et impressionner vos clients.',

    privacyTitle: 'Confidentialité absolue',
    privacyDesc: 'Vos fichiers et données clients ne quittent jamais votre ordinateur.',
    privacyPoint1: 'Zéro transfert serveur : Tout le rendu est calculé localement dans votre navigateur.',
    privacyPoint2: 'Aucun cookie espion : Pas de traceurs intrusifs ni revente de données.',
    privacyPoint3: 'Fonctionne hors-ligne : Une fois la page chargée, vous pouvez créer vos PDFs sans réseau.',

    pricingTitle: 'Tarifs simples et transparents',
    pricingSubtitle: 'Gratuit pour l\'essentiel. Passez à Pro uniquement pour le label blanc complet.',
    freeTierTitle: 'Gratuit à vie',
    freeTierPrice: '0 €',
    freeTierDesc: 'Tout ce dont vous avez besoin pour envoyer des PDFs impeccables à vos clients.',
    proTierTitle: 'Pro White-Label',
    proTierPrice: '9 € / mois',
    proTierDesc: 'Pour les coachs et agences qui exigent une marque 100% blanche sans mention LogoLoom.',

    footerPrivacy: 'Politique de confidentialité',
    footerTerms: 'Conditions d\'utilisation',
    footerRights: 'Tous droits réservés. Conçu pour la clarté et la rapidité.',
  },
  es: {
    appTitle: 'LogoLoom',
    appTagline: 'Crea documentos con tu marca en menos de 2 minutos',
    privacyBadge: '100% Local y Privado',
    privacyTooltip: 'Tu logotipo y documentos nunca salen de tu navegador.',
    
    stepLogo: '1. Logotipo de marca',
    stepLogoSub: 'Sube tu logo SVG, PNG o JPG',
    dragDropLogo: 'Arrastra tu logo aquí, o',
    clickToUpload: 'examinar archivo',
    supportedFormats: 'SVG, PNG, JPG (hasta 5MB)',
    colorExtracted: 'Color dominante extraído automáticamente',
    removeLogo: 'Eliminar',

    stepColor: '2. Color de acento',
    stepColorSub: 'Extraído del logo o paleta recomendada',
    extractedFromLogo: 'Detectado en el logo',
    curatedPalettes: 'Paletas sugeridas',
    customHex: 'Código HEX personalizado',
    contrastNoticeGood: 'Contraste óptimo (WCAG AA)',
    contrastNoticeAdjusted: 'Tono ajustado para máxima legibilidad en papel',

    stepTemplate: '3. Plantilla de documento',
    templateHabitTitle: 'Rastreador de hábitos 30 días',
    templateHabitDesc: 'Cuadrícula de objetivos y reflexiones para clientes de coaching',
    templateRoadmapTitle: 'Hoja de ruta 90 días',
    templateRoadmapDesc: 'Plan de acción estratégico paso a paso para consultores',
    templateWelcomeTitle: 'Pack de bienvenida al cliente',
    templateWelcomeDesc: 'Guía de onboarding con acuerdos de trabajo y citas clave',

    moreOptions: 'Más opciones y personalización',
    hideOptions: 'Ocultar opciones',
    paperFormat: 'Tamaño de papel',
    formatA4: 'A4 (Internacional)',
    formatLetter: 'US Letter',
    documentLanguage: 'Idioma del contenido del PDF',
    companyNameLabel: 'Nombre de marca / empresa',
    companyNamePlaceholder: 'ej. Apex Performance',
    coachNameLabel: 'Tu nombre / cargo',
    coachNamePlaceholder: 'ej. Alejandro Martín',
    clientNameLabel: 'Nombre del cliente (opcional)',
    clientNamePlaceholder: 'ej. Para Carmen Gómez',
    qrCodeLabel: 'Código QR a tu web o reservas',
    qrCodePlaceholder: 'https://calendly.com/tu-enlace',
    qrCodeHint: 'Escaneable directamente desde el PDF impreso por tu cliente',

    downloadPdf: 'Descargar PDF listo',
    generatingPdf: 'Generando PDF (300 DPI)...',
    downloadSuccess: '¡Descargado con éxito!',

    livePreview: 'Vista previa en directo',
    zoomFit: 'Ajustar a pantalla',
    zoom100: 'Escala 100%',
    instantUpdate: 'Actualización en vivo',
    mobileEditButton: 'Personalizar marca y opciones',
    mobileCloseButton: 'Ver vista previa',

    whiteLabelPro: 'Pro Marca Blanca',
    proBadge: 'PRO',
    removeFooterWatermark: 'Eliminar pie de página y marca "Made with LogoLoom"',

    howItWorksTitle: 'Cómo funciona LogoLoom',
    howItWorksSubtitle: 'Convierte archivos genéricos en PDFs de alto impacto en menos de 2 minutos.',
    step1Title: '1. Sube tu logotipo',
    step1Desc: 'Sube tu logo y detectamos tu color de marca al instante con algoritmos visuales.',
    step2Title: '2. Visualiza los cambios en vivo',
    step2Desc: 'Elige plantilla y observa los textos, contrastes y código QR actualizarse al instante.',
    step3Title: '3. Descarga inmediata',
    step3Desc: 'Descarga PDFs de calidad de impresión (300 DPI) para tus clientes. Sin cuentas ni registros.',

    showcaseTitle: 'Plantillas creadas para coaches y consultores',
    showcaseSubtitle: 'Diseñadas para reflejar excelencia y claridad ante tus clientes.',

    privacyTitle: 'Privacidad por diseño',
    privacyDesc: 'Tus archivos y datos de clientes jamás se envían a ningún servidor externo.',
    privacyPoint1: 'Procesamiento local: Toda la generación de PDF ocurre en tu navegador.',
    privacyPoint2: 'Sin cookies espía: Cero recolección de telemetría invasiva.',
    privacyPoint3: 'Funciona offline: Puedes generar documentos sin conexión una vez cargada la web.',

    pricingTitle: 'Precios claros y sin sorpresas',
    pricingSubtitle: 'Gratis para uso habitual. Actualiza a Pro solo si requieres marca blanca total.',
    freeTierTitle: 'Gratis para siempre',
    freeTierPrice: '0 €',
    freeTierDesc: 'Todo lo necesario para enviar documentos de prestigio a tus clientes.',
    proTierTitle: 'Pro Marca Blanca',
    proTierPrice: '9 € / mes',
    proTierDesc: 'Para consultores y agencias que exigen total marca blanca sin créditos externos.',

    footerPrivacy: 'Política de privacidad',
    footerTerms: 'Términos de servicio',
    footerRights: 'Todos los derechos reservados. Creado para la velocidad y el diseño.',
  },
  de: {
    appTitle: 'LogoLoom',
    appTagline: 'Brand-Dokumente für Kunden in 2 Minuten erstellen',
    privacyBadge: '100% Lokal & Sicher',
    privacyTooltip: 'Ihr Logo und Ihre Dokumente verlassen niemals Ihren Browser.',
    
    stepLogo: '1. Marken-Logo',
    stepLogoSub: 'SVG, PNG oder JPG Logo ablegen',
    dragDropLogo: 'Logo hier ablegen, oder',
    clickToUpload: 'Datei auswählen',
    supportedFormats: 'SVG, PNG, JPG (bis zu 5MB)',
    colorExtracted: 'Dominante Markenfarbe automatisch extrahiert',
    removeLogo: 'Entfernen',

    stepColor: '2. Akzentfarbe',
    stepColorSub: 'Aus Logo extrahiert oder Palette wählen',
    extractedFromLogo: 'Aus Logo erkannt',
    curatedPalettes: 'Empfohlene Paletten',
    customHex: 'Benutzerdefinierter HEX-Code',
    contrastNoticeGood: 'Optimaler Kontrast (WCAG AA)',
    contrastNoticeAdjusted: 'Farbton für perfekten Druckkontrast optimiert',

    stepTemplate: '3. Dokumenten-Vorlage',
    templateHabitTitle: '30-Tage Gewohnheits-Tracker',
    templateHabitDesc: 'Matrix mit wöchentlichen Reflexionen für Coaching-Klienten',
    templateRoadmapTitle: '90-Tage Roadmap',
    templateRoadmapDesc: 'Strategischer Aktionsplan für Unternehmensberater & Coaches',
    templateWelcomeTitle: 'Kunden-Willkommenspaket',
    templateWelcomeDesc: 'Onboarding-Leitfaden mit Zusammenarbeitsregeln & Meilensteinen',

    moreOptions: 'Weitere Optionen & Anpassungen',
    hideOptions: 'Optionen ausblenden',
    paperFormat: 'Papierformat',
    formatA4: 'DIN A4 (Standard)',
    formatLetter: 'US Letter',
    documentLanguage: 'Sprache des PDF-Inhalts',
    companyNameLabel: 'Unternehmens- / Studioname',
    companyNamePlaceholder: 'z.B. Apex Beratung',
    coachNameLabel: 'Ihr Name / Titel',
    coachNamePlaceholder: 'z.B. Alexander Martin',
    clientNameLabel: 'Kundenname (optional)',
    clientNamePlaceholder: 'z.B. Für Julia Becker',
    qrCodeLabel: 'QR-Code zu Kalender oder Website',
    qrCodePlaceholder: 'https://calendly.com/ihr-link',
    qrCodeHint: 'Wird direkt auf der gedruckten PDF-Seite scannbar abgebildet',

    downloadPdf: 'Fertige PDF herunterladen',
    generatingPdf: 'Erstelle PDF (300 DPI)...',
    downloadSuccess: 'Erfolgreich heruntergeladen!',

    livePreview: 'Live-Druckvorschau',
    zoomFit: 'An Bildschirm anpassen',
    zoom100: '100% Maßstab',
    instantUpdate: 'Aktualisiert in Echtzeit',
    mobileEditButton: 'Design & Optionen anpassen',
    mobileCloseButton: 'Vorschau ansehen',

    whiteLabelPro: 'Pro White-Label',
    proBadge: 'PRO',
    removeFooterWatermark: 'Wasserzeichen & LogoLoom-Fußzeile entfernen',

    howItWorksTitle: 'So funktioniert LogoLoom',
    howItWorksSubtitle: 'Von einfachen Dokumenten zu hochwertigen Marken-PDFs in unter 120 Sekunden.',
    step1Title: '1. Logo hochladen',
    step1Desc: 'Laden Sie Ihr Logo hoch. Unser System extrahiert Ihre Markenfarbe automatisch.',
    step2Title: '2. Live-Vorschau beobachten',
    step2Desc: 'Wählen Sie eine Vorlage und sehen Sie Typografie, Kontraste und QR-Codes in Echtzeit.',
    step3Title: '3. Sofortige PDF-Erstellung',
    step3Desc: 'Laden Sie druckfertige 300-DPI-Dokumente ohne Anmeldung oder Wartezeit herunter.',

    showcaseTitle: 'Erstklassige Vorlagen für Berater & Coaches',
    showcaseSubtitle: 'Entwickelt für Fachleute, die Wert auf Design, Klarheit und Wirkung legen.',

    privacyTitle: 'Datenschutz von Grund auf',
    privacyDesc: 'Ihre Dateien und Kundendaten verbleiben zu 100% lokal auf Ihrem Rechner.',
    privacyPoint1: 'Kein Server-Upload: Das Rendern geschieht ausschließlich in Ihrem Browser.',
    privacyPoint2: 'Keine Tracking-Cookies: Wir erfassen keinerlei persönliche Telemetrie.',
    privacyPoint3: 'Offline-Fähig: Dokumente können auch ohne aktive Verbindung generiert werden.',

    pricingTitle: 'Einfache & transparente Preise',
    pricingSubtitle: 'Dauerhaft kostenlos für reguläre Nutzung. Upgrade nur für White-Label.',
    freeTierTitle: 'Dauerhaft Kostenlos',
    freeTierPrice: '0 €',
    freeTierDesc: 'Alles, was Sie für professionelle Dokumente an Kunden benötigen.',
    proTierTitle: 'Pro White-Label',
    proTierPrice: '9 € / Monat',
    proTierDesc: 'Für Agenturen und Berater, die 100% White-Label ohne Fremdlogos verlangen.',

    footerPrivacy: 'Datenschutz',
    footerTerms: 'Nutzungsbedingungen',
    footerRights: 'Alle Rechte vorbehalten. Entwickelt für Geschwindigkeit und Ästhetik.',
  },
  pt: {
    appTitle: 'LogoLoom',
    appTagline: 'Crie documentos de marca para clientes em 2 minutos',
    privacyBadge: '100% Local e Seguro',
    privacyTooltip: 'O seu logotipo e documentos nunca saem do seu navegador.',
    
    stepLogo: '1. Logotipo da Marca',
    stepLogoSub: 'Arraste o seu logo SVG, PNG ou JPG',
    dragDropLogo: 'Arraste o seu logo aqui, ou',
    clickToUpload: 'procure ficheiro',
    supportedFormats: 'SVG, PNG, JPG (até 5MB)',
    colorExtracted: 'Cor dominante extraída automaticamente',
    removeLogo: 'Remover',

    stepColor: '2. Cor de Destaque',
    stepColorSub: 'Extraída do logo ou paleta curada',
    extractedFromLogo: 'Detetada no logo',
    curatedPalettes: 'Paletas sugeridas',
    customHex: 'Código HEX personalizado',
    contrastNoticeGood: 'Contraste ideal (WCAG AA)',
    contrastNoticeAdjusted: 'Tom ajustado para nitidez impecável na impressão',

    stepTemplate: '3. Modelo de Documento',
    templateHabitTitle: 'Rastreador de Hábitos 30 Dias',
    templateHabitDesc: 'Grelha de rotinas e reflexões para clientes de coaching',
    templateRoadmapTitle: 'Roteiro 90 Dias',
    templateRoadmapDesc: 'Plano de ação estratégico passo a passo para consultores',
    templateWelcomeTitle: 'Manual de Boas-Vindas',
    templateWelcomeDesc: 'Guia de integração com regras de colaboração e etapas chave',

    moreOptions: 'Mais opções e personalização',
    hideOptions: 'Ocultar opções',
    paperFormat: 'Formato do Papel',
    formatA4: 'A4 (Internacional)',
    formatLetter: 'US Letter',
    documentLanguage: 'Idioma do Conteúdo do PDF',
    companyNameLabel: 'Nome da Marca / Estúdio',
    companyNamePlaceholder: 'ex. Apex Performance',
    coachNameLabel: 'Seu Nome / Cargo',
    coachNamePlaceholder: 'ex. Alexandre Martins',
    clientNameLabel: 'Nome do Cliente (opcional)',
    clientNamePlaceholder: 'ex. Para Ana Santos',
    qrCodeLabel: 'QR Code para Agendamentos / Site',
    qrCodePlaceholder: 'https://calendly.com/seu-link',
    qrCodeHint: 'Pode ser lido diretamente a partir do PDF impresso pelo seu cliente',

    downloadPdf: 'Descarregar PDF Pronto',
    generatingPdf: 'A compor PDF (300 DPI)...',
    downloadSuccess: 'Descarregado com sucesso!',

    livePreview: 'Pré-visualização em Direto',
    zoomFit: 'Ajustar ao ecrã',
    zoom100: 'Escala 100%',
    instantUpdate: 'Atualização imediata',
    mobileEditButton: 'Personalizar Marca & Opções',
    mobileCloseButton: 'Ver Pré-visualização',

    whiteLabelPro: 'Pro Marca Branca',
    proBadge: 'PRO',
    removeFooterWatermark: 'Remover rodapé "Made with LogoLoom"',

    howItWorksTitle: 'Como funciona o LogoLoom',
    howItWorksSubtitle: 'Transforme modelos comuns em PDFs de excelência em menos de 120 segundos.',
    step1Title: '1. Arraste o seu logotipo',
    step1Desc: 'Envie o seu logo e o nosso sistema deteta a sua cor de marca instantaneamente.',
    step2Title: '2. Acompanhe em tempo real',
    step2Desc: 'Escolha um modelo e veja a tipografia, contrastes e código QR alinharem-se em direto.',
    step3Title: '3. Descarregue o PDF final',
    step3Desc: 'Gere ficheiros prontos para imprimir a 300 DPI sem registos nem demoras.',

    showcaseTitle: 'Modelos de alta qualidade para consultores e coaches',
    showcaseSubtitle: 'Criados com requinte para demonstrar credibilidade e foco aos seus clientes.',

    privacyTitle: 'Privacidade garantida',
    privacyDesc: 'Os seus ficheiros e informações de clientes permanecem estritamente no seu browser.',
    privacyPoint1: 'Zero envio para servidores: O processamento ocorre 100% no seu dispositivo.',
    privacyPoint2: 'Sem cookies invasivos: Não recolhemos nem partilhamos telemetria pessoal.',
    privacyPoint3: 'Trabalho offline: Gere documentos mesmo quando estiver sem internet.',

    pricingTitle: 'Preços transparentes',
    pricingSubtitle: 'Gratuito para utilização habitual. Atualize apenas se desejar marca branca total.',
    freeTierTitle: 'Gratuito para Sempre',
    freeTierPrice: '0 €',
    freeTierDesc: 'Tudo o que necessita para entregar PDFs de excelência aos seus clientes.',
    proTierTitle: 'Pro Marca Branca',
    proTierPrice: '9 € / mês',
    proTierDesc: 'Para consultores e agências que exigem personalização integral sem marcas externas.',

    footerPrivacy: 'Política de Privacidade',
    footerTerms: 'Termos de Utilização',
    footerRights: 'Todos os direitos reservados. Desenhado para rapidez e elegância.',
  },
  it: {
    appTitle: 'LogoLoom',
    appTagline: 'Crea documenti con il tuo brand in 2 minuti',
    privacyBadge: '100% Locale e Privato',
    privacyTooltip: 'Il tuo logo e i tuoi file non lasciano mai il tuo browser.',
    
    stepLogo: '1. Logo del Brand',
    stepLogoSub: 'Carica il tuo logo SVG, PNG o JPG',
    dragDropLogo: 'Trascina qui il tuo logo, o',
    clickToUpload: 'sfoglia file',
    supportedFormats: 'SVG, PNG, JPG (fino a 5MB)',
    colorExtracted: 'Colore dominante estratto automaticamente',
    removeLogo: 'Rimuovi',

    stepColor: '2. Colore d\'Accento',
    stepColorSub: 'Estratto dal logo o da palette consigliata',
    extractedFromLogo: 'Rilevato dal logo',
    curatedPalettes: 'Palette consigliate',
    customHex: 'Codice HEX personalizzato',
    contrastNoticeGood: 'Contrasto ottimale (WCAG AA)',
    contrastNoticeAdjusted: 'Tonalità ottimizzata per nitidezza perfetta su carta',

    stepTemplate: '3. Modello di Documento',
    templateHabitTitle: 'Registro Abitudini 30 Giorni',
    templateHabitDesc: 'Griglia quotidiana e riflessioni per clienti di coaching',
    templateRoadmapTitle: 'Tabella di Marcia 90 Giorni',
    templateRoadmapDesc: 'Piano d\'azione strategico per consulenti e business coach',
    templateWelcomeTitle: 'Pacchetto Benvenuto Cliente',
    templateWelcomeDesc: 'Guida di avvio con accordi di lavoro e prossimi appuntamenti',

    moreOptions: 'Altre opzioni e personalizzazione',
    hideOptions: 'Nascondi opzioni',
    paperFormat: 'Formato Carta',
    formatA4: 'A4 (Internazionale)',
    formatLetter: 'US Letter',
    documentLanguage: 'Lingua Contenuto PDF',
    companyNameLabel: 'Nome Brand / Studio',
    companyNamePlaceholder: 'es. Apex Studio',
    coachNameLabel: 'Tuo Nome / Qualifica',
    coachNamePlaceholder: 'es. Alessandro Martini',
    clientNameLabel: 'Nome Cliente (opzionale)',
    clientNamePlaceholder: 'es. Per Elena Rossi',
    qrCodeLabel: 'Codice QR per Prenotazioni o Sito',
    qrCodePlaceholder: 'https://calendly.com/tuo-link',
    qrCodeHint: 'Scansionabile direttamente dal PDF stampato dal tuo cliente',

    downloadPdf: 'Scarica PDF Pronto',
    generatingPdf: 'Composizione PDF (300 DPI)...',
    downloadSuccess: 'Scaricato con successo!',

    livePreview: 'Anteprima di Stampa Live',
    zoomFit: 'Adatta allo schermo',
    zoom100: 'Scala 100%',
    instantUpdate: 'Aggiornamento in tempo reale',
    mobileEditButton: 'Personalizza Stile & Opzioni',
    mobileCloseButton: 'Vedi Anteprima',

    whiteLabelPro: 'Pro White-Label',
    proBadge: 'PRO',
    removeFooterWatermark: 'Rimuovi watermark e dicitura "Made with LogoLoom"',

    howItWorksTitle: 'Come funziona LogoLoom',
    howItWorksSubtitle: 'Trasforma documenti generici in PDF esclusivi in meno di 120 secondi.',
    step1Title: '1. Carica il tuo logo',
    step1Desc: 'Carica il file del logo: il nostro algoritmo individua all\'istante il tuo colore di marca.',
    step2Title: '2. Osserva l\'anteprima live',
    step2Desc: 'Scegli il modello e vedi testi, stili e codice QR allinearsi in tempo reale.',
    step3Title: '3. Download immediato',
    step3Desc: 'Scarica PDF a 300 DPI pronti per la stampa senza dover creare alcun account.',

    showcaseTitle: 'Modelli artigianali per consulenti e coach',
    showcaseSubtitle: 'Pensati per valorizzare la tua autorevolezza e curare ogni dettaglio.',

    privacyTitle: 'Privacy fin dalla progettazione',
    privacyDesc: 'I tuoi file e i nomi dei clienti non vengono mai trasferiti a server esterni.',
    privacyPoint1: 'Zero caricamento su server: Il rendering avviene interamente nel tuo browser.',
    privacyPoint2: 'Nessun cookie di tracciamento: Rispettiamo la tua privacy al 100%.',
    privacyPoint3: 'Funziona anche offline: Crea e scarica documenti anche senza connessione.',

    pricingTitle: 'Prezzi semplici e trasparenti',
    pricingSubtitle: 'Gratuito per sempre per l\'uso standard. Passa a Pro solo per il white-label completo.',
    freeTierTitle: 'Gratis per Sempre',
    freeTierPrice: '0 €',
    freeTierDesc: 'Tutto ciò che serve per inviare documenti professionali ai tuoi clienti.',
    proTierTitle: 'Pro White-Label',
    proTierPrice: '9 € / mese',
    proTierDesc: 'Per professionisti e studi che desiderano documenti al 100% senza loghi di terze parti.',

    footerPrivacy: 'Informativa sulla privacy',
    footerTerms: 'Termini di servizio',
    footerRights: 'Tutti i diritti riservati. Progettato per qualità e velocità.',
  },
};
