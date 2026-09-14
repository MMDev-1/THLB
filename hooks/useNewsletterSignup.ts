import { type FormEvent, useCallback, useState } from 'react';

import { type NewsletterSignupError, subscribeToNewsletter } from '@/lib/api/newsletter';
import { isValidEmail } from '@/lib/email';

export type NewsletterStatus = 'idle' | 'submitting' | 'success' | 'error';

const ERROR_MESSAGES: Record<NewsletterSignupError, string> = {
  invalid_email: 'Enter a valid email address, like name@example.com.',
  already_subscribed: 'You’re already subscribed with this email.',
  network: 'We couldn’t sign you up just now. Please try again.',
};

/**
 * Newsletter signup state — shared by the homepage NewsletterBlock and the
 * footer signup (M8), so both validate and report errors the same way.
 */
export function useNewsletterSignup() {
  const [email, setEmailValue] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  /** Editing the field clears a previous error */
  const setEmail = useCallback((value: string) => {
    setEmailValue(value);
    setStatus((current) => (current === 'error' ? 'idle' : current));
    setError(null);
  }, []);

  const submit = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault();
      if (status === 'submitting') return;

      const value = email.trim();
      if (!isValidEmail(value)) {
        setStatus('error');
        setError(ERROR_MESSAGES.invalid_email);
        return;
      }

      setStatus('submitting');
      setError(null);
      try {
        const result = await subscribeToNewsletter(value);
        if (result.ok) {
          setStatus('success');
        } else {
          setStatus('error');
          setError(ERROR_MESSAGES[result.error]);
        }
      } catch {
        setStatus('error');
        setError(ERROR_MESSAGES.network);
      }
    },
    [email, status],
  );

  return { email, setEmail, status, error, submit };
}
