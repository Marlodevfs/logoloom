'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  BrandKit,
  InterfaceLang,
  InvoiceCustomContent,
  LineItemCustom,
  QuoteCustomContent,
} from '@/types';
import { getDefaultInvoiceContent, getDefaultQuoteContent } from '@/lib/use-brand-kit';
import { MAX_LINE_ITEMS } from '@/lib/billing';

interface BillingEditorProps {
  kind: 'invoice' | 'quote';
  brandKit: BrandKit;
  onUpdate: (updates: Partial<BrandKit>) => void;
  interfaceLang: InterfaceLang;
}

type Labels = {
  lines: string;
  addLine: string;
  desc: string;
  qty: string;
  unitPrice: string;
  remove: string;
  vatTitle: string;
  vatExempt: string;
  vatRate: string;
  vatNote: string;
  legalTitle: string;
  legalId: string;
  legalIdPh: string;
  clientId: string;
  clientIdPh: string;
  serviceDate: string;
  serviceDatePh: string;
  lateTerms: string;
  hint: string;
};

const LABELS: Record<InterfaceLang, Labels> = {
  fr: {
    lines: 'Lignes (prestations / produits)',
    addLine: 'Ajouter une ligne',
    desc: 'Description',
    qty: 'Qté',
    unitPrice: 'Prix unit.',
    remove: 'Supprimer la ligne',
    vatTitle: 'TVA',
    vatExempt: 'Franchise en base de TVA (micro-entreprise)',
    vatRate: 'Taux de TVA (%)',
    vatNote: 'Mention affichée',
    legalTitle: 'Mentions légales',
    legalId: 'Votre identité légale',
    legalIdPh: 'Prénom Nom EI · SIRET 123 456 789 00012',
    clientId: 'SIREN du client (clients pros)',
    clientIdPh: 'SIREN 987 654 321',
    serviceDate: 'Date ou période de la prestation',
    serviceDatePh: 'Mars 2026',
    lateTerms: 'Pénalités de retard et indemnité de recouvrement',
    hint: 'Pour un client professionnel, le SIREN du client, les pénalités de retard et l’indemnité de 40 € doivent figurer sur la facture.',
  },
  en: {
    lines: 'Line items',
    addLine: 'Add line',
    desc: 'Description',
    qty: 'Qty',
    unitPrice: 'Unit price',
    remove: 'Remove line',
    vatTitle: 'VAT / Tax',
    vatExempt: 'VAT exempt (small business)',
    vatRate: 'Tax rate (%)',
    vatNote: 'Exemption note shown',
    legalTitle: 'Legal details',
    legalId: 'Your legal identity',
    legalIdPh: 'Company name · Company no. / VAT no.',
    clientId: 'Client company / VAT no.',
    clientIdPh: 'Company no. 01234567',
    serviceDate: 'Date or period of service',
    serviceDatePh: 'March 2026',
    lateTerms: 'Late payment terms',
    hint: 'Leave a field empty to hide it on the document.',
  },
  de: {
    lines: 'Positionen',
    addLine: 'Position hinzufügen',
    desc: 'Beschreibung',
    qty: 'Menge',
    unitPrice: 'Einzelpreis',
    remove: 'Position entfernen',
    vatTitle: 'Umsatzsteuer',
    vatExempt: 'Kleinunternehmer (keine USt.)',
    vatRate: 'Steuersatz (%)',
    vatNote: 'Angezeigter Hinweis',
    legalTitle: 'Pflichtangaben',
    legalId: 'Ihre rechtlichen Angaben',
    legalIdPh: 'Firma · Steuernr. / USt-IdNr.',
    clientId: 'Firmen-/USt-Nr. des Kunden',
    clientIdPh: 'USt-IdNr. DE123456789',
    serviceDate: 'Leistungsdatum oder -zeitraum',
    serviceDatePh: 'März 2026',
    lateTerms: 'Zahlungs- und Verzugsbedingungen',
    hint: 'Leere Felder werden auf dem Dokument ausgeblendet.',
  },
  es: {
    lines: 'Líneas',
    addLine: 'Añadir línea',
    desc: 'Descripción',
    qty: 'Cant.',
    unitPrice: 'Precio unit.',
    remove: 'Eliminar línea',
    vatTitle: 'IVA',
    vatExempt: 'Exento de IVA',
    vatRate: 'Tipo de IVA (%)',
    vatNote: 'Mención mostrada',
    legalTitle: 'Datos legales',
    legalId: 'Su identidad legal',
    legalIdPh: 'Nombre · NIF/CIF',
    clientId: 'NIF/CIF del cliente',
    clientIdPh: 'CIF B12345678',
    serviceDate: 'Fecha o periodo del servicio',
    serviceDatePh: 'Marzo 2026',
    lateTerms: 'Condiciones de pago y demora',
    hint: 'Deje un campo vacío para ocultarlo en el documento.',
  },
  it: {
    lines: 'Righe',
    addLine: 'Aggiungi riga',
    desc: 'Descrizione',
    qty: 'Q.tà',
    unitPrice: 'Prezzo unit.',
    remove: 'Rimuovi riga',
    vatTitle: 'IVA',
    vatExempt: 'Regime forfettario (senza IVA)',
    vatRate: 'Aliquota IVA (%)',
    vatNote: 'Dicitura mostrata',
    legalTitle: 'Dati legali',
    legalId: 'La sua identità legale',
    legalIdPh: 'Nome · P.IVA / C.F.',
    clientId: 'P.IVA / C.F. del cliente',
    clientIdPh: 'P.IVA 01234567890',
    serviceDate: 'Data o periodo della prestazione',
    serviceDatePh: 'Marzo 2026',
    lateTerms: 'Condizioni di pagamento e ritardo',
    hint: 'Lasci un campo vuoto per nasconderlo nel documento.',
  },
  pt: {
    lines: 'Linhas',
    addLine: 'Adicionar linha',
    desc: 'Descrição',
    qty: 'Qtd.',
    unitPrice: 'Preço unit.',
    remove: 'Remover linha',
    vatTitle: 'IVA',
    vatExempt: 'Isento de IVA',
    vatRate: 'Taxa de IVA (%)',
    vatNote: 'Menção apresentada',
    legalTitle: 'Dados legais',
    legalId: 'A sua identidade legal',
    legalIdPh: 'Nome · NIF',
    clientId: 'NIF do cliente',
    clientIdPh: 'NIF 123456789',
    serviceDate: 'Data ou período do serviço',
    serviceDatePh: 'Março 2026',
    lateTerms: 'Condições de pagamento e mora',
    hint: 'Deixe um campo vazio para o ocultar no documento.',
  },
};

