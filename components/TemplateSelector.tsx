'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  Milestone,
  CheckSquare,
  Clock,
  Utensils,
  Wallet,
  Receipt,
  FileSpreadsheet,
  Users,
  CheckCircle2,
  ListTodo,
  Layers,
  Feather,
  Briefcase,
  User,
} from 'lucide-react';
import { TemplateId, DesignStyle, InterfaceLang, TemplateFamily } from '@/types';

interface TemplateSelectorProps {
  activeTemplate: TemplateId;
  onSelect: (id: TemplateId) => void;
  brandColor: string;
  designStyle: DesignStyle;
  onStyleChange: (style: DesignStyle) => void;
  interfaceLang: InterfaceLang;
}

interface TemplateMetaItem {
  id: TemplateId;
  family: TemplateFamily;
  title: string;
  desc: string;
  tag: string;
  icon: React.ElementType;
}

const SELECTOR_I18N: Record<
  InterfaceLang,
  {
    stepTitle: string;
    countModels: string;
    minimalLabel: string;
    defaultBadge: string;
    completeLabel: string;
    familyPersonal: string;
    familyBusiness: string;
    allTemplates: string;
    templates: Record<TemplateId, { title: string; desc: string; tag: string }>;
  }
> = {
  fr: {
    stepTitle: '3. Modèle de document',
    countModels: '12 modèles prêts à imprimer',
    minimalLabel: 'Minimal',
    defaultBadge: 'Défaut',
    completeLabel: 'Complet',
    familyPersonal: 'Perso',
    familyBusiness: 'Pro',
    allTemplates: 'Tous',
    templates: {
      'habit-tracker': {
        title: 'Suivi d’habitudes 30 jours',
        desc: 'Grille 30 jours portrait, aérée et sobre',
        tag: 'Santé & Routine',
      },
      'goal-planner-90': {
        title: 'Objectifs 90 jours',
        desc: 'Top 3 priorités, 3 mois avec jalons et bilan hebdo',
        tag: 'Trimestre',
      },
      'weekly-planner': {
        title: 'Semainier minimal',
        desc: '7 jours libres, top 3 priorités et notes',
        tag: 'Semaine',
      },
      'monthly-calendar': {
        title: 'Calendrier mensuel',
        desc: 'Grille du mois, objectifs et dates clés',
        tag: 'Mois',
      },
      'daily-priorities': {
        title: 'Priorités du jour',
        desc: 'Top 3, to-do list, créneaux et gratitude',
        tag: 'Quotidien',
      },
      'meal-planner': {
        title: 'Menu de la semaine',
        desc: '7 jours x 4 repas + liste de courses intégrée',
        tag: 'Nutrition',
      },
      'budget-tracker': {
        title: 'Budget mensuel',
        desc: 'Revenus, charges fixes, dépenses et épargne',
        tag: 'Finances',
      },
      quote: {
        title: 'Devis commercial',
        desc: 'Émetteur, client, lignes d’articles, TVA et total',
        tag: 'Vente',
      },
      invoice: {
        title: 'Facture simple',
        desc: 'Facture avec échéance, IBAN et coordonnées de paiement',
        tag: 'Facturation',
      },
      'price-list': {
        title: 'Grille tarifaire / Menu',
        desc: 'Prestations catégorisées, descriptions et tarifs',
        tag: 'Tarifs',
      },
      'client-tracker': {
        title: 'Journal de suivi client',
        desc: 'Tableau des séances, durées, statuts et notes',
        tag: 'Gestion client',
      },
      checklist: {
        title: 'Checklist universelle',
        desc: 'Sections groupées avec cases à cocher et synthèse',
        tag: 'Méthode',
      },
    },
  },
  en: {
    stepTitle: '3. Document Template',
    countModels: '12 print-ready models',
    minimalLabel: 'Minimal',
    defaultBadge: 'Default',
    completeLabel: 'Complete',
    familyPersonal: 'Personal',
    familyBusiness: 'Business',
    allTemplates: 'All',
    templates: {
      'habit-tracker': {
        title: '30-Day Habit Tracker',
        desc: 'Airy portrait 30-day grid with milestone markers',
        tag: 'Health & Habits',
      },
      'goal-planner-90': {
        title: '90-Day Goal Planner',
        desc: 'Top 3 goals, 3 monthly blocks & weekly check-in strip',
        tag: 'Quarterly',
      },
      'weekly-planner': {
        title: 'Weekly Planner',
        desc: '7 flexible days, weekly top 3 priorities & notes',
        tag: 'Weekly',
      },
      'monthly-calendar': {
        title: 'Monthly Calendar',
        desc: 'One-page month grid, monthly goals & key dates',
        tag: 'Monthly',
      },
      'daily-priorities': {
        title: 'Daily Priorities',
        desc: 'Top 3 tasks, hourly schedule, to-do list & gratitude',
        tag: 'Daily',
      },
      'meal-planner': {
        title: 'Weekly Meal Planner',
        desc: '7 days x 4 meals + integrated grocery shopping column',
        tag: 'Nutrition',
      },
      'budget-tracker': {
        title: 'Monthly Budget Tracker',
        desc: 'Income, fixed & variable expenses, savings goal & net cash',
        tag: 'Finance',
      },
      quote: {
        title: 'Price Quote',
        desc: 'Sender/client blocks, line items, taxes & total',
        tag: 'Sales',
      },
      invoice: {
        title: 'Simple Invoice',
        desc: 'Invoice #, due date, line items & bank payment details',
        tag: 'Billing',
      },
      'price-list': {
        title: 'Service Menu / Price List',
        desc: 'Grouped categories, service descriptions & clear rates',
        tag: 'Services',
      },
      'client-tracker': {
        title: 'Client Session Tracker',
        desc: 'Log dates, client names, services, hours & status',
        tag: 'Client CRM',
      },
      checklist: {
        title: 'Master Checklist',
        desc: 'Multi-purpose grouped checklists with checkboxes & sign-off',
        tag: 'Project Ops',
      },
    },
  },
  de: {
    stepTitle: '3. Dokumenten-Vorlage',
    countModels: '12 druckfertige Vorlagen',
    minimalLabel: 'Minimal',
    defaultBadge: 'Standard',
    completeLabel: 'Vollständig',
    familyPersonal: 'Privat',
    familyBusiness: 'Business',
    allTemplates: 'Alle',
    templates: {
      'habit-tracker': {
        title: '30-Tage-Gewohnheitstracker',
        desc: 'Klare 30-Tage-Matrix im Hochformat mit viel Weißraum',
        tag: 'Gewohnheiten',
      },
      'goal-planner-90': {
        title: '90-Tage-Zielplaner',
        desc: 'Top-3-Ziele, 3 Monatsblöcke & wöchentliche Check-ins',
        tag: 'Quartal',
      },
      'weekly-planner': {
        title: 'Wochenplaner',
        desc: '7 flexible Tage, 3 Wochenprioritäten & Notizzeilen',
        tag: 'Woche',
      },
      'monthly-calendar': {
        title: 'Monatskalender',
        desc: 'Übersichtlicher Monatsraster, Monatsziele & Termine',
        tag: 'Monat',
      },
      'daily-priorities': {
        title: 'Tagesprioritäten',
        desc: 'Top 3 Aufgaben, Zeitblöcke, To-Do-Liste & Dankbarkeit',
        tag: 'Tagesfokus',
      },
      'meal-planner': {
        title: 'Wochen-Speiseplan',
        desc: '7 Tage x 4 Mahlzeiten + Einkaufsliste',
        tag: 'Ernährung',
      },
      'budget-tracker': {
        title: 'Monats-Budgetplaner',
        desc: 'Einnahmen, feste & variable Ausgaben, Sparziel & Saldo',
        tag: 'Finanzen',
      },
      quote: {
        title: 'Angebot',
        desc: 'Absender/Kunde, Positionen, USt und Gesamtsumme',
        tag: 'Vertrieb',
      },
      invoice: {
        title: 'Rechnung',
        desc: 'Rechnungsnummer, Fälligkeit, Positionen & Bankverbindung',
        tag: 'Buchhaltung',
      },
      'price-list': {
        title: 'Preis- & Leistungsübersicht',
        desc: 'Kategorisierte Dienstleistungen, Details & feste Tarife',
        tag: 'Leistungen',
      },
      'client-tracker': {
        title: 'Klienten-Sitzungsprotokoll',
        desc: 'Sitzungen, Dauer, Bearbeitungsstatus & Zusammenfassung',
        tag: 'Klienten',
      },
      checklist: {
        title: 'Projekt-Checkliste',
        desc: 'Strukturierte Abschnitte mit Kontrollkästchen & Freigabe',
        tag: 'Organisation',
      },
    },
  },
  es: {
    stepTitle: '3. Plantilla de documento',
    countModels: '12 modelos listos para imprimir',
    minimalLabel: 'Mínimo',
    defaultBadge: 'Por defecto',
    completeLabel: 'Completo',
    familyPersonal: 'Personal',
    familyBusiness: 'Negocio',
    allTemplates: 'Todas',
    templates: {
      'habit-tracker': {
        title: 'Seguimiento de hábitos 30 días',
        desc: 'Cuadrícula vertical limpia con hitos destacados',
        tag: 'Hábitos',
      },
      'goal-planner-90': {
        title: 'Planificador 90 Días',
        desc: 'Top 3 objetivos, 3 meses con hitos y seguimiento',
        tag: 'Trimestre',
      },
      'weekly-planner': {
        title: 'Planificador Semanal',
        desc: '7 días libres, top 3 prioridades semanales y notas',
        tag: 'Semana',
      },
      'monthly-calendar': {
        title: 'Calendario Mensual',
        desc: 'Cuadrícula mensual, objetivos del mes y fechas clave',
        tag: 'Mes',
      },
      'daily-priorities': {
        title: 'Prioridades Diarias',
        desc: 'Top 3 tareas, horarios, lista de tareas y gratitud',
        tag: 'Día',
      },
      'meal-planner': {
        title: 'Planificador de Comidas',
        desc: '7 días x 4 comidas + lista de compras integrada',
        tag: 'Comidas',
      },
      'budget-tracker': {
        title: 'Presupuesto Mensual',
        desc: 'Ingresos, gastos fijos y variables, ahorro y saldo neto',
        tag: 'Finanzas',
      },
      quote: {
        title: 'Presupuesto comercial',
        desc: 'Emisor, cliente, partidas, impuestos y total',
        tag: 'Ventas',
      },
      invoice: {
        title: 'Factura simple',
        desc: 'Nº factura, vencimiento, partidas y datos bancarios',
        tag: 'Facturación',
      },
      'price-list': {
        title: 'Tarifas y Servicios',
        desc: 'Categorías, descripción detallada y precios claros',
        tag: 'Tarifas',
      },
      'client-tracker': {
        title: 'Registro de Clientes',
        desc: 'Historial de sesiones, duración, estados y notas',
        tag: 'Gestión clientes',
      },
      checklist: {
        title: 'Lista de Control',
        desc: 'Secciones agrupadas con casillas de verificación y firma',
        tag: 'Control',
      },
    },
  },
  it: {
    stepTitle: '3. Modello di Documento',
    countModels: '12 modelli pronti per la stampa',
    minimalLabel: 'Minimale',
    defaultBadge: 'Predefinito',
    completeLabel: 'Completo',
    familyPersonal: 'Personale',
    familyBusiness: 'Lavoro',
    allTemplates: 'Tutti',
    templates: {
      'habit-tracker': {
        title: 'Registro abitudini 30 giorni',
        desc: 'Griglia verticale di 30 giorni, essenziale e ariosa',
        tag: 'Abitudini',
      },
      'goal-planner-90': {
        title: 'Pianificatore 90 Giorni',
        desc: 'Top 3 obiettivi, 3 mesi con tappe e verifiche settimanali',
        tag: 'Trimestre',
      },
      'weekly-planner': {
        title: 'Pianificatore Settimanale',
        desc: '7 giorni aperti, top 3 priorità della settimana e note',
        tag: 'Settimana',
      },
      'monthly-calendar': {
        title: 'Calendario Mensile',
        desc: 'Griglia mensile, obiettivi del mese e date importanti',
        tag: 'Mese',
      },
      'daily-priorities': {
        title: 'Priorità del Giorno',
        desc: 'Top 3, blocchi orari, lista attività e gratitudine',
        tag: 'Giornata',
      },
      'meal-planner': {
        title: 'Menu Settimanale',
        desc: '7 giorni x 4 pasti + lista della spesa affiancata',
        tag: 'Nutrizione',
      },
      'budget-tracker': {
        title: 'Budget Mensile',
        desc: 'Entrate, uscite fisse e variabili, risparmio e saldo',
        tag: 'Finanze',
      },
      quote: {
        title: 'Preventivo',
        desc: 'Mittente, cliente, voci di spesa, IVA e totale',
        tag: 'Vendite',
      },
      invoice: {
        title: 'Fattura semplice',
        desc: 'Numero fattura, scadenza, voci e coordinate bancarie',
        tag: 'Fatturazione',
      },
      'price-list': {
        title: 'Listino Prezzi & Servizi',
        desc: 'Servizi categorizzati, descrizioni e tariffe trasparenti',
        tag: 'Tariffe',
      },
      'client-tracker': {
        title: 'Registro Sessioni Clienti',
        desc: 'Riepilogo appuntamenti, durata, stato e annotazioni',
        tag: 'Clienti',
      },
      checklist: {
        title: 'Checklist di Progetto',
        desc: 'Sezioni raggruppate con caselle di controllo e convalida',
        tag: 'Metodo',
      },
    },
  },
  pt: {
    stepTitle: '3. Modelo de Documento',
    countModels: '12 modelos prontos para impressão',
    minimalLabel: 'Mínimo',
    defaultBadge: 'Padrão',
    completeLabel: 'Completo',
    familyPersonal: 'Pessoal',
    familyBusiness: 'Negócios',
    allTemplates: 'Todos',
    templates: {
      'habit-tracker': {
        title: 'Rastreador de hábitos 30 dias',
        desc: 'Grelha vertical espaçosa com marcos de consistência',
        tag: 'Hábitos',
      },
      'goal-planner-90': {
        title: 'Planejador de 90 Dias',
        desc: 'Top 3 metas, 3 meses com marcos e balanço semanal',
        tag: 'Trimestre',
      },
      'weekly-planner': {
        title: 'Planejador Semanal',
        desc: '7 dias livres, top 3 prioridades da semana e notas',
        tag: 'Semana',
      },
      'monthly-calendar': {
        title: 'Calendário Mensal',
        desc: 'Grelha do mês, metas mensais e datas essenciais',
        tag: 'Mês',
      },
      'daily-priorities': {
        title: 'Prioridades do Dia',
        desc: 'Top 3 tarefas, horários, checklist de ações e gratidão',
        tag: 'Dia',
      },
      'meal-planner': {
        title: 'Cardápio Semanal',
        desc: '7 dias x 4 refeições + lista de compras integrada',
        tag: 'Alimentação',
      },
      'budget-tracker': {
        title: 'Orçamento Mensal',
        desc: 'Receitas, despesas fixas e variáveis, meta de poupança e saldo',
        tag: 'Finanças',
      },
      quote: {
        title: 'Orçamento comercial',
        desc: 'Emissor, cliente, itens, impostos e valor final',
        tag: 'Vendas',
      },
      invoice: {
        title: 'Fatura simples',
        desc: 'Nº da fatura, vencimento, itens e dados bancários',
        tag: 'Faturamento',
      },
      'price-list': {
        title: 'Tabela de Serviços e Valores',
        desc: 'Categorias organizadas, descrições e valores claros',
        tag: 'Serviços',
      },
      'client-tracker': {
        title: 'Registro de Clientes',
        desc: 'Histórico de atendimentos, duração, status e notas',
        tag: 'Gestão clientes',
      },
      checklist: {
        title: 'Lista de Verificação',
        desc: 'Etapas agrupadas com caixas de seleção e validação',
        tag: 'Processos',
      },
    },
  },
};

