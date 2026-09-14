import Image from 'next/image';
import Link from 'next/link';
import { useId } from 'react';

import { IconInstagram } from '@/components/icons';

/* ------------------------------------------------------------------ */
/*  UGCGridView — six customer photos (2 columns on phones, 3 on       */
/*  larger screens), each linking to the product in the photo. On      */
/*  mouse devices the product name and "Shop this look" slide in on    */
/*  hover or keyboard focus; on touch they're always visible.          */
/* ------------------------------------------------------------------ */

export interface UGCTileView {
  image: string;
  alt: string;
  productTitle: string;
  href: string;
}

interface Props {
  heading: string;
  instagramHandle: string;
  instagramUrl: string;
  tiles: UGCTileView[];
}

export function UGCGridView({ heading, instagramHandle, instagramUrl, tiles }: Props) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-20"
    >
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <h2
          id={headingId}
          className="text-[length:var(--font-size-xl)] font-bold leading-tight tracking-tight text-foreground"
        >
          {heading}
        </h2>
        <p className="text-sm text-charcoal-700">Tag {instagramHandle} to be featured</p>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <IconInstagram width={18} height={18} aria-hidden="true" />
          Follow {instagramHandle}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
        {tiles.map((tile) => (
          <li key={tile.image + tile.href}>
            <Link
              href={tile.href}
              className="group relative block aspect-square overflow-hidden rounded-lg bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 pt-10 text-white pointer-fine:translate-y-2 pointer-fine:opacity-0 pointer-fine:transition pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:translate-y-0 pointer-fine:group-focus-visible:opacity-100">
                <span className="text-sm font-semibold leading-snug">{tile.productTitle}</span>
                <span className="text-xs font-medium underline underline-offset-2">
                  Shop this look
                </span>
                <span className="sr-only">. Photo: {tile.alt}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
