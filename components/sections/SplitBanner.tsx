import Image from 'next/image';
import Link from 'next/link';

import type { SplitBannerSection } from '@/types/home';

/* ------------------------------------------------------------------ */
/*  SplitBanner                                                        */
/*  50/50 image + text block. imageSide controls layout direction.     */
/*  Stacks on mobile with image first.                                 */
/* ------------------------------------------------------------------ */

interface Props {
  data: SplitBannerSection;
}

export function SplitBanner({ data }: Props) {
  const className = ['split-banner', data.imageSide === 'right' ? 'split-banner--image-right' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={className}>
      {/* Image half */}
      <div className="split-banner__media">
        <Image
          src={data.image}
          alt={data.alt}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="split-banner__img"
        />
      </div>

      {/* Text half */}
      <div className="split-banner__content">
        {data.eyebrow && <span className="split-banner__eyebrow">{data.eyebrow}</span>}
        <h2 className="split-banner__heading">{data.heading}</h2>
        <p className="split-banner__body">{data.body}</p>
        <Link
          href={data.cta.href}
          className={`split-banner__cta split-banner__cta--${data.cta.variant}`}
        >
          {data.cta.label}
        </Link>
      </div>
    </section>
  );
}
