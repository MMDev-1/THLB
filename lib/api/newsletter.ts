/* ------------------------------------------------------------------ */
/*  Newsletter signup — mock until the email provider is connected.   */
/*  To go live, replace the body with a fetch() to the real endpoint;  */
/*  the signature and result shape stay the same.                      */
/* ------------------------------------------------------------------ */
import { isValidEmail } from '@/lib/email';

import { delay } from './delay';

export type NewsletterSignupError = 'invalid_email' | 'already_subscribed' | 'network';

export type NewsletterSignupResult = { ok: true } | { ok: false; error: NewsletterSignupError };

/** Emails signed up during this browser session (stands in for the provider's list) */
const subscribed = new Set<string>();

export async function subscribeToNewsletter(email: string): Promise<NewsletterSignupResult> {
  await delay(600);

  if (!isValidEmail(email)) return { ok: false, error: 'invalid_email' };

  const normalized = email.trim().toLowerCase();
  if (subscribed.has(normalized)) return { ok: false, error: 'already_subscribed' };

  subscribed.add(normalized);
  return { ok: true };
}
