'use client';

import React from 'react';
import { Calendar, Milestone, FileText, Feather, Layers } from 'lucide-react';
import { TemplateId, DesignStyle, InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface TemplateSelectorProps {
  activeTemplate: TemplateId;
  onSelect: (id: TemplateId) => void;
  brandColor: string;
  designStyle: DesignStyle;
  onStyleChange: (style: DesignStyle) => void;
  interfaceLang: InterfaceLang;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  activeTemplate,
  onSelect,
  brandColor,
  designStyle,
  onStyleChange,
  interfaceLang,
}) => {
  const isFrench = interfaceLang === 'fr';
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;

  const templates = [
    {
      id: 'habit-tracker' as TemplateId,
      title: isFrench ? 'Suivi d’habitudes 30 jours' : '30-Day Habit Tracker',
      desc: isFrench
        ? (designStyle === 'minimal' ? 'Grille épurée 30 jours, portrait, blanc aéré' : 'Grille 30 jours paysage, bilans et conseils')
        : (designStyle === 'minimal' ? 'Clean portrait grid, 30 days, airy whitespace' : 'Landscape grid with weekly check-ins and coaching note'),
      icon: Calendar,
      tag: isFrench ? 'Santé & Habitudes' : 'Health & Habits',
    },
    {
      id: 'roadmap-90' as TemplateId,
      title: isFrench ? 'Feuille de route 90 jours' : '90-Day Strategic Roadmap',
      desc: isFrench
        ? (designStyle === 'minimal' ? '3 phases horizontales aérées avec objectifs et cases à cocher' : 'Plan d’action stratégique pas à pas pour consultants')
        : (designStyle === 'minimal' ? '3 airy horizontal phases with milestones and checkboxes' : 'Step-by-step strategic action plan for consultants'),
      icon: Milestone,
      tag: isFrench ? 'Stratégie & Jalons' : 'Strategy & Milestones',
    },
    {
      id: 'welcome-packet' as TemplateId,
      title: isFrench ? 'Pack d’accueil client' : 'Client Welcome Packet',
      desc: isFrench
        ? (designStyle === 'minimal' ? 'Guide d’onboarding sobre, canaux et accords de travail' : 'Guide complet avec règles de collaboration et étapes')
        : (designStyle === 'minimal' ? 'Clean onboarding guide, channels and working agreements' : 'Comprehensive guide with rules of engagement and next steps'),
      icon: FileText,
      tag: isFrench ? 'Accueil client' : 'Client Onboarding',
    },
  ];

  return (
    <div className="space-y-2.5">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          {isFrench ? '3. Modèle de document' : '3. Document Template'}
        </label>
        <span className="text-[10px] text-slate-400 font-medium">
          {isFrench ? '3 modèles prêts à imprimer' : '3 Print-ready models'}
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
          <span>{isFrench ? 'Minimal' : 'Minimal'}</span>
          <span className="text-[9px] px-1 py-0.2 rounded font-normal text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 ml-0.5">
            {isFrench ? 'Défaut' : 'Default'}
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
          <span>{isFrench ? 'Complet' : 'Complete'}</span>
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
