import type { Meta, StoryObj } from "@storybook/react-vite";

import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: { logo: { control: false } }, // autodocs does not handle React.ReactNode well
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export const Default: Story = {
  args: {
    logo: <span>Logo</span>,
    navItems: navItems,
  },
};

export const WithoutNav: Story = {
  args: {
    logo: <span>Logo</span>,
  },
};
