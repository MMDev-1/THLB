import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="notify" {...args} />
      <label htmlFor="notify" className="text-sm text-foreground">
        Email notifications
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="disabled-switch" {...args} />
      <label htmlFor="disabled-switch" className="text-sm text-muted">
        Disabled
      </label>
    </div>
  ),
};
