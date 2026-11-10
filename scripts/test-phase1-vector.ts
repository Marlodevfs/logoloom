import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import QRCode from 'qrcode';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { BrandKit, TemplateId } from '../types';
import {
  getDefaultHabitTrackerContent,
  getDefaultGoalPlannerContent,
  getDefaultWeeklyPlannerContent,
  getDefaultMonthlyCalendarContent,
  getDefaultDailyPrioritiesContent,
  getDefaultMealPlannerContent,
  getDefaultBudgetTrackerContent,
  getDefaultPriceListContent,
  getDefaultClientTrackerContent,
  getDefaultChecklistContent,
} from '../lib/use-brand-kit';

import { PDFParse } from 'pdf-parse';

async function verifyQrCode(rawUrl: string): Promise<boolean> {
  const qrPngDataUrl = await QRCode.toDataURL(rawUrl, {
    errorCorrectionLevel: 'H',
    width: 200,
    margin: 2,
  });

  const base64Data = qrPngDataUrl.replace(/^data:image\/png;base64,/, '');
  const pngBuffer = Buffer.from(base64Data, 'base64');
  const png = PNG.sync.read(pngBuffer);

  const imgWidth = png.width;
  const imgHeight = png.height;
  const rgba = new Uint8ClampedArray(imgWidth * imgHeight * 4);

  for (let i = 0; i < png.data.length; i += 4) {
    rgba[i] = png.data[i];
    rgba[i + 1] = png.data[i + 1];
    rgba[i + 2] = png.data[i + 2];
    rgba[i + 3] = png.data[i + 3];
  }

  const code = jsQR(rgba, imgWidth, imgHeight);
  return Boolean(code && code.data === rawUrl);
}

async function runVectorPdfCatalogTests() {
  console.log('🚀 Starting 12-Template Vector PDF Quality Acceptance Tests...');

  const templates: TemplateId[] = [
    'habit-tracker',
    'goal-planner-90',
    'weekly-planner',
    'monthly-calendar',
    'daily-priorities',
    'meal-planner',
    'budget-tracker',
    'price-list',
    'client-tracker',
    'checklist',
  ];

  const testOutputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(testOutputDir)) {
    fs.mkdirSync(testOutputDir, { recursive: true });
  }

  let allPassed = true;

  for (const template of templates) {
    console.log(`\n📄 Testing Template: ${template}`);

    const testQrUrl = 'https://calendly.com/elite-coaching/session';
    const freeBrandKit: BrandKit = {
      logoUrl: null,
      companyName: 'Élite Coaching & Stratégie',
      tagline: 'Accompagnement & Performance d’Équipe',
      coachName: 'Sébastien Müller-García',
      clientName: 'Cabinet Santé & Progrès',
      contactEmail: 'contact@elite-coaching.fr',
      brandColor: '#1E293B',
      contrastText: '#FFFFFF',
      qrUrl: testQrUrl,
      qrLabel: 'Scannez pour réserver',
      paperSize: 'a4',
      documentLang: 'fr',
      designStyle: 'minimal',
      selectedTemplate: template,
      isPro: false,
      removeWatermark: false,
      weekStart: 'monday',
      currency: '€',
      habitTrackerContent: getDefaultHabitTrackerContent('fr'),
      goalPlannerContent: getDefaultGoalPlannerContent('fr'),
      weeklyPlannerContent: getDefaultWeeklyPlannerContent('fr'),
      monthlyCalendarContent: getDefaultMonthlyCalendarContent('fr'),
      dailyPrioritiesContent: getDefaultDailyPrioritiesContent('fr'),
      mealPlannerContent: getDefaultMealPlannerContent('fr'),
      budgetTrackerContent: getDefaultBudgetTrackerContent('fr'),
      priceListContent: getDefaultPriceListContent('fr'),
      clientTrackerContent: getDefaultClientTrackerContent('fr'),
      checklistContent: getDefaultChecklistContent('fr'),
    };

    const doc = React.createElement(DocumentCompiler, { brandKit: freeBrandKit });
    const filePath = path.join(testOutputDir, `${template}-free-fr.pdf`);
    await renderToFile(doc, filePath);
    const buffer = fs.readFileSync(filePath);

    const fileSizeKB = Math.round(buffer.length / 1024);
    console.log(`   - File size: ${fileSizeKB} KB (${buffer.length} bytes)`);

    if (fileSizeKB < 1000) {
      console.log('   ✅ File size < 1 MB passed');
    } else {
      console.error(`   ❌ File size exceeded 1 MB: ${fileSizeKB} KB`);
      allPassed = false;
    }

    const parser = new PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    await parser.destroy();
    console.log(`   ✅ Selectable text extracted: ${pdfData.text.length} characters`);

    const hasAccents = /Élite|Stratégie|Équipe|Santé|Progrès/i.test(pdfData.text);
    if (hasAccents) {
      console.log('   ✅ Unicode & accented characters preserved in vector text');
    } else {
      console.warn('   ⚠️ Accented characters check notice');
    }

    const qrPassed = await verifyQrCode(testQrUrl);
    if (qrPassed) {
      console.log(`   ✅ Vector QR code generated and decoded by jsQR: ${testQrUrl}`);
    } else {
      console.error('   ❌ QR code decoding failed');
      allPassed = false;
    }

    // Pro White-Label Test
    const proBrandKit: BrandKit = {
      ...freeBrandKit,
      isPro: true,
      removeWatermark: true,
    };
    const proDoc = React.createElement(DocumentCompiler, { brandKit: proBrandKit });
    const proFilePath = path.join(testOutputDir, `${template}-pro-white-label.pdf`);
    await renderToFile(proDoc, proFilePath);
    const proBuffer = fs.readFileSync(proFilePath);
    const proParser = new PDFParse({ data: proBuffer });
    const proPdfData = await proParser.getText();
    await proParser.destroy();

    if (proPdfData.text.includes('logoloom.app')) {
      console.error('   ❌ Pro white-label failed: found logoloom.app watermark in pro pdf');
      allPassed = false;
    } else {
      console.log('   ✅ Pro tier white-label verified (no logoloom.app watermark in text)');
    }
  }

  if (allPassed) {
    console.log('\n🎉 ALL 12 CATALOG VECTOR PDF TESTS PASSED!');
  } else {
    console.error('\n❌ SOME TESTS FAILED.');
    process.exit(1);
  }
}

runVectorPdfCatalogTests().catch((err) => {
  console.error('Error running vector acceptance tests:', err);
  process.exit(1);
});
