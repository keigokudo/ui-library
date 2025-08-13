import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn, expect, within, userEvent } from "storybook/test";

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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /contained button/i });
    await expect(button).toHaveTextContent("Contained Button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /outlined button/i });
    await expect(button).toHaveTextContent("Outlined Button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /text button/i });
    await expect(button).toHaveTextContent("Text Button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: {
    variant: "contained",
    children: "Disabled Button",
    disabled: true,
  },
};
