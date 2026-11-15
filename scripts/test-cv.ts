/**
 * CV template: real PDF rendered in every language and both layouts, text read back
 * with pdftotext (what a recruiter's software sees). No LogoLoom branding allowed.
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { BrandKit, CvCustomContent, DocumentLang } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { getDefaultCvContent } from '../lib/use-brand-kit';
import { CV_PERSONAL_LABELS, CV_SECTION_LABELS, cvLines, cvPeriod, cvSignOffLine } from '../lib/i18n/cv-data';
import { CV_EXAMPLES_FR } from '../lib/cv-examples/fr';

registerPDFFonts();
const OUT = path.join(__dirname, 'output/cv');
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

const kit = (lang: DocumentLang, cv: CvCustomContent, extra: Partial<BrandKit> = {}): BrandKit =>
  ({
    logoUrl: null,
    brandColor: '#1E293B',
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
    selectedTemplate: 'cv',
    cvContent: cv,
    ...extra,
  }) as BrandKit;

async function render(name: string, brandKit: BrandKit) {
  const file = path.join(OUT, `${name}.pdf`);
  await ReactPDF.renderToFile(React.createElement(DocumentCompiler, { brandKit }) as any, file);
  const text = execFileSync('pdftotext', ['-raw', file, '-']).toString('utf8').replace(/\s+/g, ' ');
  const info = execFileSync('pdfinfo', [file]).toString('utf8');
  const pages = Number(/Pages:\s+(\d+)/.exec(info)?.[1] || 0);
  return { file, text, info, pages };
}

async function main() {
  console.log('--- Helpers ---');
  assert(cvLines('- a\n\n• b \n c').join('|') === 'a|b|c', 'cvLines strips bullets and blanks');
  assert(cvPeriod('2020', '') === '2020' && cvPeriod('2020', '2022') === '2020 – 2022', 'cvPeriod joins dates');

  const langs: DocumentLang[] = ['fr', 'en', 'de', 'es', 'it', 'pt'];
  for (const lang of langs) {
    for (const layout of ['sidebar', 'classic'] as const) {
      const cv = { ...getDefaultCvContent(lang), layout };
      const { text, info, pages } = await render(`cv-${lang}-${layout}`, kit(lang, cv));
      const t = CV_SECTION_LABELS[lang];
      const label = `[${lang}/${layout}]`;
      assert(text.includes(cv.fullName), `${label} name is real text`);
      assert(text.toLowerCase().includes(t.experience.toLowerCase()), `${label} experience heading`);
      assert(text.includes(cv.experiences[0].company), `${label} company printed`);
      assert(text.includes(cv.skills[0]), `${label} skills printed`);
      assert(pages === 1, `${label} sample fits on one page`, `pages=${pages}`);
      assert(!/logoloom/i.test(text) && !/logoloom/i.test(info), `${label} no LogoLoom branding in text or metadata`);
    }
  }

  console.log('\n--- Job examples (fr) fit on one page in both layouts ---');
  const slugs = new Set<string>();
  for (const ex of CV_EXAMPLES_FR) {
    assert(!slugs.has(ex.slug), `[example ${ex.slug}] unique slug`);
    slugs.add(ex.slug);
    assert(ex.tips.length >= 4 && ex.faq.length >= 2 && ex.summaries.length >= 2, `[example ${ex.slug}] has tips, FAQ and summaries`);
    for (const layout of ['sidebar', 'classic'] as const) {
      const cv = { ...ex.cv, layout };
      const { text, pages } = await render(`example-${ex.slug}-${layout}`, kit('fr', cv, { brandColor: ex.color }));
      assert(pages === 1, `[example ${ex.slug}/${layout}] fits on one page`, `pages=${pages}`);
      assert(text.includes(cv.fullName), `[example ${ex.slug}/${layout}] name printed`);
    }
  }

  console.log('\n--- Long CV flows onto a second page ---');
  const base = getDefaultCvContent('en');
  const long: CvCustomContent = {
    ...base,
    experiences: Array.from({ length: 6 }, (_, i) => ({
      ...base.experiences[0],
      company: `Company ${i + 1}`,
      details: Array.from({ length: 6 }, (_, j) => `Achievement ${j + 1} with enough words to wrap onto a second line of text`).join('\n'),
    })),
  };
  const longPdf = await render('cv-long', kit('en', long));
  assert(longPdf.pages >= 2, 'Long CV spans 2+ pages instead of being cut', `pages=${longPdf.pages}`);
  assert(longPdf.text.includes('Company 6'), 'Last experience is not lost');

  console.log('\n--- Empty optional sections are hidden ---');
  const empty: CvCustomContent = { ...base, summary: '', skills: [], languages: [], interests: '', education: [] };
  const emptyPdf = await render('cv-empty', kit('en', empty));
  const te = CV_SECTION_LABELS.en;
  assert(!emptyPdf.text.includes(te.skills.toUpperCase()) && !emptyPdf.text.includes(te.languages.toUpperCase()), 'No empty Skills/Languages headings');

  console.log('\n--- German conventions: personal details, place, date and signature ---');
  assert(cvSignOffLine({ ...base, city: 'Köln', signOff: { enabled: true, place: '', date: '', signatureUrl: null } }, 'de', new Date(2026, 10, 5)) === 'Köln, 05.11.2026', 'German sign-off line: city + dd.mm.yyyy');
  assert(cvSignOffLine({ ...base, signOff: { enabled: false, place: 'X', date: 'Y', signatureUrl: null } }, 'de') === null, 'Sign-off off: no line');
  assert(cvSignOffLine(base, 'en') === null, 'Old saved CVs without signOff: no line');
  // 1x1 transparent PNG stands in for a drawn signature.
  const sig = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const deCv: CvCustomContent = {
    ...getDefaultCvContent('de'),
    birthDate: '12.03.1994',
    nationality: 'deutsch',
    workPermit: 'Bewilligung B',
    signOff: { enabled: true, place: 'Zürich', date: '15.11.2026', signatureUrl: sig },
  };
  const tp = CV_PERSONAL_LABELS.de;
  for (const layout of ['sidebar', 'classic'] as const) {
    const { text, pages } = await render(`cv-de-personal-${layout}`, kit('de', { ...deCv, layout }));
    const label = `[de/${layout}]`;
    assert(text.includes('12.03.1994') && text.includes(tp.birthDate), `${label} birth date printed with its label`);
    assert(text.includes('Bewilligung B') && text.includes('Klasse B'), `${label} work permit and driving licence printed`);
    assert(text.includes('Zürich, 15.11.2026'), `${label} place and date printed`);
    assert(pages === 1, `${label} still fits on one page`, `pages=${pages}`);
  }
  const frPlain = await render('cv-fr-no-signoff', kit('fr', getDefaultCvContent('fr')));
  assert(!frPlain.text.includes(CV_PERSONAL_LABELS.fr.birthDate), 'French sample: no personal details unless filled');

  console.log('\n--- US Letter ---');
  const letter = await render('cv-letter', kit('en', base, { paperSize: 'letter' }));
  assert(/612 x 792/.test(letter.info), 'Letter page size');

  console.log(`\n📊 SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
