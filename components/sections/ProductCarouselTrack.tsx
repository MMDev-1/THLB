'use client';

import Link from 'next/link';

import { ProductCard } from '@/components/product/ProductCard';
import { Carousel } from '@/components/ui/Carousel';
import type { ProductCardData, ViewAllLink } from '@/types';

/* ------------------------------------------------------------------ */
/*  ProductCarouselTrack — product cards in the shared Carousel:       */
/*  2.2 cards on phones, 3.2 on tablets, 4 on desktop.                 */
/* ------------------------------------------------------------------ */

interface Props {
  heading: string;
  viewAll?: ViewAllLink;
  products: ProductCardData[];
}

export function ProductCarouselTrack({ heading, viewAll, products }: Props) {
  return (
    <Carousel
      heading={heading}
      layout="products"
      itemNoun="products"
      focusSelector="[data-card-link]"
      action={
        viewAll && (
          <Link
            href={viewAll.href}
            className="text-sm font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            {viewAll.label}
          </Link>
        )
      }
      items={products.map((product) => ({
        key: product.id,
        content: <ProductCard product={product} />,
      }))}
    />
  );
}
