'use client';

import React from 'react';
import { BrandKit, DocumentLang, MealPlannerCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultMealPlannerContent } from '@/lib/use-brand-kit';
import { getLocalizedWeekdays } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';
import { MINIMAL_HABIT_LABELS } from '@/lib/i18n/minimal-labels';

interface MealPlannerTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const MealPlannerTemplate: React.FC<MealPlannerTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).mealPlanner;
  const habitLabels = MINIMAL_HABIT_LABELS[docLang] || MINIMAL_HABIT_LABELS.en;
  const content: MealPlannerCustomContent =
    brandKit.mealPlannerContent || getDefaultMealPlannerContent(docLang);

  const weekdays = getLocalizedWeekdays(docLang, brandKit.weekStart || 'monday', 'short');

  const updateContent = (updates: Partial<MealPlannerCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      mealPlannerContent: { ...content, ...updates },
    });
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
            <span className="min-w-[100px] border-b border-slate-400 pb-0.5 text-slate-400">
              ____ / ____ / 20___
            </span>
          </div>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex h-full gap-3 py-1">
        {/* Left: 7 Days Meal Grid (approx 75% width) */}
        <div className="flex-1 flex flex-col border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
          {/* Header Row */}
          <div className="grid grid-cols-5 bg-slate-100 border-b border-slate-300 py-1.5 text-center text-[9px] font-bold text-slate-700 uppercase tracking-wider">
            <div className="w-16 border-r border-slate-200">{habitLabels.day}</div>
            <div className="border-r border-slate-200">{labels.breakfast}</div>
            <div className="border-r border-slate-200">{labels.lunch}</div>
            <div className="border-r border-slate-200">{labels.dinner}</div>
            <div>{labels.snack}</div>
          </div>

          {/* 7 Day Rows */}
          <div className="flex-1 flex flex-col justify-between divide-y divide-slate-200">
            {weekdays.map((dayName, idx) => {
              const dayMeals = content.days[idx] || { breakfast: '', lunch: '', dinner: '', snack: '' };
              return (
                <div key={idx} className="grid grid-cols-5 flex-1 items-center text-[9px] hover:bg-slate-50/50">
                  <div className="w-16 px-2 py-1 font-bold text-slate-800 border-r border-slate-200 capitalize">
                    {dayName}
                  </div>
                  <div className="p-1.5 border-r border-slate-200 text-slate-700 leading-tight">
                    {dayMeals.breakfast}
                  </div>
                  <div className="p-1.5 border-r border-slate-200 text-slate-700 leading-tight">
                    {dayMeals.lunch}
                  </div>
                  <div className="p-1.5 border-r border-slate-200 text-slate-700 leading-tight">
                    {dayMeals.dinner}
                  </div>
                  <div className="p-1.5 text-slate-600 leading-tight">
                    {dayMeals.snack}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Shopping List (approx 25% width) */}
        <div className="w-[190px] border border-slate-200 rounded-lg p-2.5 bg-slate-50/70 flex flex-col justify-between">
          <div>
            <div className="pb-1.5 border-b border-slate-200 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider block"
                style={{ color: brandKit.brandColor }}
              >
                {labels.shoppingListTitle}
              </span>
            </div>
            <div className="space-y-2">
              {content.shoppingItems.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-1.5">
                  <div className="w-3.5 h-3.5 border border-slate-300 rounded-xs mt-0.5 bg-white shrink-0" />
                  <span className="text-[9px] text-slate-800 leading-tight">{item}</span>
                </div>
              ))}
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex items-center space-x-1.5">
                  <div className="w-3.5 h-3.5 border border-slate-200 rounded-xs bg-white shrink-0" />
                  <div className="flex-1 border-b border-dashed border-slate-200 h-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 text-[8px] text-slate-400 text-center">
            Repas équilibrés • Faits maison
          </div>
        </div>
      </div>
    </MinimalDocFrame>
  );
};
