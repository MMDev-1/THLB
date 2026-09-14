import { Carousel } from '@/components/ui/Carousel';
import { Rating } from '@/components/ui/Rating';

import { ReviewCard, type ReviewCardData } from './ReviewCard';

/* ------------------------------------------------------------------ */
/*  ReviewsCarousel — heading with the store-wide rating, then a       */
/*  carousel of review cards. Presentational: ReviewsHighlight loads   */
/*  the data.                                                          */
/* ------------------------------------------------------------------ */

interface Props {
  heading: string;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewCardData[];
}

export function ReviewsCarousel({ heading, averageRating, totalReviews, reviews }: Props) {
  return (
    <Carousel
      heading={heading}
      layout="reviews"
      itemNoun="reviews"
      focusSelector="[data-carousel-focus]"
      intro={
        /* A div, not a p: Rating renders a div, and a div inside a p is invalid
           HTML that breaks hydration */
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-foreground">
          <span aria-hidden="true" className="flex items-center gap-2">
            <span className="text-2xl font-bold leading-none">{averageRating.toFixed(1)}</span>
            <Rating value={averageRating} readOnly size="sm" />
          </span>
          <span className="sr-only">Rated {averageRating.toFixed(1)} out of 5</span>
          <span className="text-charcoal-700">from {totalReviews} reviews</span>
        </div>
      }
      items={reviews.map((review) => ({ key: review.id, content: <ReviewCard review={review} /> }))}
    />
  );
}
