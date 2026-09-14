import Image from 'next/image';
import Link from 'next/link';

import type { CategoryTilesSection } from '@/types/home';

/* ------------------------------------------------------------------ */
/*  CategoryTiles                                                      */
/*  2×2 grid on mobile, 4-up on desktop. Each tile = image + label     */
/*  overlay with hover zoom.                                           */
/* ------------------------------------------------------------------ */

interface Props {
  data: CategoryTilesSection;
}

export function CategoryTiles({ data }: Props) {
  return (
    <section className="category-tiles">
      <h2 className="category-tiles__heading">{data.heading}</h2>

      <div className="category-tiles__grid">
        {data.tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="category-tiles__tile">
            <div className="category-tiles__img-wrap">
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(max-width: 639px) 50vw, 25vw"
                className="category-tiles__img"
              />
            </div>
            <span className="category-tiles__label">{tile.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
