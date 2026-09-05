import rawBlogPosts from '@/data/blog-posts.json';
/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
import rawPages from '@/data/pages.json';
import type { BlogPost, Page } from '@/types';

import { delay } from './delay';

const pages = rawPages as Page[];
const blogPosts = rawBlogPosts as BlogPost[];

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Return a static page by slug, or `null` if not found. */
export async function getPage(slug: string): Promise<Page | null> {
  await delay();
  return pages.find((p) => p.slug === slug) ?? null;
}

/** Return all static pages. */
export async function getPages(): Promise<Page[]> {
  await delay();
  return pages;
}

/** Return a blog post by slug, or `null` if not found. */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  await delay();
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

/** Return all blog posts, newest first. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  await delay();
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
