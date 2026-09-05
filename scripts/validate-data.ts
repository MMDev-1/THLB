/**
 * Validate every JSON file in /data against its Zod schema.
 *
 * Usage:  npx tsx scripts/validate-data.ts
 *   (or)  npm run validate:data
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  BlogPostsDataSchema,
  CollectionsDataSchema,
  NavigationDataSchema,
  PagesDataSchema,
  ProductsDataSchema,
  ReviewsDataSchema,
} from '../lib/schemas';

/* ------------------------------------------------------------------ */

const DATA_DIR = resolve(__dirname, '..', 'data');

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
];

/* ------------------------------------------------------------------ */

let failed = false;

for (const { file, schema } of targets) {
  const path = resolve(DATA_DIR, file);
  try {
    const raw = JSON.parse(readFileSync(path, 'utf-8'));
    schema.parse(raw);
    const count = Array.isArray(raw) ? raw.length : 1;
    console.log(`  ✓  ${file} — ${count} ${count === 1 ? 'entry' : 'entries'}`);
  } catch (err) {
    failed = true;
    console.error(`  ✗  ${file}`);
    if (err instanceof Error) {
      console.error(`     ${err.message.split('\n').slice(0, 5).join('\n     ')}`);
    }
  }
}

console.log('');
if (failed) {
  console.error('Data validation FAILED.');
  process.exit(1);
} else {
  console.log('All data files valid.');
}
