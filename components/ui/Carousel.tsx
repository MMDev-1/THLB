'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

/* ------------------------------------------------------------------ */
/*  Carousel                                                           */
/*  Horizontal scroll-snap row shared by homepage carousels: swipe on  */
/*  touch, arrows on desktop (aria-disabled at each end), Left/Right   */
/*  keys move focus between items. No slider library.                  */
/* ------------------------------------------------------------------ */

/** Visible items per breakpoint (classes must be static for Tailwind) */
const LAYOUTS = {
  /* 2.2 on phones, 3.2 on tablets, 4 on desktop */
  products:
    'gap-4 auto-cols-[calc((100%_-_2rem)/2.2)] md:auto-cols-[calc((100%_-_3rem)/3.2)] lg:auto-cols-[calc((100%_-_4.5rem)/4)] lg:gap-6',
  /* 1.15 on phones, 2.2 on tablets, 3 on desktop */
  reviews:
    'gap-4 auto-cols-[calc((100%_-_1rem)/1.15)] md:auto-cols-[calc((100%_-_2rem)/2.2)] lg:auto-cols-[calc((100%_-_3rem)/3)] lg:gap-6',
} as const;

/** px of slack when deciding whether the track is at an end */
const EDGE_TOLERANCE = 4;

export interface CarouselItem {
  key: string;
  content: React.ReactNode;
}

interface CarouselProps {
  heading: string;
  /** Shown under the heading, e.g. an aggregate rating */
  intro?: React.ReactNode;
  /** Shown next to the arrows, e.g. a "View all" link */
  action?: React.ReactNode;
  items: CarouselItem[];
  layout: keyof typeof LAYOUTS;
  /** What the items are, for screen readers: "8 products" */
  itemNoun: string;
  /** Elements that Left/Right arrow keys move focus between */
  focusSelector: string;
}

export function Carousel({
  heading,
  intro,
  action,
  items,
  layout,
  itemNoun,
  focusSelector,
}: CarouselProps) {
  const headingId = React.useId();
  const trackId = React.useId();
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({ atStart: true, atEnd: false });

  /* Track scroll position and size to know when the arrows should disable */
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const atStart = track.scrollLeft <= EDGE_TOLERANCE;
        const atEnd = track.scrollLeft >= maxScroll - EDGE_TOLERANCE;
        setEdges((prev) =>
          prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd },
        );
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    track.addEventListener('scroll', measure, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      track.removeEventListener('scroll', measure);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  /* Left/Right arrows move focus between items */
  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const current = event.target as HTMLElement;
    if (!current.matches(focusSelector)) return;

    const targets = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(focusSelector));
    const next = targets[targets.indexOf(current) + (event.key === 'ArrowRight' ? 1 : -1)];
    if (next) {
      event.preventDefault();
      next.focus();
    }
  };

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-20"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2
            id={headingId}
            className="text-[length:var(--font-size-xl)] font-bold leading-tight tracking-tight text-foreground"
          >
            {heading}
          </h2>
          {intro}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {action}
          <div className="hidden gap-2 lg:flex">
            <ArrowButton
              label={`Previous ${itemNoun}`}
              icon={ChevronLeft}
              disabled={edges.atStart}
              controls={trackId}
              onClick={() => scrollByPage(-1)}
            />
            <ArrowButton
              label={`Next ${itemNoun}`}
              icon={ChevronRight}
              disabled={edges.atEnd}
              controls={trackId}
              onClick={() => scrollByPage(1)}
            />
          </div>
        </div>
      </div>

      <ul
        id={trackId}
        ref={trackRef}
        onKeyDown={onKeyDown}
        aria-label={`${heading}: ${items.length} ${itemNoun}`}
        className={[
          'grid snap-x snap-mandatory grid-flow-col overflow-x-auto overscroll-x-contain',
          '-mx-1 px-1 pb-2 pt-1 scroll-pl-1',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          LAYOUTS[layout],
        ].join(' ')}
      >
        {items.map((item) => (
          <li key={item.key} className="snap-start">
            {item.content}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow button — aria-disabled (not disabled) so keyboard focus      */
/*  isn't lost when the carousel reaches an end                        */
/* ------------------------------------------------------------------ */

interface ArrowButtonProps {
  label: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  disabled: boolean;
  controls: string;
  onClick: () => void;
}

function ArrowButton({ label, icon: Icon, disabled, controls, onClick }: ArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={controls}
      aria-disabled={disabled}
      /* Always scroll: at an end the browser simply doesn't move, so a stale
         `disabled` can never block a click */
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-raised text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:border-border"
    >
      <Icon aria-hidden className="h-5 w-5" />
    </button>
  );
}
