const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

const repoDir = __dirname;

async function initRepo() {
  await git.init({ fs, dir: repoDir, defaultBranch: 'main' });
  console.log('Initialized empty Git repository in ' + repoDir);
}

function shouldIgnore(filePath, ignorePatterns) {
  const rel = filePath.replace(/\\/g, '/');
  for (const pat of ignorePatterns) {
    if (pat && (rel === pat || rel.startsWith(pat + '/') || rel.includes('/' + pat + '/') || rel.endsWith(pat))) {
      return true;
    }
  }
  return false;
}

function getFiles(dir, baseDir = dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  const defaultIgnores = ['node_modules', '.next', '.git', '.env', '.env.local', 'dist', 'build'];
  
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    const rel = path.relative(baseDir, res).replace(/\\/g, '/');
    if (defaultIgnores.some(ig => rel === ig || rel.startsWith(ig + '/'))) {
      continue;
    }
    if (dirent.isDirectory()) {
      files.push(...getFiles(res, baseDir));
    } else {
      files.push(rel);
    }
  }
  return files;
}

async function commit(message, authorName = 'LogoLoom Bot', authorEmail = 'dev@logoloom.app') {
  const files = getFiles(repoDir);
  for (const filepath of files) {
    await git.add({ fs, dir: repoDir, filepath });
  }
  const sha = await git.commit({
    fs,
    dir: repoDir,
    message,
    author: {
      name: authorName,
      email: authorEmail,
      timestamp: Math.floor(Date.now() / 1000),
      timezoneOffset: 0
    }
  });
  console.log(`[main ${sha.slice(0, 7)}] ${message}`);
  return sha;
}

async function status() {
  const files = getFiles(repoDir);
  console.log(`Tracking ${files.length} non-ignored project files.`);
}

async function log() {
  try {
    const commits = await git.log({ fs, dir: repoDir, depth: 5 });
    for (const c of commits) {
      console.log(`${c.oid.slice(0, 7)} - ${c.commit.message} (${c.commit.author.name})`);
    }
  } catch (err) {
    console.log('No commits yet.');
  }
}

const cmd = process.argv[2];
const arg = process.argv[3];

(async () => {
  try {
    if (cmd === 'init') {
      await initRepo();
    } else if (cmd === 'commit') {
      await commit(arg || 'Update project files');
    } else if (cmd === 'status') {
      await status();
    } else if (cmd === 'log') {
      await log();
    } else {
      console.log('Usage: node git-helper.js [init|commit <msg>|status|log]');
    }
  } catch (err) {
    console.error('Git error:', err);
  }
})();
