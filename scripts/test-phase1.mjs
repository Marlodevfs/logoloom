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
    req.on('error', () => {
      resolve(false);
    });
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
  throw new Error(`Server at port ${port} did not become ready within ${timeoutMs}ms`);
}

async function run() {
  console.log('Starting Next.js on 127.0.0.1:3000...');
  const nextBin = path.join(rootDir, 'node_modules', 'next', 'dist', 'bin', 'next');
  const server = spawn('node', [nextBin, 'start', '-p', '3000', '-H', '127.0.0.1'], {
    cwd: rootDir,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log(`[Next.js] ${d.toString().trim()}`));
  server.stderr.on('data', (d) => console.error(`[Next.js Error] ${d.toString().trim()}`));

  try {
    await waitForServer(3000);
    console.log('Server is ready! Launching Playwright browser...');

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // 1. Desktop Test (1440x900)
    console.log('Testing Desktop Viewport (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });

    // Wait for target
    await desktopPage.waitForSelector('#logoloom-pdf-target');
    console.log('Target found! Taking desktop habit tracker screenshot...');

    const desktopShot1 = path.join(publicScreenshots, 'phase1-desktop-habit.png');
    const artifactShot1 = path.join(artifactDir, 'phase1-desktop-habit.png');
    await desktopPage.screenshot({ path: desktopShot1 });
    fs.copyFileSync(desktopShot1, artifactShot1);

    // Switch to 90-Day Roadmap
    console.log('Switching to 90-Day Roadmap...');
    await desktopPage.click('text=90-Day Roadmap');
    await desktopPage.waitForTimeout(600);
    const desktopShot2 = path.join(publicScreenshots, 'phase1-desktop-roadmap.png');
    const artifactShot2 = path.join(artifactDir, 'phase1-desktop-roadmap.png');
    await desktopPage.screenshot({ path: desktopShot2 });
    fs.copyFileSync(desktopShot2, artifactShot2);

    // Switch to Client Welcome Packet
    console.log('Switching to Client Welcome Packet...');
    await desktopPage.click('text=Client Welcome Packet');
    await desktopPage.waitForTimeout(600);
    const desktopShot3 = path.join(publicScreenshots, 'phase1-desktop-welcome.png');
    const artifactShot3 = path.join(artifactDir, 'phase1-desktop-welcome.png');
    await desktopPage.screenshot({ path: desktopShot3 });
    fs.copyFileSync(desktopShot3, artifactShot3);

    // 2. Mobile Viewport Test (390x844)
    console.log('Testing Mobile Viewport (390x844)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    await mobilePage.waitForSelector('#logoloom-pdf-target');

    const mobileShot1 = path.join(publicScreenshots, 'phase1-mobile-preview.png');
    const artifactShotMobile = path.join(artifactDir, 'phase1-mobile-preview.png');
    await mobilePage.screenshot({ path: mobileShot1 });
    fs.copyFileSync(mobileShot1, artifactShotMobile);

    // Open bottom sheet
    console.log('Opening mobile sheet...');
    await mobilePage.click('text=Customize Brand & Options');
    await mobilePage.waitForTimeout(600);
    const mobileShot2 = path.join(publicScreenshots, 'phase1-mobile-drawer.png');
    const artifactShotMobileDrawer = path.join(artifactDir, 'phase1-mobile-drawer.png');
    await mobilePage.screenshot({ path: mobileShot2 });
    fs.copyFileSync(mobileShot2, artifactShotMobileDrawer);

    console.log('ALL PHASE 1 TESTS PASSED!');
    await browser.close();
  } finally {
    console.log('Cleaning up server...');
    server.kill();
  }
}

run().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
