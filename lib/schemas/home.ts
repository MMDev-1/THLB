import { z } from 'zod';

/* ---- Shared ---- */

export const CTASchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(['primary', 'secondary']),
});

export const ViewAllLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

/* ---- Sections (each has a `type` that picks its component) ---- */

export const HeroMediaSchema = z.object({
  type: z.enum(['image', 'video']),
  src: z.string().min(1),
  mobileSrc: z.string().min(1).optional(),
  poster: z.string().min(1).optional(),
  alt: z.string(),
});

export const HeroSectionSchema = z.object({
  type: z.literal('hero'),
  media: HeroMediaSchema,
  eyebrow: z.string().optional(),
  headline: z.string().min(1),
  subcopy: z.string().optional(),
  ctas: z.array(CTASchema),
  align: z.enum(['left', 'center']).optional(),
  overlayOpacity: z.number().min(0).max(1).optional(),
});

export const CategoryTileSchema = z.object({
  image: z.string().min(1),
  alt: z.string(),
  label: z.string().min(1),
  href: z.string().min(1),
});

export const CategoryTilesSectionSchema = z.object({
  type: z.literal('categoryTiles'),
  heading: z.string().min(1),
  tiles: z.array(CategoryTileSchema).min(1),
});

export const ProductCarouselSectionSchema = z.object({
  type: z.literal('productCarousel'),
  heading: z.string().min(1),
  viewAll: ViewAllLinkSchema.optional(),
  productHandles: z.array(z.string().min(1)).min(1),
});

export const ValuePropItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  copy: z.string().min(1),
});

export const ValuePropsSectionSchema = z.object({
  type: z.literal('valueProps'),
  items: z.array(ValuePropItemSchema).min(1),
});

export const ReviewsHighlightSectionSchema = z.object({
  type: z.literal('reviewsHighlight'),
  heading: z.string().min(1),
  maxReviews: z.number().int().min(6).max(8),
  minRating: z.number().int().min(1).max(5),
});

export const SplitBannerSectionSchema = z.object({
  type: z.literal('splitBanner'),
  image: z.string().min(1),
  alt: z.string(),
  imageSide: z.enum(['left', 'right']),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  body: z.string().min(1),
  cta: CTASchema,
});

export const UGCTileSchema = z.object({
  image: z.string().min(1),
  alt: z.string().min(1),
  productHandle: z.string().min(1),
});

export const UGCGridSectionSchema = z.object({
  type: z.literal('ugcGrid'),
  heading: z.string().min(1),
  instagramHandle: z.string().regex(/^@[\w.]+$/, 'Handle must look like @name'),
  instagramUrl: z.url(),
  tiles: z.array(UGCTileSchema).length(6),
});

export const NewsletterSectionSchema = z.object({
  type: z.literal('newsletter'),
  heading: z.string().min(1),
  subcopy: z.string().min(1),
  buttonLabel: z.string().min(1),
  successHeading: z.string().min(1),
  successMessage: z.string().min(1),
});

/* ---- Home page ---- */

export const HomeSectionSchema = z.discriminatedUnion('type', [
  HeroSectionSchema,
  CategoryTilesSectionSchema,
  ProductCarouselSectionSchema,
  ValuePropsSectionSchema,
  ReviewsHighlightSectionSchema,
  SplitBannerSectionSchema,
  UGCGridSectionSchema,
  NewsletterSectionSchema,
]);

export const HomePageDataSchema = z.object({
  sections: z.array(HomeSectionSchema).min(1),
});
