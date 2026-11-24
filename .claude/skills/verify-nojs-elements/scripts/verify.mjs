#!/usr/bin/env node
// verify-nojs-elements harness: launch / doctor / drive / stop for the NoJS-Elements test server.
// Usage: node .claude/skills/verify-nojs-elements/scripts/verify.mjs <launch|doctor|drive|stop> [options]
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const VERIFY_DIR = path.join(ROOT, '.verify');
const EVIDENCE_DIR = path.join(VERIFY_DIR, 'evidence');
const HOST = '127.0.0.1';
const DEFAULT_PORT = 4321;
const STEP_TIMEOUT = Number(process.env.VERIFY_STEP_TIMEOUT || 5000);
const BLOCKED_HOSTS = ['googletagmanager.com', 'google-analytics.com'];
const ELEMENTS_BUILD = path.join(ROOT, 'dist/iife/nojs-elements.js');
const DEFAULT_CORE = path.resolve(ROOT, '../NoJS/dist/iife/no.js');

function parseArgs(argv) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { opts._.push(a); continue; }
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) opts[key] = true;
    else { opts[key] = next; i++; }
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
const command = opts._[0];
const port = Number(opts.port || process.env.VERIFY_PORT || DEFAULT_PORT);
const base = `http://${HOST}:${port}`;
const runDir = path.join(VERIFY_DIR, 'run', String(port));
const pidFile = path.join(runDir, 'server.pid');
const logFile = path.join(runDir, 'server.log');
const metaFile = path.join(runDir, 'meta.json');

const pkgVersion = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version;

function gitSha(dir = ROOT) {
  try { return execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return 'unknown'; }
}

function readPid() {
  try { return Number(fs.readFileSync(pidFile, 'utf8').trim()) || null; } catch { return null; }
}

function readMeta() {
  try { return JSON.parse(fs.readFileSync(metaFile, 'utf8')); } catch { return null; }
}

function isAlive(pid) {
  if (!pid) return false;
  try { process.kill(pid, 0); return true; } catch { return false; }
}

function listenerPids(p) {
  const r = spawnSync('lsof', ['-nP', `-iTCP:${p}`, '-sTCP:LISTEN', '-t'], { encoding: 'utf8' });
  return [...new Set(r.stdout.split('\n').map((s) => Number(s.trim())).filter(Boolean))];
}

function processCommand(pid) {
  return spawnSync('ps', ['-o', 'command=', '-p', String(pid)], { encoding: 'utf8' }).stdout.trim();
}

function processCwd(pid) {
  const r = spawnSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' });
  const line = r.stdout.split('\n').find((l) => l.startsWith('n'));
  return line ? line.slice(1) : '';
}

function isOurServer(pid) {
  return isAlive(pid) && processCommand(pid).includes('test-server.js') && fs.realpathSync(processCwd(pid) || '/') === fs.realpathSync(ROOT);
}

function portFree(p) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.once('error', () => resolve(false));
    srv.once('listening', () => srv.close(() => resolve(true)));
    srv.listen(p);
  });
}

async function httpGet(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return { status: res.status, body: await res.text() };
  } catch (err) {
    return { status: 0, body: String(err) };
  }
}

function newestMtime(dir) {
  let newest = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    newest = Math.max(newest, entry.isDirectory() ? newestMtime(p) : fs.statSync(p).mtimeMs);
  }
  return newest;
}

function distIsStale() {
  return newestMtime(path.join(ROOT, 'src')) > fs.statSync(ELEMENTS_BUILD).mtimeMs;
}

function coreVersion(file) {
  try { return (fs.readFileSync(file, 'utf8').match(/version:"([^"]+)"/) || [])[1] || null; } catch { return null; }
}

function stamp() {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '-');
}

