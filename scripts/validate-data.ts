/**
 * Validate every JSON file in /data against its Zod schema, then check that
 * references between files point at things that exist.
 *
 * Usage:  npx tsx scripts/validate-data.ts
 *   (or)  npm run validate:data
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { CollectionsDataSchema } from '../lib/schemas/collection';
import { HomePageDataSchema } from '../lib/schemas/home';
import { NavigationDataSchema } from '../lib/schemas/navigation';
import { BlogPostsDataSchema, PagesDataSchema } from '../lib/schemas/page';
import { ProductsDataSchema } from '../lib/schemas/product';
import { ReviewsDataSchema } from '../lib/schemas/review';

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
  { file: 'home.json', schema: HomePageDataSchema },
];

const read = (file: string): unknown => JSON.parse(readFileSync(resolve(DATA_DIR, file), 'utf-8'));

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
    if (err instanceof Error) {
      console.error(`     ${err.message.split('\n').slice(0, 5).join('\n     ')}`);
    }
  }
}

/* ---- Cross-file references (only once every file is valid) ---- */

if (!failed) {
  const handles = new Set(ProductsDataSchema.parse(read('products.json')).map((p) => p.handle));
  const listed = HomePageDataSchema.parse(read('home.json')).productCarousel.productHandles;
  const unknown = listed.filter((handle) => !handles.has(handle));

  if (unknown.length > 0) {
    failed = true;
    console.error(`  ✗  home.json — productCarousel lists unknown products: ${unknown.join(', ')}`);
  } else {
    console.log(`  ✓  home.json — all ${listed.length} carousel products exist`);
  }
}

console.log('');
if (failed) {
  console.error('Data validation FAILED.');
  process.exit(1);
} else {
  console.log('All data files valid.');
}