const input =
  'w-full px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100';
const sectionTitle = 'text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5';

/** Parses a number typed with "," or "." decimals; empty or invalid -> 0. */
const toNumber = (v: string) => {
  const n = parseFloat(v.replace(',', '.'));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export const BillingEditor: React.FC<BillingEditorProps> = ({ kind, brandKit, onUpdate, interfaceLang }) => {
  const l = LABELS[interfaceLang] || LABELS.en;
  const lang = brandKit.documentLang || 'en';
  const content: QuoteCustomContent | InvoiceCustomContent =
    kind === 'invoice'
      ? brandKit.invoiceContent || getDefaultInvoiceContent(lang)
      : brandKit.quoteContent || getDefaultQuoteContent(lang);

  const update = (updates: Partial<InvoiceCustomContent>) => {
    if (kind === 'invoice') {
      onUpdate({ invoiceContent: { ...(content as InvoiceCustomContent), ...updates } });
    } else {
      onUpdate({ quoteContent: { ...(content as QuoteCustomContent), ...updates } });
    }
  };

  const setItem = (idx: number, patch: Partial<LineItemCustom>) =>
    update({ items: content.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) });

  const inv = content as InvoiceCustomContent;

  return (
    <div className="space-y-4">
      {/* Line items */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className={sectionTitle + ' mb-0'}>{l.lines}</label>
          {content.items.length < MAX_LINE_ITEMS && (
            <button
              type="button"
              onClick={() => update({ items: [...content.items, { description: '', quantity: 1, unitPrice: 0 }] })}
              className="inline-flex items-center space-x-1 text-[10.5px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Plus className="w-3 h-3" />
              <span>{l.addLine}</span>
            </button>
          )}
        </div>
        <div className="space-y-1.5">
          {content.items.map((item, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-1"
            >
              <div className="flex items-center space-x-1.5">
                <span className="text-[9.5px] font-mono text-slate-400 w-3">{idx + 1}.</span>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => setItem(idx, { description: e.target.value })}
                  placeholder={l.desc}
                  aria-label={`${l.desc} ${idx + 1}`}
                  className={input + ' flex-1 font-semibold'}
                />
                <button
                  type="button"
                  onClick={() => update({ items: content.items.filter((_, i) => i !== idx) })}
                  disabled={content.items.length <= 1}
                  className="p-1 text-rose-500 hover:text-rose-700 disabled:opacity-30"
                  title={l.remove}
                  aria-label={l.remove}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pl-4">
                <label className="text-[10px] text-slate-500">
                  {l.qty}
                  <input
                    type="text"
                    inputMode="decimal"
                    defaultValue={String(item.quantity)}
                    key={`q-${idx}-${item.quantity}`}
                    onBlur={(e) => setItem(idx, { quantity: toNumber(e.target.value) })}
                    className={input + ' font-mono'}
                  />
                </label>
                <label className="text-[10px] text-slate-500">
                  {l.unitPrice}
                  <input
                    type="text"
                    inputMode="decimal"
                    defaultValue={String(item.unitPrice)}
                    key={`p-${idx}-${item.unitPrice}`}
                    onBlur={(e) => setItem(idx, { unitPrice: toNumber(e.target.value) })}
                    className={input + ' font-mono'}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VAT */}
      <div>
        <label className={sectionTitle}>{l.vatTitle}</label>
        <label className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
          <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">{l.vatExempt}</span>
          <input
            type="checkbox"
            checked={!!content.vatExempt}
            onChange={(e) => update({ vatExempt: e.target.checked })}
            className="w-4 h-4 accent-indigo-600"
          />
        </label>
        {content.vatExempt ? (
          <label className="block text-[10px] text-slate-500 mt-1.5">
            {l.vatNote}
            <input
              type="text"
              value={content.vatExemptNote || ''}
              onChange={(e) => update({ vatExemptNote: e.target.value })}
              className={input}
            />
          </label>
        ) : (
          <label className="block text-[10px] text-slate-500 mt-1.5">
            {l.vatRate}
            <input
              type="text"
              inputMode="decimal"
              defaultValue={String(content.taxRate)}
              key={`tax-${content.taxRate}`}
              onBlur={(e) => update({ taxRate: Math.min(100, toNumber(e.target.value)) })}
              className={input + ' font-mono w-24'}
            />
          </label>
        )}
      </div>

      {/* Legal details */}
      <div className="space-y-1.5">
        <label className={sectionTitle}>{l.legalTitle}</label>
        <label className="block text-[10px] text-slate-500">
          {l.legalId}
          <input
            type="text"
            value={content.legalId || ''}
            onChange={(e) => update({ legalId: e.target.value })}
            placeholder={l.legalIdPh}
            className={input}
          />
        </label>
        {kind === 'invoice' && (
          <>
            <label className="block text-[10px] text-slate-500">
              {l.clientId}
              <input
                type="text"
                value={inv.clientId || ''}
                onChange={(e) => update({ clientId: e.target.value })}
                placeholder={l.clientIdPh}
                className={input}
              />
            </label>
            <label className="block text-[10px] text-slate-500">
              {l.serviceDate}
              <input
                type="text"
                value={inv.serviceDate || ''}
                onChange={(e) => update({ serviceDate: e.target.value })}
                placeholder={l.serviceDatePh}
                className={input}
              />
            </label>
            <label className="block text-[10px] text-slate-500">
              {l.lateTerms}
              <textarea
                rows={3}
                value={inv.latePaymentTerms || ''}
                onChange={(e) => update({ latePaymentTerms: e.target.value })}
                className={input + ' resize-none leading-snug'}
              />
            </label>
          </>
        )}
        <p className="text-[10px] text-slate-500 leading-snug">{l.hint}</p>
      </div>
    </div>
  );
};