// ── launch ──
async function launch() {
  const existing = readPid();
  if (isAlive(existing)) {
    console.error(`REFUSE: a verify server is already recorded on port ${port} (pid ${existing}). Run doctor or stop first.`);
    process.exit(1);
  }
  if (!(await portFree(port))) {
    console.error(`REFUSE: port ${port} is in use by pid(s) ${listenerPids(port).join(', ') || 'unknown'} that this run did not start. Pick another port with --port 43xx.`);
    process.exit(1);
  }
  const core = path.resolve(opts.core && opts.core !== true ? opts.core : DEFAULT_CORE);
  if (!coreVersion(core)) {
    console.error(`FAIL: no NoJS core build at ${core}. Pass --core <path to a built no.js> (for example a core worktree's dist/iife/no.js).`);
    process.exit(1);
  }
  if (opts.build) {
    console.log('BUILD node build.js (rewrites tracked dist/ files)');
    const b = spawnSync(process.execPath, ['build.js'], { cwd: ROOT, stdio: 'inherit' });
    if (b.status !== 0) { console.error('FAIL: node build.js exited ' + b.status); process.exit(1); }
  }
  fs.mkdirSync(runDir, { recursive: true });
  const logFd = fs.openSync(logFile, 'a');
  const child = spawn(process.execPath, ['test-server.js'], {
    cwd: ROOT,
    env: { ...process.env, TEST_PORT: String(port) },
    detached: true,
    stdio: ['ignore', logFd, logFd],
  });
  child.unref();
  fs.writeFileSync(pidFile, String(child.pid));
  const meta = { port, pid: child.pid, base, root: ROOT, gitSha: gitSha(), version: pkgVersion, core, coreVersion: coreVersion(core), coreGitSha: gitSha(path.dirname(core)), startedAt: new Date().toISOString() };
  fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));

  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (!isAlive(child.pid)) break;
    const lib = await httpGet(`${base}/dist/iife/nojs-elements.js`);
    const page = await httpGet(`${base}/docs/examples/modal/`);
    if (lib.status === 200 && lib.body.includes(`NoJS Elements v${pkgVersion}`) && page.status === 200) {
      console.log(`READY ${base} pid=${child.pid} elements=${pkgVersion} sha=${meta.gitSha} core=${meta.coreVersion} (${core}) log=${path.relative(ROOT, logFile)}`);
      if (meta.coreVersion !== pkgVersion) console.log(`WARN core build is ${meta.coreVersion}, Elements is ${pkgVersion}: pass --core <matching no.js> unless you mean to test the mismatch`);
      if (distIsStale()) console.log('WARN dist/iife/nojs-elements.js is older than src/: relaunch with --build to verify source changes');
      return;
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  console.error(`FAIL: server not ready within 15s. Log: ${logFile}`);
  console.error(fs.existsSync(logFile) ? fs.readFileSync(logFile, 'utf8').slice(-2000) : '(no log)');
  process.exit(1);
}

// ── doctor ──
async function doctor() {
  let failed = false;
  const report = (status, msg) => { if (status === 'FAIL') failed = true; console.log(`${status} ${msg}`); };
  const pid = readPid();
  const meta = readMeta();
  if (!pid) report('FAIL', `no verify server recorded for port ${port} (${path.relative(ROOT, pidFile)} missing): run launch`);
  else if (!isAlive(pid)) report('FAIL', `recorded pid ${pid} is not running: run stop, then launch`);
  else report('OK', `pid ${pid} alive`);
  const listeners = listenerPids(port);
  if (pid && listeners.includes(pid) && isOurServer(pid)) report('OK', `port ${port} owned by pid ${pid} (test-server.js in ${ROOT})`);
  else report('FAIL', `port ${port} listeners [${listeners.join(', ') || 'none'}] are not this worktree's test-server.js (pid ${pid ?? 'none'})`);
  const lib = await httpGet(`${base}/dist/iife/nojs-elements.js`);
  const served = (lib.body.match(/NoJS Elements v(\S+)/) || [])[1];
  if (lib.status === 200 && served === pkgVersion) report('OK', `/dist/iife/nojs-elements.js serves Elements ${served} (package.json ${pkgVersion})`);
  else report('FAIL', `/dist/iife/nojs-elements.js status ${lib.status}, served version ${served ?? 'none'}, expected ${pkgVersion}`);
  if (distIsStale()) report('WARN', 'dist/iife/nojs-elements.js is older than src/: stop, then launch --build');
  else report('OK', 'dist/iife/nojs-elements.js is newer than every file in src/');
  if (meta) {
    const v = coreVersion(meta.core);
    if (!v) report('FAIL', `core build ${meta.core} is missing or unreadable`);
    else if (v !== pkgVersion) report('WARN', `core build ${meta.core} is NoJS ${v}, Elements is ${pkgVersion}`);
    else report('OK', `core build ${meta.core} is NoJS ${v} (git ${gitSha(path.dirname(meta.core))})`);
  }
  try {
    const { chromium } = await import('@playwright/test');
    if (fs.existsSync(chromium.executablePath())) report('OK', 'Playwright chromium installed');
    else report('FAIL', 'Playwright chromium missing: run npx playwright install chromium');
  } catch (err) {
    report('FAIL', `@playwright/test not importable (${err.message}): run npm ci`);
  }
  process.exit(failed ? 1 : 0);
}

