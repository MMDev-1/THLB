'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Rating',
  component: Rating,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    readOnly: { control: 'boolean' },
    max: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
};

function InteractiveDemo() {
  const [val, setVal] = useState(3);
  return (
    <div className="space-y-2">
      <Rating value={val} onChange={setVal} />
      <p className="text-sm text-muted">Selected: {val} / 5</p>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      <Rating value={4} readOnly size="sm" />
      <Rating value={4} readOnly size="md" />
      <Rating value={4} readOnly size="lg" />
    </div>
  ),
};
