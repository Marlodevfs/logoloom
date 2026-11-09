/**
 * Test-runner shim: @react-pdf/hyphenate (pulled in by @react-pdf/renderer >= 4.8)
 * only exposes an "import" export condition. The tsx test scripts run in CommonJS
 * mode, so Node cannot resolve `@react-pdf/hyphenate/<lang>` and every PDF test
 * crashed with ERR_PACKAGE_PATH_NOT_EXPORTED. This maps those subpaths to the
 * real files. Not used by the Next.js app (webpack resolves the ESM build itself).
 */
const Module = require('module');
const path = require('path');
const fs = require('fs');

const PKG = '@react-pdf/hyphenate';
const originalResolve = Module._resolveFilename;

Module._resolveFilename = function (request, parent, ...rest) {
  if (typeof request === 'string' && (request === PKG || request.startsWith(PKG + '/'))) {
    const searchPaths = Module._nodeModulePaths(parent && parent.filename ? path.dirname(parent.filename) : process.cwd());
    const pkgDir = searchPaths.map((p) => path.join(p, PKG)).find((p) => fs.existsSync(path.join(p, 'package.json')));
    if (pkgDir) {
      const sub = request === PKG ? 'index' : request.slice(PKG.length + 1);
      return path.join(pkgDir, 'lib', sub.endsWith('.js') ? sub : sub + '.js');
    }
  }
  return originalResolve.call(this, request, parent, ...rest);
};
