'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type QuantityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const decrement = () => {
    if (value > min) onChange?.(value - 1);
  };

  const increment = () => {
    if (value < max) onChange?.(value + 1);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!Number.isNaN(num) && num >= min && num <= max) {
      onChange?.(num);
    }
  };

  const btnClass = cn(
    'inline-flex items-center justify-center border border-border bg-surface-raised text-foreground transition-colors',
    'hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    size === 'sm' ? 'h-8 w-8 text-xs' : 'h-10 w-10 text-sm',
  );

  return (
    <div
      className={cn('inline-flex items-center', className)}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        className={cn(btnClass, 'rounded-l-lg')}
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
        </svg>
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleInput}
        disabled={disabled}
        className={cn(
          'w-12 border-y border-border bg-surface-raised text-center text-sm font-medium text-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          size === 'sm' ? 'h-8' : 'h-10',
        )}
        aria-label="Quantity"
      />

      <button
        type="button"
        className={cn(btnClass, 'rounded-r-lg')}
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </button>
    </div>
  );
}

export { QuantityStepper };
export type { QuantityStepperProps };
