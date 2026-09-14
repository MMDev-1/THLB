'use client';

import * as Popover from '@radix-ui/react-popover';
import type * as React from 'react';

import type { QuickAddOption } from '@/types';

/* ------------------------------------------------------------------ */
/*  SizePickerPopover — quick-add size choice. Loaded on demand by     */
/*  ProductCard, so Radix Popover isn't in the page's initial          */
/*  JavaScript. Portaled, so a carousel can't clip it; Radix handles   */
/*  focus, Escape and clicks outside.                                  */
/* ------------------------------------------------------------------ */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The quick-add button that anchors the popover */
  trigger: React.ReactElement;
  productTitle: string;
  colour: string;
  options: QuickAddOption[];
  onPick: (option: QuickAddOption) => void;
}

export function SizePickerPopover({
  open,
  onOpenChange,
  trigger,
  productTitle,
  colour,
  options,
  onPick,
}: Props) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="end"
          sideOffset={8}
          collisionPadding={12}
          className="z-50 w-60 rounded-lg border border-border bg-surface-raised p-3 shadow-lg"
        >
          <p className="mb-2 text-sm font-semibold text-foreground">
            Choose a size <span className="font-normal text-muted">· {colour}</span>
          </p>
          <div
            role="group"
            aria-label={`Sizes for ${productTitle}`}
            className="grid grid-cols-3 gap-2"
          >
            {options.map((option) => (
              <button
                key={option.variantId}
                type="button"
                disabled={!option.available}
                onClick={() => onPick(option)}
                className="h-9 rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:text-muted disabled:line-through"
              >
                {option.label}
                {!option.available && <span className="sr-only"> (sold out)</span>}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
