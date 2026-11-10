import type { InterfaceLang, TemplateFamily, TemplateId } from '@/types';

/**
 * Single source of truth for how the site is organised: 3 categories, and the
 * order tools appear in everywhere (selector, homepage, footer, "other tools").
 */
export const CATEGORY_ORDER: TemplateFamily[] = ['career', 'organisation', 'home'];

export const CATALOG: { id: TemplateId; slug: string; category: TemplateFamily; featured?: boolean }[] = [
  { id: 'cv', slug: 'cv', category: 'career', featured: true },
  { id: 'habit-tracker', slug: 'habit-tracker', category: 'organisation', featured: true },
  { id: 'weekly-planner', slug: 'weekly-planner', category: 'organisation', featured: true },
  { id: 'monthly-calendar', slug: 'monthly-calendar', category: 'organisation', featured: true },
  { id: 'daily-priorities', slug: 'daily-priorities', category: 'organisation' },
  { id: 'goal-planner-90', slug: 'goal-planner', category: 'organisation' },
  { id: 'meal-planner', slug: 'meal-planner', category: 'home', featured: true },
  { id: 'budget-tracker', slug: 'budget-tracker', category: 'home', featured: true },
  { id: 'checklist', slug: 'checklist', category: 'home', featured: true },
];

export const categoryOf = (id: TemplateId): TemplateFamily =>
  CATALOG.find((t) => t.id === id)?.category || 'organisation';

/** Position in the catalog, for stable sorting anywhere a list of tools is shown. */
export const catalogRank = (idOrSlug: string): number => {
  const i = CATALOG.findIndex((t) => t.id === idOrSlug || t.slug === idOrSlug);
  return i === -1 ? CATALOG.length : i;
};

export interface CategoryCopy {
  name: string;
  /** Short label for tabs and menus. */
  short: string;
  /** One line under the category name on the homepage. */
  pitch: string;
  /** Homepage call to action. */
  cta: string;
}

export const CATEGORY_COPY: Record<InterfaceLang, Record<TemplateFamily, CategoryCopy>> = {
  fr: {
    career: { name: 'Emploi', short: 'Emploi', pitch: 'Un CV propre, lisible par les recruteurs, prêt à envoyer.', cta: 'Créer mon CV' },
    organisation: { name: 'Organisation', short: 'Plannings', pitch: 'Habitudes, semaine, mois et priorités du jour, à imprimer.', cta: 'Voir les plannings' },
    home: { name: 'Maison et famille', short: 'Maison', pitch: 'Menus et courses, budget du mois et checklists.', cta: 'Voir les outils maison' },
  },
  en: {
    career: { name: 'Career', short: 'Career', pitch: 'A clean CV that recruiters and their software can read, ready to send.', cta: 'Create my CV' },
    organisation: { name: 'Planning', short: 'Planning', pitch: 'Habits, week, month and daily priorities, ready to print.', cta: 'See the planners' },
    home: { name: 'Home and family', short: 'Home', pitch: 'Meal plans and shopping lists, monthly budget and checklists.', cta: 'See home tools' },
  },
  de: {
    career: { name: 'Beruf', short: 'Beruf', pitch: 'Ein sauberer Lebenslauf, lesbar für Personaler, bereit zum Versenden.', cta: 'Lebenslauf erstellen' },
    organisation: { name: 'Planung', short: 'Planung', pitch: 'Gewohnheiten, Woche, Monat und Tagesprioritäten zum Ausdrucken.', cta: 'Planer ansehen' },
    home: { name: 'Haushalt und Familie', short: 'Haushalt', pitch: 'Essensplan und Einkaufsliste, Monatsbudget und Checklisten.', cta: 'Haushalts-Tools ansehen' },
  },
  es: {
    career: { name: 'Empleo', short: 'Empleo', pitch: 'Un CV limpio, legible por reclutadores, listo para enviar.', cta: 'Crear mi CV' },
    organisation: { name: 'Organización', short: 'Agenda', pitch: 'Hábitos, semana, mes y prioridades del día, para imprimir.', cta: 'Ver los planificadores' },
    home: { name: 'Casa y familia', short: 'Casa', pitch: 'Menús y lista de la compra, presupuesto del mes y checklists.', cta: 'Ver herramientas de casa' },
  },
  it: {
    career: { name: 'Lavoro', short: 'Lavoro', pitch: 'Un CV pulito, leggibile dai selezionatori, pronto da inviare.', cta: 'Crea il mio CV' },
    organisation: { name: 'Organizzazione', short: 'Planner', pitch: 'Abitudini, settimana, mese e priorità del giorno, da stampare.', cta: 'Vedi i planner' },
    home: { name: 'Casa e famiglia', short: 'Casa', pitch: 'Menù e lista della spesa, budget del mese e checklist.', cta: 'Vedi strumenti casa' },
  },
  pt: {
    career: { name: 'Emprego', short: 'Emprego', pitch: 'Um CV limpo, legível por recrutadores, pronto a enviar.', cta: 'Criar o meu CV' },
    organisation: { name: 'Organização', short: 'Agenda', pitch: 'Hábitos, semana, mês e prioridades do dia, para imprimir.', cta: 'Ver os planeadores' },
    home: { name: 'Casa e família', short: 'Casa', pitch: 'Ementas e lista de compras, orçamento do mês e checklists.', cta: 'Ver ferramentas da casa' },
  },
};
