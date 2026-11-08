import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { BrandKit, DocumentLang } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { getDefaultHabitTrackerContent } from '../lib/use-brand-kit';

registerPDFFonts();

const OUT_DIR = path.join(__dirname, 'output/minimal');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// 4 distinct logos (Square, Wide, Tall, Dark)
const squareSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="20" fill="#4F46E5"/><circle cx="50" cy="50" r="25" fill="#FFFFFF"/></svg>';
const wideSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100"><rect width="400" height="100" rx="10" fill="#1E293B"/><polygon points="200,30 230,70 170,70" fill="#FFFFFF"/></svg>';

const squareLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(squareSvg).toString('base64');
const wideLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(wideSvg).toString('base64');

async function runMinimalHabitTrackerGates() {
  console.log('=== LOGOLOOM MINIMAL HABIT TRACKER QUALITY GATES ===\n');
  let failures = 0;

  // Gate 1: Check zero hardcoded sample brand strings in Minimal components
  console.log('Gate 1: Verifying 0 forbidden strings in Minimal components...');
  const filesToCheck = [
    'components/templates/MinimalHabitTrackerTemplate.tsx',
    'lib/pdf/VectorMinimalHabitTrackerPDF.tsx',
  ];

  for (const rel of filesToCheck) {
    const full = path.join(__dirname, '..', rel);
    const content = fs.readFileSync(full, 'utf8');
    const matches = content.match(/Apex|Alexandre/gi);
    if (matches) {
      console.error(`  FAIL: Found forbidden strings in ${rel}`);
      failures++;
    } else {
      console.log(`  PASS: 0 forbidden strings in ${rel}`);
    }
  }

  // Gate 2: Minimal A4 Portrait FR (Default Wellbeing, Free, with User QR)
  console.log('\nGate 2: Rendering Minimal A4 Portrait FR (User QR, Free)...');
  const kitA4Fr: BrandKit = {
    logoUrl: squareLogoB64,
    companyName: 'Atelier Santé & Équilibre',
    tagline: 'Accompagnement quotidien & vitalité',
    coachName: 'Dr. Camille Martin',
    clientName: 'Julien Mercier',
    contactEmail: 'contact@atelier-sante.fr',
    brandColor: '#4F46E5', // Royal Indigo
    contrastText: '#FFFFFF',
    qrUrl: 'https://atelier-sante.fr/rendez-vous',
    qrLabel: 'Prendre rendez-vous',
    paperSize: 'a4',
    documentLang: 'fr',
    designStyle: 'minimal',
    selectedTemplate: 'habit-tracker',
    isPro: false,
    removeWatermark: false,
    habitTrackerContent: getDefaultHabitTrackerContent('fr', 'wellbeing'),
  };

  const a4FrPath = path.join(OUT_DIR, 'minimal-habit-tracker-a4-fr.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitA4Fr }),
    a4FrPath
  );
  console.log(`  PASS: Rendered ${a4FrPath} (${fs.statSync(a4FrPath).size} bytes)`);

  // Gate 3: Minimal US Letter Portrait EN (Focus pack, Pro, No User QR)
  console.log('\nGate 3: Rendering Minimal US Letter Portrait EN (Focus pack, Pro)...');
  const kitLetterEn: BrandKit = {
    logoUrl: wideLogoB64,
    companyName: 'Clarity & Routine Studio',
    tagline: 'Deep Work & Daily Productivity',
    coachName: 'Emma Watson',
    clientName: 'David Lee',
    contactEmail: 'hello@claritystudio.co',
    brandColor: '#059669', // Emerald
    contrastText: '#FFFFFF',
    qrUrl: '', // NO QR
    paperSize: 'letter',
    documentLang: 'en',
    designStyle: 'minimal',
    selectedTemplate: 'habit-tracker',
    isPro: true,
    removeWatermark: true,
    habitTrackerContent: {
      ...getDefaultHabitTrackerContent('en', 'focus'),
      showNotesColumn: true,
      showScoreRow: true,
    },
  };

  const letterEnPath = path.join(OUT_DIR, 'minimal-habit-tracker-letter-en.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitLetterEn }),
    letterEnPath
  );
  console.log(`  PASS: Rendered ${letterEnPath} (${fs.statSync(letterEnPath).size} bytes)`);

  // Gate 4: Minimal A4 Portrait DE with Longest Allowed Content
  console.log('\nGate 4: Rendering Minimal with Longest Allowed Content (7 habits)...');
  const kitMaxContent: BrandKit = {
    logoUrl: null,
    companyName: 'Gemeinschaftspraxis für Ganzheitliche Gesundheit',
    tagline: 'Präventive Lebensführung und nachhaltige Verhaltensänderung',
    coachName: 'Dr. med. Maximiliane Freifrau von Lindenberg',
    clientName: 'Hans-Joachim Friedrich Zimmermann',
    contactEmail: 'kontakt@ganzheitliche-gesundheitspraxis.de',
    brandColor: '#D97706', // Amber
    contrastText: '#FFFFFF',
    qrUrl: 'https://ganzheitliche-gesundheitspraxis.de/termin',
    qrLabel: 'Termin buchen',
    paperSize: 'a4',
    documentLang: 'de',
    designStyle: 'minimal',
    selectedTemplate: 'habit-tracker',
    isPro: false,
    removeWatermark: false,
    habitTrackerContent: {
      packId: 'fitness',
      title: 'Täglicher Gewohnheitstracker 30 Tage',
      subtitle: 'Kleine konsequente Schritte führen zu nachhaltigen Ergebnissen.',
      habits: [
        { id: '1', title: 'Frühmorgendliche Gelenkmobilisation', subtitle: '15 Min sanfte Dehnung' },
        { id: '2', title: 'Zwei Liter frisches Quellwasser', subtitle: 'Optimale tägliche Hydration' },
        { id: '3', title: 'Zehntausend Schritte im Freien', subtitle: 'Tägliche zügige Bewegung' },
        { id: '4', title: 'Ernährung ohne Industriezucker', subtitle: 'Ausgewogene Vollwertkost' },
        { id: '5', title: 'Tiefe Achtsamkeitsmeditation', subtitle: '10 Min Atemregulierung' },
        { id: '6', title: 'Bildschirmfreie Abendstunde', subtitle: 'Kein Blaulicht vor Schlaf' },
        { id: '7', title: 'Acht Stunden erholsamer Schlaf', subtitle: 'Feste Bettgehzeit einhalten' },
      ],
      weeklyQuestions: [
        'Frage 1', 'Frage 2', 'Frage 3', 'Frage 4'
      ],
      coachNote: 'Jeder Tag zählt.',
      showScoreColumn: false,
      showWeeklyCheckins: false,
      showCoachNote: false,
      showNotesColumn: true,
      showScoreRow: true,
    },
  };

  const maxContentPath = path.join(OUT_DIR, 'minimal-habit-tracker-max.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitMaxContent }),
    maxContentPath
  );
  console.log(`  PASS: Rendered ${maxContentPath} (${fs.statSync(maxContentPath).size} bytes)`);

  // Gate 5: Render Complete style for direct comparison!
  console.log('\nGate 5: Rendering Complete style for comparison...');
  const kitComplete: BrandKit = {
    ...kitA4Fr,
    designStyle: 'complete',
  };
  const completePath = path.join(OUT_DIR, 'complete-habit-tracker-comparison.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitComplete }),
    completePath
  );
  console.log(`  PASS: Rendered Complete style comparison (${fs.statSync(completePath).size} bytes)`);

  if (failures > 0) {
    console.error(`\nFAILED: ${failures} gates failed.`);
    process.exit(1);
  } else {
    console.log('\nALL MINIMAL HABIT TRACKER GATES COMPILED CLEANLY!');
  }
}

runMinimalHabitTrackerGates().catch((err) => {
  console.error('Fatal gate error:', err);
  process.exit(1);
});
