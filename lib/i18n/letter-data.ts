import type { CoverLetterContent, DocumentLang, InterfaceLang } from '@/types';

/**
 * Cover letter: prefilled model per document language. Parts in [brackets] are
 * placeholders the user replaces; the preview highlights them and the studio
 * counts the ones left before download.
 */
export const DEFAULT_LETTER: Record<DocumentLang, CoverLetterContent> = {
  fr: {
    senderAddress: '',
    recipient: '[Nom du recruteur]\n[Nom de l’entreprise]\n[Adresse]\n[Code postal et ville]',
    place: '',
    date: '',
    subject: 'Candidature au poste de [intitulé du poste]',
    salutation: 'Madame, Monsieur,',
    body:
      'Actuellement [votre poste ou votre situation], je souhaite rejoindre [nom de l’entreprise] en tant que [intitulé du poste]. [Une phrase sur ce qui vous attire chez eux : un produit, un projet, une valeur.]\n\n' +
      'Au cours de mes [X] années chez [entreprise précédente], j’ai [une réalisation concrète, avec un chiffre si possible]. J’y ai aussi développé [une ou deux compétences utiles pour ce poste].\n\n' +
      '[Une ou deux qualités], je suis convaincu(e) de pouvoir contribuer rapidement à [un objectif de l’équipe ou de l’entreprise]. Je serais heureux(se) d’en discuter avec vous lors d’un entretien.',
    closing: 'Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.',
  },
  en: {
    senderAddress: '',
    recipient: '[Hiring manager’s name]\n[Company name]\n[Street address]\n[City and postcode]',
    place: '',
    date: '',
    subject: 'Application for the [job title] position',
    salutation: 'Dear [Hiring manager’s name],',
    body:
      'I am writing to apply for the [job title] position at [company name]. [One sentence on what draws you to them: a product, a project, a value.]\n\n' +
      'In my [X] years at [previous company], I [one concrete achievement, with a number if you have one]. I also built [one or two skills that matter for this role].\n\n' +
      '[One or two qualities], I am confident I can contribute quickly to [a goal of the team or company]. I would welcome the chance to discuss it with you in an interview.',
    closing: 'Yours sincerely,',
  },
  de: {
    senderAddress: '',
    recipient: '[Name der Ansprechperson]\n[Name des Unternehmens]\n[Straße und Hausnummer]\n[PLZ und Ort]',
    place: '',
    date: '',
    subject: 'Bewerbung als [Stellenbezeichnung]',
    salutation: 'Sehr geehrte Damen und Herren,',
    body:
      'derzeit bin ich [Ihre aktuelle Position oder Situation] und möchte mich bei [Name des Unternehmens] als [Stellenbezeichnung] bewerben. [Ein Satz dazu, was Sie an dem Unternehmen reizt: ein Produkt, ein Projekt, ein Wert.]\n\n' +
      'In meinen [X] Jahren bei [früheres Unternehmen] habe ich [ein konkretes Ergebnis, gern mit einer Zahl]. Dabei habe ich auch [ein oder zwei für die Stelle wichtige Kompetenzen] ausgebaut.\n\n' +
      '[Ein oder zwei Eigenschaften] – ich bin überzeugt, schnell zu [einem Ziel des Teams oder Unternehmens] beitragen zu können. Über eine Einladung zu einem Vorstellungsgespräch freue ich mich.',
    closing: 'Mit freundlichen Grüßen',
  },
  es: {
    senderAddress: '',
    recipient: '[Nombre del responsable]\n[Nombre de la empresa]\n[Dirección]\n[Código postal y ciudad]',
    place: '',
    date: '',
    subject: 'Candidatura al puesto de [nombre del puesto]',
    salutation: 'Estimado/a [nombre del responsable]:',
    body:
      'Actualmente [su puesto o situación actual], me gustaría incorporarme a [nombre de la empresa] como [nombre del puesto]. [Una frase sobre lo que le atrae de la empresa: un producto, un proyecto, un valor.]\n\n' +
      'Durante mis [X] años en [empresa anterior], [un logro concreto, con una cifra si la tiene]. También desarrollé [una o dos competencias útiles para el puesto].\n\n' +
      '[Una o dos cualidades], estoy convencido/a de que puedo contribuir rápidamente a [un objetivo del equipo o de la empresa]. Me encantaría comentarlo con usted en una entrevista.',
    closing: 'Atentamente,',
  },
  it: {
    senderAddress: '',
    recipient: '[Nome del selezionatore]\n[Nome dell’azienda]\n[Indirizzo]\n[CAP e città]',
    place: '',
    date: '',
    subject: 'Candidatura per la posizione di [titolo del ruolo]',
    salutation: 'Gentile [nome del selezionatore],',
    body:
      'Attualmente [la sua posizione o situazione], desidero candidarmi presso [nome dell’azienda] per il ruolo di [titolo del ruolo]. [Una frase su cosa la attira dell’azienda: un prodotto, un progetto, un valore.]\n\n' +
      'Nei miei [X] anni presso [azienda precedente] ho [un risultato concreto, con un numero se possibile]. Ho inoltre sviluppato [una o due competenze utili per il ruolo].\n\n' +
      '[Una o due qualità], sono convinto/a di poter contribuire rapidamente a [un obiettivo del team o dell’azienda]. Sarei lieto/a di parlarne con lei in un colloquio.',
    closing: 'Cordiali saluti,',
  },
  pt: {
    senderAddress: '',
    recipient: '[Nome do recrutador]\n[Nome da empresa]\n[Morada]\n[Código postal e cidade]',
    place: '',
    date: '',
    subject: 'Candidatura ao cargo de [nome do cargo]',
    salutation: 'Exmo.(a) Sr.(a) [nome do recrutador],',
    body:
      'Atualmente [o seu cargo ou situação], gostaria de integrar a [nome da empresa] como [nome do cargo]. [Uma frase sobre o que o atrai na empresa: um produto, um projeto, um valor.]\n\n' +
      'Nos meus [X] anos na [empresa anterior], [uma conquista concreta, com um número se possível]. Desenvolvi também [uma ou duas competências úteis para o cargo].\n\n' +
      '[Uma ou duas qualidades], estou convicto/a de que posso contribuir rapidamente para [um objetivo da equipa ou da empresa]. Teria todo o gosto em falar consigo numa entrevista.',
    closing: 'Com os melhores cumprimentos,',
  },
};

