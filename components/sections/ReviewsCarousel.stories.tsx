import type { Meta, StoryObj } from '@storybook/react';

import { sampleReviews } from './homeSections.fixtures';
import { ReviewsCarousel } from './ReviewsCarousel';

const meta: Meta<typeof ReviewsCarousel> = {
  title: 'Sections/ReviewsHighlight',
  component: ReviewsCarousel,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ReviewsCarousel>;

export const Default: Story = {
  args: {
    heading: 'Loved by our customers',
    averageRating: 4.6,
    totalReviews: 151,
    reviews: sampleReviews,
  },
};
