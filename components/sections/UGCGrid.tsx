import { getProducts } from '@/lib/api/products';
import type { UGCGridSection } from '@/types';

import { UGCGridView, type UGCTileView } from './UGCGridView';

/* ------------------------------------------------------------------ */
/*  UGCGrid — server part: turns each tile's product handle into the   */
/*  product's name and PDP link, so names never go stale in home.json. */
/* ------------------------------------------------------------------ */

interface Props {
  data: UGCGridSection;
}

export async function UGCGrid({ data }: Props) {
  const products = await getProducts();
  const byHandle = new Map(products.map((product) => [product.handle, product]));

  const tiles: UGCTileView[] = data.tiles.flatMap((tile) => {
    const product = byHandle.get(tile.productHandle);
    return product
      ? [
          {
            image: tile.image,
            alt: tile.alt,
            productTitle: product.title,
            href: `/products/${product.handle}`,
          },
        ]
      : [];
  });

  if (tiles.length === 0) return null;

  return (
    <UGCGridView
      heading={data.heading}
      instagramHandle={data.instagramHandle}
      instagramUrl={data.instagramUrl}
      tiles={tiles}
    />
  );
}
