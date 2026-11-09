'use client';

import React from 'react';
import { BrandKit, DocumentLang, BudgetTrackerCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultBudgetTrackerContent } from '@/lib/use-brand-kit';
import { formatCurrencyAmount } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';

interface BudgetTrackerTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const BudgetTrackerTemplate: React.FC<BudgetTrackerTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).budgetTracker;
  const currency = brandKit.currency || '€';
  const content: BudgetTrackerCustomContent =
    brandKit.budgetTrackerContent || getDefaultBudgetTrackerContent(docLang);

  const updateContent = (updates: Partial<BudgetTrackerCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      budgetTrackerContent: { ...content, ...updates },
    });
  };

  const totalIncomePlanned = content.income.reduce((acc, item) => acc + (item.planned || 0), 0);
  const totalIncomeActual = content.income.reduce((acc, item) => acc + (item.actual || 0), 0);

  const totalFixedPlanned = content.fixedExpenses.reduce((acc, item) => acc + (item.planned || 0), 0);
  const totalFixedActual = content.fixedExpenses.reduce((acc, item) => acc + (item.actual || 0), 0);

  const totalVarPlanned = content.variableExpenses.reduce((acc, item) => acc + (item.planned || 0), 0);
  const totalVarActual = content.variableExpenses.reduce((acc, item) => acc + (item.actual || 0), 0);

  const totalExpensesPlanned = totalFixedPlanned + totalVarPlanned;
  const totalExpensesActual = totalFixedActual + totalVarActual;

  const netBalancePlanned = totalIncomePlanned - totalExpensesPlanned;
  const netBalanceActual = totalIncomeActual - totalExpensesActual;

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex items-center space-x-3 text-[11px] text-slate-700 shrink-0">
          <span className="font-semibold text-slate-700">{labels.monthLabel}</span>
          <input aria-label="Period"
            type="text"
            value={content.period}
            onChange={(e) => updateContent({ period: e.target.value })}
            className="w-28 font-bold border-b border-slate-400 pb-0.5 text-right outline-none bg-transparent"
          />
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-2.5 py-1">
        {/* Income Table */}
        <section className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <div className="bg-slate-100/90 px-3 py-1.5 border-b border-slate-200 flex justify-between items-center text-[10px] font-bold">
            <span style={{ color: brandKit.brandColor }} className="uppercase tracking-wider">
              {labels.incomeTitle}
            </span>
            <div className="flex space-x-8 text-slate-500 text-[9px]">
              <span className="w-16 text-right">Prévu</span>
              <span className="w-16 text-right">Réel</span>
            </div>
          </div>
          <div className="divide-y divide-slate-100 text-[9.5px]">
            {content.income.map((item, idx) => (
              <div key={idx} className="px-3 py-1.5 flex justify-between items-center hover:bg-slate-50/50">
                <span className="text-slate-800">{item.description}</span>
                <div className="flex space-x-8 font-mono text-slate-700">
                  <span className="w-16 text-right">{formatCurrencyAmount(item.planned, currency, docLang)}</span>
                  <span className="w-16 text-right font-bold text-slate-900">{formatCurrencyAmount(item.actual, currency, docLang)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2-Column Grid: Fixed Expenses + Variable Expenses */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Fixed Expenses */}
          <section className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs flex flex-col justify-between">
            <div>
              <div className="bg-slate-100/90 px-2.5 py-1.5 border-b border-slate-200 flex justify-between items-center text-[9.5px] font-bold">
                <span className="text-slate-700 uppercase tracking-wider">{labels.fixedExpensesTitle}</span>
                <div className="flex space-x-4 text-slate-500 text-[8.5px]">
                  <span className="w-14 text-right">Prévu</span>
                  <span className="w-14 text-right">Réel</span>
                </div>
              </div>
              <div className="divide-y divide-slate-100 text-[9px]">
                {content.fixedExpenses.map((item, idx) => (
                  <div key={idx} className="px-2.5 py-1.5 flex justify-between items-center">
                    <span className="text-slate-800 truncate pr-2">{item.description}</span>
                    <div className="flex space-x-4 font-mono text-slate-700 shrink-0">
                      <span className="w-14 text-right">{formatCurrencyAmount(item.planned, currency, docLang)}</span>
                      <span className="w-14 text-right font-medium text-slate-900">{formatCurrencyAmount(item.actual, currency, docLang)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 px-2.5 py-1 border-t border-slate-200 flex justify-between text-[9px] font-bold">
              <span>{labels.totalFixedLabel}</span>
              <div className="flex space-x-4 font-mono">
                <span className="w-14 text-right">{formatCurrencyAmount(totalFixedPlanned, currency, docLang)}</span>
                <span className="w-14 text-right">{formatCurrencyAmount(totalFixedActual, currency, docLang)}</span>
              </div>
            </div>
          </section>

          {/* Variable Expenses */}
          <section className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs flex flex-col justify-between">
            <div>
              <div className="bg-slate-100/90 px-2.5 py-1.5 border-b border-slate-200 flex justify-between items-center text-[9.5px] font-bold">
                <span className="text-slate-700 uppercase tracking-wider">{labels.variableExpensesTitle}</span>
                <div className="flex space-x-4 text-slate-500 text-[8.5px]">
                  <span className="w-14 text-right">Prévu</span>
                  <span className="w-14 text-right">Réel</span>
                </div>
              </div>
              <div className="divide-y divide-slate-100 text-[9px]">
                {content.variableExpenses.map((item, idx) => (
                  <div key={idx} className="px-2.5 py-1.5 flex justify-between items-center">
                    <span className="text-slate-800 truncate pr-2">{item.description}</span>
                    <div className="flex space-x-4 font-mono text-slate-700 shrink-0">
                      <span className="w-14 text-right">{formatCurrencyAmount(item.planned, currency, docLang)}</span>
                      <span className="w-14 text-right font-medium text-slate-900">{formatCurrencyAmount(item.actual, currency, docLang)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 px-2.5 py-1 border-t border-slate-200 flex justify-between text-[9px] font-bold">
              <span>{labels.totalVariableLabel}</span>
              <div className="flex space-x-4 font-mono">
                <span className="w-14 text-right">{formatCurrencyAmount(totalVarPlanned, currency, docLang)}</span>
                <span className="w-14 text-right">{formatCurrencyAmount(totalVarActual, currency, docLang)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Net Cash Flow & Savings Goal Summary Strip */}
        <section
          className="rounded-lg p-2.5 border flex items-center justify-between"
          style={{ backgroundColor: `${brandKit.brandColor}0D`, borderColor: brandKit.brandColor }}
        >
          <div className="flex items-center space-x-6 text-[10px]">
            <div>
              <span className="text-slate-500 block text-[8px] uppercase font-bold">{labels.totalIncomeLabel}</span>
              <span className="font-mono font-bold text-slate-800">{formatCurrencyAmount(totalIncomeActual, currency, docLang)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[8px] uppercase font-bold">{labels.savingsGoalLabel}</span>
              <span className="font-mono font-bold text-indigo-700">{formatCurrencyAmount(content.savingsGoal, currency, docLang)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[8px] uppercase font-bold">{labels.netBalanceLabel}</span>
              <span className="font-mono font-bold text-emerald-700 text-[11px]">{formatCurrencyAmount(netBalanceActual, currency, docLang)}</span>
            </div>
          </div>
          <div className="text-[9px] text-slate-600 italic">
            Objectif : Payer l’épargne en priorité dès réception des revenus.
          </div>
        </section>
      </div>
    </MinimalDocFrame>
  );
};
