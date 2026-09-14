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
  heading: string;
  tiles: CategoryTile[];
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
  items: ValuePropItem[];
}

/* ------------------------------------------------------------------ */
/*  Split Banner                                                       */
/* ------------------------------------------------------------------ */

export interface SplitBannerSection {
  image: string;
  alt: string;
  imageSide: 'left' | 'right';
  eyebrow?: string;
  heading: string;
  body: string;
  cta: CTA;
}

/* ------------------------------------------------------------------ */
/*  Product Carousel                                                   */
/* ------------------------------------------------------------------ */

export interface ProductCarouselSection {
  heading: string;
  /** Optional link to the full list, e.g. a collection page */
  viewAll?: { label: string; href: string };
  /** Products to show, in order, by handle — resolved through getProducts() */
  productHandles: string[];
}

/* ------------------------------------------------------------------ */
/*  Home page data (grows as we add sections)                          */
/* ------------------------------------------------------------------ */

export interface HomePageData {
  hero: HeroSection;
  categoryTiles: CategoryTilesSection;
  productCarousel: ProductCarouselSection;
  valueProps: ValuePropsSection;
  splitBanner: SplitBannerSection;
}
