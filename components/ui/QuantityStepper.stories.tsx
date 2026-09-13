'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { QuantityStepper } from './QuantityStepper';

const meta: Meta<typeof QuantityStepper> = {
  title: 'UI/QuantityStepper',
  component: QuantityStepper,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof QuantityStepper>;

function DefaultDemo() {
  const [qty, setQty] = useState(1);
  return <QuantityStepper value={qty} onChange={setQty} />;
}

export const Default: Story = {
  render: () => <DefaultDemo />,
};

function SmallDemo() {
  const [qty, setQty] = useState(2);
  return <QuantityStepper value={qty} onChange={setQty} size="sm" />;
}

export const Small: Story = {
  render: () => <SmallDemo />,
};

export const Disabled: Story = {
  args: { value: 1, disabled: true },
};

function WithMinMaxDemo() {
  const [qty, setQty] = useState(1);
  return (
    <div className="space-y-2">
      <QuantityStepper value={qty} onChange={setQty} min={1} max={5} />
      <p className="text-xs text-muted">Max 5 per order</p>
    </div>
  );
}

export const WithMinMax: Story = {
  render: () => <WithMinMaxDemo />,
};
