import type { CvCustomContent, DocumentLang } from '@/types';

/**
 * Sample CVs, one per language. Every name, email, phone and company is fictional:
 * they show the layout and get replaced by the user.
 */
export const DEFAULT_CV: Record<DocumentLang, CvCustomContent> = {
  fr: {
    layout: 'sidebar',
    fullName: 'Camille Martin',
    jobTitle: 'Chargée de communication',
    email: 'camille.martin@exemple.fr',
    phone: '06 00 00 00 00',
    city: 'Lyon',
    link: 'linkedin.com/in/camille-martin',
    photoUrl: null,
    summary:
      'Chargée de communication avec 5 ans d’expérience en agence et chez l’annonceur. J’aime transformer des sujets complexes en messages simples, et mesurer ce qui marche vraiment.',
    experiences: [
      {
        role: 'Chargée de communication',
        company: 'Studio Horizon',
        location: 'Lyon',
        start: '2022',
        end: 'Aujourd’hui',
        details:
          'Pilotage des réseaux sociaux de 6 clients (+40 % d’abonnés en un an)\nRédaction des newsletters et des communiqués de presse\nOrganisation de 3 événements par an (jusqu’à 300 invités)',
      },
      {
        role: 'Assistante communication',
        company: 'Maison Durand',
        location: 'Villeurbanne',
        start: '2020',
        end: '2022',
        details: 'Création des supports print et web\nSuivi des prestataires et du budget communication',
      },
    ],
    education: [
      {
        degree: 'Master Communication des organisations',
        school: 'Université Lumière Lyon 2',
        start: '2018',
        end: '2020',
        details: '',
      },
      {
        degree: 'Licence Information-Communication',
        school: 'Université Grenoble Alpes',
        start: '2015',
        end: '2018',
        details: '',
      },
    ],
    skills: ['Réseaux sociaux', 'Rédaction', 'Canva / Figma', 'Relations presse', 'Gestion de projet', 'Google Analytics'],
    languages: [
      { name: 'Français', level: 'Langue maternelle' },
      { name: 'Anglais', level: 'Courant (C1)' },
      { name: 'Espagnol', level: 'Intermédiaire (B1)' },
    ],
    interests: 'Photographie, course à pied, bénévolat dans une association de quartier',
  },
  en: {
    layout: 'sidebar',
    fullName: 'Alex Morgan',
    jobTitle: 'Marketing Coordinator',
    email: 'alex.morgan@example.com',
    phone: '+44 0000 000000',
    city: 'Manchester',
    link: 'linkedin.com/in/alex-morgan',
    photoUrl: null,
    summary:
      'Marketing coordinator with 5 years of agency and in-house experience. I turn complex topics into clear messages and track what actually works.',
    experiences: [
      {
        role: 'Marketing Coordinator',
        company: 'Northlight Studio',
        location: 'Manchester',
        start: '2022',
        end: 'Present',
        details:
          'Ran social media for 6 clients (+40% followers in one year)\nWrote newsletters and press releases\nOrganised 3 events a year (up to 300 guests)',
      },
      {
        role: 'Marketing Assistant',
        company: 'Harper & Co',
        location: 'Leeds',
        start: '2020',
        end: '2022',
        details: 'Designed print and web materials\nManaged suppliers and the marketing budget',
      },
    ],
    education: [
      { degree: 'MA Marketing Communications', school: 'University of Leeds', start: '2018', end: '2020', details: '' },
      { degree: 'BA Media Studies', school: 'University of Sheffield', start: '2015', end: '2018', details: '' },
    ],
    skills: ['Social media', 'Copywriting', 'Canva / Figma', 'PR', 'Project management', 'Google Analytics'],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'French', level: 'Fluent (C1)' },
      { name: 'Spanish', level: 'Intermediate (B1)' },
    ],
    interests: 'Photography, running, volunteering for a local charity',
  },
  de: {
    layout: 'sidebar',
    fullName: 'Lena Schneider',
    jobTitle: 'Marketing-Referentin',
    email: 'lena.schneider@beispiel.de',
    phone: '+49 000 0000000',
    city: 'Köln',
    link: 'linkedin.com/in/lena-schneider',
    photoUrl: null,
    summary:
      'Marketing-Referentin mit 5 Jahren Erfahrung in Agentur und Unternehmen. Ich mache komplexe Themen verständlich und messe, was wirklich funktioniert.',
    experiences: [
      {
        role: 'Marketing-Referentin',
        company: 'Studio Horizont',
        location: 'Köln',
        start: '2022',
        end: 'heute',
        details:
          'Betreuung der Social-Media-Kanäle von 6 Kunden (+40 % Follower in einem Jahr)\nNewsletter und Pressemitteilungen\nOrganisation von 3 Events pro Jahr (bis 300 Gäste)',
      },
      {
        role: 'Marketing-Assistentin',
        company: 'Wagner & Partner',
        location: 'Bonn',
        start: '2020',
        end: '2022',
        details: 'Gestaltung von Print- und Webmaterialien\nSteuerung von Dienstleistern und Budget',
      },
    ],
    education: [
      { degree: 'M.A. Kommunikationswissenschaft', school: 'Universität zu Köln', start: '2018', end: '2020', details: '' },
      { degree: 'B.A. Medienwissenschaft', school: 'Universität Bonn', start: '2015', end: '2018', details: '' },
    ],
    skills: ['Social Media', 'Texten', 'Canva / Figma', 'Pressearbeit', 'Projektmanagement', 'Google Analytics'],
    languages: [
      { name: 'Deutsch', level: 'Muttersprache' },
      { name: 'Englisch', level: 'Fließend (C1)' },
      { name: 'Französisch', level: 'Gute Kenntnisse (B1)' },
    ],
    interests: 'Fotografie, Laufen, Ehrenamt im Stadtteilverein',
  },
  es: {
    layout: 'sidebar',
    fullName: 'Lucía García',
    jobTitle: 'Responsable de comunicación',
    email: 'lucia.garcia@ejemplo.es',
    phone: '+34 000 000 000',
    city: 'Valencia',
    link: 'linkedin.com/in/lucia-garcia',
    photoUrl: null,
    summary:
      'Responsable de comunicación con 5 años de experiencia en agencia y en empresa. Convierto temas complejos en mensajes claros y mido lo que realmente funciona.',
    experiences: [
      {
        role: 'Responsable de comunicación',
        company: 'Estudio Horizonte',
        location: 'Valencia',
        start: '2022',
        end: 'Actualidad',
        details:
          'Gestión de redes sociales de 6 clientes (+40 % de seguidores en un año)\nRedacción de newsletters y notas de prensa\nOrganización de 3 eventos al año (hasta 300 invitados)',
      },
      {
        role: 'Asistente de comunicación',
        company: 'Casa Romero',
        location: 'Alicante',
        start: '2020',
        end: '2022',
        details: 'Diseño de materiales impresos y web\nGestión de proveedores y presupuesto',
      },
    ],
    education: [
      { degree: 'Máster en Comunicación Corporativa', school: 'Universitat de València', start: '2018', end: '2020', details: '' },
      { degree: 'Grado en Periodismo', school: 'Universidad de Alicante', start: '2014', end: '2018', details: '' },
    ],
    skills: ['Redes sociales', 'Redacción', 'Canva / Figma', 'Relaciones con medios', 'Gestión de proyectos', 'Google Analytics'],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'Avanzado (C1)' },
      { name: 'Francés', level: 'Intermedio (B1)' },
    ],
    interests: 'Fotografía, running, voluntariado en una asociación de barrio',
  },
  it: {
    layout: 'sidebar',
    fullName: 'Giulia Rossi',
    jobTitle: 'Addetta alla comunicazione',
    email: 'giulia.rossi@esempio.it',
    phone: '+39 000 000 0000',
    city: 'Bologna',
    link: 'linkedin.com/in/giulia-rossi',
    photoUrl: null,
    summary:
      'Addetta alla comunicazione con 5 anni di esperienza in agenzia e in azienda. Trasformo temi complessi in messaggi chiari e misuro ciò che funziona davvero.',
    experiences: [
      {
        role: 'Addetta alla comunicazione',
        company: 'Studio Orizzonte',
        location: 'Bologna',
        start: '2022',
        end: 'Oggi',
        details:
          'Gestione dei social di 6 clienti (+40% di follower in un anno)\nScrittura di newsletter e comunicati stampa\nOrganizzazione di 3 eventi all’anno (fino a 300 ospiti)',
      },
      {
        role: 'Assistente comunicazione',
        company: 'Casa Bianchi',
        location: 'Modena',
        start: '2020',
        end: '2022',
        details: 'Realizzazione di materiali stampa e web\nGestione fornitori e budget',
      },
    ],
    education: [
      { degree: 'Laurea magistrale in Comunicazione', school: 'Università di Bologna', start: '2018', end: '2020', details: '' },
      { degree: 'Laurea in Scienze della Comunicazione', school: 'Università di Padova', start: '2015', end: '2018', details: '' },
    ],
    skills: ['Social media', 'Copywriting', 'Canva / Figma', 'Ufficio stampa', 'Project management', 'Google Analytics'],
    languages: [
      { name: 'Italiano', level: 'Madrelingua' },
      { name: 'Inglese', level: 'Avanzato (C1)' },
      { name: 'Francese', level: 'Intermedio (B1)' },
    ],
    interests: 'Fotografia, corsa, volontariato in un’associazione di quartiere',
  },
  pt: {
    layout: 'sidebar',
    fullName: 'Inês Costa',
    jobTitle: 'Técnica de comunicação',
    email: 'ines.costa@exemplo.pt',
    phone: '+351 000 000 000',
    city: 'Porto',
    link: 'linkedin.com/in/ines-costa',
    photoUrl: null,
    summary:
      'Técnica de comunicação com 5 anos de experiência em agência e em empresa. Transformo temas complexos em mensagens claras e meço o que realmente funciona.',
    experiences: [
      {
        role: 'Técnica de comunicação',
        company: 'Estúdio Horizonte',
        location: 'Porto',
        start: '2022',
        end: 'Atual',
        details:
          'Gestão das redes sociais de 6 clientes (+40% de seguidores num ano)\nRedação de newsletters e comunicados de imprensa\nOrganização de 3 eventos por ano (até 300 convidados)',
      },
      {
        role: 'Assistente de comunicação',
        company: 'Casa Ferreira',
        location: 'Braga',
        start: '2020',
        end: '2022',
        details: 'Criação de materiais impressos e digitais\nGestão de fornecedores e orçamento',
      },
    ],
    education: [
      { degree: 'Mestrado em Ciências da Comunicação', school: 'Universidade do Porto', start: '2018', end: '2020', details: '' },
      { degree: 'Licenciatura em Comunicação', school: 'Universidade do Minho', start: '2015', end: '2018', details: '' },
    ],
    skills: ['Redes sociais', 'Redação', 'Canva / Figma', 'Assessoria de imprensa', 'Gestão de projetos', 'Google Analytics'],
    languages: [
      { name: 'Português', level: 'Nativo' },
      { name: 'Inglês', level: 'Avançado (C1)' },
      { name: 'Espanhol', level: 'Intermédio (B1)' },
    ],
    interests: 'Fotografia, corrida, voluntariado numa associação local',
  },
};

