/**
 * Product & Variant types.
 *
 * `price` and `compareAtPrice` are stored in the smallest currency unit
 * (cents / piastres).  A value of `0` means "placeholder — replace with
 * real pricing before launch".
 */

export interface ProductImage {
  /** URL or path relative to `/public` */
  src: string;
  /** Accessible description */
  alt: string;
  /** Width in pixels (for next/image) */
  width: number;
  /** Height in pixels (for next/image) */
  height: number;
}

export interface Variant {
  id: string;
  sku: string;
  colour: string;
  /** Hex value for swatch rendering */
  colourHex: string;
  size: string;
  /** Price in cents — 0 = placeholder */
  price: number;
  /** Original price in cents before discount — null = not on sale */
  compareAtPrice: number | null;
  available: boolean;
  images: ProductImage[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  /** Which collections this product belongs to (by handle) */
  collections: string[];
  /** SEO-friendly tags */
  tags: string[];
  /** All variants for this product */
  variants: Variant[];
  /** Featured image (first image of first variant) */
  featuredImage: ProductImage;
  createdAt: string;
  updatedAt: string;
}
