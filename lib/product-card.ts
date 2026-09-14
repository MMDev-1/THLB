import type { Product, ProductBadge, ProductCardData, QuickAdd, Variant } from '@/types';

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

export const MAX_SWATCHES = 5;

/** Merchandising tag that marks a product as new. Every product shares one
 *  createdAt date for now, so dates can't tell new stock apart yet. */
const NEW_TAG = 'new';

/* ------------------------------------------------------------------ */
/*  Mapper                                                             */
/* ------------------------------------------------------------------ */

/**
 * Reduce a full Product to what ProductCard displays. Runs on the server,
 * so the browser receives a few hundred bytes per card instead of every
 * variant and image.
 */
export function toProductCardData(
  product: Product,
  rating?: { average: number; count: number } | null,
): ProductCardData {
  const colours = uniqueColours(product.variants);
  const colour = colours[0]?.name ?? '';
  const colourVariants = product.variants.filter((v) => v.colour === colour);
  const shown = colourVariants.find((v) => v.available) ?? colourVariants[0];

  const images = shown?.images.length ? shown.images : [product.featuredImage];
  const price = shown && shown.price > 0 ? shown.price : null;
  const compareAtPrice =
    price !== null && shown?.compareAtPrice != null && shown.compareAtPrice > price
      ? shown.compareAtPrice
      : null;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    href: `/products/${product.handle}`,
    colour,
    image: images[0],
    hoverImage: images[1] ?? null,
    badge: badgeFor(product, compareAtPrice !== null),
    price,
    compareAtPrice,
    percentOff:
      price !== null && compareAtPrice !== null
        ? Math.round((1 - price / compareAtPrice) * 100)
        : null,
    swatches: colours.slice(0, MAX_SWATCHES),
    extraSwatchCount: Math.max(0, colours.length - MAX_SWATCHES),
    quickAdd: quickAddFor(colourVariants),
    rating: rating && rating.count > 0 ? { average: rating.average, count: rating.count } : null,
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function uniqueColours(variants: Variant[]) {
  const seen = new Map<string, string>();
  for (const v of variants) if (!seen.has(v.colour)) seen.set(v.colour, v.colourHex);
  return [...seen].map(([name, hex]) => ({ name, hex }));
}

/** One badge per card, most important first. */
function badgeFor(product: Product, onSale: boolean): ProductBadge | null {
  if (product.variants.every((v) => !v.available)) return 'sold-out';
  if (onSale) return 'sale';
  if (product.tags.includes(NEW_TAG)) return 'new';
  if (product.collections.includes('bundles') || product.tags.includes('bundle')) return 'bundle';
  return null;
}

function quickAddFor(colourVariants: Variant[]): QuickAdd {
  if (!colourVariants.some((v) => v.available)) return { kind: 'unavailable' };
  if (colourVariants.length === 1) return { kind: 'direct', variantId: colourVariants[0].id };
  return {
    kind: 'choose',
    options: colourVariants.map((v) => ({
      variantId: v.id,
      label: v.size,
      available: v.available,
    })),
  };
}
