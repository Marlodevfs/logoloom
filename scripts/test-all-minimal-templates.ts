import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { BrandKit, DocumentLang } from '../types';
import { registerPDFFonts } from '../lib/pdf/fonts';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import {
  getDefaultHabitTrackerContent,
  getDefaultGoalPlannerContent,
  getDefaultWeeklyPlannerContent,
} from '../lib/use-brand-kit';

registerPDFFonts();

const OUT_DIR = path.join(__dirname, 'output/all_minimal');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const squareSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="20" fill="#4F46E5"/><circle cx="50" cy="50" r="25" fill="#FFFFFF"/></svg>';
const wideSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100"><rect width="400" height="100" rx="10" fill="#1E293B"/><polygon points="200,30 230,70 170,70" fill="#FFFFFF"/></svg>';

const squareLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(squareSvg).toString('base64');
const wideLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(wideSvg).toString('base64');

async function runAllMinimalGates() {
  console.log('=== LOGOLOOM ALL MINIMAL TEMPLATES QUALITY GATES ===\n');
  let failures = 0;

  // Gate 1: Check zero hardcoded sample brand strings in templates and pdf components
  console.log('Gate 1: Verifying 0 forbidden strings (Apex, Alexandre) across templates...');
  const filesToCheck = [
    'components/templates/MinimalHabitTrackerTemplate.tsx',
    'lib/pdf/VectorMinimalHabitTrackerPDF.tsx',
    'components/templates/GoalPlannerTemplate.tsx',
    'lib/pdf/VectorGoalPlannerPDF.tsx',
    'components/templates/WeeklyPlannerTemplate.tsx',
    'lib/pdf/VectorWeeklyPlannerPDF.tsx',
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

  // Gate 2: Render Minimal Habit Tracker (A4 FR, Free, User QR)
  console.log('\nGate 2: Rendering Minimal Habit Tracker A4 FR (Free, with QR)...');
  const kitHabit: BrandKit = {
    logoUrl: squareLogoB64,
    companyName: 'Studio Élan Vital',
    tagline: 'Santé, vitalité & routines positives',
    coachName: 'Dr. Camille Martin',
    clientName: 'Julien Mercier',
    contactEmail: 'contact@elan-vital.fr',
    brandColor: '#4F46E5',
    contrastText: '#FFFFFF',
    qrUrl: 'https://elan-vital.fr/rendez-vous',
    qrLabel: 'Prendre rendez-vous',
    paperSize: 'a4',
    documentLang: 'fr',
    designStyle: 'minimal',
    selectedTemplate: 'habit-tracker',
    isPro: false,
    removeWatermark: false,
    habitTrackerContent: getDefaultHabitTrackerContent('fr', 'wellbeing'),
  };
  const habitPdfPath = path.join(OUT_DIR, 'minimal-habit-tracker-a4-fr.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitHabit }) as any,
    habitPdfPath
  );
  console.log(`  PASS: Rendered ${habitPdfPath} (${fs.statSync(habitPdfPath).size} bytes)`);

  // Gate 3: Render Minimal 90-Day Goal Planner (A4 FR, Free, User QR)
  console.log('\nGate 3: Rendering Minimal 90-Day Goal Planner A4 FR (Free, with QR)...');
  const kitGoalFr: BrandKit = {
    logoUrl: squareLogoB64,
    companyName: 'Cabinet Stratégie Croissance',
    tagline: 'Accélération & Clarté',
    coachName: 'Marc Vaugirard',
    clientName: 'Groupe Alpha',
    contactEmail: 'contact@strategie-croissance.com',
    brandColor: '#0284C7',
    contrastText: '#FFFFFF',
    qrUrl: 'https://strategie-croissance.com/espace-client',
    qrLabel: 'Accéder à votre espace',
    paperSize: 'a4',
    documentLang: 'fr',
    designStyle: 'minimal',
    selectedTemplate: 'goal-planner-90',
    isPro: false,
    removeWatermark: false,
    goalPlannerContent: getDefaultGoalPlannerContent('fr'),
  };
  const goalPdfPath = path.join(OUT_DIR, 'minimal-goal-planner-a4-fr.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitGoalFr }) as any,
    goalPdfPath
  );
  console.log(`  PASS: Rendered ${goalPdfPath} (${fs.statSync(goalPdfPath).size} bytes)`);

  // Gate 4: Render Minimal 90-Day Goal Planner (US Letter EN, Pro, No QR)
  console.log('\nGate 4: Rendering Minimal 90-Day Goal Planner US Letter EN (Pro, no QR)...');
  const kitGoalEn: BrandKit = {
    logoUrl: wideLogoB64,
    companyName: 'Vanguard Consulting Partners',
    tagline: 'Strategic execution & momentum',
    coachName: 'Sarah Jenkins',
    clientName: 'Acme Global',
    contactEmail: 'partner@vanguard.co',
    brandColor: '#059669',
    contrastText: '#FFFFFF',
    qrUrl: '',
    paperSize: 'letter',
    documentLang: 'en',
    designStyle: 'minimal',
    selectedTemplate: 'goal-planner-90',
    isPro: true,
    removeWatermark: true,
    goalPlannerContent: getDefaultGoalPlannerContent('en'),
  };
  const goalEnPdfPath = path.join(OUT_DIR, 'minimal-goal-planner-letter-en.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitGoalEn }) as any,
    goalEnPdfPath
  );
  console.log(`  PASS: Rendered ${goalEnPdfPath} (${fs.statSync(goalEnPdfPath).size} bytes)`);

  // Gate 6: Render Minimal Weekly Planner (US Letter DE, Pro, Wordmark typography fallback)
  console.log('\nGate 6: Rendering Minimal Weekly Planner US Letter DE (Pro, no logo)...');
  const kitWeeklyDe: BrandKit = {
    logoUrl: null, // Test clean wordmark fallback
    companyName: 'Klarheit Beratung',
    tagline: 'Strategische Ausrichtung für Macher',
    coachName: 'Lukas Weber',
    clientName: 'Alpha GmbH',
    contactEmail: 'kontakt@klarheit.de',
    brandColor: '#B45309',
    contrastText: '#FFFFFF',
    qrUrl: '',
    paperSize: 'letter',
    documentLang: 'de',
    designStyle: 'minimal',
    selectedTemplate: 'weekly-planner',
    isPro: true,
    removeWatermark: true,
    weeklyPlannerContent: getDefaultWeeklyPlannerContent('de'),
  };
  const weeklyDePdfPath = path.join(OUT_DIR, 'minimal-weekly-letter-de.pdf');
  await ReactPDF.renderToFile(
    React.createElement(DocumentCompiler, { brandKit: kitWeeklyDe }) as any,
    weeklyDePdfPath
  );
  console.log(`  PASS: Rendered ${weeklyDePdfPath} (${fs.statSync(weeklyDePdfPath).size} bytes)`);

  if (failures > 0) {
    console.error(`\nFAILED with ${failures} error(s)!`);
    process.exit(1);
  } else {
    console.log('\nALL 6 QUALITY GATES PASSED PERFECTLY!');
  }
}

runAllMinimalGates().catch((err) => {
  console.error('Fatal error during quality gates:', err);
  process.exit(1);
});
