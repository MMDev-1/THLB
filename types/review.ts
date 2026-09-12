/**
 * Product review types.
 */

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  /** ISO-8601 date string */
  createdAt: string;
  verified: boolean;
}
