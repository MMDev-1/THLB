/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
import rawNavigation from '@/data/navigation.json';
import type { Announcement, Navigation } from '@/types';

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

/** Return the announcement bar messages. */
export async function getAnnouncements(): Promise<Announcement[]> {
  await delay();
  return navigation.announcements;
}
