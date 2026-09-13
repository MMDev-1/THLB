import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'you@example.com' },
};

export const WithLabel: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <label className="text-sm font-medium text-foreground">Email address</label>
      <Input type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Error: Story = {
  args: { placeholder: 'you@example.com', error: true, defaultValue: 'bad-email' },
};

export const Disabled: Story = {
  args: { placeholder: 'Disabled input', disabled: true },
};
