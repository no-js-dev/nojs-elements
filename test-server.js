const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.TEST_PORT, 10) || 3001;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.map':  'application/json',
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // Resolve file path relative to the repo root
  let filePath = path.join(ROOT, url);

  // Requests to ../../NoJS/ (sibling repo) — resolve relative to e2e/examples
  // The HTML loads ../../NoJS/dist/iife/no.js which resolves to the sibling NoJS repo
  // from the perspective of the HTML file. Serve it from the actual filesystem.
  if (url.includes('/NoJS/')) {
    // e.g. /NoJS/dist/iife/no.js → sibling repo at ../NoJS/dist/iife/no.js
    const nojsMatch = url.match(/\/NoJS\/(.*)/);
    if (nojsMatch) {
      filePath = path.join(ROOT, '..', 'NoJS', nojsMatch[1]);
    }
  }

  // Path traversal guard: resolved path must stay within parent workspace
  const workspace = path.resolve(ROOT, '..');
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(workspace)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(resolved, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    // Directory requests → serve index.html
    if (stats.isDirectory()) {
      const index = path.join(resolved, 'index.html');
      fs.stat(index, (e2, s2) => {
        if (e2 || !s2.isFile()) { res.writeHead(404); res.end('Not Found'); return; }
        serveFile(index, res);
      });
      return;
    }
    if (!stats.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    serveFile(resolved, res);
  });
});

server.listen(PORT, () => {
  console.log(`\n  NoJS-Elements Test Server — http://localhost:${PORT}`);
  console.log(`  Serving from: ${ROOT}\n`);
});
