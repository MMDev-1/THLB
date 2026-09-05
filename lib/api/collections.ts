/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
import rawCollections from '@/data/collections.json';
import rawProducts from '@/data/products.json';
import type { Collection, Product } from '@/types';

import { delay } from './delay';

const collections = rawCollections as Collection[];
const products = rawProducts as Product[];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type SortKey = 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'newest';

export interface CollectionFilters {
  colours?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export interface CollectionQuery {
  filters?: CollectionFilters;
  sort?: SortKey;
  page?: number;
  pageSize?: number;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function lowestPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}

function applyFilters(items: Product[], f: CollectionFilters): Product[] {
  return items.filter((p) => {
    if (f.colours?.length) {
      const has = p.variants.some((v) =>
        f.colours!.includes(v.colour.toLowerCase()),
      );
      if (!has) return false;
    }

    if (f.sizes?.length) {
      const has = p.variants.some((v) =>
        f.sizes!.includes(v.size),
      );
      if (!has) return false;
    }

    const price = lowestPrice(p);
    if (f.minPrice !== undefined && price < f.minPrice) return false;
    if (f.maxPrice !== undefined && price > f.maxPrice) return false;

    return true;
  });
}

function applySort(items: Product[], key: SortKey): Product[] {
  const sorted = [...items];
  switch (key) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'price-asc':
      return sorted.sort((a, b) => lowestPrice(a) - lowestPrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => lowestPrice(b) - lowestPrice(a));
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    default:
      return sorted;
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Return all collections (without their products). */
export async function getCollections(): Promise<Collection[]> {
  await delay();
  return collections;
}

/**
 * Return a collection and its paginated, filtered, sorted products.
 * Returns `null` if the collection handle doesn't exist.
 */
export async function getCollection(
  handle: string,
  query: CollectionQuery = {},
): Promise<{ collection: Collection; result: PaginatedProducts } | null> {
  await delay();

  const collection = collections.find((c) => c.handle === handle);
  if (!collection) return null;

  // Resolve products that belong to this collection
  let items = products.filter((p) =>
    collection.productIds.includes(p.id),
  );

  // Apply filters
  if (query.filters) {
    items = applyFilters(items, query.filters);
  }

  // Apply sort
  if (query.sort) {
    items = applySort(items, query.sort);
  }

  // Paginate
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.max(1, query.pageSize ?? 12);
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = items.slice(start, start + pageSize);

  return {
    collection,
    result: { products: paginated, total, page, pageSize, totalPages },
  };
}
