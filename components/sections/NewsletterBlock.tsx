'use client';

import { Check } from 'lucide-react';
import * as React from 'react';

import { useNewsletterSignup } from '@/hooks/useNewsletterSignup';
import type { NewsletterSection } from '@/types';

/* ------------------------------------------------------------------ */
/*  NewsletterBlock — email signup with loading, success and error     */
/*  states. Uses the same useNewsletterSignup() hook as the footer     */
/*  signup (M8). Button and error colours are darker than the stock    */
/*  tokens so the text meets WCAG AA contrast (4.5:1).                 */
/* ------------------------------------------------------------------ */

interface Props {
  data: NewsletterSection;
}

export function NewsletterBlock({ data }: Props) {
  const { email, setEmail, status, error, submit } = useNewsletterSignup();
  const headingId = React.useId();
  const inputId = React.useId();
  const errorId = React.useId();
  const successRef = React.useRef<HTMLHeadingElement>(null);

  /* The form disappears on success — move focus to the confirmation */
  React.useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const submitting = status === 'submitting';

  return (
    <section aria-labelledby={headingId} className="bg-surface-sunken">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center md:py-20">
        {status === 'success' ? (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-100 text-sage-800">
              <Check aria-hidden="true" className="h-6 w-6" />
            </span>
            <h2
              id={headingId}
              ref={successRef}
              tabIndex={-1}
              className="text-[length:var(--font-size-xl)] font-bold leading-tight tracking-tight text-foreground focus:outline-none"
            >
              {data.successHeading}
            </h2>
            <p className="text-charcoal-700">{data.successMessage}</p>
          </>
        ) : (
          <>
            <h2
              id={headingId}
              className="text-[length:var(--font-size-xl)] font-bold leading-tight tracking-tight text-foreground"
            >
              {data.heading}
            </h2>
            <p className="max-w-md text-charcoal-700">{data.subcopy}</p>

            <form
              onSubmit={submit}
              noValidate
              className="mt-2 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <input
                id={inputId}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={status === 'error'}
                aria-describedby={error ? errorId : undefined}
                disabled={submitting}
                className="h-12 min-w-0 flex-1 rounded-md border border-border bg-surface-raised px-4 text-base text-foreground placeholder:text-charcoal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60 aria-[invalid=true]:border-ember-700"
              />
              <button
                type="submit"
                disabled={submitting}
                className="h-12 rounded-md bg-ember-700 px-6 text-base font-semibold text-white transition-colors hover:bg-ember-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? 'Subscribing…' : data.buttonLabel}
              </button>
            </form>

            {/* Always rendered so the height never jumps; role="alert" announces errors */}
            <p id={errorId} role="alert" className="min-h-5 text-sm font-medium text-ember-800">
              {error}
            </p>
          </>
        )}

        {/* Announces progress and success to screen readers */}
        <p role="status" className="sr-only">
          {submitting ? 'Subscribing…' : status === 'success' ? data.successHeading : ''}
        </p>
      </div>
    </section>
  );
}
