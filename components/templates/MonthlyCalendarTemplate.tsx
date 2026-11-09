'use client';

import React from 'react';
import { BrandKit, DocumentLang, MonthlyCalendarCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultMonthlyCalendarContent } from '@/lib/use-brand-kit';
import { getLocalizedWeekdays } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface MonthlyCalendarTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const MonthlyCalendarTemplate: React.FC<MonthlyCalendarTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).monthlyCalendar;
  const content: MonthlyCalendarCustomContent =
    brandKit.monthlyCalendarContent || getDefaultMonthlyCalendarContent(docLang);

  const weekdays = getLocalizedWeekdays(docLang, brandKit.weekStart || 'monday', 'short');

  const updateContent = (updates: Partial<MonthlyCalendarCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      monthlyCalendarContent: { ...content, ...updates },
    });
  };

  const handleUpdateGoal = (index: number, value: string) => {
    const newGoals = [...content.goals] as [string, string, string];
    newGoals[index] = value;
    updateContent({ goals: newGoals });
  };

  // 35 cells (5 weeks x 7 days)
  const calendarCells = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-3 text-[11px] text-slate-700 shrink-0">
          <input aria-label="Month name"
            type="text"
            value={content.monthName}
            onChange={(e) => updateContent({ monthName: e.target.value })}
            className="w-28 font-bold border-b border-slate-400 pb-0.5 text-right outline-none bg-transparent"
          />
          <input aria-label="Year"
            type="text"
            value={content.year}
            onChange={(e) => updateContent({ year: e.target.value })}
            className="w-14 font-mono font-bold border-b border-slate-400 pb-0.5 text-center outline-none bg-transparent"
          />
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex h-full gap-3 py-1">
        {/* Main 7-Column Calendar Grid (approx 75% width) */}
        <div className="flex-1 flex flex-col border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
          {/* Weekday Header Row */}
          <div className="grid grid-cols-7 bg-slate-100 border-b border-slate-300 text-center py-1.5 text-[9.5px] font-bold text-slate-700 uppercase tracking-wider">
            {weekdays.map((day, idx) => (
              <div key={idx} className="border-r border-slate-200 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* 35 Calendar Day Cells */}
          <div className="grid grid-cols-7 flex-1">
            {calendarCells.map((cellNum) => {
              const isNumbered = cellNum <= 31;
              return (
                <div
                  key={cellNum}
                  className="border-r border-b border-slate-200 p-1.5 flex flex-col justify-between hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-[9.5px] font-bold ${
                        isNumbered ? 'text-slate-900' : 'text-slate-300'
                      }`}
                      style={isNumbered && cellNum === 1 ? { color: brandKit.brandColor } : {}}
                    >
                      {cellNum <= 31 ? String(cellNum).padStart(2, '0') : ''}
                    </span>
                  </div>
                  <div className="space-y-1.5 mt-1">
                    <div className="border-b border-dashed border-slate-100 h-1" />
                    <div className="border-b border-dashed border-slate-100 h-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Goals & Notes (approx 25% width) */}
        <div className="w-[190px] flex flex-col justify-between border border-slate-200 rounded-lg p-2.5 bg-slate-50/70">
          <div>
            <div className="pb-1.5 border-b border-slate-200 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider block"
                style={{ color: brandKit.brandColor }}
              >
                {labels.goalsTitle}
              </span>
            </div>
            <div className="space-y-2">
              {content.goals.map((g, idx) => (
                <div key={idx} className="flex items-start space-x-1.5">
                  <div className="w-3.5 h-3.5 border border-slate-300 rounded-xs mt-0.5 bg-white shrink-0" />
                  <input aria-label="Goal"
                    type="text"
                    value={g}
                    onChange={(e) => handleUpdateGoal(idx, e.target.value)}
                    className="flex-1 text-[9px] text-slate-800 bg-transparent border-b border-slate-200 pb-0.5 outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Key Dates block */}
            <div className="mt-4 pt-2 border-t border-slate-200">
              <span className="text-[9.5px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                {labels.notesTitle}
              </span>
              <div className="space-y-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex items-center space-x-1.5 text-[8.5px]">
                    <span className="w-6 border-b border-slate-300 text-slate-400 font-mono">__/</span>
                    <span className="flex-1 border-b border-slate-200 h-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Notes */}
          <div className="mt-3 pt-2 border-t border-slate-200">
            <span className="text-[9.5px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
              {labels.notesTitle}
            </span>
            <textarea aria-label="Notes"
              rows={3}
              value={content.notes}
              onChange={(e) => updateContent({ notes: e.target.value })}
              className="w-full text-[9px] text-slate-600 bg-transparent border border-slate-200 rounded p-1 outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </MinimalDocFrame>
  );
};
