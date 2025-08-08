import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Button from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["contained", "outlined", "text"],
      description: "Button style variant",
      defaultValue: "contained",
    },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    variant: "contained",
    children: "Contained Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "contained",
    children: "Disabled Button",
    disabled: true,
  },
};
