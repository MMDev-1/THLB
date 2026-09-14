import { Check } from 'lucide-react';
import Link from 'next/link';

import { Rating } from '@/components/ui/Rating';

/* ------------------------------------------------------------------ */
/*  ReviewCard — one customer review: stars, quote, name, verified     */
/*  badge and a link to the product reviewed                           */
/* ------------------------------------------------------------------ */

export interface ReviewCardData {
  id: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  verified: boolean;
  product: { title: string; href: string } | null;
}

export function ReviewCard({ review }: { review: ReviewCardData }) {
  return (
    <figure className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface-raised p-5">
      <Rating value={review.rating} readOnly size="sm" />

      <blockquote className="flex flex-col gap-1.5">
        <p className="font-semibold leading-snug text-foreground">{review.title}</p>
        <p className="line-clamp-5 text-sm leading-relaxed text-charcoal-700">“{review.body}”</p>
      </blockquote>

      <figcaption className="mt-auto flex flex-col gap-1.5 pt-1 text-sm">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground">{review.author}</span>
          {review.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sage-100 px-2 py-0.5 text-xs font-medium text-sage-800">
              <Check aria-hidden="true" className="h-3 w-3" />
              Verified buyer
            </span>
          )}
        </span>
        {review.product && (
          <Link
            href={review.product.href}
            data-carousel-focus
            className="text-charcoal-700 underline underline-offset-2 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            on {review.product.title}
          </Link>
        )}
      </figcaption>
    </figure>
  );
}
