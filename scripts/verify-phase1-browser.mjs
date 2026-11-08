import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const artifactDir = 'C:\\Users\\mikes\\.gemini\\antigravity\\brain\\3725711a-d219-4c19-8a0a-28d7ff5a956b';

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308) {
          resolve(true);
        } else {
          setTimeout(check, 500);
        }
      }).on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Server start timed out'));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

async function run() {
  console.log('🚀 Starting Next.js production server on port 3009...');
  const server = spawn('cmd.exe', ['/c', 'npx.cmd', 'next', 'start', '-p', '3009'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    detached: false,
  });

  try {
    await waitForServer('http://localhost:3009');
    console.log('✅ Server is ready at http://localhost:3009');

    console.log('🌐 Launching headless browser for verification...');
    const browser = await chromium.launch();

    // 1. Desktop English Route
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:3009/en', { waitUntil: 'networkidle' });
    await desktopPage.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    const desktopEnPath = path.join(artifactDir, 'phase-final-desktop-en.png');
    await desktopPage.screenshot({ path: desktopEnPath });
    console.log(`📸 Saved desktop EN screenshot to ${desktopEnPath}`);

    // 2. Desktop French Route
    const desktopFrPage = await desktopContext.newPage();
    await desktopFrPage.goto('http://localhost:3009/fr', { waitUntil: 'networkidle' });
    await desktopFrPage.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    const desktopFrPath = path.join(artifactDir, 'phase-final-desktop-fr.png');
    await desktopFrPage.screenshot({ path: desktopFrPath });
    console.log(`📸 Saved desktop FR screenshot to ${desktopFrPath}`);

    // 3. Mobile Viewport Test (iPhone 14 style: 390x844)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3009/en', { waitUntil: 'networkidle' });
    await mobilePage.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    const mobilePath = path.join(artifactDir, 'phase-final-mobile.png');
    await mobilePage.screenshot({ path: mobilePath });
    console.log(`📸 Saved mobile screenshot to ${mobilePath}`);

    // 4. Pricing Page
    const pricingPage = await desktopContext.newPage();
    await pricingPage.goto('http://localhost:3009/pricing', { waitUntil: 'networkidle' });
    const pricingPath = path.join(artifactDir, 'phase-final-pricing.png');
    await pricingPage.screenshot({ path: pricingPath });
    console.log(`📸 Saved pricing screenshot to ${pricingPath}`);

    await browser.close();
    console.log('🎉 Full browser verification finished successfully!');
  } finally {
    server.kill('SIGTERM');
    try {
      process.kill(-server.pid);
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('Browser test failed:', err);
  process.exit(1);
});
