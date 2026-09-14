/**
 * ProductCard view model — the small slice of a Product that a card shows.
 *
 * Built on the server by `toProductCardData()` (lib/product-card.ts) so pages
 * don't send every variant and image of every product to the browser.
 * Prices stay in the smallest currency unit, like the rest of the catalogue.
 */

import type { ProductImage } from './product';

export type ProductBadge = 'sale' | 'new' | 'sold-out' | 'bundle';

export interface ProductSwatch {
  name: string;
  hex: string;
}

export interface QuickAddOption {
  variantId: string;
  /** Size label shown in the picker, e.g. "M" */
  label: string;
  available: boolean;
}

/**
 * What the quick-add button does:
 * - `direct` — the shown colour has one variant: add it straight away
 * - `choose` — several sizes: open the size picker
 * - `unavailable` — nothing in the shown colour can be bought
 */
export type QuickAdd =
  | { kind: 'direct'; variantId: string }
  | { kind: 'choose'; options: QuickAddOption[] }
  | { kind: 'unavailable' };

export interface ProductCardData {
  id: string;
  handle: string;
  title: string;
  href: string;
  /** Colour the image, price and quick-add options refer to */
  colour: string;
  image: ProductImage;
  /** Shown on hover on devices with a mouse; null when there's no second image */
  hoverImage: ProductImage | null;
  badge: ProductBadge | null;
  /** Price in cents; null while the catalogue still has placeholder (0) prices */
  price: number | null;
  compareAtPrice: number | null;
  /** Whole-number discount, e.g. 25 for 25% off; null when not on sale */
  percentOff: number | null;
  /** Up to five colour dots, plus how many colours didn't fit */
  swatches: ProductSwatch[];
  extraSwatchCount: number;
  quickAdd: QuickAdd;
  rating: { average: number; count: number } | null;
}
