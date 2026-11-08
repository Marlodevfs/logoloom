import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const artifactDir = 'C:\\Users\\mikes\\.gemini\\antigravity\\brain\\3725711a-d219-4c19-8a0a-28d7ff5a956b';

const publicScreenshots = path.join(rootDir, 'public', 'screenshots');
if (!fs.existsSync(publicScreenshots)) {
  fs.mkdirSync(publicScreenshots, { recursive: true });
}

function checkPort(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const req = http.get(`http://${host}:${port}/`, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(port = 3000, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const isUp = (await checkPort(port, '127.0.0.1')) || (await checkPort(port, 'localhost'));
    if (isUp) return true;
    await new Promise((r) => setTimeout(r, 600));
  }
  throw new Error(`Server at port ${port} not ready`);
}

async function run() {
  console.log('Starting Next.js for Phase 2 verification...');
  const nextBin = path.join(rootDir, 'node_modules', 'next', 'dist', 'bin', 'next');
  const server = spawn('node', [nextBin, 'start', '-p', '3000', '-H', '127.0.0.1'], {
    cwd: rootDir,
    stdio: 'pipe',
  });

  try {
    await waitForServer(3000);
    console.log('Server online. Launching browser...');

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // 1. Desktop Test: Landing Page Sections
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });

    // Scroll down to landing page sections
    console.log('Capturing Landing Page sections...');
    await page.evaluate(() => window.scrollTo(0, 950));
    await page.waitForTimeout(600);

    const shotLanding = path.join(publicScreenshots, 'phase2-desktop-landing.png');
    const artifactLanding = path.join(artifactDir, 'phase2-desktop-landing.png');
    await page.screenshot({ path: shotLanding });
    fs.copyFileSync(shotLanding, artifactLanding);

    // Scroll to pricing & privacy
    await page.evaluate(() => window.scrollTo(0, 1900));
    await page.waitForTimeout(600);
    const shotPricing = path.join(publicScreenshots, 'phase2-desktop-pricing.png');
    const artifactPricing = path.join(artifactDir, 'phase2-desktop-pricing.png');
    await page.screenshot({ path: shotPricing });
    fs.copyFileSync(shotPricing, artifactPricing);

    // 2. Language Switch Test: German & Spanish
    console.log('Testing Multilingual Switcher...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    // Switch to German
    await page.selectOption('header select', 'de');
    await page.waitForTimeout(600);
    const shotGerman = path.join(publicScreenshots, 'phase2-desktop-german.png');
    const artifactGerman = path.join(artifactDir, 'phase2-desktop-german.png');
    await page.screenshot({ path: shotGerman });
    fs.copyFileSync(shotGerman, artifactGerman);

    console.log('PHASE 2 TESTS COMPLETE!');
    await browser.close();
  } finally {
    server.kill();
  }
}

run().catch((err) => {
  console.error('Phase 2 test failed:', err);
  process.exit(1);
});
