import { getProducts } from '@/lib/api/products';
import { getReviewHighlights } from '@/lib/api/reviews';
import type { ReviewsHighlightSection } from '@/types';

import type { ReviewCardData } from './ReviewCard';
import { ReviewsCarousel } from './ReviewsCarousel';

/* ------------------------------------------------------------------ */
/*  ReviewsHighlight                                                   */
/*  Server part: store-wide rating plus the top reviews from the mock  */
/*  review data, each linked to the product it's about.                */
/* ------------------------------------------------------------------ */

interface Props {
  data: ReviewsHighlightSection;
}

export async function ReviewsHighlight({ data }: Props) {
  const [{ averageRating, totalReviews, featured }, products] = await Promise.all([
    getReviewHighlights(data.maxReviews, data.minRating),
    getProducts(),
  ]);

  if (featured.length === 0) return null;

  const productsById = new Map(products.map((product) => [product.id, product]));
  const reviews: ReviewCardData[] = featured.map((review) => {
    const product = productsById.get(review.productId);
    return {
      id: review.id,
      rating: review.rating,
      title: review.title,
      body: review.body,
      author: review.author,
      verified: review.verified,
      product: product ? { title: product.title, href: `/products/${product.handle}` } : null,
    };
  });

  return (
    <ReviewsCarousel
      heading={data.heading}
      averageRating={averageRating}
      totalReviews={totalReviews}
      reviews={reviews}
    />
  );
}
