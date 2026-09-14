/**
 * Compile-time checks that every Zod schema matches its hand-written type.
 *
 * Each data shape is described twice: in `types/` (used by the app) and in
 * `lib/schemas/` (used by `npm run validate:data`). If the two drift apart,
 * `tsc` and `next build` fail on the line below that names the mismatched
 * pair, with "Type 'false' does not satisfy the constraint 'true'".
 * Fix it by updating the schema or the type so they describe the same shape.
 */
import type { z } from 'zod';

import type {
  Announcement,
  BlogPost,
  CategoryTile,
  CategoryTilesSection,
  Collection,
  CTA,
  HeroMedia,
  HeroSection,
  HomePageData,
  MegaMenuColumn,
  MegaMenuData,
  MegaMenuPromo,
  Navigation,
  NavItem,
  NavLink,
  Page,
  Product,
  ProductCarouselSection,
  ProductImage,
  Review,
  SplitBannerSection,
  ValuePropItem,
  ValuePropsSection,
  Variant,
} from '@/types';

import type { CollectionSchema } from './collection';
import type {
  CategoryTileSchema,
  CategoryTilesSectionSchema,
  CTASchema,
  HeroMediaSchema,
  HeroSectionSchema,
  HomePageDataSchema,
  ProductCarouselSectionSchema,
  SplitBannerSectionSchema,
  ValuePropItemSchema,
  ValuePropsSectionSchema,
} from './home';
import type {
  AnnouncementSchema,
  MegaMenuColumnSchema,
  MegaMenuDataSchema,
  MegaMenuPromoSchema,
  NavigationDataSchema,
  NavItemSchema,
  NavLinkSchema,
} from './navigation';
import type { BlogPostSchema, PageSchema } from './page';
import type { ProductImageSchema, ProductSchema, VariantSchema } from './product';
import type { ReviewSchema } from './review';

/** `true` when A and B accept the same values and have exactly the same keys. */
type Same<A, B> = [A] extends [B]
  ? [B] extends [A]
    ? [keyof A] extends [keyof B]
      ? [keyof B] extends [keyof A]
        ? true
        : false
      : false
    : false
  : false;

type Expect<T extends true> = T;

type Parsed<S extends z.ZodType> = z.infer<S>;

export type SchemaMatchesType = [
  Expect<Same<Parsed<typeof ProductImageSchema>, ProductImage>>,
  Expect<Same<Parsed<typeof VariantSchema>, Variant>>,
  Expect<Same<Parsed<typeof ProductSchema>, Product>>,
  Expect<Same<Parsed<typeof CollectionSchema>, Collection>>,
  Expect<Same<Parsed<typeof PageSchema>, Page>>,
  Expect<Same<Parsed<typeof BlogPostSchema>, BlogPost>>,
  Expect<Same<Parsed<typeof ReviewSchema>, Review>>,
  Expect<Same<Parsed<typeof AnnouncementSchema>, Announcement>>,
  Expect<Same<Parsed<typeof NavLinkSchema>, NavLink>>,
  Expect<Same<Parsed<typeof MegaMenuColumnSchema>, MegaMenuColumn>>,
  Expect<Same<Parsed<typeof MegaMenuPromoSchema>, MegaMenuPromo>>,
  Expect<Same<Parsed<typeof MegaMenuDataSchema>, MegaMenuData>>,
  Expect<Same<Parsed<typeof NavItemSchema>, NavItem>>,
  Expect<Same<Parsed<typeof NavigationDataSchema>, Navigation>>,
  Expect<Same<Parsed<typeof CTASchema>, CTA>>,
  Expect<Same<Parsed<typeof HeroMediaSchema>, HeroMedia>>,
  Expect<Same<Parsed<typeof HeroSectionSchema>, HeroSection>>,
  Expect<Same<Parsed<typeof CategoryTileSchema>, CategoryTile>>,
  Expect<Same<Parsed<typeof CategoryTilesSectionSchema>, CategoryTilesSection>>,
  Expect<Same<Parsed<typeof ProductCarouselSectionSchema>, ProductCarouselSection>>,
  Expect<Same<Parsed<typeof ValuePropItemSchema>, ValuePropItem>>,
  Expect<Same<Parsed<typeof ValuePropsSectionSchema>, ValuePropsSection>>,
  Expect<Same<Parsed<typeof SplitBannerSectionSchema>, SplitBannerSection>>,
  Expect<Same<Parsed<typeof HomePageDataSchema>, HomePageData>>,
];
