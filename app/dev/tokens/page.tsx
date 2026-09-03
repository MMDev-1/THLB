import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design Tokens',
  robots: 'noindex',
};

/* ------------------------------------------------------------------ */
/*  Colour swatch helpers                                              */
/* ------------------------------------------------------------------ */

const BRAND_SCALES = [
  {
    name: 'Charcoal',
    prefix: 'charcoal',
    desc: 'Primary text & dark backgrounds',
  },
  {
    name: 'Sand',
    prefix: 'sand',
    desc: 'Warm accent & highlights',
  },
  {
    name: 'Cream',
    prefix: 'cream',
    desc: 'Surface & page backgrounds',
  },
  {
    name: 'Ember',
    prefix: 'ember',
    desc: 'CTA & primary actions (burnt orange)',
  },
  {
    name: 'Sage',
    prefix: 'sage',
    desc: 'Success states & secondary accents',
  },
] as const;

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

function ColourRow({ prefix, name, desc }: { prefix: string; name: string; desc: string }) {
  return (
    <div className="mb-8">
      <h3 className="text-md font-semibold text-foreground">{name}</h3>
      <p className="text-sm text-muted mb-3">{desc}</p>
      <div className="grid grid-cols-11 gap-1">
        {STEPS.map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className="h-12 w-full rounded-md border border-border"
              style={{ backgroundColor: `var(--color-${prefix}-${step})` }}
            />
            <span className="mt-1 text-xs text-muted">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Semantic colour block                                              */
/* ------------------------------------------------------------------ */

const SEMANTIC_PAIRS = [
  { token: 'background', label: 'Background' },
  { token: 'foreground', label: 'Foreground' },
  { token: 'surface', label: 'Surface' },
  { token: 'surface-raised', label: 'Surface Raised' },
  { token: 'surface-sunken', label: 'Surface Sunken' },
  { token: 'border', label: 'Border' },
  { token: 'border-strong', label: 'Border Strong' },
  { token: 'muted', label: 'Muted' },
  { token: 'accent', label: 'Accent' },
  { token: 'primary', label: 'Primary (CTA)' },
  { token: 'primary-hover', label: 'Primary Hover' },
  { token: 'success', label: 'Success' },
  { token: 'destructive', label: 'Destructive' },
  { token: 'ring', label: 'Ring / Focus' },
] as const;

/* ------------------------------------------------------------------ */
/*  Typography samples                                                 */
/* ------------------------------------------------------------------ */

const TYPE_SCALE = [
  { token: '3xl', label: '3xl — Hero' },
  { token: '2xl', label: '2xl — Display' },
  { token: 'xl', label: 'xl — Heading 1' },
  { token: 'lg', label: 'lg — Heading 2' },
  { token: 'md', label: 'md — Heading 3' },
  { token: 'base', label: 'base — Body' },
  { token: 'sm', label: 'sm — Small' },
  { token: 'xs', label: 'xs — Caption' },
] as const;

/* ------------------------------------------------------------------ */
/*  Shadow samples                                                     */
/* ------------------------------------------------------------------ */

const SHADOWS = ['xs', 'sm', 'md', 'lg', 'xl', 'inner'] as const;

/* ------------------------------------------------------------------ */
/*  Radius samples                                                     */
/* ------------------------------------------------------------------ */

const RADII = [
  { token: 'none', css: 'var(--radius-none)' },
  { token: 'sm', css: 'var(--radius-sm)' },
  { token: 'md', css: 'var(--radius-md)' },
  { token: 'lg', css: 'var(--radius-lg)' },
  { token: 'xl', css: 'var(--radius-xl)' },
  { token: '2xl', css: 'var(--radius-2xl)' },
  { token: 'full', css: 'var(--radius-full)' },
] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TokensPage() {
  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <header className="mb-12 max-w-5xl mx-auto">
        <p className="text-sm font-medium tracking-widest text-muted uppercase mb-2">
          Dev / Design System
        </p>
        <h1 className="text-2xl font-bold text-foreground">The Hoodie LB — Token Reference</h1>
        <p className="text-base text-muted mt-2">
          All CSS custom properties and Tailwind utilities generated from the Warm&nbsp;&amp;&nbsp;Cozy
          palette.
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-16">
        {/* ---- Colour Scales ---- */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            Colour Scales
          </h2>
          {BRAND_SCALES.map((scale) => (
            <ColourRow key={scale.prefix} {...scale} />
          ))}
        </section>

        {/* ---- Semantic Colours ---- */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            Semantic Colours
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SEMANTIC_PAIRS.map(({ token, label }) => (
              <div key={token} className="flex items-center gap-3">
                <div
                  className="h-10 w-10 shrink-0 rounded-md border border-border"
                  style={{ backgroundColor: `var(--color-${token})` }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted">--color-{token}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Typography ---- */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            Typography Scale (fluid&nbsp;clamp)
          </h2>
          <div className="space-y-4">
            {TYPE_SCALE.map(({ token, label }) => (
              <div key={token} className="flex items-baseline gap-6">
                <span className="w-36 shrink-0 text-xs text-muted font-mono">{label}</span>
                <span
                  className="text-foreground font-semibold"
                  style={{ fontSize: `var(--font-size-${token})` }}
                >
                  The Hoodie LB
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Shadows ---- */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            Shadows
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {SHADOWS.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-full rounded-lg bg-surface-raised"
                  style={{ boxShadow: `var(--shadow-${s})` }}
                />
                <span className="text-xs text-muted font-mono">shadow-{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Radii ---- */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            Border Radius
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-6">
            {RADII.map(({ token, css }) => (
              <div key={token} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 bg-accent"
                  style={{ borderRadius: css }}
                />
                <span className="text-xs text-muted font-mono">radius-{token}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Spacing ---- */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            Spacing (4-px base)
          </h2>
          <div className="flex flex-wrap items-end gap-2">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32].map((n) => (
              <div key={n} className="flex flex-col items-center gap-1">
                <div
                  className="bg-accent rounded-sm"
                  style={{ width: `var(--space-${n})`, height: `var(--space-${n})` }}
                />
                <span className="text-xs text-muted font-mono">{n}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Component Previews ---- */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            Component Samples
          </h2>

          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-3">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-raised px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-sunken"
                >
                  View Details
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
                >
                  Wishlist
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground transition-colors hover:opacity-90"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Card */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-3">Product Card</h3>
              <div className="w-72 rounded-xl border border-border bg-surface-raised shadow-md overflow-hidden">
                <div className="aspect-square bg-surface-sunken flex items-center justify-center">
                  <span className="text-muted text-sm">Product Image Placeholder</span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="text-base font-semibold text-foreground">Classic Hoodie</h4>
                  <p className="text-sm text-muted">Cozy oversized fit</p>
                  <p className="text-md font-bold text-primary">$XX.XX</p>
                  <button
                    type="button"
                    className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Input */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-3">Form Input</h3>
              <div className="max-w-sm space-y-2">
                <label className="text-sm font-medium text-foreground">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  readOnly
                  className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Badge */}
            <div>
              <h3 className="text-md font-semibold text-foreground mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  New Arrival
                </span>
                <span className="inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                  In Stock
                </span>
                <span className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
                  Best Seller
                </span>
                <span className="inline-flex items-center rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                  Last Few
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-border py-6 text-center text-xs text-muted max-w-5xl mx-auto">
        This page is hidden from search engines (noindex). Visit{' '}
        <code className="font-mono text-foreground">/dev/tokens</code> during development only.
      </footer>
    </div>
  );
}
