import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupItem } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="m">
      {['S', 'M', 'L', 'XL'].map((size) => (
        <div key={size} className="flex items-center gap-2">
          <RadioGroupItem value={size.toLowerCase()} id={`size-${size}`} />
          <label htmlFor={`size-${size}`} className="text-sm text-foreground">
            {size}
          </label>
        </div>
      ))}
    </RadioGroup>
  ),
};
