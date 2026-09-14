import type { Meta, StoryObj } from '@storybook/react';

import { sampleReviews } from './homeSections.fixtures';
import { ReviewCard } from './ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'Sections/ReviewCard',
  component: ReviewCard,
  decorators: [
    (Story) => (
      <div style={{ width: 340, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

export const Verified: Story = { args: { review: sampleReviews[0] } };
export const NotVerified: Story = { args: { review: sampleReviews[2] } };
export const WithoutProduct: Story = { args: { review: { ...sampleReviews[1], product: null } } };