const TEMPLATE_DEFINITIONS: Array<{
  id: TemplateId;
  family: TemplateFamily;
  icon: React.ElementType;
}> = [
  // Personal (7)
  { id: 'habit-tracker', family: 'personal', icon: Calendar },
  { id: 'goal-planner-90', family: 'personal', icon: Milestone },
  { id: 'weekly-planner', family: 'personal', icon: Clock },
  { id: 'monthly-calendar', family: 'personal', icon: CheckSquare },
  { id: 'daily-priorities', family: 'personal', icon: ListTodo },
  { id: 'meal-planner', family: 'personal', icon: Utensils },
  { id: 'budget-tracker', family: 'personal', icon: Wallet },
  { id: 'checklist', family: 'personal', icon: CheckCircle2 },
  // Business (5)
  { id: 'quote', family: 'business', icon: Receipt },
  { id: 'invoice', family: 'business', icon: FileSpreadsheet },
  { id: 'price-list', family: 'business', icon: Briefcase },
  { id: 'client-tracker', family: 'business', icon: Users },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  activeTemplate,
  onSelect,
  brandColor,
  designStyle,
  onStyleChange,
  interfaceLang,
}) => {
  const i18n = SELECTOR_I18N[interfaceLang] || SELECTOR_I18N.en;
  const [selectedFamily, setSelectedFamily] = useState<'all' | TemplateFamily>('all');

  const listRef = useRef<HTMLDivElement>(null);
  const personalCount = TEMPLATE_DEFINITIONS.filter((t) => t.family === 'personal').length;
  const businessCount = TEMPLATE_DEFINITIONS.length - personalCount;

  // Keep the active template visible in the scrollable list (e.g. when landing
  // on /invoice, the Invoice card is far down). Scrolls only the list, never the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector<HTMLElement>(`[data-template-id="${activeTemplate}"]`);
    if (!item) return;
    const itemTop = item.offsetTop; // list is `relative`, so this is relative to the list
    const itemBottom = itemTop + item.offsetHeight;
    if (itemTop < list.scrollTop || itemBottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = Math.max(0, itemTop - 8);
    }
  }, [activeTemplate, selectedFamily]);

  const filteredTemplates = TEMPLATE_DEFINITIONS.filter((t) => {
    if (selectedFamily === 'all') return true;
    return t.family === selectedFamily;
  });

  return (
    <div className="space-y-2.5">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">
          {i18n.stepTitle}
        </h3>
        <span className="text-[10px] text-slate-400 font-medium">
          {i18n.countModels}
        </span>
      </div>

      {/* Style Selector (Minimal | Complete): only the Habit Tracker has two real
          layouts, so the toggle is shown for it only (it did nothing elsewhere). */}
      {activeTemplate === 'habit-tracker' && (
      <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 flex items-center">
        <button
          type="button"
          onClick={() => onStyleChange('minimal')}
          aria-pressed={designStyle === 'minimal'}
          className={`flex-1 py-2 sm:py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            designStyle === 'minimal'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Feather className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{i18n.minimalLabel}</span>
          <span className="text-[9px] px-1 py-0.2 rounded font-normal text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 ml-0.5">
            {i18n.defaultBadge}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onStyleChange('complete')}
          aria-pressed={designStyle === 'complete'}
          className={`flex-1 py-2 sm:py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            designStyle === 'complete'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>{i18n.completeLabel}</span>
        </button>
      </div>
      )}

      {/* Family Pills (All | Personal (7) | Business (5)) */}
      <div className="flex items-center space-x-1.5 p-0.5 bg-slate-100/70 dark:bg-slate-800/50 rounded-lg text-[11px] whitespace-nowrap">
        <button
          type="button"
          onClick={() => setSelectedFamily('all')}
          aria-pressed={selectedFamily === 'all'}
          className={`flex-1 py-1 px-2 rounded-md font-semibold transition-all text-center ${
            selectedFamily === 'all'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {i18n.allTemplates} ({TEMPLATE_DEFINITIONS.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedFamily('personal')}
          aria-pressed={selectedFamily === 'personal'}
          className={`flex-1 py-1 px-2 rounded-md font-semibold transition-all text-center flex items-center justify-center space-x-1 ${
            selectedFamily === 'personal'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <User className="w-3 h-3" />
          <span>{i18n.familyPersonal} ({personalCount})</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedFamily('business')}
          aria-pressed={selectedFamily === 'business'}
          className={`flex-1 py-1 px-2 rounded-md font-semibold transition-all text-center flex items-center justify-center space-x-1 ${
            selectedFamily === 'business'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-3 h-3" />
          <span>{i18n.familyBusiness} ({businessCount})</span>
        </button>
      </div>

      {/* Templates List */}
      <div ref={listRef} className="relative grid grid-cols-1 gap-2 max-h-[380px] overflow-y-auto pr-1">
        {filteredTemplates.map((tDef) => {
          const tInfo = i18n.templates[tDef.id] || {
            title: tDef.id,
            desc: '',
            tag: tDef.family,
          };
          const isSelected = activeTemplate === tDef.id;
          const Icon = tDef.icon;

          return (
            <button
              key={tDef.id}
              type="button"
              data-template-id={tDef.id}
              aria-pressed={isSelected}
              onClick={() => onSelect(tDef.id)}
              className={`flex items-start space-x-3 p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-50/90 dark:bg-slate-800/90 shadow-2xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/40'
              }`}
              style={{
                borderColor: isSelected ? brandColor : undefined,
                boxShadow: isSelected ? `0 0 0 1.5px ${brandColor}` : undefined,
              }}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? '' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
                style={isSelected ? { backgroundColor: `${brandColor}15`, color: brandColor } : undefined}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {tInfo.title}
                  </h4>
                  <span className="text-[9px] font-medium text-slate-400 shrink-0 ml-1">
                    {tInfo.tag}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1">
                  {tInfo.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
