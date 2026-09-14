/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
import rawReviews from '@/data/reviews.json';
import type { Review } from '@/types/review';

import { delay } from './delay';

const reviews = rawReviews as Review[];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface PaginatedReviews {
  reviews: Review[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  averageRating: number;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/**
 * Return paginated reviews for a product, newest first.
 * Includes aggregate `averageRating` across *all* reviews for the product.
 */
export async function getReviews(
  productId: string,
  page = 1,
  pageSize = 5,
): Promise<PaginatedReviews> {
  await delay();

  const all = reviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = all.length;
  const totalPages = Math.ceil(total / pageSize);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (safePage - 1) * pageSize;
  const paginated = all.slice(start, start + pageSize);

  const averageRating =
    total > 0 ? Math.round((all.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10 : 0;

  return {
    reviews: paginated,
    total,
    page: safePage,
    pageSize,
    totalPages,
    averageRating,
  };
}

export interface RatingSummary {
  /** Average rating, rounded to one decimal */
  average: number;
  count: number;
}

/**
 * Average rating and review count per product, keyed by product id.
 * Products without reviews are left out.
 */
export async function getRatingSummaries(
  productIds: string[],
): Promise<Record<string, RatingSummary>> {
  await delay();

  const wanted = new Set(productIds);
  const totals = new Map<string, { sum: number; count: number }>();

  for (const review of reviews) {
    if (!wanted.has(review.productId)) continue;
    const total = totals.get(review.productId) ?? { sum: 0, count: 0 };
    total.sum += review.rating;
    total.count += 1;
    totals.set(review.productId, total);
  }

  return Object.fromEntries(
    [...totals].map(([id, { sum, count }]) => [
      id,
      { average: Math.round((sum / count) * 10) / 10, count },
    ]),
  );
}
