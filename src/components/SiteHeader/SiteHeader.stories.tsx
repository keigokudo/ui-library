import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { SiteHeader } from "./SiteHeader";
import styles from "./SiteHeader.stories.module.css";

const meta = {
  title: "Portfolio/SiteHeader",
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    brand: "Portfolio",
  },
  render: (args) => (
    <div className={styles.canvas}>
      <SiteHeader {...args} />
    </div>
  ),
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const brand = canvas.getByRole("link", { name: "Portfolio" });
    const work = canvas.getByRole("link", { name: "Work" });
    const about = canvas.getByRole("link", { name: "About" });
    const github = canvas.getByRole("link", { name: "GitHub" });

    await expect(brand).toHaveAttribute("href", "/");
    await expect(canvas.queryByText("KEIGO KUDO")).not.toBeInTheDocument();
    await expect(work).toHaveAttribute("href", "/work");
    await expect(about).toHaveAttribute("href", "/about");
    await expect(github).toHaveAttribute(
      "href",
      "https://github.com/keigokudo",
    );
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", "noopener noreferrer");
    await expect(canvas.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(canvasElement.querySelector("[aria-expanded]")).toBeNull();
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(links).toHaveLength(4);
    for (const link of links) {
      await expect(link).toBeVisible();
    }
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(story?.scrollWidth).toBeLessThanOrEqual(story?.clientWidth ?? 0);
  },
};

export const WorkCurrent: Story = {
  args: {
    currentPath: "/work",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "Work" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(
      canvas.getByRole("link", { name: "About" }),
    ).not.toHaveAttribute("aria-current");
  },
};

export const AccessibleBrandLabel: Story = {
  args: {
    brand: <span aria-hidden="true">P</span>,
    brandAriaLabel: "Home",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  },
};
