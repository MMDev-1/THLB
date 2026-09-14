import { z } from 'zod';

export const CTASchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(['primary', 'secondary']),
});

export const HeroMediaSchema = z.object({
  type: z.enum(['image', 'video']),
  src: z.string().min(1),
  mobileSrc: z.string().min(1).optional(),
  poster: z.string().min(1).optional(),
  alt: z.string(),
});

export const HeroSectionSchema = z.object({
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
  heading: z.string().min(1),
  tiles: z.array(CategoryTileSchema).min(1),
});

export const ProductCarouselSectionSchema = z.object({
  heading: z.string().min(1),
  viewAll: z.object({ label: z.string().min(1), href: z.string().min(1) }).optional(),
  productHandles: z.array(z.string().min(1)).min(1),
});

export const ValuePropItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  copy: z.string().min(1),
});

export const ValuePropsSectionSchema = z.object({
  items: z.array(ValuePropItemSchema).min(1),
});

export const SplitBannerSectionSchema = z.object({
  image: z.string().min(1),
  alt: z.string(),
  imageSide: z.enum(['left', 'right']),
  eyebrow: z.string().optional(),
  heading: z.string().min(1),
  body: z.string().min(1),
  cta: CTASchema,
});

export const HomePageDataSchema = z.object({
  hero: HeroSectionSchema,
  categoryTiles: CategoryTilesSectionSchema,
  productCarousel: ProductCarouselSectionSchema,
  valueProps: ValuePropsSectionSchema,
  splitBanner: SplitBannerSectionSchema,
});
