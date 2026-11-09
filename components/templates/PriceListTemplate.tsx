'use client';

import React from 'react';
import { BrandKit, DocumentLang, PriceListCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultPriceListContent } from '@/lib/use-brand-kit';
import { formatCurrencyAmount } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface PriceListTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const PriceListTemplate: React.FC<PriceListTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).priceList;
  const currency = brandKit.currency || '€';
  const content: PriceListCustomContent =
    brandKit.priceListContent || getDefaultPriceListContent(docLang);

  const updateContent = (updates: Partial<PriceListCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      priceListContent: { ...content, ...updates },
    });
  };

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-3 text-[10.5px] text-slate-600 shrink-0">
          <span className="font-semibold text-slate-700">{labels.lastUpdatedLabel}</span>
          <span className="font-mono text-slate-900 border-b border-slate-300 pb-0.5">
            2026 / 2027
          </span>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-3 py-1">
        {/* Categories Grid (3 categories) */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          {content.categories.map((cat, cIdx) => (
            <section
              key={cIdx}
              className="border border-slate-200 rounded-lg p-2.5 bg-white shadow-2xs flex-1 flex flex-col justify-start"
            >
              <div className="pb-1.5 border-b border-slate-200 mb-2 flex items-center justify-between">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: brandKit.brandColor }}
                >
                  {cat.category}
                </span>
                <span className="text-[8px] font-mono text-slate-400">
                  Catégorie {cIdx + 1}
                </span>
              </div>

              <div className="space-y-2 flex-1 flex flex-col justify-around">
                {cat.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-[10px] font-bold text-slate-900">
                          {item.name}
                        </span>
                        <div className="flex-1 border-b border-dotted border-slate-200" />
                      </div>
                      <p className="text-[8.5px] text-slate-500 leading-snug mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-900 shrink-0">
                      {formatCurrencyAmount(item.price, currency, docLang)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Terms & Conditions */}
        <section className="border border-slate-200 rounded-lg p-2 bg-slate-50/70 flex items-center justify-between text-[9px] text-slate-600">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 shrink-0">Conditions :</span>
            <input aria-label="Notes"
              type="text"
              value={content.notes}
              onChange={(e) => updateContent({ notes: e.target.value })}
              className="flex-1 bg-transparent border-b border-slate-200 pb-0.5 text-slate-600 italic outline-none min-w-[320px]"
            />
          </div>
          <span className="text-[8.5px] text-slate-500 shrink-0 font-medium">
            Tarifs révisables annuellement
          </span>
        </section>
      </div>
    </MinimalDocFrame>
  );
};
