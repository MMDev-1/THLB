/**
 * Smoke-test the site's routes on a real server.
 *
 *   npm run build && npm run check:routes      production (next start)
 *   npm run check:routes -- --dev              development (next dev)
 *
 * Starts the server on a spare port, checks each route's HTTP status,
 * reports how long the server took to answer, then stops it.
 * For --dev, stop any other `npm run dev` for this project first:
 * Next.js allows one dev server per project folder.
 */
import { execSync, spawn } from 'node:child_process';
import process from 'node:process';

const dev = process.argv.includes('--dev');
const port = Number(process.env.CHECK_ROUTES_PORT ?? (dev ? 3459 : 3458));
const TIMEOUT_MS = 120_000;

/** Routes and the status each should return in this mode */
const EXPECTED = [
  { path: '/', status: 200 },
  /* Developer-only page: 404 on the live site */
  { path: '/dev/tokens', status: dev ? 200 : 404 },
];

/** Next.js prints this when another server already holds the project's lock */
const ALREADY_RUNNING = /already running/i;

const server = spawn('npm', ['run', dev ? 'dev' : 'start', '--', '-p', String(port)], {
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: process.platform !== 'win32',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
});

let serverLog = '';
let exitCode = null;
server.stdout.on('data', (chunk) => (serverLog += chunk));
server.stderr.on('data', (chunk) => (serverLog += chunk));
server.on('exit', (code) => (exitCode = code ?? 1));

function stopServer() {
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /PID ${server.pid} /T /F`, { stdio: 'ignore' });
    } else {
      process.kill(-server.pid, 'SIGTERM');
    }
  } catch {
    /* already stopped */
  }
}

/** Resolves 'ready', 'busy' (another server holds the lock), 'exited' or 'timeout' */
async function waitForServer(startedAt) {
  while (Date.now() - startedAt < TIMEOUT_MS) {
    if (ALREADY_RUNNING.test(serverLog)) return 'busy';
    if (exitCode !== null) return 'exited';
    try {
      await fetch(`http://localhost:${port}/`, { signal: AbortSignal.timeout(5_000) });
      return 'ready';
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  return 'timeout';
}

const startedAt = Date.now();
let failed = false;

try {
  const state = await waitForServer(startedAt);

  if (state === 'ready') {
    const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
    console.log(
      `server answered in ${seconds}s (${dev ? 'development' : 'production'}, port ${port})`,
    );

    for (const { path, status } of EXPECTED) {
      const response = await fetch(`http://localhost:${port}${path}`);
      const ok = response.status === status;
      if (!ok) failed = true;
      console.log(
        `${ok ? '✓' : '✗'} ${path.padEnd(14)} ${response.status}${ok ? '' : ` (expected ${status})`}`,
      );
    }
  } else {
    failed = true;
    if (state === 'busy') {
      console.error('✗ Another Next.js dev server is already running for this project.');
      console.error('  Stop it first (press Ctrl+C in its terminal), then run this again.');
    } else if (state === 'exited') {
      console.error(`✗ the server stopped before answering (exit code ${exitCode})`);
    } else {
      console.error(`✗ the server did not answer within ${TIMEOUT_MS / 1000}s`);
    }
    console.error(serverLog.trim().split('\n').slice(-12).join('\n'));
  }
} finally {
  stopServer();
}

process.exit(failed ? 1 : 0);
