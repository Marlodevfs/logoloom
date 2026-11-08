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
  console.log('🚀 Starting Next.js production server on 127.0.0.1:3015...');
  const server = spawn('cmd.exe', ['/c', 'npx.cmd', 'next', 'start', '-H', '127.0.0.1', '-p', '3015'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'ignore',
    detached: false,
  });

  try {
    await waitForServer('http://127.0.0.1:3015/fr');
    console.log('✅ Server ready at http://127.0.0.1:3015/fr');

    const browser = await chromium.launch();

    // 1. Mobile Viewport (iPhone 14/15: 390x844) - Editor Tab (Default)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:3015/fr', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    const mobileEditorPath = path.join(artifactDir, 'mobile-view-editor.png');
    await mobilePage.screenshot({ path: mobileEditorPath });
    console.log(`📸 Saved Mobile Editor screenshot to ${mobileEditorPath}`);

    // 2. Mobile Viewport - Switch to Preview Tab
    const previewTabBtn = await mobilePage.getByRole('button', { name: '2. Aperçu du document' });
    if (previewTabBtn) {
      await previewTabBtn.click();
      await mobilePage.waitForTimeout(1000);
      const mobilePreviewPath = path.join(artifactDir, 'mobile-view-preview.png');
      await mobilePage.screenshot({ path: mobilePreviewPath });
      console.log(`📸 Saved Mobile Preview screenshot to ${mobilePreviewPath}`);
    }

    // 3. Desktop Viewport (1280x800) - Regression Check
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://127.0.0.1:3015/fr', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000);

    const desktopPath = path.join(artifactDir, 'desktop-view-check.png');
    await desktopPage.screenshot({ path: desktopPath });
    console.log(`📸 Saved Desktop screenshot to ${desktopPath}`);

    await browser.close();
    console.log('🎉 All mobile verification screenshots captured successfully!');
  } finally {
    server.kill('SIGTERM');
  }
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
