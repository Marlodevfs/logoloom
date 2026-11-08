import { DocumentLang } from '@/types';

export interface MinimalHabitLabels {
  name: string;
  date: string;
  day: string;
  notes: string;
  score: string;
  defaultQr: string;
  defaultTitle: string;
  companyPlaceholder: string;
  footerPage: string;
  verified: string;
  madeWith: string;
}

export const MINIMAL_HABIT_LABELS: Record<DocumentLang, MinimalHabitLabels> = {
  fr: {
    name: 'Nom :',
    date: 'Date :',
    day: 'Jour',
    notes: 'Notes',
    score: 'Total',
    defaultQr: 'Scannez pour réserver',
    defaultTitle: 'Suivi d’habitudes 30 jours',
    companyPlaceholder: 'Votre Cabinet / Studio',
    footerPage: 'Document personnel • Page 1 sur 1',
    verified: 'Document vérifié',
    madeWith: 'Créé avec',
  },
  en: {
    name: 'Name:',
    date: 'Date:',
    day: 'Day',
    notes: 'Notes',
    score: 'Score',
    defaultQr: 'Scan to book a session',
    defaultTitle: '30-Day Habit Tracker',
    companyPlaceholder: 'Your Business / Studio',
    footerPage: 'Personal Document • Page 1 of 1',
    verified: 'Verified Document',
    madeWith: 'Made with',
  },
  de: {
    name: 'Name:',
    date: 'Datum:',
    day: 'Tag',
    notes: 'Notizen',
    score: 'Gesamt',
    defaultQr: 'Scannen zum Buchen',
    defaultTitle: '30-Tage-Gewohnheitstracker',
    companyPlaceholder: 'Ihre Praxis / Studio',
    footerPage: 'Persönliches Dokument • Seite 1 von 1',
    verified: 'Verifiziertes Dokument',
    madeWith: 'Erstellt mit',
  },
  es: {
    name: 'Nombre:',
    date: 'Fecha:',
    day: 'Día',
    notes: 'Notas',
    score: 'Total',
    defaultQr: 'Escanear para reservar',
    defaultTitle: 'Seguimiento de hábitos 30 días',
    companyPlaceholder: 'Tu Empresa / Estudio',
    footerPage: 'Documento personal • Página 1 de 1',
    verified: 'Documento verificado',
    madeWith: 'Creado con',
  },
  it: {
    name: 'Nome:',
    date: 'Data:',
    day: 'Giorno',
    notes: 'Note',
    score: 'Totale',
    defaultQr: 'Scansiona per prenotare',
    defaultTitle: 'Registro abitudini 30 giorni',
    companyPlaceholder: 'Il Tuo Studio',
    footerPage: 'Documento personale • Pagina 1 di 1',
    verified: 'Documento verificato',
    madeWith: 'Creato con',
  },
  pt: {
    name: 'Nome:',
    date: 'Data:',
    day: 'Dia',
    notes: 'Notas',
    score: 'Total',
    defaultQr: 'Digitalize para agendar',
    defaultTitle: 'Rastreador de hábitos 30 dias',
    companyPlaceholder: 'Sua Empresa / Estúdio',
    footerPage: 'Documento pessoal • Página 1 de 1',
    verified: 'Documento verificado',
    madeWith: 'Criado com',
  },
};

export interface MinimalRoadmapLabels {
  project: string;
  horizon: string;
  milestone: string;
  clientSign: string;
  advisorSign: string;
  page: string;
  defaultQr: string;
  companyPlaceholder: string;
  missionPlaceholder: string;
  horizonPlaceholder: string;
  targetKpi: string;
  bilateralNotice: string;
  signature: string;
  verified: string;
  madeWith: string;
}

