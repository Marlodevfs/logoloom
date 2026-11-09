'use client';

import React from 'react';
import { BrandKit, DocumentLang, DailyPrioritiesCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultDailyPrioritiesContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface DailyPrioritiesTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const DailyPrioritiesTemplate: React.FC<DailyPrioritiesTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).dailyPriorities;
  const content: DailyPrioritiesCustomContent =
    brandKit.dailyPrioritiesContent || getDefaultDailyPrioritiesContent(docLang);

  const updateContent = (updates: Partial<DailyPrioritiesCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      dailyPrioritiesContent: { ...content, ...updates },
    });
  };

  const handleUpdatePriority = (index: number, value: string) => {
    const newP = [...content.priorities] as [string, string, string];
    newP[index] = value;
    updateContent({ priorities: newP });
  };

  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-4 text-[10.5px] text-slate-600 shrink-0">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-700">{labels.dateLabel}</span>
            <span className="min-w-[100px] border-b border-slate-400 pb-0.5 text-slate-400">
              ____ / ____ / 20___
            </span>
          </div>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-2.5 py-1">
        {/* Top 3 Priorities */}
        <section className="bg-slate-50/70 border border-slate-200 rounded-lg p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              {labels.top3Title}
            </span>
            <span className="text-[8.5px] text-slate-500 italic">À terminer en priorité</span>
          </div>
          <div className="space-y-1.5">
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
                  className="flex-1 text-[10.5px] text-slate-900 bg-transparent outline-none"
                />
                <div className="w-3.5 h-3.5 border border-slate-300 rounded-xs" />
              </div>
            ))}
          </div>
        </section>

        {/* 2-Column Core: Schedule (Left) + To-Do List (Right) */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Schedule Hourly Blocks */}
          <div className="border border-slate-200 rounded-lg p-2.5 bg-white shadow-2xs flex flex-col justify-between">
            <div className="pb-1 border-b border-slate-200 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: brandKit.brandColor }}
              >
                {labels.scheduleTitle}
              </span>
            </div>
            <div className="space-y-1.5 flex-1 flex flex-col justify-between">
              {hours.map((hr, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-[9px]">
                  <span className="w-10 font-mono font-semibold text-slate-500 shrink-0">
                    {hr}
                  </span>
                  <div className="flex-1 border-b border-slate-200 h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Tasks Checklist */}
          <div className="border border-slate-200 rounded-lg p-2.5 bg-white shadow-2xs flex flex-col justify-between">
            <div className="pb-1 border-b border-slate-200 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ color: brandKit.brandColor }}
              >
                {labels.todoTitle}
              </span>
            </div>
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              {content.tasks.map((task, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-[9.5px]">
                  <div className="w-3.5 h-3.5 border border-slate-300 rounded-xs shrink-0" />
                  <span className="flex-1 text-slate-800 leading-tight">
                    {task.text}
                  </span>
                </div>
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center space-x-2 text-[9.5px]">
                  <div className="w-3.5 h-3.5 border border-slate-200 rounded-xs shrink-0" />
                  <div className="flex-1 border-b border-dashed border-slate-200 h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gratitude & Daily Reflections */}
        <section className="border border-slate-200 rounded-lg p-2 bg-slate-50/70 flex items-center space-x-3 text-[9.5px]">
          <span className="font-bold text-slate-700 shrink-0">{labels.gratitudeLabel}</span>
          <input aria-label="Gratitude"
            type="text"
            value={content.gratitude}
            onChange={(e) => updateContent({ gratitude: e.target.value })}
            className="flex-1 bg-transparent border-b border-slate-200 pb-0.5 text-slate-700 italic outline-none"
          />
        </section>
      </div>
    </MinimalDocFrame>
  );
};
