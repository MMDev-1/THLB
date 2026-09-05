import type { Meta, StoryObj } from '@storybook/react';

import { Price } from './Price';

const meta: Meta<typeof Price> = {
  title: 'UI/Price',
  component: Price,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Price>;

export const Default: Story = {
  args: { amount: 59.99 },
};

export const OnSale: Story = {
  args: { amount: 39.99, compareAt: 59.99 },
};

export const Placeholder: Story = {
  args: { amount: null },
};

export const Large: Story = {
  args: { amount: 89.0, size: 'lg' },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Price amount={59.99} size="sm" />
      <Price amount={59.99} size="md" />
      <Price amount={59.99} size="lg" />
    </div>
  ),
};
