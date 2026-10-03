import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { SiteFooter } from "./SiteFooter";
import styles from "./SiteFooter.stories.module.css";

const meta = {
  title: "Portfolio/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  render: (args) => (
    <div className={styles.canvas}>
      <SiteFooter {...args} />
    </div>
  ),
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const github = canvas.getByRole("link", { name: "GitHub" });

    await expect(canvas.getByRole("contentinfo")).toBeVisible();
    await expect(
      canvas.getByText("Let’s build something that lasts."),
    ).toBeVisible();
    await expect(canvas.getByRole("navigation", { name: "Contact" })).toBeVisible();
    await expect(github).toHaveAttribute(
      "href",
      "https://github.com/keigokudo",
    );
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", "noopener noreferrer");
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(
      canvas.getByText("Let’s build something that lasts."),
    ).toBeVisible();
    await expect(canvas.getByRole("link", { name: "GitHub" })).toBeVisible();
    await expect(story?.scrollWidth).toBeLessThanOrEqual(story?.clientWidth ?? 0);
  },
};
