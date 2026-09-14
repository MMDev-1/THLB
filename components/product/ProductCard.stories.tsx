import type { Meta, StoryObj } from '@storybook/react';

import { ProductCard } from './ProductCard';
import { cardStates } from './ProductCard.fixtures';

const meta: Meta<typeof ProductCard> = {
  title: 'Product/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => (
      <div style={{ width: 280, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = { args: { product: cardStates.default } };
export const OnSale: Story = { args: { product: cardStates.onSale } };
export const NewArrival: Story = { args: { product: cardStates.newArrival } };
export const SoldOut: Story = { args: { product: cardStates.soldOut } };
export const Bundle: Story = { args: { product: cardStates.bundle } };
export const SingleVariantAddsDirectly: Story = { args: { product: cardStates.singleVariant } };
export const PlaceholderPrice: Story = { args: { product: cardStates.placeholderPrice } };
export const MissingPhoto: Story = { args: { product: cardStates.missingPhoto } };
