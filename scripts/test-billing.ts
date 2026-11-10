/**
 * Quotes & invoices: totals, VAT exemption and legal mentions in the real PDF.
 * Text is read back with pdftotext (poppler), so it checks what a client actually sees.
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { BrandKit, DocumentLang } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { getDefaultInvoiceContent, getDefaultQuoteContent } from '../lib/use-brand-kit';
import { computeTotals } from '../lib/billing';

registerPDFFonts();
const OUT = path.join(__dirname, 'output/billing');
fs.mkdirSync(OUT, { recursive: true });

let passed = 0;
let failed = 0;
const assert = (ok: boolean, name: string, detail = '') => {
  if (ok) {
    passed++;
    console.log(`  ✅ PASS: ${name}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${name} ${detail}`);
  }
};

const kit = (lang: DocumentLang, template: 'invoice' | 'quote', extra: Partial<BrandKit> = {}): BrandKit =>
  ({
    logoUrl: null,
    brandColor: '#1E293B',
    contrastText: '#FFFFFF',
    companyName: 'Studio Test',
    tagline: '',
    coachName: '',
    clientName: 'Client Test',
    contactEmail: '',
    qrUrl: '',
    paperSize: 'a4',
    documentLang: lang,
    designStyle: 'minimal',
    isPro: true,
    removeWatermark: true,
    selectedTemplate: template,
    currency: '€',
    ...extra,
  }) as BrandKit;

async function pdfText(name: string, brandKit: BrandKit): Promise<string> {
  const file = path.join(OUT, `${name}.pdf`);
  await ReactPDF.renderToFile(React.createElement(DocumentCompiler, { brandKit }) as any, file);
  // -raw keeps reading order; collapse whitespace so wrapped lines still match.
  return execFileSync('pdftotext', ['-raw', file, '-']).toString('utf8').replace(/\s+/g, ' ');
}

async function main() {
  console.log('--- Totals ---');
  const items = [
    { description: 'A', quantity: 3, unitPrice: 700 },
    { description: 'B', quantity: 1, unitPrice: 0.1 },
  ];
  const t = computeTotals(items, 20);
  assert(t.subtotal === 2100.1 && t.taxAmount === 420.02 && t.total === 2520.12, 'VAT 20% totals', JSON.stringify(t));
  const ex = computeTotals(items, 20, true);
  assert(ex.taxAmount === 0 && ex.total === 2100.1, 'VAT-exempt: no tax, total = subtotal', JSON.stringify(ex));
  const bad = computeTotals([{ description: 'x', quantity: NaN, unitPrice: 5 }], 20);
  assert(bad.total === 0, 'Invalid quantity counts as 0, never NaN');

  console.log('\n--- French invoice (franchise en base) ---');
  const fr = await pdfText('invoice-fr', kit('fr', 'invoice', { invoiceContent: getDefaultInvoiceContent('fr') }));
  assert(fr.includes('TVA non applicable, art. 293 B du CGI'), 'Franchise mention printed');
  assert(fr.includes('SIRET 123 456 789 00012') && fr.includes('EI'), 'Seller EI + SIRET printed');
  assert(fr.includes('SIREN 987 654 321'), 'Client SIREN printed');
  assert(fr.includes('40 €'), '40 € recovery fee printed');
  assert(fr.includes('Date de prestation'), 'Service date printed');
  assert(fr.includes('Total à payer') && !fr.includes('Total TTC'), 'Exempt invoice shows "Total à payer", no TTC');
  assert(!/TVA \(\d+%\)/.test(fr), 'Exempt invoice has no VAT rate line');

  console.log('\n--- French invoice with VAT ---');
  const frVat = await pdfText(
    'invoice-fr-vat',
    kit('fr', 'invoice', { invoiceContent: { ...getDefaultInvoiceContent('fr'), vatExempt: false } })
  );
  assert(frVat.includes('TVA (20%)') && frVat.includes('Total TTC'), 'VAT invoice shows rate and TTC');
  assert(!frVat.includes('293 B'), 'VAT invoice has no franchise mention');

  console.log('\n--- Edited lines reach the PDF ---');
  const edited = await pdfText(
    'invoice-edited',
    kit('en', 'invoice', {
      invoiceContent: {
        ...getDefaultInvoiceContent('en'),
        items: [{ description: 'Logo design package', quantity: 2, unitPrice: 450 }],
      },
    })
  );
  assert(edited.includes('Logo design package'), 'Custom line description printed');
  assert(edited.includes('900'), 'Custom line total printed');

  console.log('\n--- Old saved invoices (no new fields) still render ---');
  const legacy = getDefaultInvoiceContent('en');
  const { legalId, vatExempt, vatExemptNote, clientId, serviceDate, latePaymentTerms, ...old } = legacy;
  const oldText = await pdfText('invoice-legacy', kit('en', 'invoice', { invoiceContent: old as any }));
  assert(oldText.includes('INVOICE') && oldText.includes('Total'), 'Legacy invoice renders');

  console.log('\n--- Quote ---');
  const q = await pdfText('quote-fr', kit('fr', 'quote', { quoteContent: getDefaultQuoteContent('fr') }));
  assert(q.includes('TVA non applicable, art. 293 B du CGI') && q.includes('SIRET'), 'French quote: franchise + SIRET');
  const qDe = await pdfText('quote-de', kit('de', 'quote', { quoteContent: getDefaultQuoteContent('de') }));
  assert(!qDe.includes('Sous-total') && !qDe.includes('Émetteur'), 'German quote has no French labels');

  console.log(`\n📊 SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
