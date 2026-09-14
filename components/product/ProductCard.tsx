'use client';

import { Check, Heart, Plus, Shirt } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { Rating } from '@/components/ui/Rating';
import { cn } from '@/lib/utils';
import { addToCart } from '@/store/cart';
import type { ProductBadge, ProductCardData, QuickAddOption } from '@/types';

/* ------------------------------------------------------------------ */
/*  ProductCard                                                        */
/*  Shared by the homepage, collection pages, upsells and search.      */
/*  The title link stretches over the whole card (valid HTML: no       */
/*  buttons inside a link); wishlist and quick-add sit above it.       */
/* ------------------------------------------------------------------ */

/* The size picker (Radix Popover) is only needed after a tap, so it lives in
   its own chunk: loaded on demand and warmed when the button is pointed at */
const loadSizePicker = () => import('./SizePickerPopover');
const SizePickerPopover = React.lazy(() =>
  loadSizePicker().then((mod) => ({ default: mod.SizePickerPopover })),
);

const BADGES: Record<ProductBadge, { label: string; className: string }> = {
  sale: { label: 'Sale', className: 'bg-destructive text-destructive-foreground' },
  new: { label: 'New', className: 'bg-foreground text-surface-raised' },
  'sold-out': {
    label: 'Sold out',
    className: 'border border-border bg-surface-raised text-foreground',
  },
  bundle: { label: 'Bundle', className: 'bg-accent text-accent-foreground' },
};

interface ProductCardProps {
  product: ProductCardData;
  /** `sizes` for the image — tune per layout (grid, carousel, upsell row) */
  sizes?: string;
  className?: string;
}

