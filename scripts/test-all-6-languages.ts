import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { PDFParse } from 'pdf-parse';
import { BrandKit, DocumentLang } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import {
  getDefaultHabitTrackerContent,
  getDefaultGoalPlannerContent,
  getDefaultInvoiceContent,
} from '../lib/use-brand-kit';

registerPDFFonts();

const OUT_DIR = path.join(__dirname, 'output/languages_test');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

interface LanguageTestCase {
  lang: DocumentLang;
  expectedHabitTracker: {
    mustContain: string[];
    mustNotContain: string[];
  };
  expectedGoalPlanner: {
    mustContain: string[];
  };
  expectedInvoice: {
    mustContain: string[];
  };
}

const TEST_CASES: LanguageTestCase[] = [
  {
    lang: 'de',
    expectedHabitTracker: {
      mustContain: [
        'Tag',
        'Name:',
        'Datum:',
        'Persönliches Dokument',
        'Seite 1 von 1',
        '30-Tage-Gewohnheitstracker',
        'Erstellt mit',
        'Hydration & Vitalität',
      ],
      mustNotContain: ['Jour', 'Nom :', 'Suivi d’habitudes', 'Personal Document'],
    },
    expectedGoalPlanner: {
      mustContain: [
        '90-Tage-Zielplaner',
        'Seite 1 von 1',
        'Fundament & Struktur',
      ],
    },
    expectedInvoice: {
      mustContain: [
        'RECHNUNG',
        'RE-2026-042',
        'Seite 1 von 1',
      ],
    },
  },
  {
    lang: 'fr',
    expectedHabitTracker: {
      mustContain: [
        'Jour',
        'Nom :',
        'Date :',
        'Document personnel',
        'Page 1 sur 1',
        'Suivi d’habitudes',
        'Créé avec',
        'Hydratation & Vitalité',
      ],
      mustNotContain: ['Persönliches Dokument'],
    },
    expectedGoalPlanner: {
      mustContain: [
        'Objectifs 90 jours',
        'Page 1 sur 1',
        'Cadrage & Fondations',
      ],
    },
    expectedInvoice: {
      mustContain: [
        'FACTURE',
        'FAC-2026-042',
        'Page 1 sur 1',
      ],
    },
  },
  {
    lang: 'es',
    expectedHabitTracker: {
      mustContain: [
        'Día',
        'Nombre:',
        'Fecha:',
        'Documento personal',
        'Página 1 de 1',
        'Seguimiento de hábitos',
        'Creado con',
        'Hidratación y Vitalidad',
      ],
      mustNotContain: ['Persönliches Dokument', 'Document personnel'],
    },
    expectedGoalPlanner: {
      mustContain: [
        'Planificador 90 Días',
        'Página 1 de 1',
        'Bases y Organización',
      ],
    },
    expectedInvoice: {
      mustContain: [
        'FACTURA',
        'FAC-2026-042',
        'Página 1 de 1',
      ],
    },
  },
  {
    lang: 'it',
    expectedHabitTracker: {
      mustContain: [
        'Giorno',
        'Nome:',
        'Data:',
        'Documento personale',
        'Pagina 1 di 1',
        'Tracciatore di abitudini',
        'Creato con',
        'Idratazione e Vitalità',
      ],
      mustNotContain: ['Persönliches Dokument', 'Document personnel'],
    },
    expectedGoalPlanner: {
      mustContain: [
        'Pianificatore 90 Giorni',
        'Pagina 1 di 1',
        'Fondamenta',
      ],
    },
    expectedInvoice: {
      mustContain: [
        'FATTURA',
        'FATT-2026-042',
        'Pagina 1 di 1',
      ],
    },
  },
  {
    lang: 'pt',
    expectedHabitTracker: {
      mustContain: [
        'Dia',
        'Nome:',
        'Data:',
        'Documento pessoal',
        'Página 1 de 1',
        'Rastreador de hábitos',
        'Criado com',
        'Hidratação e Vitalidade',
      ],
      mustNotContain: ['Persönliches Dokument', 'Document personnel'],
    },
    expectedGoalPlanner: {
      mustContain: [
        'Planejador de 90 Dias',
        'Página 1 de 1',
        'Fundamentos & Estrutura',
      ],
    },
    expectedInvoice: {
      mustContain: [
        'FATURA',
        'FAT-2026-042',
        'Página 1 de 1',
      ],
    },
  },
  {
    lang: 'en',
    expectedHabitTracker: {
      mustContain: [
        'Day',
        'Name:',
        'Date:',
        'Personal Document',
        'Page 1 of 1',
        '30-Day Habit Tracker',
        'Made with',
        'Hydration & Vitality',
      ],
      mustNotContain: ['Jour', 'Tag'],
    },
    expectedGoalPlanner: {
      mustContain: [
        '90-Day Goal Planner',
        'Page 1 of 1',
        'Foundations & Setup',
      ],
    },
    expectedInvoice: {
      mustContain: [
        'INVOICE',
        'INV-2026-042',
        'Page 1 of 1',
      ],
    },
  },
];