// ── stop ──
function stop() {
  const pid = readPid();
  if (!pid) { console.log(`NOTHING no verify server recorded for port ${port}`); return; }
  if (isAlive(pid)) {
    if (!isOurServer(pid)) {
      console.error(`REFUSE: pid ${pid} is no longer this worktree's test-server.js; not killing it. Remove ${runDir} by hand after checking.`);
      process.exit(1);
    }
    process.kill(pid, 'SIGTERM');
  }
  const deadline = Date.now() + 5000;
  while (isAlive(pid) && Date.now() < deadline) spawnSync('sleep', ['0.1']);
  if (isAlive(pid)) process.kill(pid, 'SIGKILL');
  if (fs.existsSync(logFile)) {
    const keep = path.join(EVIDENCE_DIR, '_server-logs');
    fs.mkdirSync(keep, { recursive: true });
    fs.copyFileSync(logFile, path.join(keep, `port${port}-${stamp()}.log`));
  }
  fs.rmSync(runDir, { recursive: true, force: true });
  console.log(`STOPPED pid ${pid} on port ${port}; run state removed, evidence kept in ${path.relative(ROOT, EVIDENCE_DIR)}/`);
}

// ── drive ──
async function drive() {
  if (!opts.journey) { console.error('usage: verify.mjs drive --journey <file.json> [--port N] [--headed]'); process.exit(2); }
  const meta = readMeta();
  if (!meta) { console.error(`FAIL: no verify server recorded for port ${port}: run launch first`); process.exit(1); }
  const journeyPath = path.resolve(opts.journey);
  const journey = JSON.parse(fs.readFileSync(journeyPath, 'utf8'));
  const steps = Array.isArray(journey) ? journey : journey.steps;
  const name = opts.name || journey.name || path.basename(journeyPath, '.json');
  const outDir = path.join(EVIDENCE_DIR, `${stamp()}-${name}`);
  fs.mkdirSync(outDir, { recursive: true });

  const { chromium } = await import('@playwright/test');
  const browser = await chromium.launch({ headless: !opts.headed });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'en-US' });
  const page = await context.newPage();
  const log = (file, line) => fs.appendFileSync(path.join(outDir, file), line + '\n');
  const requests = [];
  const pageErrors = [];
  let blocked = 0;

  const serveFile = (file) => (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(file) });
  await context.route((url) => BLOCKED_HOSTS.some((h) => url.hostname.endsWith(h)), (route) => { blocked++; route.abort(); });
  await context.route((url) => url.pathname.endsWith('/NoJS/dist/iife/no.js') || url.hostname === 'cdn.no-js.dev', serveFile(meta.core));
  await context.route((url) => url.hostname === 'cdn-elements.no-js.dev', serveFile(ELEMENTS_BUILD));
  page.on('console', (m) => log('console.log', `[${m.type()}] ${m.text()}`));
  page.on('pageerror', (e) => { pageErrors.push(e.message); log('console.log', `[pageerror] ${e.message}`); });
  page.on('requestfinished', async (req) => {
    const res = await req.response();
    const entry = { method: req.method(), url: req.url(), status: res ? res.status() : null, postData: req.postData() };
    requests.push(entry);
    log('network.jsonl', JSON.stringify(entry));
  });
  page.on('requestfailed', (req) => {
    const entry = { method: req.method(), url: req.url(), status: null, failure: req.failure()?.errorText, postData: req.postData() };
    requests.push(entry);
    log('network.jsonl', JSON.stringify(entry));
  });

  const norm = (s) => (s ?? '').replace(/\s+/g, ' ').trim();
  const poll = async (desc, fn) => {
    const deadline = Date.now() + STEP_TIMEOUT;
    let last;
    while (Date.now() < deadline) {
      try { last = await fn(); if (last === true) return; } catch (err) { last = err.message.split('\n')[0]; }
      await page.waitForTimeout(100);
    }
    throw new Error(`${desc} not met within ${STEP_TIMEOUT}ms (last: ${JSON.stringify(last)})`);
  };
  const globToRegExp = (glob) => new RegExp('^' + glob.split('**').map((part) => part.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*')).join('.*') + '$');

  const actions = {
    mock: async (glob, status, body, o = {}) => {
      await page.route(glob, async (route) => {
        if (o.method && route.request().method() !== o.method) return route.fallback();
        if (o.delay) await new Promise((r) => setTimeout(r, o.delay));
        const isText = typeof body === 'string';
        await route.fulfill({ status, contentType: o.contentType || (isText ? 'text/html' : 'application/json'), body: isText ? body : JSON.stringify(body) });
      });
    },
    goto: async (p) => { await page.goto(new URL(p, base).href, { waitUntil: 'load' }); },
    click: async (sel, o = {}) => { await page.locator(sel).click({ timeout: STEP_TIMEOUT, force: !!o.force, position: o.position }); },
    fill: async (sel, value) => { await page.locator(sel).fill(String(value), { timeout: STEP_TIMEOUT }); },
    press: async (sel, key) => { await page.locator(sel).press(key, { timeout: STEP_TIMEOUT }); },
    key: async (key) => { await page.keyboard.press(key); },
    focus: async (sel) => { await page.locator(sel).focus({ timeout: STEP_TIMEOUT }); },
    select: async (sel, value) => { await page.locator(sel).selectOption(String(value), { timeout: STEP_TIMEOUT }); },
    check: async (sel) => { await page.locator(sel).check({ timeout: STEP_TIMEOUT }); },
    hover: async (sel) => { await page.locator(sel).hover({ timeout: STEP_TIMEOUT }); },
    drag: async (src, dst) => { await page.locator(src).dragTo(page.locator(dst), { timeout: STEP_TIMEOUT }); },
    reload: async () => { await page.reload({ waitUntil: 'load' }); },
    back: async () => { await page.goBack({ waitUntil: 'load' }); },
    'wait-for': async (sel) => { await page.locator(sel).waitFor({ state: 'visible', timeout: STEP_TIMEOUT }); },
    'expect-text': (sel, text) => poll(`text of ${sel} == ${JSON.stringify(text)}`, async () => {
      const t = norm(await page.locator(sel).textContent({ timeout: 500 }));
      return t === String(text) || t;
    }),
    'expect-contains': (sel, text) => poll(`text of ${sel} contains ${JSON.stringify(text)}`, async () => {
      const t = norm(await page.locator(sel).textContent({ timeout: 500 }));
      return t.includes(String(text)) || t;
    }),
    'expect-visible': (sel) => poll(`${sel} visible`, async () => (await page.locator(sel).isVisible()) || 'not visible'),
    'expect-hidden': (sel) => poll(`${sel} hidden or absent`, async () => (await page.locator(sel).isHidden()) || 'visible'),
    'expect-count': (sel, n) => poll(`count of ${sel} == ${n}`, async () => { const c = await page.locator(sel).count(); return c === Number(n) || c; }),
    'expect-url': (sub) => poll(`url contains ${JSON.stringify(sub)}`, async () => page.url().includes(sub) || page.url()),
    'expect-value': (sel, value) => poll(`value of ${sel} == ${JSON.stringify(value)}`, async () => { const v = await page.locator(sel).inputValue({ timeout: 500 }); return v === String(value) || v; }),
    'expect-attr': (sel, attr, value) => poll(`${sel}[${attr}] == ${JSON.stringify(value)}`, async () => { const v = await page.locator(sel).getAttribute(attr, { timeout: 500 }); return v === value || v; }),
    'expect-class': (sel, cls, present = true) => poll(`${sel} ${present ? 'has' : 'lacks'} class ${cls}`, async () => { const c = (await page.locator(sel).getAttribute('class', { timeout: 500 })) || ''; return c.split(/\s+/).includes(cls) === present || c; }),
    'expect-focused': (sel) => poll(`${sel} focused`, async () => (await page.locator(sel).evaluate((el) => el === document.activeElement, null, { timeout: 500 })) || 'not focused'),
    'expect-enabled': (sel) => poll(`${sel} enabled`, async () => (await page.locator(sel).isEnabled({ timeout: 500 })) || 'disabled'),
    'expect-disabled': (sel) => poll(`${sel} disabled`, async () => (await page.locator(sel).isDisabled({ timeout: 500 })) || 'enabled'),
    'expect-request': (method, glob, bodyIncludes) => poll(`${method} ${glob}${bodyIncludes ? ` with body containing ${JSON.stringify(bodyIncludes)}` : ''} sent`, async () => {
      const re = globToRegExp(glob);
      const hit = requests.find((r) => r.method === method && re.test(r.url) && (!bodyIncludes || (r.postData || '').includes(bodyIncludes)));
      return hit ? true : `${requests.length} requests seen`;
    }),
    screenshot: async (file) => { await page.screenshot({ path: path.join(outDir, `${file}.png`) }); },
    aria: async (file, sel = 'body') => { fs.writeFileSync(path.join(outDir, `${file}.aria.yml`), await page.locator(sel).ariaSnapshot({ timeout: STEP_TIMEOUT })); },
  };

  const result = { name, journey: path.relative(ROOT, journeyPath), base, gitSha: gitSha(), elementsVersion: pkgVersion, core: meta.core, coreVersion: coreVersion(meta.core), startedAt: new Date().toISOString(), passed: false, steps: steps.length, failedStep: null };
  let failure = null;
  for (let i = 0; i < steps.length; i++) {
    const [verb, ...args] = steps[i];
    const label = `#${i + 1} ${verb} ${args.map((a) => JSON.stringify(a)).join(' ')}`;
    const fn = actions[verb];
    const t0 = Date.now();
    try {
      if (!fn) throw new Error(`unknown step verb "${verb}"`);
      await fn(...args);
      log('steps.log', `PASS ${label} (${Date.now() - t0}ms)`);
      console.log(`PASS ${label}`);
    } catch (err) {
      failure = { index: i + 1, step: steps[i], error: err.message.split('\n')[0] };
      log('steps.log', `FAIL ${label}: ${failure.error}`);
      console.log(`FAIL ${label}: ${failure.error}`);
      await page.screenshot({ path: path.join(outDir, 'failure.png') }).catch(() => {});
      await page.locator('body').ariaSnapshot().then((a) => fs.writeFileSync(path.join(outDir, 'failure.aria.yml'), a)).catch(() => {});
      break;
    }
  }
  if (!failure && pageErrors.length && !journey.allowPageErrors) failure = { index: null, step: null, error: `${pageErrors.length} uncaught page error(s): ${pageErrors[0]}` };
  result.loadedCoreVersion = await page.evaluate(() => window.NoJS?.version ?? null).catch(() => null);
  result.passed = !failure;
  result.failedStep = failure;
  result.pageErrors = pageErrors;
  result.blockedAnalyticsRequests = blocked;
  result.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(outDir, 'result.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log(`${result.passed ? 'PASSED' : 'FAILED'} ${name}: evidence in ${path.relative(ROOT, outDir)}/`);
  process.exit(result.passed ? 0 : 1);
}

const commands = { launch, doctor, drive, stop };
if (!commands[command]) {
  console.error('usage: node .claude/skills/verify-nojs-elements/scripts/verify.mjs <launch|doctor|drive|stop> [--port 4321] [--core <no.js>] [--build] [--journey file.json] [--headed]');
  process.exit(2);
}
await commands[command]();
