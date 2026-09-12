import { z } from 'zod';

import { ProductImageSchema } from './product';

export const PageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  metaDescription: z.string(),
  updatedAt: z.string().datetime(),
});

export const BlogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  image: ProductImageSchema,
  tags: z.array(z.string()),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const PagesDataSchema = z.array(PageSchema);
export const BlogPostsDataSchema = z.array(BlogPostSchema);
