'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { Announcement } from '@/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface AnnouncementBarProps {
  announcements: Announcement[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROTATE_MS = 5_000;
const STORAGE_KEY = 'announcement-bar-dismissed';

/* ------------------------------------------------------------------ */
/*  Chevron icon (inline SVG to avoid extra dependencies)              */
/* ------------------------------------------------------------------ */

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === 'left' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AnnouncementBar({ announcements }: AnnouncementBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return sessionStorage.getItem(STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = announcements.length;

  /* ---- Fade transition helper ---- */
  const transitionTo = useCallback(
    (nextIndex: number) => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex(nextIndex);
        setIsFading(false);
      }, 300);
    },
    [],
  );

  /* ---- Auto-rotate ---- */
  useEffect(() => {
    if (count <= 1 || isPaused || !isVisible) return;

    timerRef.current = setTimeout(() => {
      transitionTo((activeIndex + 1) % count);
    }, ROTATE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, count, isPaused, isVisible, transitionTo]);

  /* ---- Handlers ---- */
  const goToPrev = useCallback(() => {
    transitionTo((activeIndex - 1 + count) % count);
  }, [activeIndex, count, transitionTo]);

  const goToNext = useCallback(() => {
    transitionTo((activeIndex + 1) % count);
  }, [activeIndex, count, transitionTo]);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* sessionStorage unavailable — dismiss visually only */
    }
  }, []);

  /* ---- Early return if dismissed or empty ---- */
  if (count === 0) return null;

  const current = announcements[activeIndex];

  return (
    <>
      {/* Reserve height so there's no CLS when the bar mounts/unmounts */}
      <div
        className="announcement-bar-spacer"
        style={{ height: isVisible ? undefined : 0 }}
        aria-hidden="true"
      />

      {isVisible && (
        <div
          className="announcement-bar"
          style={{ backgroundColor: current.bgColor }}
          role="region"
          aria-label="Announcements"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev chevron — desktop only, hidden when single message */}
          {count > 1 && (
            <button
              className="announcement-bar__nav announcement-bar__nav--prev"
              onClick={goToPrev}
              aria-label="Previous announcement"
              type="button"
            >
              <ChevronIcon direction="left" />
            </button>
          )}

          {/* Message */}
          <div
            className={`announcement-bar__message ${isFading ? 'announcement-bar__message--fading' : ''}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {current.href ? (
              <Link href={current.href} className="announcement-bar__link">
                {current.text}
              </Link>
            ) : (
              <span>{current.text}</span>
            )}
          </div>

          {/* Next chevron — desktop only, hidden when single message */}
          {count > 1 && (
            <button
              className="announcement-bar__nav announcement-bar__nav--next"
              onClick={goToNext}
              aria-label="Next announcement"
              type="button"
            >
              <ChevronIcon direction="right" />
            </button>
          )}

          {/* Close button */}
          <button
            className="announcement-bar__close"
            onClick={dismiss}
            aria-label="Dismiss announcements"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
