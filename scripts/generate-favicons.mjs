import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const appDir = path.join(rootDir, 'app');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="loom-grad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#loom-grad)" />
  <g fill="none" stroke="#FFFFFF" stroke-width="36" stroke-linecap="round" stroke-linejoin="round">
    <path d="M256 96L80 184l176 88 176-88-176-88z" />
    <path d="M80 328l176 88 176-88" />
    <path d="M80 256l176 88 176-88" />
  </g>
</svg>`;

async function main() {
  console.log('🎨 Generating Favicon, Apple Touch Icon, and SVGs...');

  // 1. Write public/icon.svg and app/icon.svg
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent);
  console.log('✅ Created public/icon.svg & app/icon.svg');

  // 2. Launch headless chromium with Playwright to render high-res PNGs
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // HTML page rendering the SVG at crisp resolutions
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; }
          svg { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;
  await page.setContent(html);

  // 3. Apple Touch Icon: 180x180 PNG
  await page.setViewportSize({ width: 180, height: 180 });
  const appleIconBuffer = await page.screenshot({ omitBackground: true });
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIconBuffer);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIconBuffer);
  console.log('✅ Created public/apple-touch-icon.png & app/apple-icon.png (180x180)');

  // 4. Favicon 32x32 PNG and favicon.ico
  await page.setViewportSize({ width: 32, height: 32 });
  const fav32Buffer = await page.screenshot({ omitBackground: true });
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), fav32Buffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fav32Buffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), fav32Buffer);
  console.log('✅ Created public/favicon.ico & app/favicon.ico (32x32)');

  // 5. 192x192 & 512x512 icons for PWA / WebApp
  await page.setViewportSize({ width: 192, height: 192 });
  const icon192 = await page.screenshot({ omitBackground: true });
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);

  await page.setViewportSize({ width: 512, height: 512 });
  const icon512 = await page.screenshot({ omitBackground: true });
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);
  console.log('✅ Created public/icon-192.png & public/icon-512.png');

  await browser.close();
  console.log('🎉 All icons generated successfully!');
}

main().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
