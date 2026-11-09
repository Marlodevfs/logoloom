import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { BrandKit, DocumentLang, HabitPackId, TemplateId } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import {
  getDefaultHabitTrackerContent,
  getDefaultGoalPlannerContent,
  getDefaultInvoiceContent,
  getDefaultQuoteContent,
  getDefaultWeeklyPlannerContent,
} from '../lib/use-brand-kit';
import { ensureAccessibleOnWhite, getContrastRatio, getOptimalTextColor } from '../lib/color-engine';
import { HABIT_PACKS } from '../lib/i18n/habit-packs';

registerPDFFonts();

const OUT_DIR = path.join(__dirname, 'output/e2e_features');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const squareSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="20" fill="#4F46E5"/><circle cx="50" cy="50" r="25" fill="#FFFFFF"/></svg>';
const squareLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(squareSvg).toString('base64');

async function runEndToEndFeatureTests() {
  console.log('============================================================');
  console.log('🚀 LOGOLOOM FULL END-TO-END FEATURE SUITE AUDIT');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
      failed++;
    }
  }

  // 1. FORBIDDEN HARDCODED BRAND STRINGS CHECK
  console.log('--- Feature 1: No Hard-Coded Brand Content in Templates ---');
  const templateFiles = [
    'components/templates/MinimalHabitTrackerTemplate.tsx',
    'components/templates/HabitTrackerTemplate.tsx',
    'components/templates/GoalPlannerTemplate.tsx',
    'components/templates/WeeklyPlannerTemplate.tsx',
    'components/templates/MonthlyCalendarTemplate.tsx',
    'components/templates/DailyPrioritiesTemplate.tsx',
    'components/templates/MealPlannerTemplate.tsx',
    'components/templates/BudgetTrackerTemplate.tsx',
    'components/templates/QuoteTemplate.tsx',
    'components/templates/InvoiceTemplate.tsx',
    'components/templates/PriceListTemplate.tsx',
    'components/templates/ClientTrackerTemplate.tsx',
    'components/templates/ChecklistTemplate.tsx',
    'lib/pdf/VectorMinimalHabitTrackerPDF.tsx',
    'lib/pdf/VectorHabitTrackerPDF.tsx',
    'lib/pdf/VectorGoalPlannerPDF.tsx',
    'lib/pdf/VectorWeeklyPlannerPDF.tsx',
    'lib/pdf/VectorMonthlyCalendarPDF.tsx',
    'lib/pdf/VectorDailyPrioritiesPDF.tsx',
    'lib/pdf/VectorMealPlannerPDF.tsx',
    'lib/pdf/VectorBudgetTrackerPDF.tsx',
    'lib/pdf/VectorQuotePDF.tsx',
    'lib/pdf/VectorInvoicePDF.tsx',
    'lib/pdf/VectorPriceListPDF.tsx',
    'lib/pdf/VectorClientTrackerPDF.tsx',
    'lib/pdf/VectorChecklistPDF.tsx',
  ];

  for (const rel of templateFiles) {
    const full = path.join(__dirname, '..', rel);
    const text = fs.readFileSync(full, 'utf8');
    const hasForbidden = /Apex Studio|Alexandre Martin/i.test(text);
    assert(!hasForbidden, `Zero hard-coded sample strings in ${rel}`);
  }

  // 2. COLOR ENGINE AND ACCESSIBILITY CHECK
  console.log('\n--- Feature 2: Color Engine & Contrast Accessibility ---');
  const testColors = [
    { hex: '#4F46E5', name: 'Royal Indigo' },
    { hex: '#059669', name: 'Deep Emerald' },
    { hex: '#EA580C', name: 'Warm Terracotta' },
    { hex: '#0F172A', name: 'Midnight Slate' },
    { hex: '#BE123C', name: 'Rosewood Crimson' },
    { hex: '#0D9488', name: 'Nordic Teal' },
    { hex: '#7E22CE', name: 'Imperial Plum' },
    { hex: '#78350F', name: 'Raw Umber' },
  ];

  for (const tc of testColors) {
    const ratio = getContrastRatio(tc.hex, '#FFFFFF');
    assert(ratio >= 3.0, `Contrast ratio for ${tc.name} (${tc.hex}) on white >= 3.0`, `Ratio: ${ratio.toFixed(2)}`);
    const accessible = ensureAccessibleOnWhite(tc.hex);
    assert(typeof accessible === 'string' && accessible.startsWith('#'), `Accessible color returned for ${tc.name}`);
    const textColor = getOptimalTextColor(tc.hex);
    assert(textColor === '#FFFFFF' || textColor === '#000000', `Optimal text color for ${tc.name} is accessible`);
  }

  // 3. HABIT PACKS PARITY ACROSS ALL 6 LANGUAGES
  console.log('\n--- Feature 3: Habit Packs Parity Across 6 Languages ---');
  const languages: DocumentLang[] = ['en', 'fr', 'de', 'es', 'it', 'pt'];
  const expectedPacks: HabitPackId[] = ['fitness', 'nutrition', 'wellbeing', 'sleep', 'focus', 'blank'];

  for (const lang of languages) {
    for (const packId of expectedPacks) {
      const pack = HABIT_PACKS[lang]?.[packId];
      assert(Boolean(pack && pack.name && pack.habits.length >= 4), `Habit pack "${packId}" in [${lang.toUpperCase()}] exists with habits`, `Count: ${pack?.habits?.length}`);
    }
  }

  // 4. DOCUMENT TRANSLATION DEFAULT CONTENT
  console.log('\n--- Feature 4: Default Document Templates Translations ---');
  for (const lang of languages) {
    const habitContent = getDefaultHabitTrackerContent(lang, 'wellbeing');
    assert(Boolean(habitContent.title && habitContent.habits.length === 5), `Default habit content for [${lang}] loads 5 wellbeing habits`);
    assert(Boolean(habitContent.weeklyQuestions.length === 4), `Default weekly questions for [${lang}] has 4 prompts`);

    const goalContent = getDefaultGoalPlannerContent(lang);
    assert(Boolean(goalContent.title && goalContent.phases.length === 3), `Default goal planner for [${lang}] has 3 phases`);

    const invoiceContent = getDefaultInvoiceContent(lang);
    assert(Boolean(invoiceContent.title && invoiceContent.items.length >= 2), `Default invoice for [${lang}] has items`);
  }

  // 5. VECTOR PDF COMPILATION & FILE SIZE CHECKS
  console.log('\n--- Feature 5: Vector PDF Generation For Diverse Catalog Templates ---');
  const templateCombos: { templateId: TemplateId; style: 'minimal' | 'complete'; paper: 'a4' | 'letter'; isPro: boolean; withQr: boolean }[] = [
    { templateId: 'habit-tracker', style: 'minimal', paper: 'a4', isPro: false, withQr: true },
    { templateId: 'habit-tracker', style: 'complete', paper: 'a4', isPro: true, withQr: false },
    { templateId: 'goal-planner-90', style: 'minimal', paper: 'letter', isPro: false, withQr: false },
    { templateId: 'weekly-planner', style: 'minimal', paper: 'a4', isPro: true, withQr: true },
    { templateId: 'invoice', style: 'minimal', paper: 'a4', isPro: true, withQr: true },
    { templateId: 'quote', style: 'minimal', paper: 'letter', isPro: false, withQr: false },
  ];

  for (const combo of templateCombos) {
    const testDocLang: DocumentLang = 'en';
    const testKit: BrandKit = {
      logoUrl: squareLogoB64,
      companyName: 'Apex Precision Health',
      tagline: 'High Performance & Resilience',
      coachName: 'Dr. Marcus Vance',
      clientName: 'Elena Rostova',
      contactEmail: 'contact@precisionhealth.com',
      brandColor: '#4F46E5',
      contrastText: '#FFFFFF',
      qrUrl: combo.withQr ? 'https://precisionhealth.com/book' : '',
      qrLabel: 'Scan to book session',
      paperSize: combo.paper,
      documentLang: testDocLang,
      designStyle: combo.style,
      selectedTemplate: combo.templateId,
      isPro: combo.isPro,
      removeWatermark: combo.isPro,
      habitTrackerContent: getDefaultHabitTrackerContent(testDocLang, 'wellbeing'),
      goalPlannerContent: getDefaultGoalPlannerContent(testDocLang),
      weeklyPlannerContent: getDefaultWeeklyPlannerContent(testDocLang),
      invoiceContent: getDefaultInvoiceContent(testDocLang),
      quoteContent: getDefaultQuoteContent(testDocLang),
    };

    const fileName = `${combo.templateId}-${combo.style}-${combo.paper}-${combo.isPro ? 'pro' : 'free'}.pdf`;
    const filePath = path.join(OUT_DIR, fileName);

    const doc = React.createElement(DocumentCompiler, {
      brandKit: testKit,
    });

    await ReactPDF.renderToFile(doc as any, filePath);
    const stats = fs.statSync(filePath);
    const fileSizeKb = Math.round(stats.size / 1024);

    assert(fileSizeKb > 10 && fileSizeKb < 1000, `PDF rendered: ${fileName} (${fileSizeKb} KB < 1 MB)`);

    // Verify raw binary contains vector PDF structure
    const rawBuffer = fs.readFileSync(filePath);
    const isPdf = rawBuffer.subarray(0, 5).toString() === '%PDF-';
    assert(isPdf, `Valid %PDF- header for ${fileName}`);

    // Verify Roboto TrueType fonts are embedded
    const bufferStr = rawBuffer.toString('latin1');
    const hasRoboto = bufferStr.includes('Roboto');
    assert(hasRoboto, `Roboto font subsets embedded in ${fileName}`);
  }

  // 6. PRO WHITE-LABEL GUARANTEE
  console.log('\n--- Feature 6: Pro Tier White-Label Verification ---');
  const proTestKit: BrandKit = {
    logoUrl: squareLogoB64,
    companyName: 'Elite Coaching Group',
    brandColor: '#059669',
    contrastText: '#FFFFFF',
    qrUrl: '',
    paperSize: 'a4',
    documentLang: 'en',
    designStyle: 'minimal',
    selectedTemplate: 'habit-tracker',
    isPro: true,
    removeWatermark: true,
    habitTrackerContent: getDefaultHabitTrackerContent('en', 'wellbeing'),
    goalPlannerContent: getDefaultGoalPlannerContent('en'),
    invoiceContent: getDefaultInvoiceContent('en'),
  };

  const proPdfPath = path.join(OUT_DIR, 'pro-white-label-test.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, {
      brandKit: proTestKit,
    }) as any,
    proPdfPath
  );

  const proRaw = fs.readFileSync(proPdfPath).toString('latin1');
  const hasLogoLoomApp = proRaw.includes('logoloom.app');
  assert(!hasLogoLoomApp, 'Pro PDF contains ZERO "logoloom.app" watermark text');

  console.log('\n============================================================');
  console.log(`📊 SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('============================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runEndToEndFeatureTests().catch((err) => {
  console.error('Fatal error during E2E testing:', err);
  process.exit(1);
});
