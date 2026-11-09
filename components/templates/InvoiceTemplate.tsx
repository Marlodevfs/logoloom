'use client';

import React from 'react';
import { BrandKit, DocumentLang, InvoiceCustomContent } from '@/types';
import { MinimalDocFrame } from './minimal/MinimalDocFrame';
import { getDefaultInvoiceContent } from '@/lib/use-brand-kit';
import { formatCurrencyAmount } from '@/lib/i18n/intl-helpers';
import { CATALOG_LABELS } from '@/lib/i18n/catalog-labels';
import { getPartyPlaceholders } from '@/lib/i18n/party-placeholders';

interface InvoiceTemplateProps {
  brandKit: BrandKit;
  onUpdate?: (updates: Partial<BrandKit>) => void;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
  brandKit,
  onUpdate,
}) => {
  const docLang: DocumentLang = brandKit.documentLang || 'en';
  const labels = (CATALOG_LABELS[docLang] || CATALOG_LABELS.en).invoice;
  const currency = brandKit.currency || '€';
  const content: InvoiceCustomContent =
    brandKit.invoiceContent || getDefaultInvoiceContent(docLang);

  const updateContent = (updates: Partial<InvoiceCustomContent>) => {
    if (!onUpdate) return;
    onUpdate({
      invoiceContent: { ...content, ...updates },
    });
  };

  const subtotal = content.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal * content.taxRate) / 100;
  const total = subtotal + taxAmount;

  return (
    <MinimalDocFrame
      brandKit={brandKit}
      title={content.title}
      onUpdateTitle={(title) => updateContent({ title })}
      metadataRight={
        <div className="flex flex-col text-right text-[10px] text-slate-600">
          <div className="flex items-center space-x-2 justify-end">
            <span className="font-semibold text-slate-700">{labels.invoiceNumberLabel}</span>
            <input aria-label="Invoice number"
              type="text"
              value={content.invoiceNumber}
              onChange={(e) => updateContent({ invoiceNumber: e.target.value })}
              className="w-24 font-mono font-bold text-slate-900 border-b border-slate-300 outline-none text-right"
            />
          </div>
          <div className="flex items-center space-x-2 justify-end mt-0.5">
            <span className="font-semibold text-slate-700">{labels.dateLabel}</span>
            <input aria-label="Date"
              type="text"
              value={content.date}
              onChange={(e) => updateContent({ date: e.target.value })}
              className="w-20 font-mono text-slate-600 border-b border-slate-200 outline-none text-right"
            />
          </div>
          <div className="flex items-center space-x-2 justify-end mt-0.5">
            <span className="font-semibold text-slate-700">{labels.dueDateLabel}</span>
            <input aria-label="Due date"
              type="text"
              value={content.dueDate}
              onChange={(e) => updateContent({ dueDate: e.target.value })}
              className="w-20 font-mono text-slate-600 border-b border-slate-200 outline-none text-right font-bold text-amber-700"
            />
          </div>
        </div>
      }
      footerCategoryText={labels.footerCategory}
    >
      <div className="flex flex-col h-full justify-between gap-3 py-1">
        {/* Sender & Client Addresses Grid */}
        <section className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
          <div className="flex flex-col text-[10px]">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8.5px] mb-1">
              {labels.fromLabel}
            </span>
            <span className="font-bold text-slate-900">{brandKit.companyName || getPartyPlaceholders(brandKit.documentLang).company}</span>
            <textarea aria-label="Sender address"
              rows={3}
              value={content.senderAddress}
              onChange={(e) => updateContent({ senderAddress: e.target.value })}
              className="mt-0.5 text-slate-600 bg-transparent border-0 p-0 outline-none resize-none leading-tight"
            />
          </div>
          <div className="flex flex-col text-[10px] bg-slate-50/70 p-2 rounded border border-slate-200">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[8.5px] mb-1">
              {labels.toLabel}
            </span>
            <span className="font-bold text-slate-900">{brandKit.clientName || getPartyPlaceholders(brandKit.documentLang).client}</span>
            <textarea aria-label="Client address"
              rows={3}
              value={content.clientAddress}
              onChange={(e) => updateContent({ clientAddress: e.target.value })}
              className="mt-0.5 text-slate-700 bg-transparent border-0 p-0 outline-none resize-none leading-tight"
            />
          </div>
        </section>

        {/* Line Items Table */}
        <section className="flex-1 flex flex-col justify-start">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-[9px] font-bold text-slate-600 uppercase tracking-wider bg-slate-50/50">
                <th className="py-1.5 px-2 text-left">{labels.colDesc}</th>
                <th className="py-1.5 px-2 text-center w-14">{labels.colQty}</th>
                <th className="py-1.5 px-2 text-right w-24">{labels.colUnitPrice}</th>
                <th className="py-1.5 px-2 text-right w-24">{labels.colTotal}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[9.5px]">
              {content.items.map((item, idx) => {
                const lineTotal = item.quantity * item.unitPrice;
                return (
                  <tr key={idx} className="hover:bg-slate-50/40">
                    <td className="py-2 px-2 text-slate-900 font-medium">
                      {item.description}
                    </td>
                    <td className="py-2 px-2 text-center text-slate-600 font-mono">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-2 text-right text-slate-600 font-mono">
                      {formatCurrencyAmount(item.unitPrice, currency, docLang)}
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-slate-900">
                      {formatCurrencyAmount(lineTotal, currency, docLang)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Bottom Payment Details & Totals */}
        <div className="border-t border-slate-200 pt-2 grid grid-cols-2 gap-4">
          {/* Bank Payment Details Block */}
          <div className="flex flex-col justify-between text-[9px] bg-slate-50 p-2 rounded border border-slate-200">
            <div>
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[8px] block mb-1">
                {labels.paymentDetailsTitle}
              </span>
              <textarea aria-label="Payment details"
                rows={3}
                value={content.paymentDetails}
                onChange={(e) => updateContent({ paymentDetails: e.target.value })}
                className="w-full font-mono text-[8.5px] text-slate-700 bg-transparent border-0 p-0 outline-none resize-none leading-relaxed"
              />
            </div>
            <p className="text-[8px] text-slate-500 italic mt-1 border-t border-slate-200 pt-1">
              {content.notes}
            </p>
          </div>

          {/* Subtotal, Tax & Total Box */}
          <div className="flex flex-col justify-end space-y-1 text-[10px]">
            <div className="flex justify-between py-0.5 border-b border-slate-100 text-slate-600">
              <span>{labels.subtotalLabel}</span>
              <span className="font-mono font-medium">{formatCurrencyAmount(subtotal, currency, docLang)}</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-slate-100 text-slate-600">
              <span>{labels.taxLabel} ({content.taxRate}%) :</span>
              <span className="font-mono font-medium">{formatCurrencyAmount(taxAmount, currency, docLang)}</span>
            </div>
            <div
              className="flex justify-between py-1.5 font-bold text-[12px] border-t-2"
              style={{ borderColor: brandKit.brandColor, color: brandKit.brandColor }}
            >
              <span>{labels.totalLabel}</span>
              <span className="font-mono">{formatCurrencyAmount(total, currency, docLang)}</span>
            </div>
          </div>
        </div>
      </div>
    </MinimalDocFrame>
  );
};
