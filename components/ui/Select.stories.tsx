import type { Meta, StoryObj } from '@storybook/react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-72">
        <SelectValue placeholder="Choose a size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sizes</SelectLabel>
          <SelectItem value="xs">XS</SelectItem>
          <SelectItem value="s">S</SelectItem>
          <SelectItem value="m">M</SelectItem>
          <SelectItem value="l">L</SelectItem>
          <SelectItem value="xl">XL</SelectItem>
          <SelectItem value="2xl">2XL</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
