/**
 * Homepage section types.
 * home.json is an ordered list of sections; each section's `type` picks the
 * component that renders it (components/sections/SectionRenderer.tsx).
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

export interface ViewAllLink {
  label: string;
  href: string;
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
  type: 'hero';
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
/*  Category Tiles                                                     */
/* ------------------------------------------------------------------ */

export interface CategoryTile {
  /** Image source — placeholder path until real photos arrive */
  image: string;
  alt: string;
  label: string;
  href: string;
}

export interface CategoryTilesSection {
  type: 'categoryTiles';
  heading: string;
  tiles: CategoryTile[];
}

/* ------------------------------------------------------------------ */
/*  Product Carousel                                                   */
/* ------------------------------------------------------------------ */

export interface ProductCarouselSection {
  type: 'productCarousel';
  heading: string;
  /** Optional link to the full list, e.g. a collection page */
  viewAll?: ViewAllLink;
  /** Products to show, in order, by handle — resolved through getProducts() */
  productHandles: string[];
}

/* ------------------------------------------------------------------ */
/*  Value Props                                                        */
/* ------------------------------------------------------------------ */

export interface ValuePropItem {
  /** lucide-react icon name (PascalCase, e.g. "Truck") */
  icon: string;
  title: string;
  copy: string;
}

export interface ValuePropsSection {
  type: 'valueProps';
  items: ValuePropItem[];
}

/* ------------------------------------------------------------------ */
/*  Reviews Highlight                                                  */
/* ------------------------------------------------------------------ */

export interface ReviewsHighlightSection {
  type: 'reviewsHighlight';
  heading: string;
  /** How many review cards to show (6–8) */
  maxReviews: number;
  /** Only reviews with at least this many stars are featured */
  minRating: number;
}

/* ------------------------------------------------------------------ */
/*  Split Banner                                                       */
/* ------------------------------------------------------------------ */

export interface SplitBannerSection {
  type: 'splitBanner';
  image: string;
  alt: string;
  imageSide: 'left' | 'right';
  eyebrow?: string;
  heading: string;
  body: string;
  cta: CTA;
}

/* ------------------------------------------------------------------ */
/*  UGC Grid                                                           */
/* ------------------------------------------------------------------ */

export interface UGCTile {
  /** Customer photo — placeholder images until real UGC arrives */
  image: string;
  alt: string;
  /** Product the look links to (its PDP) */
  productHandle: string;
}

export interface UGCGridSection {
  type: 'ugcGrid';
  heading: string;
  /** Shown above the grid, e.g. "@thehoodielb" — placeholder until confirmed */
  instagramHandle: string;
  instagramUrl: string;
  tiles: UGCTile[];
}

/* ------------------------------------------------------------------ */
/*  Newsletter                                                         */
/* ------------------------------------------------------------------ */

export interface NewsletterSection {
  type: 'newsletter';
  heading: string;
  subcopy: string;
  buttonLabel: string;
  successHeading: string;
  successMessage: string;
}

/* ------------------------------------------------------------------ */
/*  Home page data                                                     */
/* ------------------------------------------------------------------ */

export type HomeSection =
  | HeroSection
  | CategoryTilesSection
  | ProductCarouselSection
  | ValuePropsSection
  | ReviewsHighlightSection
  | SplitBannerSection
  | UGCGridSection
  | NewsletterSection;

export type HomeSectionType = HomeSection['type'];

export interface HomePageData {
  /** Rendered top to bottom in this order */
  sections: HomeSection[];
}
