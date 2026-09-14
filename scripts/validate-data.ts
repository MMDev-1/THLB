/**
 * Validate every JSON file in /data against its Zod schema, then check that
 * references between files point at things that exist.
 *
 * Usage:  npx tsx scripts/validate-data.ts
 *   (or)  npm run validate:data
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { ZodError } from 'zod';

import { CollectionsDataSchema } from '../lib/schemas/collection';
import { HomePageDataSchema } from '../lib/schemas/home';
import { NavigationDataSchema } from '../lib/schemas/navigation';
import { BlogPostsDataSchema, PagesDataSchema } from '../lib/schemas/page';
import { ProductsDataSchema } from '../lib/schemas/product';
import { ReviewsDataSchema } from '../lib/schemas/review';

/* ------------------------------------------------------------------ */

const DATA_DIR = resolve(__dirname, '..', 'data');
const MAX_ISSUES_SHOWN = 10;

interface ValidationTarget {
  file: string;
  schema: { parse: (data: unknown) => unknown };
}

const targets: ValidationTarget[] = [
  { file: 'products.json', schema: ProductsDataSchema },
  { file: 'collections.json', schema: CollectionsDataSchema },
  { file: 'navigation.json', schema: NavigationDataSchema },
  { file: 'reviews.json', schema: ReviewsDataSchema },
  { file: 'pages.json', schema: PagesDataSchema },
  { file: 'blog-posts.json', schema: BlogPostsDataSchema },
  { file: 'home.json', schema: HomePageDataSchema },
];

const read = (file: string): unknown => JSON.parse(readFileSync(resolve(DATA_DIR, file), 'utf-8'));

/** Print where each problem is, e.g. "at sections.0.media.poster: Too small: …" */
function reportError(err: unknown) {
  if (err instanceof ZodError) {
    for (const issue of err.issues.slice(0, MAX_ISSUES_SHOWN)) {
      console.error(`     at ${issue.path.join('.') || '(top level)'}: ${issue.message}`);
    }
    if (err.issues.length > MAX_ISSUES_SHOWN) {
      console.error(`     …and ${err.issues.length - MAX_ISSUES_SHOWN} more`);
    }
  } else if (err instanceof Error) {
    console.error(`     ${err.message}`);
  }
}

/* ------------------------------------------------------------------ */

let failed = false;

for (const { file, schema } of targets) {
  try {
    const raw = read(file);
    schema.parse(raw);
    const count = Array.isArray(raw) ? raw.length : 1;
    console.log(`  ✓  ${file} — ${count} ${count === 1 ? 'entry' : 'entries'}`);
  } catch (err) {
    failed = true;
    console.error(`  ✗  ${file}`);
    reportError(err);
  }
}

/* ---- Cross-file references (only once every file is valid) ---- */

if (!failed) {
  const handles = new Set(ProductsDataSchema.parse(read('products.json')).map((p) => p.handle));
  const { sections } = HomePageDataSchema.parse(read('home.json'));
  const referenced = sections.flatMap((section) => {
    if (section.type === 'productCarousel') return section.productHandles;
    if (section.type === 'ugcGrid') return section.tiles.map((tile) => tile.productHandle);
    return [];
  });
  const unknown = [...new Set(referenced.filter((handle) => !handles.has(handle)))];

  if (unknown.length > 0) {
    failed = true;
    console.error(`  ✗  home.json — links to products that don't exist: ${unknown.join(', ')}`);
  } else {
    console.log(`  ✓  home.json — all ${referenced.length} product links point to real products`);
  }
}

console.log('');
if (failed) {
  console.error('Data validation FAILED.');
  process.exit(1);
} else {
  console.log('All data files valid.');
}
