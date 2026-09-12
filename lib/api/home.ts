/* ------------------------------------------------------------------ */
/*  Home page data                                                     */
/* ------------------------------------------------------------------ */
import rawHome from '@/data/home.json';
import type { HomePageData } from '@/types';

import { delay } from './delay';

const home = rawHome as HomePageData;

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Return all homepage section data. */
export async function getHomePage(): Promise<HomePageData> {
  await delay();
  return home;
}
