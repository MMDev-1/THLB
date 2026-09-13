'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type RatingProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
};

const SIZES = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

function Rating({
  value,
  max = 5,
  size = 'md',
  onChange,
  readOnly = false,
  className,
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const displayValue = hovered ?? value;

  return (
    <div
      className={cn('inline-flex items-center gap-0.5', className)}
      role="radiogroup"
      aria-label={`Rating: ${value} out of ${max} stars`}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayValue;

        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={starValue === Math.round(value)}
            aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
            disabled={readOnly}
            className={cn(
              'transition-colors',
              readOnly
                ? 'cursor-default'
                : 'cursor-pointer hover:scale-110',
              filled ? 'text-sand-400' : 'text-charcoal-200',
            )}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
          >
            <svg
              className={SIZES[size]}
              viewBox="0 0 24 24"
              fill={filled ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export { Rating };
export type { RatingProps };
