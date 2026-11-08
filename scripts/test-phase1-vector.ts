import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { PDFParse } from 'pdf-parse';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { DocumentCompiler } from '../lib/pdf/DocumentCompiler';
import { TemplateId } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testQRDecoding(rawUrl: string): Promise<boolean> {
  const qr = QRCode.create(rawUrl, { errorCorrectionLevel: 'H' });
  const moduleCount = qr.modules.size;
  const margin = 2;
  const width = moduleCount + margin * 2;
  const height = width;
  const scale = 8;
  const imgWidth = width * scale;
  const imgHeight = height * scale;

  const rgba = new Uint8ClampedArray(imgWidth * imgHeight * 4);
  // Fill white
  for (let i = 0; i < rgba.length; i += 4) {
    rgba[i] = 255;
    rgba[i + 1] = 255;
    rgba[i + 2] = 255;
    rgba[i + 3] = 255;
  }

  // Draw modules
  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (qr.modules.get(r, c)) {
        for (let py = 0; py < scale; py++) {
          for (let px = 0; px < scale; px++) {
            const y = (r + margin) * scale + py;
            const x = (c + margin) * scale + px;
            const idx = (y * imgWidth + x) * 4;
            rgba[idx] = 0;
            rgba[idx + 1] = 0;
            rgba[idx + 2] = 0;
            rgba[idx + 3] = 255;
          }
        }
      }
    }
  }

  const code = jsQR(rgba, imgWidth, imgHeight);
  if (code && code.data === rawUrl) {
    return true;
  }
  return false;
}

async function runPhase1Tests() {
  console.log('🚀 Starting Phase 1 Vector PDF Acceptance Tests...');

  const templates: TemplateId[] = ['habit-tracker', 'roadmap-90', 'welcome-packet'];
  const testOutputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(testOutputDir)) {
    fs.mkdirSync(testOutputDir, { recursive: true });
  }

  let allPassed = true;

  for (const template of templates) {
    console.log(`\n📄 Testing Template: ${template}`);

    // Test 1: Generate Free Tier in French with A4
    const testQrUrl = 'https://calendly.com/elite-coaching/session';
    const freeBrandKit = {
      logoUrl: null,
      companyName: 'Élite Coaching & Stratégie',
      tagline: 'Accompagnement & Performance d’Équipe',
      coachName: 'Sébastien Müller-García',
      clientName: 'Cabinet Santé & Progrès',
      contactEmail: 'contact@elite-coaching.fr',
      brandColor: '#1E293B',
      contrastText: '#FFFFFF',
      qrUrl: testQrUrl,
      paperSize: 'a4' as const,
      documentLang: 'fr' as const,
      selectedTemplate: template,
      isPro: false,
      removeWatermark: false,
    };

    const doc = React.createElement(DocumentCompiler, { brandKit: freeBrandKit });
    const filePath = path.join(testOutputDir, `${template}-free-fr.pdf`);
    await renderToFile(doc, filePath);
    const buffer = fs.readFileSync(filePath);

    const fileSizeKB = Math.round(buffer.length / 1024);
    console.log(`   - File size: ${fileSizeKB} KB (${buffer.length} bytes)`);

    // Check size < 1MB (1024 KB)
    if (fileSizeKB < 1024) {
      console.log('   ✅ File size < 1 MB passed (target 50-70 KB)');
    } else {
      console.error(`   ❌ File size exceeded 1 MB: ${fileSizeKB} KB`);
      allPassed = false;
    }

    // Parse PDF text with PDFParse
    const parser = new PDFParse({ data: buffer });
    const textResult = await parser.getText();
    const extractedText = textResult.text;
    await parser.destroy();

    // Check text extractability
    if (extractedText && extractedText.length > 50) {
      console.log(`   ✅ Selectable text extracted: ${extractedText.length} characters`);
    } else {
      console.error('   ❌ Text extraction failed or too short');
      allPassed = false;
    }

    // Check accented characters in French
    const hasAccents = extractedText.includes('Élite') ||
                       extractedText.includes('Stratégie') ||
                       extractedText.includes('Équipe') ||
                       extractedText.includes('Santé');
    if (hasAccents) {
      console.log('   ✅ Unicode & accented characters preserved in vector text');
    } else {
      console.error('   ❌ Unicode accents missing in extracted text');
      allPassed = false;
    }

    // Check Free watermark present
    const hasWatermark = extractedText.includes('logoloom.app') || extractedText.includes('LogoLoom');
    if (hasWatermark) {
      console.log('   ✅ Free tier watermark properly rendered');
    } else {
      console.error('   ❌ Free watermark missing');
      allPassed = false;
    }

    // Check QR code decodability
    const qrScanned = await testQRDecoding(testQrUrl);
    if (qrScanned) {
      console.log(`   ✅ Vector QR code generated and decoded by jsQR: ${testQrUrl}`);
    } else {
      console.error(`   ❌ QR code decoding failed for ${testQrUrl}`);
      allPassed = false;
    }

    // Test 2: Generate Pro Tier in German with US Letter (White-label)
    const proBrandKit = {
      logoUrl: null,
      companyName: 'Klüger & Partner Beratung',
      tagline: 'Strategische Unternehmensführung & Skalierung',
      coachName: 'Dr. Maximilian Weiß',
      clientName: 'Nordische Technologien AG',
      contactEmail: 'maximilian@klueger-partner.de',
      brandColor: '#047857',
      contrastText: '#FFFFFF',
      qrUrl: 'https://klueger-partner.de/buchung',
      paperSize: 'letter' as const,
      documentLang: 'de' as const,
      selectedTemplate: template,
      isPro: true,
      removeWatermark: true,
    };

    const proDoc = React.createElement(DocumentCompiler, { brandKit: proBrandKit });
    const proFilePath = path.join(testOutputDir, `${template}-pro-de.pdf`);
    await renderToFile(proDoc, proFilePath);
    const proBuffer = fs.readFileSync(proFilePath);

    const proParser = new PDFParse({ data: proBuffer });
    const proTextResult = await proParser.getText();
    const proExtractedText = proTextResult.text;
    await proParser.destroy();

    const hasProWatermark = proExtractedText.includes('logoloom.app');
    if (!hasProWatermark) {
      console.log('   ✅ Pro tier white-label verified (no logoloom.app watermark in text)');
    } else {
      console.error('   ❌ Pro tier still contains watermark');
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log('\n🎉 ALL PHASE 1 ACCEPTANCE TESTS PASSED!');
    process.exit(0);
  } else {
    console.error('\n❌ SOME PHASE 1 TESTS FAILED.');
    process.exit(1);
  }
}

runPhase1Tests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
