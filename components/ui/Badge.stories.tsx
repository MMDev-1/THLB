import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'accent', 'destructive', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'New Arrival' },
};

export const Success: Story = {
  args: { children: 'In Stock', variant: 'success' },
};

export const Accent: Story = {
  args: { children: 'Best Seller', variant: 'accent' },
};

export const Destructive: Story = {
  args: { children: 'Last Few', variant: 'destructive' },
};

export const Outline: Story = {
  args: { children: 'Cotton', variant: 'outline' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>New Arrival</Badge>
      <Badge variant="success">In Stock</Badge>
      <Badge variant="accent">Best Seller</Badge>
      <Badge variant="destructive">Last Few</Badge>
      <Badge variant="outline">Cotton</Badge>
    </div>
  ),
};
