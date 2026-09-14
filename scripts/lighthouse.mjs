/**
 * Measure a page with Lighthouse's mobile preset against a production build.
 *
 *   npm run build && npm run lighthouse
 *   npm run lighthouse -- --path=/some/page --keep
 *
 * Starts `next start` on a spare port, runs Lighthouse in headless Chrome
 * (mobile emulation, throttled network and CPU), prints the scores and key
 * metrics, then stops the server. Fails if a score is below its target.
 * Needs Chrome installed; Lighthouse itself is fetched on first run by npx,
 * so it doesn't slow down `npm install`. --keep keeps the HTML report.
 */
import { execSync, spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';

const LIGHTHOUSE = 'lighthouse@13';
const port = Number(process.env.LIGHTHOUSE_PORT ?? 3460);
const pagePath = process.argv.find((arg) => arg.startsWith('--path='))?.slice(7) ?? '/';
const keep = process.argv.includes('--keep');

/** Minimum scores (T3-S4 acceptance: mobile Performance ≥ 85, Accessibility ≥ 95) */
const TARGETS = { performance: 85, accessibility: 95 };
const METRICS = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
];

/* ---- Start the production server ---- */

const server = spawn('npm', ['run', 'start', '--', '-p', String(port)], {
  shell: true,
  stdio: 'ignore',
  detached: process.platform !== 'win32',
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
});

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

async function waitForServer() {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 60_000) {
    try {
      await fetch(`http://localhost:${port}/`, { signal: AbortSignal.timeout(5_000) });
      return true;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  return false;
}

/* ---- Run Lighthouse ---- */

const outDir = mkdtempSync(join(tmpdir(), 'lighthouse-'));
const reportBase = join(outDir, 'report');
let failed = false;

try {
  if (!(await waitForServer())) {
    throw new Error('the production server did not start (did you run `npm run build`?)');
  }

  const url = `http://localhost:${port}${pagePath}`;
  console.log(`Lighthouse (mobile) → ${url}`);
  const run = spawnSync(
    'npx',
    [
      '--yes',
      LIGHTHOUSE,
      url,
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      '--output=html',
      `--output-path="${reportBase}"`,
      '--quiet',
      '--chrome-flags="--headless=new"',
    ],
    { shell: true, stdio: 'inherit' },
  );
  if (run.status !== 0) throw new Error(`Lighthouse exited with code ${run.status}`);

  const report = JSON.parse(readFileSync(`${reportBase}.report.json`, 'utf-8'));

  console.log('\nScores');
  for (const [id, category] of Object.entries(report.categories)) {
    const score = Math.round(category.score * 100);
    const target = TARGETS[id];
    const verdict =
      target === undefined
        ? ''
        : score >= target
          ? `  ✓ (target ${target})`
          : `  ✗ (target ${target})`;
    if (target !== undefined && score < target) failed = true;
    console.log(`  ${category.title.padEnd(16)} ${String(score).padStart(3)}${verdict}`);
  }

  console.log('\nMetrics');
  for (const id of METRICS) {
    const audit = report.audits[id];
    if (audit) console.log(`  ${audit.title.padEnd(26)} ${audit.displayValue}`);
  }

  const a11yIssues = report.categories.accessibility.auditRefs
    .map((ref) => report.audits[ref.id])
    .filter((audit) => audit.score !== null && audit.score < 1);
  if (a11yIssues.length > 0) {
    console.log('\nAccessibility issues');
    for (const audit of a11yIssues) {
      console.log(`  - ${audit.title}`);
      for (const item of (audit.details?.items ?? []).slice(0, 4)) {
        const where = item.node?.selector ?? item.node?.snippet;
        if (where)
          console.log(
            `      at ${where}${item.node?.explanation ? ` — ${item.node.explanation.split('\n')[1]?.trim() ?? ''}` : ''}`,
          );
      }
    }
  }

  const opportunities = Object.values(report.audits)
    .filter(
      (audit) => audit.details?.type === 'opportunity' && audit.score !== null && audit.score < 0.9,
    )
    .slice(0, 6);
  if (opportunities.length > 0) {
    console.log('\nPerformance opportunities');
    for (const audit of opportunities) {
      console.log(`  - ${audit.title}${audit.displayValue ? ` (${audit.displayValue})` : ''}`);
    }
  }

  if (keep) console.log(`\nHTML report: ${reportBase}.report.html`);
} catch (error) {
  failed = true;
  console.error(`✗ ${error.message}`);
} finally {
  stopServer();
  if (!keep) rmSync(outDir, { recursive: true, force: true });
}

process.exit(failed ? 1 : 0);
