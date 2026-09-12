/**
 * Homepage section types.
 * Each section maps to a top-level key in /data/home.json.
 */

/* ------------------------------------------------------------------ */
/*  Shared                                                             */
/* ------------------------------------------------------------------ */

export interface CTA {
  label: string;
  href: string;
  /** "primary" = filled, "secondary" = outlined / ghost */
  variant: 'primary' | 'secondary';
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export interface HeroMedia {
  /** "image" or "video" */
  type: 'image' | 'video';
  /** Desktop (landscape) source */
  src: string;
  /** Mobile (portrait) source — used inside <picture> srcSet or video <source> */
  mobileSrc?: string;
  /** Poster frame for video, or blur placeholder for image */
  poster?: string;
  alt: string;
}

export interface HeroSection {
  media: HeroMedia;
  eyebrow?: string;
  headline: string;
  subcopy?: string;
  ctas: CTA[];
  /** "left" (default) or "center" */
  align?: 'left' | 'center';
  /** Gradient overlay strength 0–1, default 0.45 */
  overlayOpacity?: number;
}

/* ------------------------------------------------------------------ */
/*  Home page data (grows as we add sections)                          */
/* ------------------------------------------------------------------ */

export interface HomePageData {
  hero: HeroSection;
}