/** Section headings printed on the CV. */
export const CV_SECTION_LABELS: Record<
  DocumentLang,
  { profile: string; experience: string; education: string; skills: string; languages: string; interests: string; contact: string }
> = {
  fr: { profile: 'Profil', experience: 'Expérience professionnelle', education: 'Formation', skills: 'Compétences', languages: 'Langues', interests: 'Centres d’intérêt', contact: 'Contact' },
  en: { profile: 'Profile', experience: 'Work experience', education: 'Education', skills: 'Skills', languages: 'Languages', interests: 'Interests', contact: 'Contact' },
  de: { profile: 'Profil', experience: 'Berufserfahrung', education: 'Ausbildung', skills: 'Kenntnisse', languages: 'Sprachen', interests: 'Interessen', contact: 'Kontakt' },
  es: { profile: 'Perfil', experience: 'Experiencia profesional', education: 'Formación', skills: 'Competencias', languages: 'Idiomas', interests: 'Intereses', contact: 'Contacto' },
  it: { profile: 'Profilo', experience: 'Esperienza professionale', education: 'Formazione', skills: 'Competenze', languages: 'Lingue', interests: 'Interessi', contact: 'Contatti' },
  pt: { profile: 'Perfil', experience: 'Experiência profissional', education: 'Formação', skills: 'Competências', languages: 'Línguas', interests: 'Interesses', contact: 'Contacto' },
};

/** Splits a multi-line field into non-empty trimmed lines. */
export const cvLines = (text: string): string[] =>
  (text || '')
    .split('\n')
    .map((l) => l.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);

/** "2020 – 2022", or a single date when one side is empty. */
export const cvPeriod = (start: string, end: string): string => {
  const a = start?.trim();
  const b = end?.trim();
  // "2024 – 2024" reads like a typo: a one-off period shows a single date.
  if (a && b && a === b) return a;
  return [a, b].filter(Boolean).join(' – ');
};
