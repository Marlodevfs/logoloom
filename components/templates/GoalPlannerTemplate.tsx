'use client';

import React from 'react';
import { BrandKit, DocumentLang, GoalPlannerCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultGoalPlannerContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface GoalPlannerTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const GoalPlannerTemplate: React.FC<GoalPlannerTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).goalPlanner;
  const content: GoalPlannerCustomContent =
    brandKit.goalPlannerContent || getDefaultGoalPlannerContent(docLang);

  const updateContent = (updates: Partial<GoalPlannerCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      goalPlannerContent: { ...content, ...updates },
    });
  };

  const handleUpdateGoal = (index: number, value: string) => {
    const newGoals = [...content.goals] as [string, string, string];
    newGoals[index] = value;
    updateContent({ goals: newGoals });
  };

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-4 text-[10.5px] text-slate-600 shrink-0">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-700">{labels.nameLabel}</span>
            <span className="min-w-[120px] border-b border-slate-400 pb-0.5 font-medium text-slate-900">
              {brandKit.clientName || '____________________'}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-700">{labels.horizonLabel}</span>
            <span className="min-w-[70px] border-b border-slate-400 pb-0.5 text-slate-700">
              {labels.horizonValue}
            </span>
          </div>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-2.5 py-1">
        {/* Top: 3 Main Goals */}
        <section className="bg-slate-50/70 rounded-lg p-2.5 border border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              {labels.goalsTitle}
            </span>
          </div>
          <div className="space-y-1.5">
            {content.goals.map((g, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span
                  className="w-4 h-4 rounded border flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ borderColor: brandKit.brandColor, color: brandKit.brandColor }}
                >
                  {idx + 1}
                </span>
                <input aria-label="Goal"
                  type="text"
                  value={g}
                  onChange={(e) => handleUpdateGoal(idx, e.target.value)}
                  className="flex-1 text-[10.5px] font-medium text-slate-900 bg-transparent border-b border-slate-300 pb-0.5 outline-none hover:border-slate-500 focus:border-indigo-600"
                />
              </div>
            ))}
          </div>
          {/* Why it matters */}
          <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center space-x-2">
            <span className="text-[9.5px] font-bold text-slate-600 shrink-0">{labels.whyLabel}</span>
            <input aria-label="Why it matters"
              type="text"
              value={content.whyItMatters}
              onChange={(e) => updateContent({ whyItMatters: e.target.value })}
              className="flex-1 text-[9.5px] text-slate-700 italic bg-transparent border-b border-slate-200 pb-0.5 outline-none focus:border-indigo-500"
            />
          </div>
        </section>

        {/* 3 Monthly Blocks */}
        <div className="grid grid-cols-3 gap-2.5 flex-1">
          {content.phases.map((phase, pIdx) => (
            <div
              key={pIdx}
              className="border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between bg-white shadow-2xs"
            >
              <div>
                <div
                  className="pb-1.5 border-b border-slate-200 flex flex-col"
                >
                  <span
                    className="text-[11px] font-bold leading-tight"
                    style={{ color: brandKit.brandColor }}
                  >
                    {phase.title}
                  </span>
                  <span className="text-[8.5px] text-slate-500 mt-0.5 line-clamp-1">
                    {phase.focus}
                  </span>
                </div>

                {/* Milestones with Checkboxes */}
                <div className="mt-2 space-y-2">
                  {phase.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-start space-x-1.5">
                      <div className="w-3.5 h-3.5 rounded border border-slate-300 mt-0.5 shrink-0 bg-white" />
                      <span className="text-[9.5px] text-slate-800 leading-tight">
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bar Checkboxes */}
              <div className="pt-2 border-t border-slate-200 mt-2">
                <div className="flex items-center justify-between text-[8px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                  <span>{labels.progressTitle}</span>
                  <span>{phase.kpi}</span>
                </div>
                <div className="flex items-center justify-between space-x-1">
                  {[20, 40, 60, 80, 100].map((pct) => (
                    <div key={pct} className="flex flex-col items-center flex-1">
                      <div className="w-full h-3 border border-slate-300 rounded-xs flex items-center justify-center text-[7.5px] font-bold text-slate-500 hover:bg-slate-100">
                        {pct}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Check-in Strip (12 Weeks) */}
        <section className="border border-slate-200 rounded-lg p-2 bg-slate-50/50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">
              {labels.weeklyTitle}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-1.5">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="border border-slate-200 bg-white rounded p-1 flex flex-col items-center justify-center"
              >
                <span className="text-[7.5px] font-bold text-slate-500">{labels.weekPrefix}{i + 1}</span>
                <div className="w-3.5 h-3.5 border border-slate-300 rounded-xs mt-0.5" />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Notes Area */}
        <div className="border-t border-slate-200 pt-1.5 flex items-center space-x-2 text-[9px] text-slate-600">
          <span className="font-bold text-slate-700 shrink-0">{labels.quarterNotesLabel}</span>
          <input aria-label="Notes"
            type="text"
            value={content.notes}
            onChange={(e) => updateContent({ notes: e.target.value })}
            className="flex-1 bg-transparent border-b border-slate-200 pb-0.5 italic text-slate-600 outline-none"
          />
        </div>
      </div>
    </MinimalDocFrame>
  );
};
