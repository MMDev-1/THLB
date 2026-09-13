import * as React from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  error?: boolean;
};

function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border bg-surface-raised px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors resize-y',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
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

export { Textarea };
export type { TextareaProps };
