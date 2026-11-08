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
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308) {
          resolve(true);
        } else {
          setTimeout(check, 500);
        }
      });
      req.on('error', (err) => {
        if (Date.now() - start > timeout) {
          reject(new Error(`Server start timed out, last error: ${err.message} (${err.code})`));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

async function run() {
  console.log('🚀 Starting Next.js production server on 127.0.0.1:3022...');
  const server = spawn(process.execPath, ['./node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', '3022'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    detached: false,
  });

  try {
    await waitForServer('http://127.0.0.1:3022/de');
    console.log('✅ Server ready at http://127.0.0.1:3022/de');

    const browser = await chromium.launch();

    // Desktop Viewport (1440x900)
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://127.0.0.1:3022/de', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1500);

    const desktopPath = path.join(artifactDir, 'german-verification-desktop.png');
    await desktopPage.screenshot({ path: desktopPath });
    console.log(`📸 Saved German Desktop screenshot: ${desktopPath}`);

    await browser.close();
  } finally {
    server.kill();
    // On Windows, also kill child processes if any
    try {
      spawn('taskkill', ['/pid', String(server.pid), '/f', '/t']);
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
