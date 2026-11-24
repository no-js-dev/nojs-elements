/**
 * @jest-environment node
 */
// test-server.js (e2e and local verification server): TEST_HOST picks the
// interface it listens on; without it the server keeps listening on all of them.
const { spawn } = require('child_process');
const http = require('http');
const net = require('net');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const running = [];

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

function ipv6LoopbackAvailable() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.once('error', () => resolve(false));
    srv.listen(0, '::1', () => srv.close(() => resolve(true)));
  });
}

async function startServer(env) {
  const port = await freePort();
  const proc = spawn(process.execPath, ['test-server.js'], {
    cwd: ROOT,
    env: { ...process.env, TEST_HOST: '', ...env, TEST_PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  running.push(proc);
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('test-server.js did not start within 5s')), 5000);
    proc.stdout.on('data', (d) => {
      if (String(d).includes('Test Server')) { clearTimeout(timer); resolve(); }
    });
    proc.once('exit', (code) => { clearTimeout(timer); reject(new Error(`test-server.js exited with ${code}`)); });
  });
  return port;
}

function get(host, port) {
  return new Promise((resolve) => {
    const req = http.get({ host, port, path: '/package.json', timeout: 2000 }, (res) => {
      res.resume();
      resolve(res.statusCode);
    });
    req.on('error', (err) => resolve(err.code));
    req.on('timeout', () => { req.destroy(); resolve('TIMEOUT'); });
  });
}

afterEach(() => {
  running.splice(0).forEach((proc) => { if (proc.exitCode === null) proc.kill(); });
});

describe('test-server.js listen address', () => {
  test('TEST_HOST=127.0.0.1 serves on 127.0.0.1 and nowhere else', async () => {
    const port = await startServer({ TEST_HOST: '127.0.0.1' });
    expect(await get('127.0.0.1', port)).toBe(200);
    if (await ipv6LoopbackAvailable()) expect(await get('::1', port)).toBe('ECONNREFUSED');
  });

  test('without TEST_HOST it listens on every interface, as before', async () => {
    const port = await startServer({});
    expect(await get('127.0.0.1', port)).toBe(200);
    if (await ipv6LoopbackAvailable()) expect(await get('::1', port)).toBe(200);
  });
});
