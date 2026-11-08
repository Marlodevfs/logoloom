import QRCode from 'qrcode';
import jsQR from 'jsqr';

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
  for (let i = 0; i < rgba.length; i += 4) {
    rgba[i] = 255;
    rgba[i + 1] = 255;
    rgba[i + 2] = 255;
    rgba[i + 3] = 255;
  }

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
  return Boolean(code && code.data === rawUrl);
}

async function run() {
  console.log('📱 Testing QR Code Generation & Decoding Quality Gates...');

  const userUrls = [
    'https://calendly.com/elite-coaching/session',
    'https://apexstudio.io/portal',
    'https://klueger-partner.de/termin',
  ];

  for (const url of userUrls) {
    const ok = await testQRDecoding(url);
    if (!ok) {
      console.error(`❌ User QR failed to decode: ${url}`);
      process.exit(1);
    }
    console.log(`   ✅ User QR decoded perfectly with High Error Correction: ${url}`);
  }

  const badgeOk = await testQRDecoding('https://logoloom.app');
  if (!badgeOk) {
    console.error('❌ LogoLoom badge QR failed to decode');
    process.exit(1);
  }
  console.log('   ✅ LogoLoom Free Badge QR decoded: https://logoloom.app');
  console.log('🎉 ALL QR QUALITY GATES PASSED!');
}

run();
