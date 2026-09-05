/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
import rawReviews from '@/data/reviews.json';
import type { Review } from '@/types';

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
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const total = all.length;
  const totalPages = Math.ceil(total / pageSize);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (safePage - 1) * pageSize;
  const paginated = all.slice(start, start + pageSize);

  const averageRating =
    total > 0
      ? Math.round((all.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10
      : 0;

  return {
    reviews: paginated,
    total,
    page: safePage,
    pageSize,
    totalPages,
    averageRating,
  };
}
