import type { Meta, StoryObj } from "@storybook/react-vite";

import Header from "./Header";
import { expect, within } from "storybook/test";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logo: {
      control: false, // control: false. autodocs does not handle React.ReactNode well
      description: "Logo element to display",
    },
    navItems: {
      control: "object",
      description: "Array of navigation items",
    },
  },

  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
];

// const navItems = [
//   { label: "Home", href: "#", isActive: true },
//   { label: "About", href: "#" },
//   { label: "Contact", href: "#" },
// ];

export const Default: Story = {
  args: {
    logo: <span>Logo</span>,
    navItems: navItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that Header is rendered. Header's role is banner by default.
    const header = canvas.getByRole("banner");
    await expect(header).toBeInTheDocument();

    // Test that logo is rendered
    const logo = canvas.getByText("Logo");
    await expect(logo).toBeInTheDocument();

    // Test that navigation is rendered. Change the matcher when nav is localized.
    const nav = canvas.getByRole("navigation", { name: /main navigation/i });
    await expect(nav).toBeInTheDocument();

    // Test all navigation items are present
    for (const item of navItems) {
      const navLink = canvas.getByRole("link", { name: item.label });
      await expect(navLink).toBeInTheDocument();
      await expect(navLink).toHaveAttribute("href", item.href);
    }

    // Test mobile menu toggle button is present but not visible on desktop
    const menuToggle = canvas.getByRole("button", {
      name: /toggle navigation/i,
    });
    await expect(menuToggle).toBeInTheDocument();
    await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
  },
};

export const WithoutNav: Story = {
  args: {
    logo: <span>Logo</span>,
  },
};
