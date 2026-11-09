'use client';

import React from 'react';
import { BrandKit, DocumentLang, WeeklyPlannerCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultWeeklyPlannerContent } from '@/lib/use-brand-kit';
import { getLocalizedWeekdays } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface WeeklyPlannerTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const WeeklyPlannerTemplate: React.FC<WeeklyPlannerTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).weeklyPlanner;
  const content: WeeklyPlannerCustomContent =
    brandKit.weeklyPlannerContent || getDefaultWeeklyPlannerContent(docLang);

  const weekdays = getLocalizedWeekdays(docLang, brandKit.weekStart || 'monday', 'long');

  const updateContent = (updates: Partial<WeeklyPlannerCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      weeklyPlannerContent: { ...content, ...updates },
    });
  };

  const handleUpdatePriority = (index: number, value: string) => {
    const newPriorities = [...content.priorities] as [string, string, string];
    newPriorities[index] = value;
    updateContent({ priorities: newPriorities });
  };

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-4 text-[10.5px] text-slate-600 shrink-0">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-700">{labels.weekOfLabel}</span>
            <span className="min-w-[110px] border-b border-slate-400 pb-0.5 text-slate-400">
              ____ / ____ / 20___
            </span>
          </div>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-2.5 py-1">
        {/* Top 3 Priorities of the Week */}
        <section className="bg-slate-50/70 border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              {labels.prioritiesTitle}
            </span>
            <span className="text-[9px] text-slate-500 italic">Ce qui rendra cette semaine réussie</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {content.priorities.map((p, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-white rounded p-1.5 border border-slate-200">
                <span
                  className="w-4 h-4 rounded border flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ borderColor: brandKit.brandColor, color: brandKit.brandColor }}
                >
                  {idx + 1}
                </span>
                <input aria-label="Priority"
                  type="text"
                  value={p}
                  onChange={(e) => handleUpdatePriority(idx, e.target.value)}
                  className="flex-1 text-[10px] text-slate-900 bg-transparent outline-none truncate"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 7 Days Columns / Grid */}
        <div className="grid grid-cols-7 gap-2 flex-1">
          {weekdays.map((dayName, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-lg p-2 flex flex-col justify-between bg-white shadow-2xs"
            >
              <div>
                <div className="pb-1 border-b border-slate-200 flex items-center justify-between">
                  <span
                    className="text-[10.5px] font-bold capitalize truncate"
                    style={{ color: brandKit.brandColor }}
                  >
                    {dayName}
                  </span>
                  <div className="w-3.5 h-3.5 border border-slate-300 rounded-xs" />
                </div>
                {/* Handwriting guide lines */}
                <div className="mt-2 space-y-3">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="border-b border-dashed border-slate-200 h-3" />
                  ))}
                </div>
              </div>
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[8px] text-slate-400">
                <span>{labels.dayNotesLabel}</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Strip: Habits mini tracker & Focus note */}
        <section className="border border-slate-200 rounded-lg p-2 bg-slate-50/50 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center space-x-2 text-[9.5px]">
            <span className="font-bold text-slate-700 shrink-0">{labels.reviewNotesLabel}</span>
            <input aria-label="Notes"
              type="text"
              value={content.notes}
              onChange={(e) => updateContent({ notes: e.target.value })}
              className="flex-1 bg-transparent border-b border-slate-200 pb-0.5 text-slate-700 italic outline-none"
            />
          </div>
          <div className="flex items-center space-x-1.5 text-[8.5px] text-slate-500 shrink-0">
            <span>Hydratation :</span>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className="w-3 h-3 rounded-full border border-slate-300 flex items-center justify-center text-[6px]">
                💧
              </div>
            ))}
          </div>
        </section>
      </div>
    </MinimalDocFrame>
  );
};
