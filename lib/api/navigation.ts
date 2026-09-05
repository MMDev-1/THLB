/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
import rawNavigation from '@/data/navigation.json';
import type { Navigation } from '@/types';

import { delay } from './delay';

const navigation = rawNavigation as Navigation;

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Return the full site navigation (header + footer). */
export async function getNavigation(): Promise<Navigation> {
  await delay();
  return navigation;
}
