/**
 * Sample card data for Storybook. The real catalogue has placeholder prices
 * and no photos yet, so these fixtures show every state the card supports.
 * Images reuse existing files in /public.
 */
import type { ProductCardData, QuickAddOption } from '@/types';

const sizes = (soldOut: string[] = []): QuickAddOption[] =>
  ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => ({
    variantId: `demo-${size}`,
    label: size,
    available: !soldOut.includes(size),
  }));

export const baseCard: ProductCardData = {
  id: 'demo-classic',
  handle: 'classic-hoodie',
  title: 'The Classic Hoodie',
  href: '/products/classic-hoodie',
  colour: 'Charcoal',
  image: {
    src: '/images/categories/category-1.jpg',
    alt: 'The Classic Hoodie in Charcoal',
    width: 800,
    height: 1000,
  },
  hoverImage: { src: '/images/categories/category-2.jpg', alt: '', width: 800, height: 1000 },
  badge: null,
  price: 4900,
  compareAtPrice: null,
  percentOff: null,
  swatches: [
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Navy', hex: '#1F2A44' },
    { name: 'Oatmeal', hex: '#D8CAB0' },
    { name: 'Forest', hex: '#2F4F3A' },
    { name: 'Dusty Rose', hex: '#D4A5A5' },
  ],
  extraSwatchCount: 3,
  quickAdd: { kind: 'choose', options: sizes(['XL']) },
  rating: { average: 4.6, count: 128 },
};

export const cardStates: Record<string, ProductCardData> = {
  default: baseCard,
  onSale: {
    ...baseCard,
    id: 'demo-sale',
    title: 'The Zip-Up Hoodie',
    badge: 'sale',
    price: 3900,
    compareAtPrice: 5200,
    percentOff: 25,
  },
  newArrival: {
    ...baseCard,
    id: 'demo-new',
    title: 'The Oversized Hoodie',
    badge: 'new',
    extraSwatchCount: 0,
  },
  soldOut: {
    ...baseCard,
    id: 'demo-sold-out',
    title: 'The Fleece-Lined Hoodie',
    badge: 'sold-out',
    quickAdd: { kind: 'unavailable' },
  },
  bundle: {
    ...baseCard,
    id: 'demo-bundle',
    title: 'Hoodie + Slipper Bundle',
    badge: 'bundle',
    price: 7900,
    image: { ...baseCard.image, src: '/images/categories/category-3.jpg' },
    hoverImage: { ...baseCard.image, src: '/images/categories/category-4.jpg' },
  },
  singleVariant: {
    ...baseCard,
    id: 'demo-blanket',
    title: 'Sherpa Blanket',
    swatches: [{ name: 'Oatmeal', hex: '#D8CAB0' }],
    extraSwatchCount: 0,
    quickAdd: { kind: 'direct', variantId: 'demo-blanket-os' },
    rating: { average: 4.9, count: 42 },
  },
  placeholderPrice: { ...baseCard, id: 'demo-placeholder', price: null, rating: null },
  missingPhoto: {
    ...baseCard,
    id: 'demo-missing',
    title: 'The Pocket Hoodie',
    image: { ...baseCard.image, src: '/images/products/does-not-exist.webp' },
    hoverImage: null,
  },
};

/** Eight cards for carousel stories */
export const carouselCards: ProductCardData[] = Object.values(cardStates);
