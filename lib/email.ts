/**
 * Lightweight email check for forms.
 *
 * Deliberately not Zod: this runs in the browser, and importing a validation
 * library into a client component ships the whole library (~80 KB) with the
 * page. Accepts the usual name@domain.tld shape; the email provider does the
 * final check once a real backend is connected.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}