/** Keep clicks on the card's own controls from reaching the card link. */
function stop(event: React.SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

export function ProductCard({
  product,
  sizes = '(max-width: 1023px) 45vw, 25vw',
  className,
}: ProductCardProps) {
  const titleId = React.useId();
  const badge = product.badge ? BADGES[product.badge] : null;

  return (
    <article
      aria-labelledby={titleId}
      className={cn('group relative flex flex-col gap-3', className)}
    >
      {/* Fixed 4:5 box — the card never changes size when images load or fail */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-sunken">
        <CardImages product={product} sizes={sizes} />

        {badge && (
          <Badge className={cn('absolute left-2.5 top-2.5 z-10 px-2.5 shadow-sm', badge.className)}>
            {badge.label}
          </Badge>
        )}

        <WishlistButton title={product.title} />
        <QuickAdd product={product} />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3
          id={titleId}
          className="line-clamp-2 text-sm font-semibold leading-snug text-foreground"
        >
          <Link
            href={product.href}
            data-card-link
            className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2"
          >
            {product.title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-baseline gap-x-2">
          {product.price === null ? (
            <span className="text-sm text-muted">Price coming soon</span>
          ) : (
            <Price
              amount={product.price / 100}
              compareAt={product.compareAtPrice === null ? null : product.compareAtPrice / 100}
              size="sm"
            />
          )}
          {product.percentOff !== null && (
            <span className="text-xs font-semibold text-destructive">−{product.percentOff}%</span>
          )}
        </div>

        <Swatches product={product} />

        {product.rating && (
          <div className="flex items-center gap-1.5">
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <Rating value={product.rating.average} readOnly size="sm" />
              <span className="text-xs text-muted">({product.rating.count})</span>
            </span>
            <span className="sr-only">
              Rated {product.rating.average} out of 5 from {product.rating.count} reviews
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Images: primary, second image on hover (mouse devices only)       */
/* ------------------------------------------------------------------ */

function CardImages({ product, sizes }: { product: ProductCardData; sizes: string }) {
  const [failed, setFailed] = React.useState(false);
  const [hoverFailed, setHoverFailed] = React.useState(false);

  /* An image can fail before React hydrates and misses onError — check on mount */
  const checkLoaded = React.useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <>
      {/* Placeholder sits underneath, so a missing photo never shows a broken image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-charcoal-700"
      >
        <Shirt className="h-10 w-10" strokeWidth={1.25} />
        <span className="text-xs">Photo coming soon</span>
      </div>

      {!failed && (
        <Image
          ref={checkLoaded}
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}

      {!failed && !hoverFailed && product.hoverImage && (
        <Image
          src={product.hoverImage.src}
          alt=""
          fill
          sizes={sizes}
          className="hidden object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-fine:block"
          onError={() => setHoverFailed(true)}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Wishlist heart (local state until accounts exist)                 */
/* ------------------------------------------------------------------ */

function WishlistButton({ title }: { title: string }) {
  const [saved, setSaved] = React.useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`Save ${title} to wishlist`}
      onClick={(event) => {
        stop(event);
        setSaved((value) => !value);
      }}
      className="absolute right-2.5 top-2.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface-raised/90 text-foreground shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Heart
        aria-hidden="true"
        className={cn('h-[18px] w-[18px]', saved && 'fill-destructive text-destructive')}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick add: small button on touch, hover bar on mouse devices      */
/* ------------------------------------------------------------------ */

const QUICK_ADD_CLASSES = cn(
  'absolute bottom-2.5 right-2.5 z-10 inline-flex h-9 w-9 items-center justify-center gap-1.5',
  'rounded-full bg-surface-raised/95 text-sm font-semibold text-foreground shadow-sm',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  /* Mouse devices: a full-width bar that appears on hover or keyboard focus */
  'pointer-fine:left-2.5 pointer-fine:w-auto pointer-fine:rounded-md',
  'pointer-fine:translate-y-1 pointer-fine:opacity-0 pointer-fine:transition',
  'pointer-fine:group-hover:translate-y-0 pointer-fine:group-hover:opacity-100',
  'pointer-fine:focus-visible:translate-y-0 pointer-fine:focus-visible:opacity-100',
  'pointer-fine:data-[state=open]:translate-y-0 pointer-fine:data-[state=open]:opacity-100',
);

function QuickAdd({ product }: { product: ProductCardData }) {
  const [open, setOpen] = React.useState(false);
  const [pickerWanted, setPickerWanted] = React.useState(false);
  const [added, setAdded] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const { quickAdd } = product;
  if (quickAdd.kind === 'unavailable') return null;

  const add = (variantId: string, size?: string) => {
    addToCart({ productId: product.id, variantId });
    setOpen(false);
    setAdded(size ? `${product.title}, size ${size},` : product.title);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(null), 2000);
  };

  const className = cn(
    QUICK_ADD_CLASSES,
    added && 'pointer-fine:translate-y-0 pointer-fine:opacity-100',
  );

  const content = (
    <>
      {added ? (
        <Check aria-hidden="true" className="h-4 w-4" />
      ) : (
        <Plus aria-hidden="true" className="h-4 w-4" />
      )}
      <span className="sr-only pointer-fine:not-sr-only">{added ? 'Added' : 'Quick add'}</span>
    </>
  );

  const announcement = (
    <span role="status" className="sr-only">
      {added ? `Added ${added} to your cart` : ''}
    </span>
  );

  if (quickAdd.kind === 'direct') {
    return (
      <>
        <button
          type="button"
          aria-label={`Quick add ${product.title}`}
          onClick={(event) => {
            stop(event);
            add(quickAdd.variantId);
          }}
          className={className}
        >
          {content}
        </button>
        {announcement}
      </>
    );
  }

  const label = `Quick add ${product.title}: choose a size`;

  /* Until the first tap: a plain button that also warms the picker's chunk */
  const plainButton = (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={false}
      onPointerEnter={() => {
        void loadSizePicker();
      }}
      onFocus={() => {
        void loadSizePicker();
      }}
      onClick={(event) => {
        event.stopPropagation();
        setPickerWanted(true);
        setOpen(true);
      }}
      className={className}
    >
      {content}
    </button>
  );

  return (
    <>
      {pickerWanted ? (
        <React.Suspense fallback={plainButton}>
          <SizePickerPopover
            open={open}
            onOpenChange={setOpen}
            trigger={
              <button
                type="button"
                aria-label={label}
                onClick={(event) => event.stopPropagation()}
                className={className}
              >
                {content}
              </button>
            }
            productTitle={product.title}
            colour={product.colour}
            options={quickAdd.options}
            onPick={(option: QuickAddOption) => add(option.variantId, option.label)}
          />
        </React.Suspense>
      ) : (
        plainButton
      )}
      {announcement}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Colour dots: up to five, then "+N"                                */
/* ------------------------------------------------------------------ */

function Swatches({ product }: { product: ProductCardData }) {
  const total = product.swatches.length + product.extraSwatchCount;
  if (total < 2) return null;

  return (
    <ul aria-label={`Available in ${total} colours`} className="flex items-center gap-1.5">
      {product.swatches.map((swatch) => (
        <li
          key={swatch.name}
          className="h-3.5 w-3.5 rounded-full border border-black/10"
          style={{ backgroundColor: swatch.hex }}
        >
          <span className="sr-only">{swatch.name}</span>
        </li>
      ))}
      {product.extraSwatchCount > 0 && (
        <li className="text-xs text-muted">
          <span aria-hidden="true">+{product.extraSwatchCount}</span>
          <span className="sr-only">and {product.extraSwatchCount} more</span>
        </li>
      )}
    </ul>
  );
}
