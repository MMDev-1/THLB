/**
 * Simulates network latency.
 * When swapping to a real backend, remove this module entirely.
 */
export const delay = (ms = 150) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
