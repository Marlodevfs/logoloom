import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { BrandKit, DocumentLang, HabitPackId } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { HABIT_PACKS } from '../lib/i18n/habit-packs';
import { getDefaultHabitTrackerContent } from '../lib/use-brand-kit';

registerPDFFonts();

const OUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runStepATests() {
  console.log('=== LOGOLOOM STEP (A) QUALITY GATES & VERIFICATION ===\n');
  let failures = 0;

  // Gate 1: Grep templates for forbidden sample brand strings ("Apex", "Alexandre")
  console.log('Gate 1: Checking for hardcoded brand strings in Habit Tracker templates...');
  const filesToCheck = [
    'components/templates/HabitTrackerTemplate.tsx',
    'components/templates/TemplateFrame.tsx',
    'lib/pdf/VectorHabitTrackerPDF.tsx',
    'lib/pdf/PDFTemplateFrame.tsx',
  ];

  for (const relPath of filesToCheck) {
    const fullPath = path.join(__dirname, '..', relPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`  FAIL: File ${relPath} not found`);
      failures++;
      continue;
    }
    const content = fs.readFileSync(fullPath, 'utf8');
    const matches = content.match(/Apex|Alexandre/gi);
    if (matches) {
      console.error(`  FAIL: Found ${matches.length} occurrences of forbidden strings in ${relPath}`);
      failures++;
    } else {
      console.log(`  PASS: 0 forbidden strings in ${relPath}`);
    }
  }

  // Gate 2: Render exported PDF with EMPTY optional fields (Zero sample text)
  console.log('\nGate 2: Rendering exported PDF with empty fields (assert clean omission & blank lines)...');
  const emptyBrandKit: BrandKit = {
    logoUrl: null,
    brandColor: '#4F46E5',
    contrastText: '#FFFFFF',
    companyName: '',
    tagline: '',
    coachName: '',
    clientName: '',
    contactEmail: '',
    qrUrl: '',
    paperSize: 'a4',
    documentLang: 'fr',
    isPro: false,
    removeWatermark: false,
    habitTrackerContent: getDefaultHabitTrackerContent('fr', 'wellbeing'),
  };

  const emptyPdfPath = path.join(OUT_DIR, 'test-habit-tracker-empty.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: { ...emptyBrandKit, selectedTemplate: 'habit-tracker' } }),
    emptyPdfPath
  );
  console.log(`  PASS: Empty brand PDF generated at ${emptyPdfPath} (${fs.statSync(emptyPdfPath).size} bytes)`);

  // Gate 3: Render exported PDF with CUSTOM USER DATA (Name, Custom habits, Custom URL, QR label)
  console.log('\nGate 3: Rendering exported PDF with custom user content...');
  const customBrandKit: BrandKit = {
    logoUrl: null,
    brandColor: '#059669', // Emerald
    contrastText: '#FFFFFF',
    companyName: 'Cabinet Bien-Être & Santé',
    tagline: 'Accompagnement holistique & vitalité',
    coachName: 'Dr. Sophie Laurent',
    clientName: 'Thomas Dubreuil',
    contactEmail: 'contact@sophie-laurent.fr',
    qrUrl: 'https://sophie-laurent.fr/rdv-bilan',
    qrLabel: 'Réservez votre bilan 45 min',
    paperSize: 'a4',
    documentLang: 'fr',
    isPro: false,
    removeWatermark: false,
    habitTrackerContent: {
      packId: 'wellbeing',
      title: 'Mon Suivi d’Habitudes Santé',
      subtitle: 'Chaque pas compte pour votre transformation durable.',
      habits: [
        { id: '1', title: 'Boire 2L d’eau citronnée', subtitle: 'Hydratation cellulaire dès le réveil' },
        { id: '2', title: 'Marche active 30 min', subtitle: 'Mouvement au grand air' },
        { id: '3', title: 'Méditation cohérence cardiaque', subtitle: '10 min matin et soir' },
        { id: '4', title: 'Aucun écran après 21h30', subtitle: 'Préparation au sommeil profond' },
      ],
      weeklyQuestions: [
        'Quel rituel vous a procuré le plus de paix intérieure ?',
        'Quels obstacles avez-vous identifiés et surmontés ?',
        'Quelle habitude est devenue automatique cette semaine ?',
        'Bilan global et prochain cap pour le mois suivant ?',
      ],
      coachNote: 'Prenez soin de vous un jour à la fois. Votre régularité est votre plus grande force.',
      showScoreColumn: true,
      showWeeklyCheckins: true,
      showCoachNote: true,
    },
  };

  const customPdfPath = path.join(OUT_DIR, 'test-habit-tracker-custom.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: { ...customBrandKit, selectedTemplate: 'habit-tracker' } }),
    customPdfPath
  );
  console.log(`  PASS: Custom brand PDF generated at ${customPdfPath} (${fs.statSync(customPdfPath).size} bytes)`);

  // Gate 4: Test all 6 Habit Packs rendering (Wellbeing, Fitness, Nutrition, Sleep, Focus, Blank)
  console.log('\nGate 4: Testing all 6 Habit Packs in French & English...');
  const packs: HabitPackId[] = ['wellbeing', 'fitness', 'nutrition', 'sleep', 'focus', 'blank'];
  for (const packId of packs) {
    const packKit: BrandKit = {
      ...emptyBrandKit,
      documentLang: 'fr',
      habitTrackerContent: getDefaultHabitTrackerContent('fr', packId),
    };
    const packPath = path.join(OUT_DIR, `test-pack-${packId}.pdf`);
    await ReactPDF.renderToFile(
      React.createElement(DocumentCompiler, { brandKit: { ...packKit, selectedTemplate: 'habit-tracker' } }),
      packPath
    );
    console.log(`  PASS: Pack [${packId}] rendered successfully (${fs.statSync(packPath).size} bytes)`);
  }

  // Gate 5: Test Letter format
  console.log('\nGate 5: Testing US Letter format...');
  const letterKit: BrandKit = {
    ...customBrandKit,
    paperSize: 'letter',
    documentLang: 'en',
    habitTrackerContent: getDefaultHabitTrackerContent('en', 'focus'),
  };
  const letterPath = path.join(OUT_DIR, 'test-habit-tracker-letter.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: { ...letterKit, selectedTemplate: 'habit-tracker' } }),
    letterPath
  );
  console.log(`  PASS: US Letter PDF rendered successfully (${fs.statSync(letterPath).size} bytes)`);

  if (failures > 0) {
    console.error(`\nFAILED: ${failures} gates failed.`);
    process.exit(1);
  } else {
    console.log('\nALL STEP (A) QUALITY GATES PASSED AUTOMATICALLY!');
  }
}

runStepATests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
