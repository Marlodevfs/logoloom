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
  console.log('🚀 Starting Next.js server on 127.0.0.1:3010 for verification...');
  const server = spawn('cmd.exe', ['/c', 'npx.cmd', 'next', 'start', '-H', '127.0.0.1', '-p', '3010'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    detached: false,
  });

  try {
    await waitForServer('http://127.0.0.1:3010/fr');
    console.log('✅ Server ready at http://127.0.0.1:3010');

    const browser = await chromium.launch();

    // 1. Laptop Viewport (1280x800) - Exactly matching user screen width!
    const laptopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });
    const pageLaptop = await laptopContext.newPage();
    await pageLaptop.goto('http://127.0.0.1:3010/fr', { waitUntil: 'networkidle' });
    await pageLaptop.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    await pageLaptop.waitForTimeout(1000);

    const laptopPath = path.join(artifactDir, 'template-a-redesign-fr.png');
    await pageLaptop.screenshot({ path: laptopPath });
    console.log(`📸 Saved Laptop (1280x800) screenshot to ${laptopPath}`);

    // Capture the document target on laptop
    const templateElement = await pageLaptop.$('#logoloom-pdf-target');
    if (templateElement) {
      const targetOnlyPath = path.join(artifactDir, 'template-a-document-only.png');
      await templateElement.screenshot({ path: targetOnlyPath });
      console.log(`📸 Saved Document Only screenshot to ${targetOnlyPath}`);
    }

    // 2. Large Desktop (1440x960)
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 960 },
      deviceScaleFactor: 2,
    });
    const pageDesktop = await desktopContext.newPage();
    await pageDesktop.goto('http://127.0.0.1:3010/fr', { waitUntil: 'networkidle' });
    await pageDesktop.waitForSelector('#logoloom-pdf-target', { timeout: 10000 });
    await pageDesktop.waitForTimeout(1000);

    const desktopPath = path.join(artifactDir, 'template-a-desktop-1440.png');
    await pageDesktop.screenshot({ path: desktopPath });
    console.log(`📸 Saved Desktop (1440x960) screenshot to ${desktopPath}`);

    // 3. Mobile View (390x844)
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
    console.log(`📸 Saved Mobile screenshot to ${mobilePath}`);

    await browser.close();
    console.log('🎉 All verification screenshots captured successfully!');
  } finally {
    server.kill('SIGTERM');
    try {
      process.kill(-server.pid);
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
