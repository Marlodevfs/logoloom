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

function checkPort(port = 3000, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const req = http.get(`http://${host}:${port}/`, (res) => resolve(true));
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
    const isUp = await checkPort(port, '127.0.0.1');
    if (isUp) return true;
    await new Promise((r) => setTimeout(r, 600));
  }
  throw new Error(`Server at port ${port} not ready`);
}

async function run() {
  console.log('Starting Next.js for Phase 3 Pro verification...');
  const nextBin = path.join(rootDir, 'node_modules', 'next', 'dist', 'bin', 'next');
  const server = spawn('node', [nextBin, 'start', '-p', '3000', '-H', '127.0.0.1'], {
    cwd: rootDir,
    stdio: 'pipe',
  });

  try {
    await waitForServer(3000);
    console.log('Server online. Launching Playwright browser...');

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    // 1. Visit /pricing page
    console.log('Testing /pricing page...');
    await page.goto('http://127.0.0.1:3000/pricing', { waitUntil: 'networkidle' });

    const shotPricingPage = path.join(publicScreenshots, 'phase3-pricing-page.png');
    const artifactPricingPage = path.join(artifactDir, 'phase3-pricing-page.png');
    await page.screenshot({ path: shotPricingPage });
    fs.copyFileSync(shotPricingPage, artifactPricingPage);

    // 2. Click "Upgrade to Pro White-Label"
    console.log('Testing Checkout flow...');
    await page.click('text=Upgrade to Pro White-Label');

    // Wait for simulated checkout return with ?pro=true
    await page.waitForURL('**/?**pro=**', { timeout: 10000 });
    console.log('Redirected to studio with Pro active!');
    await page.waitForTimeout(1000);

    // 3. Take screenshot of Studio in White-Label Pro mode
    const shotProStudio = path.join(publicScreenshots, 'phase3-pro-whitelabel.png');
    const artifactProStudio = path.join(artifactDir, 'phase3-pro-whitelabel.png');
    await page.screenshot({ path: shotProStudio });
    fs.copyFileSync(shotProStudio, artifactProStudio);

    console.log('PHASE 3 TESTS COMPLETE!');
    await browser.close();
  } finally {
    server.kill();
  }
}

run().catch((err) => {
  console.error('Phase 3 test failed:', err);
  process.exit(1);
});
