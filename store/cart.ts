/**
 * Minimal client-side cart store (in memory for now).
 *
 * The full cart — drawer, quantities, persistence — arrives with the cart
 * task. This gives quick-add somewhere real to put items and lets the header
 * show a live count. Read it with `useCartCount()`; write with `addToCart()`.
 */
import { useSyncExternalStore } from 'react';

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

let lines: CartLine[] = [];
let itemCount = 0;
const listeners = new Set<() => void>();

function emit() {
  itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Add a variant to the cart, or increase its quantity if it's already there. */
export function addToCart(item: { productId: string; variantId: string }, quantity = 1) {
  const existing = lines.find((line) => line.variantId === item.variantId);
  lines = existing
    ? lines.map((line) =>
        line === existing ? { ...line, quantity: line.quantity + quantity } : line,
      )
    : [...lines, { ...item, quantity }];
  emit();
}

export function getCartLines(): readonly CartLine[] {
  return lines;
}

/** Total number of items in the cart. The server render and hydration always see 0. */
export function useCartCount(): number {
  return useSyncExternalStore(
    subscribe,
    () => itemCount,
    () => 0,
  );
}
