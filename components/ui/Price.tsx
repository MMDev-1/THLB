import * as React from 'react';

import { cn } from '@/lib/utils';

type PriceProps = {
  /** Current price — pass `null` until the real price is available. */
  amount: number | null;
  /** Original price (for sale display). */
  compareAt?: number | null;
  /** ISO 4217 currency code. Defaults to `USD`. */
  currency?: string;
  /** BCP 47 locale for number formatting. Defaults to `en-US`. */
  locale?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
} as const;

function Price({
  amount,
  compareAt,
  currency = 'USD',
  locale = 'en-US',
  size = 'md',
  className,
}: PriceProps) {
  const fmt = React.useCallback(
    (n: number) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(n),
    [locale, currency],
  );

  if (amount === null) {
    return (
      <span className={cn('text-muted', SIZE_CLASSES[size], className)}>
        —
      </span>
    );
  }

  const onSale = compareAt != null && compareAt > amount;

  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-bold',
          SIZE_CLASSES[size],
          onSale ? 'text-destructive' : 'text-foreground',
        )}
      >
        {fmt(amount)}
      </span>

      {onSale && (
        <span className="text-sm text-muted line-through">
          {fmt(compareAt)}
        </span>
      )}
    </span>
  );
}

export { Price };
export type { PriceProps };
