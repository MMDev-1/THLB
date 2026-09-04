import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx — use this instead of raw `className` joins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
