import type { Meta, StoryObj } from '@storybook/react';

import { carouselCards } from '@/components/product/ProductCard.fixtures';

import { ProductCarouselTrack } from './ProductCarouselTrack';

const meta: Meta<typeof ProductCarouselTrack> = {
  title: 'Sections/ProductCarousel',
  component: ProductCarouselTrack,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ProductCarouselTrack>;

export const BestSellers: Story = {
  args: {
    heading: 'Best Sellers',
    viewAll: { label: 'View all', href: '/collections/adult-hoodies' },
    products: carouselCards,
  },
};

export const WithoutViewAll: Story = {
  args: { heading: 'You may also like', products: carouselCards.slice(0, 5) },
};
