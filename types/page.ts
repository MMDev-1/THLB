/**
 * Static page & blog post types.
 */

import type { ProductImage } from './product';

export interface Page {
  slug: string;
  title: string;
  /** HTML content body */
  content: string;
  /** SEO meta description */
  metaDescription: string;
  updatedAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** HTML content body */
  content: string;
  author: string;
  image: ProductImage;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
}