async function verifyAll6Languages() {
  console.log('=== LOGOLOOM 6-LANGUAGE COMPREHENSIVE PDF VERIFICATION ===\n');
  let errors = 0;

  for (const tc of TEST_CASES) {
    console.log(`\n========================================`);
    console.log(`🌍 TESTING LANGUAGE: ${tc.lang.toUpperCase()}`);
    console.log(`========================================`);

    // 1. Habit Tracker (Minimal)
    const brandKitHabit: BrandKit = {
      brandColor: '#4F46E5',
      contrastText: '#FFFFFF',
      companyName: tc.lang === 'de' ? 'Praxis Dr. Schmidt' : 'Studio Test',
      tagline: 'Coaching & Mentoring',
      coachName: 'Dr. Expert',
      clientName: 'Max Client',
      paperSize: 'a4',
      documentLang: tc.lang,
      designStyle: 'minimal',
      selectedTemplate: 'habit-tracker',
      habitTrackerContent: getDefaultHabitTrackerContent(tc.lang, 'wellbeing'),
      goalPlannerContent: getDefaultGoalPlannerContent(tc.lang),
      invoiceContent: getDefaultInvoiceContent(tc.lang),
      isPro: false,
      removeWatermark: false,
    };

    const habitDoc = React.createElement(DocumentCompiler, { brandKit: brandKitHabit });
    const habitPdfPath = path.join(OUT_DIR, `habit_tracker_${tc.lang}.pdf`);
    await ReactPDF.renderToFile(habitDoc as any, habitPdfPath);

    const habitBuffer = fs.readFileSync(habitPdfPath);
    const habitParser = new PDFParse({ data: habitBuffer });
    const habitTextResult = await habitParser.getText();
    const habitText = habitTextResult.text;
    await habitParser.destroy();

    console.log(`\n📋 [Habit Tracker - Minimal - ${tc.lang.toUpperCase()}] Text checks:`);
    for (const phrase of tc.expectedHabitTracker.mustContain) {
      if (habitText.toLowerCase().includes(phrase.toLowerCase())) {
        console.log(`  ✅ MUST CONTAIN: "${phrase}" -> FOUND`);
      } else {
        console.error(`  ❌ MUST CONTAIN: "${phrase}" -> MISSING!`);
        errors++;
      }
    }

    for (const phrase of tc.expectedHabitTracker.mustNotContain) {
      if (!habitText.toLowerCase().includes(phrase.toLowerCase())) {
        console.log(`  ✅ MUST NOT CONTAIN: "${phrase}" -> ABSENT (as expected)`);
      } else {
        console.error(`  ❌ MUST NOT CONTAIN: "${phrase}" -> FOUND IN TEXT!`);
        errors++;
      }
    }

    // 2. 90-Day Goal Planner (Minimal)
    const brandKitGoal: BrandKit = {
      ...brandKitHabit,
      selectedTemplate: 'goal-planner-90',
    };
    const goalDoc = React.createElement(DocumentCompiler, { brandKit: brandKitGoal });
    const goalPdfPath = path.join(OUT_DIR, `goal_planner_${tc.lang}.pdf`);
    await ReactPDF.renderToFile(goalDoc as any, goalPdfPath);

    const goalBuffer = fs.readFileSync(goalPdfPath);
    const goalParser = new PDFParse({ data: goalBuffer });
    const goalTextResult = await goalParser.getText();
    const goalText = goalTextResult.text;
    await goalParser.destroy();

    console.log(`\n🗺️ [Goal Planner - Minimal - ${tc.lang.toUpperCase()}] Text checks:`);
    for (const phrase of tc.expectedGoalPlanner.mustContain) {
      if (goalText.toLowerCase().includes(phrase.toLowerCase())) {
        console.log(`  ✅ MUST CONTAIN: "${phrase}" -> FOUND`);
      } else {
        console.error(`  ❌ MUST CONTAIN: "${phrase}" -> MISSING!`);
        errors++;
      }
    }

    // 3. Invoice (Business Minimal)
    const brandKitInvoice: BrandKit = {
      ...brandKitHabit,
      selectedTemplate: 'invoice',
    };
    const invoiceDoc = React.createElement(DocumentCompiler, { brandKit: brandKitInvoice });
    const invoicePdfPath = path.join(OUT_DIR, `invoice_${tc.lang}.pdf`);
    await ReactPDF.renderToFile(invoiceDoc as any, invoicePdfPath);

    const invoiceBuffer = fs.readFileSync(invoicePdfPath);
    const invoiceParser = new PDFParse({ data: invoiceBuffer });
    const invoiceTextResult = await invoiceParser.getText();
    const invoiceText = invoiceTextResult.text;
    await invoiceParser.destroy();

    console.log(`\n💼 [Invoice - Minimal - ${tc.lang.toUpperCase()}] Text checks:`);
    for (const phrase of tc.expectedInvoice.mustContain) {
      if (invoiceText.toLowerCase().includes(phrase.toLowerCase())) {
        console.log(`  ✅ MUST CONTAIN: "${phrase}" -> FOUND`);
      } else {
        console.error(`  ❌ MUST CONTAIN: "${phrase}" -> MISSING!`);
        errors++;
      }
    }
  }

  console.log(`\n========================================`);
  if (errors === 0) {
    console.log(`🎉 ALL 6 LANGUAGES FULLY VERIFIED WITH 0 ERRORS!`);
  } else {
    console.error(`❌ VERIFICATION COMPLETED WITH ${errors} ERRORS.`);
    process.exit(1);
  }
}

verifyAll6Languages().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
