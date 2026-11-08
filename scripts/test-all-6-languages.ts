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
  getDefaultRoadmapContent,
  getDefaultWelcomePacketContent,
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
  expectedRoadmap: {
    mustContain: string[];
  };
  expectedWelcome: {
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
    expectedRoadmap: {
      mustContain: [
        'Strategische Roadmap',
        'Seite 1 von 1',
        'Projekt / Kunde:',
        'Zielhorizont:',
        'Hauptmeilenstein:',
      ],
    },
    expectedWelcome: {
      mustContain: [
        'Willkommensleitfaden',
        'Seite 1 von 1',
        'Willkommenspaket',
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
    expectedRoadmap: {
      mustContain: [
        'Feuille de route stratégique',
        'Page 1 sur 1',
        'Projet / Client :',
        'Horizon cible :',
        'Jalon clé :',
      ],
    },
    expectedWelcome: {
      mustContain: [
        'Guide de bienvenue',
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
        'Hidratación y vitalidad',
      ],
      mustNotContain: ['Jour', 'Tag'],
    },
    expectedRoadmap: {
      mustContain: [
        'Hoja de ruta estratégica',
        'Página 1 de 1',
        'Proyecto / Cliente:',
        'Horizonte objetivo:',
        'Hito clave:',
      ],
    },
    expectedWelcome: {
      mustContain: [
        'Guía de bienvenida',
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
      mustNotContain: ['Jour', 'Tag'],
    },
    expectedRoadmap: {
      mustContain: [
        'Tabella di marcia strategica',
        'Pagina 1 di 1',
        'Progetto / Cliente:',
        'Traguardo chiave:',
      ],
    },
    expectedWelcome: {
      mustContain: [
        'Guida di benvenuto',
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
      mustNotContain: ['Jour', 'Tag'],
    },
    expectedRoadmap: {
      mustContain: [
        'Roteiro estratégico',
        'Página 1 de 1',
        'Projeto / Cliente:',
        'Marco principal:',
      ],
    },
    expectedWelcome: {
      mustContain: [
        'Guia de boas-vindas',
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
    expectedRoadmap: {
      mustContain: [
        'Strategic Roadmap',
        'Page 1 of 1',
        'Project / Client:',
        'Target Horizon:',
        'Key Milestone:',
      ],
    },
    expectedWelcome: {
      mustContain: [
        'Welcome Guide',
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
      roadmapContent: getDefaultRoadmapContent(tc.lang),
      welcomePacketContent: getDefaultWelcomePacketContent(tc.lang),
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

    // 2. Roadmap (Minimal)
    const brandKitRoadmap: BrandKit = {
      ...brandKitHabit,
      selectedTemplate: 'roadmap-90',
    };
    const roadmapDoc = React.createElement(DocumentCompiler, { brandKit: brandKitRoadmap });
    const roadmapPdfPath = path.join(OUT_DIR, `roadmap_${tc.lang}.pdf`);
    await ReactPDF.renderToFile(roadmapDoc as any, roadmapPdfPath);

    const roadmapBuffer = fs.readFileSync(roadmapPdfPath);
    const roadmapParser = new PDFParse({ data: roadmapBuffer });
    const roadmapTextResult = await roadmapParser.getText();
    const roadmapText = roadmapTextResult.text;
    await roadmapParser.destroy();

    console.log(`\n🗺️ [Roadmap - Minimal - ${tc.lang.toUpperCase()}] Text checks:`);
    for (const phrase of tc.expectedRoadmap.mustContain) {
      if (roadmapText.toLowerCase().includes(phrase.toLowerCase())) {
        console.log(`  ✅ MUST CONTAIN: "${phrase}" -> FOUND`);
      } else {
        console.error(`  ❌ MUST CONTAIN: "${phrase}" -> MISSING!`);
        errors++;
      }
    }

    // 3. Welcome Packet (Minimal)
    const brandKitWelcome: BrandKit = {
      ...brandKitHabit,
      selectedTemplate: 'welcome-packet',
    };
    const welcomeDoc = React.createElement(DocumentCompiler, { brandKit: brandKitWelcome });
    const welcomePdfPath = path.join(OUT_DIR, `welcome_${tc.lang}.pdf`);
    await ReactPDF.renderToFile(welcomeDoc as any, welcomePdfPath);

    const welcomeBuffer = fs.readFileSync(welcomePdfPath);
    const welcomeParser = new PDFParse({ data: welcomeBuffer });
    const welcomeTextResult = await welcomeParser.getText();
    const welcomeText = welcomeTextResult.text;
    await welcomeParser.destroy();

    console.log(`\n🤝 [Welcome Packet - Minimal - ${tc.lang.toUpperCase()}] Text checks:`);
    for (const phrase of tc.expectedWelcome.mustContain) {
      if (welcomeText.toLowerCase().includes(phrase.toLowerCase())) {
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