export function getDefaultLetterContent(lang: DocumentLang): CoverLetterContent {
  return DEFAULT_LETTER[lang] || DEFAULT_LETTER.en;
}

/** "Objet :" style prefix written before the subject, per document language. */
export const LETTER_SUBJECT_PREFIX: Record<DocumentLang, string> = {
  fr: 'Objet : ',
  en: '',
  de: '',
  es: 'Asunto: ',
  it: 'Oggetto: ',
  pt: 'Assunto: ',
};

/** "Paris, le 14 novembre 2026" / "London, 14 November 2026" … */
export function letterDateLine(lang: DocumentLang, place: string, date: string, now = new Date()): string {
  let when = date.trim();
  if (!when) {
    try {
      when = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
    } catch {
      when = now.toISOString().slice(0, 10);
    }
    if (lang === 'fr') when = `le ${when}`;
  }
  const where = place.trim();
  return where ? `${where}, ${when}` : when;
}

/** Paragraphs split on blank lines; single line breaks are kept inside a paragraph. */
export const letterParagraphs = (body: string): string[] =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

/** Number of [placeholders] still in the letter. */
export function countLetterPlaceholders(l: CoverLetterContent): number {
  const all = [l.senderAddress, l.recipient, l.place, l.date, l.subject, l.salutation, l.body, l.closing].join('\n');
  return (all.match(/\[[^\]\n]{1,80}\]/g) || []).length;
}

/** File name prefix for the downloaded PDF. */
export const LETTER_FILE_PREFIX: Record<DocumentLang, string> = {
  fr: 'Lettre_de_motivation',
  en: 'Cover_letter',
  de: 'Anschreiben',
  es: 'Carta_de_presentacion',
  it: 'Lettera_di_presentazione',
  pt: 'Carta_de_apresentacao',
};

