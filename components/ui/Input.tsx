import * as React from 'react';

import { cn } from '@/lib/utils';

type InputProps = React.ComponentProps<'input'> & {
  error?: boolean;
};

function Input({ className, type = 'text', error, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border bg-surface-raised px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        error
          ? 'border-destructive focus:ring-destructive'
          : 'border-border',
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };
