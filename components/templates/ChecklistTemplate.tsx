'use client';

import React from 'react';
import { BrandKit, DocumentLang, ChecklistCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultChecklistContent } from '@/lib/use-brand-kit';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface ChecklistTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const ChecklistTemplate: React.FC<ChecklistTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).checklist;
  const content: ChecklistCustomContent =
    brandKit.checklistContent || getDefaultChecklistContent(docLang);

  const updateContent = (updates: Partial<ChecklistCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      checklistContent: { ...content, ...updates },
    });
  };

  const toggleItem = (gIdx: number, iIdx: number) => {
    const newGroups = [...content.groups];
    newGroups[gIdx].items[iIdx].done = !newGroups[gIdx].items[iIdx].done;
    updateContent({ groups: newGroups });
  };

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-3 text-[10.5px] text-slate-600 shrink-0">
          <span className="font-semibold text-slate-700">{labels.targetDateLabel}</span>
          <span className="font-medium text-slate-900 border-b border-slate-300 pb-0.5 min-w-[90px]">
            ____ / ____ / 20___
          </span>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-3 py-1">
        {/* 3 Grouped Sections */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          {content.groups.map((group, gIdx) => (
            <section
              key={gIdx}
              className="border border-slate-200 rounded-lg p-2.5 bg-white shadow-2xs flex-1 flex flex-col justify-start"
            >
              <div className="pb-1 border-b border-slate-200 mb-2 flex items-center justify-between">
                <span
                  className="text-[10.5px] font-bold uppercase tracking-wider"
                  style={{ color: brandKit.brandColor }}
                >
                  {group.groupName}
                </span>
                <span className="text-[8px] text-slate-400">
                  {group.items.filter((i) => i.done).length} / {group.items.length} validés
                </span>
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col justify-around">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={() => toggleItem(gIdx, iIdx)}
                    className="flex items-start space-x-2 py-1 px-1 rounded hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        item.done
                          ? 'bg-emerald-600 border-emerald-600 text-white text-[8px] font-bold'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {item.done ? '✓' : ''}
                    </div>
                    <span
                      className={`text-[9.5px] flex-1 leading-snug ${
                        item.done ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Notes & Sign-off */}
        <section className="border border-slate-200 rounded-lg p-2 bg-slate-50/70 flex items-center justify-between text-[9px] text-slate-600">
          <div className="flex items-center space-x-2 flex-1 pr-4">
            <span className="font-bold text-slate-700 shrink-0">Remarques :</span>
            <input aria-label="Notes"
              type="text"
              value={content.notes}
              onChange={(e) => updateContent({ notes: e.target.value })}
              className="flex-1 bg-transparent border-b border-slate-200 pb-0.5 text-slate-600 italic outline-none"
            />
          </div>
          <div className="flex items-center space-x-2 shrink-0 border-l border-slate-200 pl-3">
            <span className="text-[8.5px] font-bold text-slate-600">Validation finale :</span>
            <div className="w-20 border-b border-slate-300 h-3" />
          </div>
        </section>
      </div>
    </MinimalDocFrame>
  );
};
