/**
 * Collection types.
 */

import type { ProductImage } from './product';

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ProductImage;
  /** Product IDs that belong to this collection */
  productIds: string[];
}
