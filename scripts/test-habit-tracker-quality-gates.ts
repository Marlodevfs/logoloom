import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { BrandKit } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'output/quality-gates');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 4 Distinct Logo Variants
const squareSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="20" fill="#4F46E5"/><circle cx="50" cy="50" r="25" fill="#FFFFFF"/></svg>';
const wideSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100"><rect width="400" height="100" rx="10" fill="#1E293B"/><polygon points="200,30 230,70 170,70" fill="#FFFFFF"/></svg>';
const tallSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 300" width="100" height="300"><rect width="100" height="300" rx="15" fill="#047857"/><circle cx="50" cy="150" r="35" fill="#FFFFFF"/></svg>';
const darkSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><rect width="120" height="120" fill="#000000"/><polygon points="60,20 100,100 20,100" fill="#CBD5E1"/></svg>';

const squareLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(squareSvg).toString('base64');
const wideLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(wideSvg).toString('base64');
const tallLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(tallSvg).toString('base64');
const darkLogoB64 = 'data:image/svg+xml;base64,' + Buffer.from(darkSvg).toString('base64');

interface TestCase {
  id: string;
  paperSize: 'a4' | 'letter';
  docLang: 'fr' | 'en' | 'de';
  logoUrl: string | null;
  qrUrl: string;
  isPro: boolean;
  clientName: string;
}

const testCases: TestCase[] = [
  // 1. A4 Landscape FR with User QR + Free (Square Logo)
  {
    id: 'habit-a4-fr-square-free',
    paperSize: 'a4',
    docLang: 'fr',
    logoUrl: squareLogoB64,
    qrUrl: 'https://calendly.com/elite-coaching/session',
    isPro: false,
    clientName: 'Cabinet Santé & Progrès',
  },
  // 2. A4 Landscape FR without User QR + Free (No logo wordmark)
  {
    id: 'habit-a4-fr-nologo-noqr',
    paperSize: 'a4',
    docLang: 'fr',
    logoUrl: null,
    qrUrl: '', // NO QR link!
    isPro: false,
    clientName: '',
  },
  // 3. US Letter Landscape EN with Wide Logo + Pro (White-label)
  {
    id: 'habit-letter-en-wide-pro',
    paperSize: 'letter',
    docLang: 'en',
    logoUrl: wideLogoB64,
    qrUrl: 'https://apexstudio.io/portal',
    isPro: true,
    clientName: 'Sarah Jenkins Growth Co',
  },
  // 4. A4 Landscape DE with Tall Logo + Free
  {
    id: 'habit-a4-de-tall-free',
    paperSize: 'a4',
    docLang: 'de',
    logoUrl: tallLogoB64,
    qrUrl: 'https://klueger-partner.de/termin',
    isPro: false,
    clientName: 'Nordische Technologien AG',
  },
  // 5. US Letter Landscape FR with Dark Logo + Pro
  {
    id: 'habit-letter-fr-dark-pro',
    paperSize: 'letter',
    docLang: 'fr',
    logoUrl: darkLogoB64,
    qrUrl: 'https://coaching-sommet.fr/bilan',
    isPro: true,
    clientName: 'Atelier Design Studio',
  },
];

async function generateAll() {
  console.log('🚀 Compiling Quality Gate Test Matrix for Habit Tracker...');

  for (const tc of testCases) {
    const brandKit: BrandKit = {
      logoUrl: tc.logoUrl,
      companyName: 'Apex Studio & Coaching',
      tagline: 'High-Impact Consulting & Strategic Performance',
      coachName: 'Alexandre Martin',
      clientName: tc.clientName,
      contactEmail: 'alexandre@apexstudio.io',
      brandColor: '#4F46E5',
      contrastText: '#FFFFFF',
      qrUrl: tc.qrUrl,
      paperSize: tc.paperSize,
      documentLang: tc.docLang,
      selectedTemplate: 'habit-tracker',
      isPro: tc.isPro,
      removeWatermark: tc.isPro,
    };

    const outPath = path.join(outDir, `${tc.id}.pdf`);
    const doc = React.createElement(DocumentCompiler, { brandKit });
    await renderToFile(doc, outPath);
    const size = fs.statSync(outPath).size;
    console.log(`   ✅ Rendered ${tc.id}.pdf (${Math.round(size / 1024)} KB)`);
  }

  console.log('🎉 Generation complete. Running Python pdfplumber deep audit...');
}

generateAll().catch((err) => {
  console.error('Fatal generation error:', err);
  process.exit(1);
});
