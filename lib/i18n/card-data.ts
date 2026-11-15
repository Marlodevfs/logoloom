import type { BusinessCardContent, CardLayout, DocumentLang, InterfaceLang, PaperSize } from '@/types';

/** Points per millimetre (PDF units). */
export const MM = 72 / 25.4;

/** Card formats in millimetres. */
export const CARD_SIZES: Record<BusinessCardContent['cardSize'], { w: number; h: number }> = {
  eu: { w: 85, h: 55 },
  us: { w: 88.9, h: 50.8 },
};

/** Bleed added around each card in the printer file. */
export const BLEED_MM = 3;

/** Minimum white margin kept around the grid on a home-printed sheet. */
const SHEET_MARGIN_MM = 8;

const PAPER_MM: Record<PaperSize, { w: number; h: number }> = {
  a4: { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};

/** How many cards fit on a sheet, and where the grid starts (millimetres). */
export function sheetLayout(paper: PaperSize, size: BusinessCardContent['cardSize']) {
  const page = PAPER_MM[paper] || PAPER_MM.a4;
  const card = CARD_SIZES[size] || CARD_SIZES.eu;
  const cols = Math.max(1, Math.floor((page.w - 2 * SHEET_MARGIN_MM) / card.w));
  const rows = Math.max(1, Math.floor((page.h - 2 * SHEET_MARGIN_MM) / card.h));
  return {
    page,
    card,
    cols,
    rows,
    x0: (page.w - cols * card.w) / 2,
    y0: (page.h - rows * card.h) / 2,
  };
}

/** Address the QR code opens: the dedicated link, else the website. */
export function cardQrTarget(c: BusinessCardContent): string {
  const raw = (c.qrUrl || '').trim() || (c.website || '').trim();
  if (!raw) return '';
  if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
  return `https://${raw}`;
}

/** "Camille Martin" → "CM", shown when there is no logo. */
export function cardInitials(name: string): string {
  return (name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/** Filled contact lines, in display order. */
export function cardContactLines(c: BusinessCardContent): string[] {
  return [c.phone, c.email, c.website, c.address].map((x) => (x || '').trim()).filter(Boolean);
}

/** The centered layout has no room for a QR on the front: it moves to the back. */
export function qrOnBack(c: BusinessCardContent): boolean {
  return c.layout === 'centered';
}

const base = (lang: Omit<BusinessCardContent, 'layout' | 'showQr' | 'qrUrl' | 'backSide' | 'cardSize' | 'output'>): BusinessCardContent => ({
  layout: 'classic',
  showQr: true,
  qrUrl: '',
  backSide: false,
  cardSize: 'eu',
  output: 'sheet',
  ...lang,
});

/** Sample cards. Every name, number and address is fictional. */
export const DEFAULT_CARD: Record<DocumentLang, BusinessCardContent> = {
  fr: base({
    fullName: 'Camille Martin',
    jobTitle: 'Photographe',
    company: 'Studio Lumière',
    phone: '06 00 00 00 00',
    email: 'camille@exemple.fr',
    website: 'www.exemple.fr',
    address: '12 rue des Lilas, Lyon',
    backText: 'Portraits, mariages et entreprises',
  }),
  en: base({
    fullName: 'Alex Morgan',
    jobTitle: 'Photographer',
    company: 'Northlight Studio',
    phone: '+44 0000 000000',
    email: 'alex@example.com',
    website: 'www.example.com',
    address: '12 Mill Lane, Bristol',
    backText: 'Portraits, weddings and business',
  }),
  de: base({
    fullName: 'Lena Schneider',
    jobTitle: 'Fotografin',
    company: 'Studio Lichtblick',
    phone: '+49 000 0000000',
    email: 'lena@beispiel.de',
    website: 'www.beispiel.de',
    address: 'Lindenstraße 12, Köln',
    backText: 'Porträts, Hochzeiten und Business',
  }),
  es: base({
    fullName: 'Lucía García',
    jobTitle: 'Fotógrafa',
    company: 'Estudio Luz',
    phone: '+34 000 000 000',
    email: 'lucia@ejemplo.es',
    website: 'www.ejemplo.es',
    address: 'Calle de las Flores 12, Valencia',
    backText: 'Retratos, bodas y empresas',
  }),
  it: base({
    fullName: 'Giulia Rossi',
    jobTitle: 'Fotografa',
    company: 'Studio Luce',
    phone: '+39 000 000 0000',
    email: 'giulia@esempio.it',
    website: 'www.esempio.it',
    address: 'Via dei Tigli 12, Bologna',
    backText: 'Ritratti, matrimoni e aziende',
  }),
  pt: base({
    fullName: 'Inês Costa',
    jobTitle: 'Fotógrafa',
    company: 'Estúdio Luz',
    phone: '+351 000 000 000',
    email: 'ines@exemplo.pt',
    website: 'www.exemplo.pt',
    address: 'Rua das Flores 12, Porto',
    backText: 'Retratos, casamentos e empresas',
  }),
};

export const getDefaultCardContent = (lang: DocumentLang): BusinessCardContent => ({ ...(DEFAULT_CARD[lang] || DEFAULT_CARD.en) });

export const blankCard = (c: BusinessCardContent): BusinessCardContent => ({
  ...c,
  fullName: '',
  jobTitle: '',
  company: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  qrUrl: '',
  backText: '',
});

export interface CardCopy {
  title: string;
  help: string;
  you: string;
  fullName: string;
  jobTitle: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  logo: string;
  logoHint: string;
  addLogo: string;
  removeLogo: string;
  logoError: string;
  qr: string;
  qrToggle: string;
  qrUrl: string;
  qrUrlHint: string;
  qrBackNote: string;
  design: string;
  layouts: Record<CardLayout, string>;
  color: string;
  customColor: string;
  back: string;
  backToggle: string;
  backText: string;
  print: string;
  outputs: Record<BusinessCardContent['output'], { name: string; desc: (n: number) => string }>;
  cardSize: string;
  sizes: Record<BusinessCardContent['cardSize'], string>;
  paper: string;
  duplexNote: string;
  front: string;
  backLabel: string;
  preview: string;
  clear: string;
  clearConfirm: string;
  cancel: string;
  privacy: string;
}

export const CARD_COPY: Record<InterfaceLang, CardCopy> = {
  fr: {
    title: 'Créez votre carte de visite',
    help: 'Remplissez vos informations, choisissez un style, puis téléchargez le PDF : une planche à imprimer chez vous, ou un fichier pour l’imprimeur.',
    you: 'Vos informations',
    fullName: 'Prénom et nom',
    jobTitle: 'Métier / poste',
    company: 'Entreprise',
    phone: 'Téléphone',
    email: 'E-mail',
    website: 'Site web',
    address: 'Adresse',
    logo: 'Logo (facultatif)',
    logoHint: 'La couleur de la carte s’adapte à votre logo. Sans logo, vos initiales le remplacent.',
    addLogo: 'Ajouter un logo',
    removeLogo: 'Retirer',
    logoError: 'Image illisible. Essayez un PNG ou un JPG.',
    qr: 'QR code',
    qrToggle: 'Ajouter un QR code',
    qrUrl: 'Lien du QR code',
    qrUrlHint: 'Vide : votre site web',
    qrBackNote: 'Avec la mise en page centrée, le QR code se place au verso.',
    design: 'Style',
    layouts: { classic: 'Classique', band: 'Bandeau', centered: 'Centrée' },
    color: 'Couleur',
    customColor: 'Autre couleur',
    back: 'Verso',
    backToggle: 'Imprimer un verso',
    backText: 'Phrase du verso',
    print: 'Impression',
    outputs: {
      sheet: { name: 'Planche à imprimer', desc: (n) => `${n} cartes par page, avec traits de coupe` },
      printer: { name: 'Fichier imprimeur', desc: () => 'Une carte par page, fond perdu de 3 mm' },
    },
    cardSize: 'Format',
    sizes: { eu: '85 × 55 mm (Europe)', us: '3,5 × 2 in (US)' },
    paper: 'Papier',
    duplexNote: 'Pour le verso, imprimez en recto verso, retournement sur le bord long.',
    front: 'Recto',
    backLabel: 'Verso',
    preview: 'Aperçu',
    clear: 'Partir d’une carte vide',
    clearConfirm: 'Effacer l’exemple ?',
    cancel: 'Annuler',
    privacy: 'Votre carte reste dans ce navigateur. Rien n’est envoyé sur nos serveurs.',
  },
  en: {
    title: 'Create your business card',
    help: 'Fill in your details, pick a style, then download the PDF: a sheet to print at home, or a file for the print shop.',
    you: 'Your details',
    fullName: 'Full name',
    jobTitle: 'Job title',
    company: 'Company',
    phone: 'Phone',
    email: 'Email',
    website: 'Website',
    address: 'Address',
    logo: 'Logo (optional)',
    logoHint: 'The card colour adapts to your logo. Without a logo, your initials take its place.',
    addLogo: 'Add a logo',
    removeLogo: 'Remove',
    logoError: 'Could not read this image. Try a PNG or JPG.',
    qr: 'QR code',
    qrToggle: 'Add a QR code',
    qrUrl: 'QR code link',
    qrUrlHint: 'Blank: your website',
    qrBackNote: 'With the centered layout, the QR code goes on the back.',
    design: 'Style',
    layouts: { classic: 'Classic', band: 'Band', centered: 'Centered' },
    color: 'Colour',
    customColor: 'Other colour',
    back: 'Back',
    backToggle: 'Print a back side',
    backText: 'Back side line',
    print: 'Printing',
    outputs: {
      sheet: { name: 'Sheet to print', desc: (n) => `${n} cards per page, with crop marks` },
      printer: { name: 'Print shop file', desc: () => 'One card per page, 3 mm bleed' },
    },
    cardSize: 'Card size',
    sizes: { eu: '85 × 55 mm (Europe)', us: '3.5 × 2 in (US)' },
    paper: 'Paper',
    duplexNote: 'For the back, print double-sided, flipping on the long edge.',
    front: 'Front',
    backLabel: 'Back',
    preview: 'Preview',
    clear: 'Start from a blank card',
    clearConfirm: 'Erase the example?',
    cancel: 'Cancel',
    privacy: 'Your card stays in this browser. Nothing is sent to our servers.',
  },
  de: {
    title: 'Erstellen Sie Ihre Visitenkarte',
    help: 'Angaben ausfüllen, Stil wählen, PDF herunterladen: ein Bogen zum Selbstdrucken oder eine Datei für die Druckerei.',
    you: 'Ihre Angaben',
    fullName: 'Vor- und Nachname',
    jobTitle: 'Beruf / Position',
    company: 'Firma',
    phone: 'Telefon',
    email: 'E-Mail',
    website: 'Website',
    address: 'Adresse',
    logo: 'Logo (optional)',
    logoHint: 'Die Kartenfarbe passt sich Ihrem Logo an. Ohne Logo stehen dort Ihre Initialen.',
    addLogo: 'Logo hinzufügen',
    removeLogo: 'Entfernen',
    logoError: 'Bild nicht lesbar. Versuchen Sie PNG oder JPG.',
    qr: 'QR-Code',
    qrToggle: 'QR-Code hinzufügen',
    qrUrl: 'Link des QR-Codes',
    qrUrlHint: 'Leer: Ihre Website',
    qrBackNote: 'Beim zentrierten Layout steht der QR-Code auf der Rückseite.',
    design: 'Stil',
    layouts: { classic: 'Klassisch', band: 'Farbband', centered: 'Zentriert' },
    color: 'Farbe',
    customColor: 'Andere Farbe',
    back: 'Rückseite',
    backToggle: 'Rückseite drucken',
    backText: 'Text der Rückseite',
    print: 'Druck',
    outputs: {
      sheet: { name: 'Bogen zum Ausdrucken', desc: (n) => `${n} Karten pro Seite, mit Schnittmarken` },
      printer: { name: 'Datei für die Druckerei', desc: () => 'Eine Karte pro Seite, 3 mm Beschnitt' },
    },
    cardSize: 'Format',
    sizes: { eu: '85 × 55 mm (Europa)', us: '3,5 × 2 in (USA)' },
    paper: 'Papier',
    duplexNote: 'Für die Rückseite beidseitig drucken, Wenden an der langen Kante.',
    front: 'Vorderseite',
    backLabel: 'Rückseite',
    preview: 'Vorschau',
    clear: 'Mit leerer Karte beginnen',
    clearConfirm: 'Beispiel löschen?',
    cancel: 'Abbrechen',
    privacy: 'Ihre Karte bleibt in diesem Browser. Nichts wird an unsere Server gesendet.',
  },
  es: {
    title: 'Crea tu tarjeta de visita',
    help: 'Rellena tus datos, elige un estilo y descarga el PDF: una hoja para imprimir en casa o un archivo para la imprenta.',
    you: 'Tus datos',
    fullName: 'Nombre y apellidos',
    jobTitle: 'Profesión / puesto',
    company: 'Empresa',
    phone: 'Teléfono',
    email: 'Correo',
    website: 'Sitio web',
    address: 'Dirección',
    logo: 'Logo (opcional)',
    logoHint: 'El color de la tarjeta se adapta a tu logo. Sin logo, aparecen tus iniciales.',
    addLogo: 'Añadir un logo',
    removeLogo: 'Quitar',
    logoError: 'Imagen ilegible. Prueba con PNG o JPG.',
    qr: 'Código QR',
    qrToggle: 'Añadir un código QR',
    qrUrl: 'Enlace del código QR',
    qrUrlHint: 'Vacío: tu sitio web',
    qrBackNote: 'Con el diseño centrado, el código QR va en el reverso.',
    design: 'Estilo',
    layouts: { classic: 'Clásico', band: 'Banda', centered: 'Centrado' },
    color: 'Color',
    customColor: 'Otro color',
    back: 'Reverso',
    backToggle: 'Imprimir un reverso',
    backText: 'Frase del reverso',
    print: 'Impresión',
    outputs: {
      sheet: { name: 'Hoja para imprimir', desc: (n) => `${n} tarjetas por página, con marcas de corte` },
      printer: { name: 'Archivo para imprenta', desc: () => 'Una tarjeta por página, sangrado de 3 mm' },
    },
    cardSize: 'Formato',
    sizes: { eu: '85 × 55 mm (Europa)', us: '3,5 × 2 in (EE. UU.)' },
    paper: 'Papel',
    duplexNote: 'Para el reverso, imprime a doble cara, volteando por el borde largo.',
    front: 'Anverso',
    backLabel: 'Reverso',
    preview: 'Vista previa',
    clear: 'Empezar con una tarjeta vacía',
    clearConfirm: '¿Borrar el ejemplo?',
    cancel: 'Cancelar',
    privacy: 'Tu tarjeta se queda en este navegador. No se envía nada a nuestros servidores.',
  },
  it: {
    title: 'Crea il tuo biglietto da visita',
    help: 'Inserisci i tuoi dati, scegli uno stile e scarica il PDF: un foglio da stampare a casa o un file per la tipografia.',
    you: 'I tuoi dati',
    fullName: 'Nome e cognome',
    jobTitle: 'Professione / ruolo',
    company: 'Azienda',
    phone: 'Telefono',
    email: 'E-mail',
    website: 'Sito web',
    address: 'Indirizzo',
    logo: 'Logo (facoltativo)',
    logoHint: 'Il colore del biglietto si adatta al tuo logo. Senza logo compaiono le tue iniziali.',
    addLogo: 'Aggiungi un logo',
    removeLogo: 'Rimuovi',
    logoError: 'Immagine illeggibile. Prova PNG o JPG.',
    qr: 'Codice QR',
    qrToggle: 'Aggiungi un codice QR',
    qrUrl: 'Link del codice QR',
    qrUrlHint: 'Vuoto: il tuo sito web',
    qrBackNote: 'Con il layout centrato, il codice QR va sul retro.',
    design: 'Stile',
    layouts: { classic: 'Classico', band: 'Fascia', centered: 'Centrato' },
    color: 'Colore',
    customColor: 'Altro colore',
    back: 'Retro',
    backToggle: 'Stampa un retro',
    backText: 'Frase del retro',
    print: 'Stampa',
    outputs: {
      sheet: { name: 'Foglio da stampare', desc: (n) => `${n} biglietti per pagina, con segni di taglio` },
      printer: { name: 'File per la tipografia', desc: () => 'Un biglietto per pagina, abbondanza di 3 mm' },
    },
    cardSize: 'Formato',
    sizes: { eu: '85 × 55 mm (Europa)', us: '3,5 × 2 in (USA)' },
    paper: 'Carta',
    duplexNote: 'Per il retro, stampa fronte-retro, girando sul lato lungo.',
    front: 'Fronte',
    backLabel: 'Retro',
    preview: 'Anteprima',
    clear: 'Parti da un biglietto vuoto',
    clearConfirm: 'Cancellare l’esempio?',
    cancel: 'Annulla',
    privacy: 'Il tuo biglietto resta in questo browser. Nulla viene inviato ai nostri server.',
  },
  pt: {
    title: 'Crie o seu cartão de visita',
    help: 'Preencha os seus dados, escolha um estilo e descarregue o PDF: uma folha para imprimir em casa ou um ficheiro para a gráfica.',
    you: 'Os seus dados',
    fullName: 'Nome completo',
    jobTitle: 'Profissão / cargo',
    company: 'Empresa',
    phone: 'Telefone',
    email: 'E-mail',
    website: 'Site',
    address: 'Morada',
    logo: 'Logótipo (opcional)',
    logoHint: 'A cor do cartão adapta-se ao seu logótipo. Sem logótipo, aparecem as suas iniciais.',
    addLogo: 'Adicionar logótipo',
    removeLogo: 'Remover',
    logoError: 'Imagem ilegível. Experimente PNG ou JPG.',
    qr: 'Código QR',
    qrToggle: 'Adicionar um código QR',
    qrUrl: 'Link do código QR',
    qrUrlHint: 'Vazio: o seu site',
    qrBackNote: 'Com o layout centrado, o código QR vai para o verso.',
    design: 'Estilo',
    layouts: { classic: 'Clássico', band: 'Faixa', centered: 'Centrado' },
    color: 'Cor',
    customColor: 'Outra cor',
    back: 'Verso',
    backToggle: 'Imprimir um verso',
    backText: 'Frase do verso',
    print: 'Impressão',
    outputs: {
      sheet: { name: 'Folha para imprimir', desc: (n) => `${n} cartões por página, com marcas de corte` },
      printer: { name: 'Ficheiro para a gráfica', desc: () => 'Um cartão por página, sangria de 3 mm' },
    },
    cardSize: 'Formato',
    sizes: { eu: '85 × 55 mm (Europa)', us: '3,5 × 2 in (EUA)' },
    paper: 'Papel',
    duplexNote: 'Para o verso, imprima frente e verso, virando pela margem longa.',
    front: 'Frente',
    backLabel: 'Verso',
    preview: 'Pré-visualização',
    clear: 'Começar com um cartão vazio',
    clearConfirm: 'Apagar o exemplo?',
    cancel: 'Cancelar',
    privacy: 'O seu cartão fica neste navegador. Nada é enviado para os nossos servidores.',
  },
};
