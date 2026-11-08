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
  console.log('🚀 Starting Next.js server on 127.0.0.1:3010 for Template A verification...');
  const server = spawn('cmd.exe', ['/c', 'npx.cmd', 'next', 'start', '-H', '127.0.0.1', '-p', '3010'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    detached: false,
  });

  try {
    await waitForServer('http://127.0.0.1:3010/fr');
    console.log('✅ Server ready at http://127.0.0.1:3010');

    const browser = await chromium.launch();

    // 1. Desktop French Studio with Template A
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 960 },
      deviceScaleFactor: 2,
    });
    const pageFr = await desktopContext.newPage();
    await pageFr.goto('http://127.0.0.1:3010/fr', { waitUntil: 'networkidle' });
    await pageFr.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });

    // Ensure document lang is FR and habit-tracker is active
    await pageFr.waitForTimeout(1000);

    const desktopFrPath = path.join(artifactDir, 'template-a-redesign-fr.png');
    await pageFr.screenshot({ path: desktopFrPath });
    console.log(`📸 Saved Desktop FR screenshot to ${desktopFrPath}`);

    // Also take a focused screenshot of the #logoloom-pdf-target
    const templateElement = await pageFr.$('#logoloom-pdf-target');
    if (templateElement) {
      const targetOnlyPath = path.join(artifactDir, 'template-a-document-only.png');
      await templateElement.screenshot({ path: targetOnlyPath });
      console.log(`📸 Saved Document Only screenshot to ${targetOnlyPath}`);
    }

    // 2. Mobile View
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:3010/fr', { waitUntil: 'networkidle' });
    await mobilePage.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    await mobilePage.waitForTimeout(1000);

    const mobilePath = path.join(artifactDir, 'template-a-redesign-mobile.png');
    await mobilePage.screenshot({ path: mobilePath });
    console.log(`📸 Saved Mobile FR screenshot to ${mobilePath}`);

    await browser.close();
    console.log('🎉 Template A screenshots captured successfully!');
  } finally {
    server.kill('SIGTERM');
    try {
      process.kill(-server.pid);
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('Template A test failed:', err);
  process.exit(1);
});
