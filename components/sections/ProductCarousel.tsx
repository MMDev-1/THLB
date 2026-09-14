import { getProducts } from '@/lib/api/products';
import { getRatingSummaries } from '@/lib/api/reviews';
import { toProductCardData } from '@/lib/product-card';
import type { Product, ProductCarouselSection } from '@/types';

import { ProductCarouselTrack } from './ProductCarouselTrack';

/* ------------------------------------------------------------------ */
/*  ProductCarousel                                                    */
/*  Server part: turns the handles in home.json into slim card data.   */
/*  ProductCarouselTrack (client) handles scrolling, arrows and keys.  */
/* ------------------------------------------------------------------ */

interface Props {
  data: ProductCarouselSection;
}

export async function ProductCarousel({ data }: Props) {
  const allProducts = await getProducts();
  const byHandle = new Map(allProducts.map((product) => [product.handle, product]));
  const products = data.productHandles
    .map((handle) => byHandle.get(handle))
    .filter((product): product is Product => product !== undefined);

  if (products.length === 0) return null;

  const ratings = await getRatingSummaries(products.map((product) => product.id));
  const cards = products.map((product) => toProductCardData(product, ratings[product.id]));

  return <ProductCarouselTrack heading={data.heading} viewAll={data.viewAll} products={cards} />;
}
