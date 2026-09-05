/* ------------------------------------------------------------------ */
/*  Data — loaded once at module level (static import for tree-shaking)  */
/* ------------------------------------------------------------------ */
import rawProducts from '@/data/products.json';
import type { Product } from '@/types';

import { delay } from './delay';

const products = rawProducts as Product[];

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Return every product. */
export async function getProducts(): Promise<Product[]> {
  await delay();
  return products;
}

/** Return a single product by its URL handle, or `null` if not found. */
export async function getProduct(
  handle: string,
): Promise<Product | null> {
  await delay();
  return products.find((p) => p.handle === handle) ?? null;
}

/* ------------------------------------------------------------------ */
/*  Search                                                             */
/* ------------------------------------------------------------------ */

/**
 * Full-text search across product title, description and tags.
 * Case-insensitive, matches any word in the query.
 */
export async function searchProducts(query: string): Promise<Product[]> {
  await delay();

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) return [];

  return products.filter((p) => {
    const haystack = [
      p.title,
      p.description,
      ...p.tags,
    ]
      .join(' ')
      .toLowerCase();

    return terms.some((t) => haystack.includes(t));
  });
}
