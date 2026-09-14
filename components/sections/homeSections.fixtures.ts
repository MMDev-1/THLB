/**
 * Sample data for the homepage section stories in Storybook.
 * Images reuse existing files in /public.
 */
import type { NewsletterSection } from '@/types';

import type { ReviewCardData } from './ReviewCard';
import type { UGCTileView } from './UGCGridView';

export const sampleReviews: ReviewCardData[] = [
  {
    id: 'r1',
    rating: 5,
    title: 'Like wearing a warm hug',
    body: 'I bought this for the winter and now I live in it. Soft inside, doesn’t pill, and the hood is actually big enough.',
    author: 'Maya K.',
    verified: true,
    product: { title: 'The Classic Hoodie', href: '/products/classic-hoodie' },
  },
  {
    id: 'r2',
    rating: 5,
    title: 'Perfect gift',
    body: 'Got the couples set for my partner and me. The quality is great and the sizing chart was spot on.',
    author: 'Rami H.',
    verified: true,
    product: { title: 'The Couples Hoodie', href: '/products/couples-hoodie' },
  },
  {
    id: 'r3',
    rating: 4,
    title: 'Super cozy, runs a bit big',
    body: 'Love the fabric. I’d size down if you prefer a closer fit — otherwise, no complaints at all.',
    author: 'Lea S.',
    verified: false,
    product: { title: 'The Oversized Hoodie', href: '/products/oversized-hoodie' },
  },
  {
    id: 'r4',
    rating: 5,
    title: 'The kids won’t take them off',
    body: 'Bought two for my children and they wear them every evening. Washed many times and still soft.',
    author: 'Nour A.',
    verified: true,
    product: { title: 'The Kids Classic Hoodie', href: '/products/kids-classic-hoodie' },
  },
  {
    id: 'r5',
    rating: 5,
    title: 'Movie nights upgraded',
    body: 'The blanket is enormous and so warm. It’s become the most fought-over thing in our living room.',
    author: 'Karim D.',
    verified: true,
    product: { title: 'The Sherpa Blanket', href: '/products/sherpa-blanket' },
  },
  {
    id: 'r6',
    rating: 4,
    title: 'Great slippers',
    body: 'Warm and comfortable with a grippy sole. Took a day or two to break in, now they’re perfect.',
    author: 'Tala M.',
    verified: true,
    product: { title: 'The Classic Slippers', href: '/products/classic-slippers' },
  },
];

export const sampleUGCTiles: UGCTileView[] = [
  {
    image: '/images/categories/category-1.jpg',
    alt: 'Customer in a hoodie',
    productTitle: 'The Classic Hoodie',
    href: '/products/classic-hoodie',
  },
  {
    image: '/images/banners/split-banner.jpg',
    alt: 'Customer lounging',
    productTitle: 'The Oversized Hoodie',
    href: '/products/oversized-hoodie',
  },
  {
    image: '/images/categories/category-2.jpg',
    alt: 'Customer with a blanket',
    productTitle: 'The Sherpa Blanket',
    href: '/products/sherpa-blanket',
  },
  {
    image: '/images/categories/category-3.jpg',
    alt: 'Kids in hoodies',
    productTitle: 'The Kids Classic Hoodie',
    href: '/products/kids-classic-hoodie',
  },
  {
    image: '/images/categories/category-4.jpg',
    alt: 'Cozy accessories',
    productTitle: 'The Classic Slippers',
    href: '/products/classic-slippers',
  },
  {
    image: '/images/hero/hero-mobile.jpg',
    alt: 'Hoodie and slippers set',
    productTitle: 'Hoodie + Slipper Bundle',
    href: '/products/hoodie-slipper-bundle',
  },
];

export const sampleNewsletter: NewsletterSection = {
  type: 'newsletter',
  heading: 'Join the cozy club',
  subcopy:
    'New drops, restocks and members-only offers, straight to your inbox. No spam; unsubscribe anytime.',
  buttonLabel: 'Subscribe',
  successHeading: 'You’re on the list!',
  successMessage: 'Check your inbox for a welcome email.',
};