export const MINIMAL_ROADMAP_LABELS: Record<DocumentLang, MinimalRoadmapLabels> = {
  fr: {
    project: 'Projet / Client :',
    horizon: 'Horizon cible :',
    milestone: 'Jalon clé :',
    clientSign: 'Validation client :',
    advisorSign: 'Signature conseil :',
    page: 'Feuille de route stratégique • Page 1 sur 1',
    defaultQr: 'Scannez pour réserver',
    companyPlaceholder: 'Votre Cabinet / Studio',
    missionPlaceholder: 'Définir l’objectif clé',
    horizonPlaceholder: '90 jours ouvrés',
    targetKpi: 'Cible Clé :',
    bilateralNotice: 'Validation pour exécution bilatérale',
    signature: 'Signature',
    verified: 'Document vérifié',
    madeWith: 'Créé avec',
  },
  en: {
    project: 'Project / Client:',
    horizon: 'Target Horizon:',
    milestone: 'Key Milestone:',
    clientSign: 'Client Sign-off:',
    advisorSign: 'Advisor Sign-off:',
    page: 'Strategic Roadmap • Page 1 of 1',
    defaultQr: 'Scan to book a session',
    companyPlaceholder: 'Your Business / Studio',
    missionPlaceholder: 'Define primary goal',
    horizonPlaceholder: '90 Business Days',
    targetKpi: 'Key Target:',
    bilateralNotice: 'Valid for execution upon bilateral sign-off',
    signature: 'Signature',
    verified: 'Verified Document',
    madeWith: 'Made with',
  },
  de: {
    project: 'Projekt / Kunde:',
    horizon: 'Zielhorizont:',
    milestone: 'Hauptmeilenstein:',
    clientSign: 'Kundenfreigabe:',
    advisorSign: 'Berater-Freigabe:',
    page: 'Strategische Roadmap • Seite 1 von 1',
    defaultQr: 'Scannen zum Buchen',
    companyPlaceholder: 'Ihre Praxis / Studio',
    missionPlaceholder: 'Kernziel festlegen',
    horizonPlaceholder: '90 Arbeitstage',
    targetKpi: 'Phase-Ziel:',
    bilateralNotice: 'Gültig zur Ausführung nach beiderseitiger Unterzeichnung',
    signature: 'Unterschrift',
    verified: 'Verifiziertes Dokument',
    madeWith: 'Erstellt mit',
  },
  es: {
    project: 'Proyecto / Cliente:',
    horizon: 'Horizonte objetivo:',
    milestone: 'Hito clave:',
    clientSign: 'Firma del cliente:',
    advisorSign: 'Firma del asesor:',
    page: 'Hoja de ruta estratégica • Página 1 de 1',
    defaultQr: 'Escanear para reservar',
    companyPlaceholder: 'Tu Empresa / Estudio',
    missionPlaceholder: 'Definir el objetivo clave',
    horizonPlaceholder: '90 días laborables',
    targetKpi: 'Meta Clave:',
    bilateralNotice: 'Válido para ejecución tras firma bilateral',
    signature: 'Firma',
    verified: 'Documento verificado',
    madeWith: 'Creado con',
  },
  it: {
    project: 'Progetto / Cliente:',
    horizon: 'Orizzonte obiettivo:',
    milestone: 'Traguardo chiave:',
    clientSign: 'Firma del cliente:',
    advisorSign: 'Firma del consulente:',
    page: 'Tabella di marcia strategica • Pagina 1 di 1',
    defaultQr: 'Scansiona per prenotare',
    companyPlaceholder: 'Il Tuo Studio',
    missionPlaceholder: 'Definire l’obiettivo chiave',
    horizonPlaceholder: '90 giorni lavorativi',
    targetKpi: 'Traguardo Chiave:',
    bilateralNotice: 'Valido per l’esecuzione previa firma bilaterale',
    signature: 'Firma',
    verified: 'Documento verificato',
    madeWith: 'Creato con',
  },
  pt: {
    project: 'Projeto / Cliente:',
    horizon: 'Horizonte alvo:',
    milestone: 'Marco principal:',
    clientSign: 'Assinatura do cliente:',
    advisorSign: 'Assinatura do consultor:',
    page: 'Roteiro estratégico • Página 1 de 1',
    defaultQr: 'Digitalize para agendar',
    companyPlaceholder: 'Sua Empresa / Estúdio',
    missionPlaceholder: 'Definir o objetivo chave',
    horizonPlaceholder: '90 dias úteis',
    targetKpi: 'Meta Chave:',
    bilateralNotice: 'Válido para execução mediante assinatura bilateral',
    signature: 'Assinatura',
    verified: 'Documento verificado',
    madeWith: 'Criado com',
  },
};

export interface MinimalWelcomeLabels {
  page: string;
  defaultQr: string;
  companyPlaceholder: string;
  practitionerPlaceholder: string;
  contactPrompt: string;
  kickoffBadge: string;
  verified: string;
  madeWith: string;
}

export const MINIMAL_WELCOME_LABELS: Record<DocumentLang, MinimalWelcomeLabels> = {
  fr: {
    page: 'Guide de bienvenue • Page 1 sur 1',
    defaultQr: 'Scannez pour planifier',
    companyPlaceholder: 'Votre Cabinet / Studio',
    practitionerPlaceholder: 'Votre Référent',
    contactPrompt: 'Votre interlocuteur principal est ',
    kickoffBadge: 'SESSION DE CADRAGE 01',
    verified: 'Document vérifié',
    madeWith: 'Créé avec',
  },
  en: {
    page: 'Welcome Guide • Page 1 of 1',
    defaultQr: 'Scan to book onboarding',
    companyPlaceholder: 'Your Business / Studio',
    practitionerPlaceholder: 'Your Practitioner',
    contactPrompt: 'Your primary point of contact is ',
    kickoffBadge: 'KICKOFF SESSION 01',
    verified: 'Verified Document',
    madeWith: 'Made with',
  },
  de: {
    page: 'Willkommensleitfaden • Seite 1 von 1',
    defaultQr: 'Scannen zum Planen',
    companyPlaceholder: 'Ihre Praxis / Studio',
    practitionerPlaceholder: 'Ihr Ansprechpartner',
    contactPrompt: 'Ihr Hauptansprechpartner ist ',
    kickoffBadge: 'KICKOFF-SITZUNG 01',
    verified: 'Verifiziertes Dokument',
    madeWith: 'Erstellt mit',
  },
  es: {
    page: 'Guía de bienvenida • Página 1 de 1',
    defaultQr: 'Escanear para planificar',
    companyPlaceholder: 'Tu Empresa / Estudio',
    practitionerPlaceholder: 'Su Asesor Referente',
    contactPrompt: 'Su punto de contacto principal es ',
    kickoffBadge: 'SESIÓN DE INICIO 01',
    verified: 'Documento verificado',
    madeWith: 'Creado con',
  },
  it: {
    page: 'Guida di benvenuto • Pagina 1 di 1',
    defaultQr: 'Scansiona per pianificare',
    companyPlaceholder: 'Il Tuo Studio',
    practitionerPlaceholder: 'Il Tuo Consulente',
    contactPrompt: 'Il vostro punto di contatto principale è ',
    kickoffBadge: 'SESSIONE DI AVVIO 01',
    verified: 'Documento verificato',
    madeWith: 'Creato con',
  },
  pt: {
    page: 'Guia de boas-vindas • Página 1 de 1',
    defaultQr: 'Digitalize para agendar',
    companyPlaceholder: 'Sua Empresa / Estúdio',
    practitionerPlaceholder: 'Seu Consultor',
    contactPrompt: 'Seu principal ponto de contato é ',
    kickoffBadge: 'SESSÃO INICIAL 01',
    verified: 'Documento verificado',
    madeWith: 'Criado com',
  },
};