export interface LetterStudioCopy {
  tabCv: string;
  tabLetter: string;
  title: string;
  help: string;
  fromCv: string;
  editCv: string;
  senderAddress: string;
  senderAddressHint: string;
  recipient: string;
  place: string;
  placeHint: string;
  date: string;
  dateHint: string;
  subject: string;
  salutation: string;
  body: string;
  bodyHint: string;
  closing: string;
  reset: string;
  resetConfirm: string;
  cancel: string;
  placeholdersLeft: (n: number) => string;
  allFilled: string;
}

export const LETTER_STUDIO_COPY: Record<InterfaceLang, LetterStudioCopy> = {
  fr: {
    tabCv: 'CV',
    tabLetter: 'Lettre de motivation',
    title: 'Votre lettre de motivation',
    help: 'Remplacez les passages entre [crochets] par vos propres mots. Une page suffit : trois paragraphes courts, concrets.',
    fromCv: 'Votre nom, votre email et votre téléphone viennent de votre CV.',
    editCv: 'Les modifier',
    senderAddress: 'Votre adresse',
    senderAddressHint: 'Facultatif. Sans adresse, seule votre ville apparaît.',
    recipient: 'Destinataire',
    place: 'Lieu',
    placeHint: 'Vide : la ville de votre CV.',
    date: 'Date',
    dateHint: 'Vide : la date du jour.',
    subject: 'Objet',
    salutation: 'Formule d’appel',
    body: 'Votre lettre',
    bodyHint: 'Laissez une ligne vide entre deux paragraphes.',
    closing: 'Formule de politesse',
    reset: 'Repartir du modèle',
    resetConfirm: 'Remplacer votre texte par le modèle ?',
    cancel: 'Annuler',
    placeholdersLeft: (n) => (n === 1 ? 'Il reste 1 passage entre [crochets] à remplacer.' : `Il reste ${n} passages entre [crochets] à remplacer.`),
    allFilled: 'Tous les [crochets] sont remplacés.',
  },
  en: {
    tabCv: 'CV',
    tabLetter: 'Cover letter',
    title: 'Your cover letter',
    help: 'Replace the parts in [brackets] with your own words. One page is enough: three short, concrete paragraphs.',
    fromCv: 'Your name, email and phone come from your CV.',
    editCv: 'Edit them',
    senderAddress: 'Your address',
    senderAddressHint: 'Optional. Without an address, only your city is shown.',
    recipient: 'Recipient',
    place: 'Place',
    placeHint: 'Empty: the city on your CV.',
    date: 'Date',
    dateHint: 'Empty: today’s date.',
    subject: 'Subject',
    salutation: 'Greeting',
    body: 'Your letter',
    bodyHint: 'Leave a blank line between paragraphs.',
    closing: 'Sign-off',
    reset: 'Start again from the model',
    resetConfirm: 'Replace your text with the model?',
    cancel: 'Cancel',
    placeholdersLeft: (n) => (n === 1 ? '1 part in [brackets] is left to replace.' : `${n} parts in [brackets] are left to replace.`),
    allFilled: 'Every [bracket] has been replaced.',
  },
  de: {
    tabCv: 'Lebenslauf',
    tabLetter: 'Anschreiben',
    title: 'Ihr Anschreiben',
    help: 'Ersetzen Sie die Stellen in [Klammern] durch Ihre eigenen Worte. Eine Seite genügt: drei kurze, konkrete Absätze.',
    fromCv: 'Name, E-Mail und Telefon stammen aus Ihrem Lebenslauf.',
    editCv: 'Ändern',
    senderAddress: 'Ihre Adresse',
    senderAddressHint: 'Optional. Ohne Adresse erscheint nur Ihr Ort.',
    recipient: 'Empfänger',
    place: 'Ort',
    placeHint: 'Leer: der Ort aus Ihrem Lebenslauf.',
    date: 'Datum',
    dateHint: 'Leer: das heutige Datum.',
    subject: 'Betreff',
    salutation: 'Anrede',
    body: 'Ihr Anschreiben',
    bodyHint: 'Zwischen zwei Absätzen eine Leerzeile lassen.',
    closing: 'Grußformel',
    reset: 'Mit der Vorlage neu beginnen',
    resetConfirm: 'Ihren Text durch die Vorlage ersetzen?',
    cancel: 'Abbrechen',
    placeholdersLeft: (n) => (n === 1 ? 'Noch 1 Stelle in [Klammern] zu ersetzen.' : `Noch ${n} Stellen in [Klammern] zu ersetzen.`),
    allFilled: 'Alle [Klammern] sind ersetzt.',
  },
  es: {
    tabCv: 'CV',
    tabLetter: 'Carta de presentación',
    title: 'Tu carta de presentación',
    help: 'Sustituye las partes entre [corchetes] por tus propias palabras. Basta una página: tres párrafos cortos y concretos.',
    fromCv: 'Tu nombre, email y teléfono vienen de tu CV.',
    editCv: 'Modificarlos',
    senderAddress: 'Tu dirección',
    senderAddressHint: 'Opcional. Sin dirección, solo aparece tu ciudad.',
    recipient: 'Destinatario',
    place: 'Lugar',
    placeHint: 'Vacío: la ciudad de tu CV.',
    date: 'Fecha',
    dateHint: 'Vacío: la fecha de hoy.',
    subject: 'Asunto',
    salutation: 'Saludo',
    body: 'Tu carta',
    bodyHint: 'Deja una línea en blanco entre dos párrafos.',
    closing: 'Despedida',
    reset: 'Volver al modelo',
    resetConfirm: '¿Sustituir tu texto por el modelo?',
    cancel: 'Cancelar',
    placeholdersLeft: (n) => (n === 1 ? 'Queda 1 parte entre [corchetes] por sustituir.' : `Quedan ${n} partes entre [corchetes] por sustituir.`),
    allFilled: 'Todos los [corchetes] están sustituidos.',
  },
  it: {
    tabCv: 'CV',
    tabLetter: 'Lettera di presentazione',
    title: 'La tua lettera di presentazione',
    help: 'Sostituisci le parti tra [parentesi] con parole tue. Basta una pagina: tre paragrafi brevi e concreti.',
    fromCv: 'Nome, email e telefono vengono dal tuo CV.',
    editCv: 'Modificali',
    senderAddress: 'Il tuo indirizzo',
    senderAddressHint: 'Facoltativo. Senza indirizzo compare solo la tua città.',
    recipient: 'Destinatario',
    place: 'Luogo',
    placeHint: 'Vuoto: la città del tuo CV.',
    date: 'Data',
    dateHint: 'Vuoto: la data di oggi.',
    subject: 'Oggetto',
    salutation: 'Saluto iniziale',
    body: 'La tua lettera',
    bodyHint: 'Lascia una riga vuota tra due paragrafi.',
    closing: 'Saluto finale',
    reset: 'Ricomincia dal modello',
    resetConfirm: 'Sostituire il tuo testo con il modello?',
    cancel: 'Annulla',
    placeholdersLeft: (n) => (n === 1 ? 'Resta 1 parte tra [parentesi] da sostituire.' : `Restano ${n} parti tra [parentesi] da sostituire.`),
    allFilled: 'Tutte le [parentesi] sono sostituite.',
  },
  pt: {
    tabCv: 'CV',
    tabLetter: 'Carta de apresentação',
    title: 'A sua carta de apresentação',
    help: 'Substitua as partes entre [parênteses retos] pelas suas palavras. Basta uma página: três parágrafos curtos e concretos.',
    fromCv: 'O seu nome, email e telefone vêm do seu CV.',
    editCv: 'Alterá-los',
    senderAddress: 'A sua morada',
    senderAddressHint: 'Opcional. Sem morada, só aparece a sua cidade.',
    recipient: 'Destinatário',
    place: 'Local',
    placeHint: 'Vazio: a cidade do seu CV.',
    date: 'Data',
    dateHint: 'Vazio: a data de hoje.',
    subject: 'Assunto',
    salutation: 'Saudação',
    body: 'A sua carta',
    bodyHint: 'Deixe uma linha em branco entre dois parágrafos.',
    closing: 'Despedida',
    reset: 'Recomeçar do modelo',
    resetConfirm: 'Substituir o seu texto pelo modelo?',
    cancel: 'Cancelar',
    placeholdersLeft: (n) => (n === 1 ? 'Falta substituir 1 parte entre [parênteses retos].' : `Faltam substituir ${n} partes entre [parênteses retos].`),
    allFilled: 'Todos os [parênteses retos] foram substituídos.',
  },
};
