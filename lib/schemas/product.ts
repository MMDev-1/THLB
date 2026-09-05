import { z } from 'zod';

export const ProductImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const VariantSchema = z.object({
  id: z.string().min(1),
  sku: z.string().min(1),
  colour: z.string().min(1),
  colourHex: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  size: z.string().min(1),
  price: z.number().int().min(0),
  compareAtPrice: z.number().int().min(0).nullable(),
  available: z.boolean(),
  images: z.array(ProductImageSchema).min(1),
});

export const ProductSchema = z.object({
  id: z.string().min(1),
  handle: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  collections: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string()),
  variants: z.array(VariantSchema).min(1),
  featuredImage: ProductImageSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ProductsDataSchema = z.array(ProductSchema);
