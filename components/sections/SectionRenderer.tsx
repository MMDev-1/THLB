import dynamic from 'next/dynamic';

import type { HomeSection } from '@/types';

import { CategoryTiles } from './CategoryTiles';
import { Hero } from './Hero';

/* ------------------------------------------------------------------ */
/*  SectionRenderer — picks the component for each home.json section   */
/*  by its `type`. Above-the-fold sections load with the page; the     */
/*  rest are split into their own chunks with dynamic() (still         */
/*  rendered on the server, so there's no loading flash).              */
/* ------------------------------------------------------------------ */

const ProductCarousel = dynamic(() =>
  import('./ProductCarousel').then((mod) => mod.ProductCarousel),
);
const ValueProps = dynamic(() => import('./ValueProps').then((mod) => mod.ValueProps));
const ReviewsHighlight = dynamic(() =>
  import('./ReviewsHighlight').then((mod) => mod.ReviewsHighlight),
);
const SplitBanner = dynamic(() => import('./SplitBanner').then((mod) => mod.SplitBanner));
const UGCGrid = dynamic(() => import('./UGCGrid').then((mod) => mod.UGCGrid));
const NewsletterBlock = dynamic(() =>
  import('./NewsletterBlock').then((mod) => mod.NewsletterBlock),
);

interface Props {
  section: HomeSection;
}

export function SectionRenderer({ section }: Props) {
  switch (section.type) {
    case 'hero':
      return <Hero data={section} />;
    case 'categoryTiles':
      return <CategoryTiles data={section} />;
    case 'productCarousel':
      return <ProductCarousel data={section} />;
    case 'valueProps':
      return <ValueProps data={section} />;
    case 'reviewsHighlight':
      return <ReviewsHighlight data={section} />;
    case 'splitBanner':
      return <SplitBanner data={section} />;
    case 'ugcGrid':
      return <UGCGrid data={section} />;
    case 'newsletter':
      return <NewsletterBlock data={section} />;
    default:
      return unknownSection(section);
  }
}

/** TypeScript errors here if a section type is added without a case above. */
function unknownSection(section: never): null {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('SectionRenderer: no component for section', section);
  }
  return null;
}
