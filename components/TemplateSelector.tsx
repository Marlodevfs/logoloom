'use client';

import React from 'react';
import { Calendar, Milestone, FileText, Feather, Layers } from 'lucide-react';
import { TemplateId, DesignStyle, InterfaceLang } from '@/types';

interface TemplateSelectorProps {
  activeTemplate: TemplateId;
  onSelect: (id: TemplateId) => void;
  brandColor: string;
  designStyle: DesignStyle;
  onStyleChange: (style: DesignStyle) => void;
  interfaceLang: InterfaceLang;
}

interface SelectorStrings {
  stepTitle: string;
  countModels: string;
  minimalLabel: string;
  defaultBadge: string;
  completeLabel: string;
  templates: {
    'habit-tracker': {
      title: string;
      descMinimal: string;
      descComplete: string;
      tag: string;
    };
    'roadmap-90': {
      title: string;
      descMinimal: string;
      descComplete: string;
      tag: string;
    };
    'welcome-packet': {
      title: string;
      descMinimal: string;
      descComplete: string;
      tag: string;
    };
  };
}

const SELECTOR_I18N: Record<InterfaceLang, SelectorStrings> = {
  fr: {
    stepTitle: '3. Modèle de document',
    countModels: '3 modèles prêts à imprimer',
    minimalLabel: 'Minimal',
    defaultBadge: 'Défaut',
    completeLabel: 'Complet',
    templates: {
      'habit-tracker': {
        title: 'Suivi d’habitudes 30 jours',
        descMinimal: 'Grille épurée 30 jours, portrait, blanc aéré',
        descComplete: 'Grille 30 jours paysage, bilans et conseils',
        tag: 'Santé & Habitudes',
      },
      'roadmap-90': {
        title: 'Feuille de route 90 jours',
        descMinimal: '3 phases horizontales aérées avec objectifs et cases à cocher',
        descComplete: 'Plan d’action stratégique pas à pas pour consultants',
        tag: 'Stratégie & Jalons',
      },
      'welcome-packet': {
        title: 'Pack d’accueil client',
        descMinimal: 'Guide d’onboarding sobre, canaux et accords de travail',
        descComplete: 'Guide complet avec règles de collaboration et étapes',
        tag: 'Accueil client',
      },
    },
  },
  en: {
    stepTitle: '3. Document Template',
    countModels: '3 Print-ready models',
    minimalLabel: 'Minimal',
    defaultBadge: 'Default',
    completeLabel: 'Complete',
    templates: {
      'habit-tracker': {
        title: '30-Day Habit Tracker',
        descMinimal: 'Clean portrait grid, 30 days, airy whitespace',
        descComplete: 'Landscape grid with weekly check-ins and coaching note',
        tag: 'Health & Habits',
      },
      'roadmap-90': {
        title: '90-Day Strategic Roadmap',
        descMinimal: '3 airy horizontal phases with milestones and checkboxes',
        descComplete: 'Step-by-step strategic action plan for consultants',
        tag: 'Strategy & Milestones',
      },
      'welcome-packet': {
        title: 'Client Welcome Packet',
        descMinimal: 'Clean onboarding guide, channels and working agreements',
        descComplete: 'Comprehensive guide with rules of engagement and next steps',
        tag: 'Client Onboarding',
      },
    },
  },
  de: {
    stepTitle: '3. Dokumenten-Vorlage',
    countModels: '3 druckfertige Vorlagen',
    minimalLabel: 'Minimal',
    defaultBadge: 'Standard',
    completeLabel: 'Vollständig',
    templates: {
      'habit-tracker': {
        title: '30-Tage-Gewohnheitstracker',
        descMinimal: 'Klare 30-Tage-Matrix im Hochformat mit viel Weißraum',
        descComplete: 'Querformat mit wöchentlichen Reflexionen und Coach-Notiz',
        tag: 'Gesundheit & Gewohnheiten',
      },
      'roadmap-90': {
        title: 'Strategische 90-Tage-Roadmap',
        descMinimal: '3 übersichtliche Phasen mit Meilensteinen und Checkboxen',
        descComplete: 'Schritt-für-Schritt Aktionsplan für Berater & Coaches',
        tag: 'Strategie & Meilensteine',
      },
      'welcome-packet': {
        title: 'Kunden-Willkommenspaket',
        descMinimal: 'Klarer Onboarding-Leitfaden mit Kommunikationsregeln',
        descComplete: 'Umfassender Leitfaden mit Zusammenarbeitsregeln und Schritten',
        tag: 'Kunden-Onboarding',
      },
    },
  },
  es: {
    stepTitle: '3. Plantilla de documento',
    countModels: '3 modelos listos para imprimir',
    minimalLabel: 'Mínimo',
    defaultBadge: 'Por defecto',
    completeLabel: 'Completo',
    templates: {
      'habit-tracker': {
        title: 'Seguimiento de hábitos 30 días',
        descMinimal: 'Cuadrícula limpia de 30 días, vertical y espaciosa',
        descComplete: 'Cuadrícula apaisada con revisiones semanales y nota del coach',
        tag: 'Salud y Hábitos',
      },
      'roadmap-90': {
        title: 'Hoja de ruta estratégica 90 días',
        descMinimal: '3 fases horizontales con hitos y casillas de verificación',
        descComplete: 'Plan de acción paso a paso para consultores y coaches',
        tag: 'Estrategia e Hitos',
      },
      'welcome-packet': {
        title: 'Paquete de bienvenida al cliente',
        descMinimal: 'Guía clara de onboarding, canales y acuerdos de trabajo',
        descComplete: 'Guía completa con reglas de colaboración y primeros pasos',
        tag: 'Onboarding de Clientes',
      },
    },
  },
  it: {
    stepTitle: '3. Modello di Documento',
    countModels: '3 modelli pronti per la stampa',
    minimalLabel: 'Minimale',
    defaultBadge: 'Predefinito',
    completeLabel: 'Completo',
    templates: {
      'habit-tracker': {
        title: 'Registro abitudini 30 giorni',
        descMinimal: 'Griglia essenziale di 30 giorni, verticale e ariosa',
        descComplete: 'Griglia orizzontale con verifiche settimanali e nota del coach',
        tag: 'Salute & Abitudini',
      },
      'roadmap-90': {
        title: 'Tabella di marcia 90 giorni',
        descMinimal: '3 fasi orizzontali ariose con traguardi e caselle di controllo',
        descComplete: 'Piano d’azione strategico passo dopo passo per consulenti',
        tag: 'Strategia & Obiettivi',
      },
      'welcome-packet': {
        title: 'Kit di benvenuto per i clienti',
        descMinimal: 'Guida onboarding chiara, canali e accordi di lavoro',
        descComplete: 'Guida completa con regole di collaborazione e prossimi passi',
        tag: 'Onboarding Clienti',
      },
    },
  },
  pt: {
    stepTitle: '3. Modelo de Documento',
    countModels: '3 modelos prontos para impressão',
    minimalLabel: 'Mínimo',
    defaultBadge: 'Padrão',
    completeLabel: 'Completo',
    templates: {
      'habit-tracker': {
        title: 'Rastreador de hábitos 30 dias',
        descMinimal: 'Grelha limpa de 30 dias, vertical com bastante espaço',
        descComplete: 'Grelha paisagem com balanços semanais e nota do mentor',
        tag: 'Saúde e Hábitos',
      },
      'roadmap-90': {
        title: 'Roteiro estratégico de 90 dias',
        descMinimal: '3 fases horizontais com marcos e caixas de seleção',
        descComplete: 'Plano de ação estratégico passo a passo para consultores',
        tag: 'Estratégia e Metas',
      },
      'welcome-packet': {
        title: 'Kit de boas-vindas ao cliente',
        descMinimal: 'Guia de onboarding direto, canais e acordos de trabalho',
        descComplete: 'Guia completo com regras de colaboração e primeiros passos',
        tag: 'Integração de Clientes',
      },
    },
  },
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  activeTemplate,
  onSelect,
  brandColor,
  designStyle,
  onStyleChange,
  interfaceLang,
}) => {
  const i18n = SELECTOR_I18N[interfaceLang] || SELECTOR_I18N.en;

  const templates = [
    {
      id: 'habit-tracker' as TemplateId,
      title: i18n.templates['habit-tracker'].title,
      desc: designStyle === 'minimal'
        ? i18n.templates['habit-tracker'].descMinimal
        : i18n.templates['habit-tracker'].descComplete,
      icon: Calendar,
      tag: i18n.templates['habit-tracker'].tag,
    },
    {
      id: 'roadmap-90' as TemplateId,
      title: i18n.templates['roadmap-90'].title,
      desc: designStyle === 'minimal'
        ? i18n.templates['roadmap-90'].descMinimal
        : i18n.templates['roadmap-90'].descComplete,
      icon: Milestone,
      tag: i18n.templates['roadmap-90'].tag,
    },
    {
      id: 'welcome-packet' as TemplateId,
      title: i18n.templates['welcome-packet'].title,
      desc: designStyle === 'minimal'
        ? i18n.templates['welcome-packet'].descMinimal
        : i18n.templates['welcome-packet'].descComplete,
      icon: FileText,
      tag: i18n.templates['welcome-packet'].tag,
    },
  ];

  return (
    <div className="space-y-2.5">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          {i18n.stepTitle}
        </label>
        <span className="text-[10px] text-slate-400 font-medium">
          {i18n.countModels}
        </span>
      </div>

      {/* Style Selector: Single 2-option Segmented Control (Minimal | Complete) */}
      <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 flex items-center">
        <button
          type="button"
          onClick={() => onStyleChange('minimal')}
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

      {/* Templates List */}
      <div className="grid grid-cols-1 gap-2">
        {templates.map((tmpl) => {
          const isSelected = activeTemplate === tmpl.id;
          const Icon = tmpl.icon;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelect(tmpl.id)}
              className={`flex items-start space-x-3 p-3 sm:p-2.5 rounded-xl border text-left transition-all ${
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
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: isSelected ? `${brandColor}15` : '#F1F5F9',
                  color: isSelected ? brandColor : '#64748B',
                }}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {tmpl.title}
                  </h4>
                  <span className="text-[9.5px] font-medium text-slate-400 shrink-0 ml-1">
                    {tmpl.tag}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                  {tmpl.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
