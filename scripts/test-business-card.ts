/**
 * Business card PDF: every layout, both outputs, front/back, read back with pdftotext.
 * Checks page sizes (sheet vs printer file with bleed) and that no LogoLoom text lands on a card.
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { BrandKit, BusinessCardContent, DocumentLang } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { BLEED_MM, MM, getDefaultCardContent, sheetLayout } from '../lib/i18n/card-data';

registerPDFFonts();
const OUT = path.join(__dirname, 'output/card');
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

const kit = (lang: DocumentLang, card: BusinessCardContent, extra: Partial<BrandKit> = {}): BrandKit =>
  ({
    logoUrl: null,
    brandColor: '#1F5C4A',
    contrastText: '#FFFFFF',
    companyName: '',
    tagline: '',
    coachName: '',
    clientName: '',
    contactEmail: '',
    qrUrl: '',
    paperSize: 'a4',
    documentLang: lang,
    designStyle: 'minimal',
    isPro: false,
    removeWatermark: false,
    selectedTemplate: 'business-card',
    cardContent: card,
    ...extra,
  }) as BrandKit;

async function render(name: string, brandKit: BrandKit) {
  const file = path.join(OUT, `${name}.pdf`);
  await ReactPDF.renderToFile(React.createElement(DocumentCompiler, { brandKit }) as any, file);
  const text = execFileSync('pdftotext', ['-raw', file, '-']).toString('utf8').replace(/\s+/g, ' ');
  const info = execFileSync('pdfinfo', [file]).toString('utf8');
  const pages = Number(/Pages:\s+(\d+)/.exec(info)?.[1] || 0);
  const size = /Page size:\s+([\d.]+) x ([\d.]+)/.exec(info);
  return { file, text, info, pages, w: Number(size?.[1]), h: Number(size?.[2]) };
}

const near = (a: number, b: number) => Math.abs(a - b) < 1;

async function main() {
  const fr = getDefaultCardContent('fr');

  console.log('--- Sheet: every layout, front only and front + back ---');
  for (const layout of ['classic', 'band', 'centered'] as const) {
    for (const backSide of [false, true]) {
      const card = { ...fr, layout, backSide, showQr: true };
      const r = await render(`sheet-${layout}-${backSide ? 'back' : 'front'}`, kit('fr', card));
      const label = `[sheet/${layout}/${backSide ? 'recto-verso' : 'recto'}]`;
      const g = sheetLayout('a4', 'eu');
      // Centered layout moves the QR to the back, so it always has a back page.
      const expectBack = backSide || layout === 'centered';
      assert(r.pages === (expectBack ? 2 : 1), `${label} page count`, `pages=${r.pages}`);
      assert(near(r.w, 210 * MM) && near(r.h, 297 * MM), `${label} A4 page`, `${r.w}x${r.h}`);
      const count = r.text.split(card.fullName).length - 1;
      assert(count === g.cols * g.rows, `${label} ${g.cols * g.rows} cards on the front sheet`, `found=${count}`);
      assert(!/logoloom/i.test(r.text) && !/logoloom/i.test(r.info), `${label} no LogoLoom branding`);
    }
  }

  console.log('\n--- Printer file: one card per page with 3 mm bleed ---');
  for (const cardSize of ['eu', 'us'] as const) {
    const card = { ...fr, output: 'printer' as const, backSide: true, cardSize };
    const r = await render(`printer-${cardSize}`, kit('fr', card));
    const s = cardSize === 'eu' ? { w: 85, h: 55 } : { w: 88.9, h: 50.8 };
    assert(r.pages === 2, `[printer/${cardSize}] front and back pages`, `pages=${r.pages}`);
    assert(near(r.w, (s.w + 2 * BLEED_MM) * MM) && near(r.h, (s.h + 2 * BLEED_MM) * MM), `[printer/${cardSize}] page = card + bleed`, `${r.w}x${r.h}`);
    assert(r.text.includes(card.fullName) && r.text.includes(card.email), `[printer/${cardSize}] name and email are real text`);
  }

  console.log('\n--- Letter paper and US cards ---');
  const letter = await render('sheet-letter-us', kit('en', { ...getDefaultCardContent('en'), cardSize: 'us' }, { paperSize: 'letter' }));
  assert(/612 x 792/.test(letter.info), 'US Letter sheet');
  const gl = sheetLayout('letter', 'us');
  assert(letter.text.split('Alex Morgan').length - 1 === gl.cols * gl.rows, `${gl.cols * gl.rows} US cards on Letter`);

  console.log('\n--- Every language, empty fields hidden ---');
  for (const lang of ['fr', 'en', 'de', 'es', 'it', 'pt'] as DocumentLang[]) {
    const card = getDefaultCardContent(lang);
    const r = await render(`lang-${lang}`, kit(lang, card));
    assert(r.text.includes(card.fullName) && r.text.includes(card.phone), `[${lang}] sample prints`);
  }
  const minimal = { ...fr, company: '', address: '', website: '', showQr: false };
  const m = await render('minimal', kit('fr', minimal));
  assert(m.pages === 1 && m.text.includes(fr.fullName), 'Card with only name, phone and email');

  console.log(`\n📊 SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
