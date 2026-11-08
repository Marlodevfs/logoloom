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
        if (res.statusCode === 200) {
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

    console.log('🌐 Launching headless browser...');
    const browser = await chromium.launch();

    // 1. Desktop Test
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:3009', { waitUntil: 'networkidle' });
    
    // Wait for the preview to be visible
    await desktopPage.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    const desktopPath = path.join(artifactDir, 'phase1-vector-desktop.png');
    await desktopPage.screenshot({ path: desktopPath, fullPage: false });
    console.log(`📸 Saved desktop screenshot to ${desktopPath}`);

    // 2. Mobile Viewport Test (iPhone 14 style)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3009', { waitUntil: 'networkidle' });
    await mobilePage.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    const mobilePath = path.join(artifactDir, 'phase1-vector-mobile.png');
    await mobilePage.screenshot({ path: mobilePath, fullPage: false });
    console.log(`📸 Saved mobile screenshot to ${mobilePath}`);

    await browser.close();
    console.log('🎉 Browser verification finished successfully!');
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
