'use client';

import React from 'react';
import { CheckCircle2, Calendar, Milestone, FileText } from 'lucide-react';
import { TemplateId, InterfaceLang } from '@/types';
import { UI_TRANSLATIONS } from '@/lib/i18n/interface';

interface TemplateSelectorProps {
  activeTemplate: TemplateId;
  onSelect: (id: TemplateId) => void;
  brandColor: string;
  interfaceLang: InterfaceLang;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  activeTemplate,
  onSelect,
  brandColor,
  interfaceLang,
}) => {
  const t = UI_TRANSLATIONS[interfaceLang] || UI_TRANSLATIONS.en;

  const templates = [
    {
      id: 'habit-tracker' as TemplateId,
      title: t.templateHabitTitle,
      desc: t.templateHabitDesc,
      icon: Calendar,
      tag: 'Sport & Habits',
    },
    {
      id: 'roadmap-90' as TemplateId,
      title: t.templateRoadmapTitle,
      desc: t.templateRoadmapDesc,
      icon: Milestone,
      tag: 'Strategy & Milestones',
    },
    {
      id: 'welcome-packet' as TemplateId,
      title: t.templateWelcomeTitle,
      desc: t.templateWelcomeDesc,
      icon: FileText,
      tag: 'Client Onboarding',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-100">
          {t.stepTemplate}
        </label>
        <span className="text-[10px] text-slate-400 font-medium">3 Print-Ready Models</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {templates.map((tmpl) => {
          const isSelected = activeTemplate === tmpl.id;
          const Icon = tmpl.icon;
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelect(tmpl.id)}
              className={`flex items-start space-x-3 p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-50 dark:bg-slate-800/90 shadow-2xs'
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
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1">
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
