import type { Meta, StoryObj } from "@storybook/react-vite";

import Input from "./Input";

const meta = {
  title: "Example/Input",
  component: Input,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Input Label",
    placeholder: "Type here...",
    variant: "text",
    isFullWidth: true,
  },
};
