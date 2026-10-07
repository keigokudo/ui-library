import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

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
    const home = canvas.getByRole("link", { name: "Home" });
    const work = canvas.getByRole("link", { name: "Work" });
    const about = canvas.getByRole("link", { name: "About" });
    const github = canvas.getByRole("link", { name: "GitHub ↗" });

    await expect(brand).toHaveAttribute("href", "/");
    await expect(canvas.queryByText("KEIGO KUDO")).not.toBeInTheDocument();
    await expect(home).toHaveAttribute("href", "/");
    await expect(canvasElement.querySelectorAll("[aria-current]")).toHaveLength(0);
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
    await userEvent.tab();
    await expect(brand).toHaveFocus();
    await expect(getComputedStyle(brand).outlineStyle).toBe("solid");
    await userEvent.tab();
    await expect(home).toHaveFocus();
    await expect(getComputedStyle(home).outlineWidth).toBe("3px");
  },
};

export const NarrowViewport: Story = {
  args: { brand: "Example Portfolio", currentPath: "/work/react-ui" },
  render: (args) => (
    <div className={`${styles.canvas} ${styles.narrow}`}>
      <SiteHeader {...args} />
    </div>
  ),
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(links).toHaveLength(5);
    for (const link of links) {
      await expect(link).toBeVisible();
    }
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
    await expect(story?.scrollWidth).toBeLessThanOrEqual(story?.clientWidth ?? 0);
  },
};

function activeRouteStory(currentPath: string, activeLabel?: string): Story {
  return {
    args: { currentPath },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const navigation = within(
        canvas.getByRole("navigation", { name: "Primary" }),
      );
      for (const link of navigation.getAllByRole("link")) {
        if (link.textContent === activeLabel) {
          await expect(link).toHaveAttribute("aria-current", "page");
          await expect(getComputedStyle(link).textDecorationLine).toContain(
            "underline",
          );
        } else {
          await expect(link).not.toHaveAttribute("aria-current");
        }
      }
      const brand = canvas.getByRole("link", { name: "Portfolio" });
      if (currentPath === "/") {
        await expect(brand).toHaveAttribute("aria-current", "page");
      } else {
        await expect(brand).not.toHaveAttribute("aria-current");
      }
    },
  };
}

export const HomeCurrent: Story = activeRouteStory("/", "Home");
export const WorkCurrent: Story = activeRouteStory("/work", "Work");
export const NestedWorkCurrent: Story = activeRouteStory(
  "/work/phrase-recall",
  "Work",
);
export const ReactUIWorkCurrent: Story = activeRouteStory("/work/react-ui", "Work");
export const DeepWorkCurrent: Story = activeRouteStory(
  "/work/example/details",
  "Work",
);
export const WorkTrailingSlash: Story = activeRouteStory("/work/", "Work");
export const AboutCurrent: Story = activeRouteStory("/about", "About");
export const UnrelatedPath: Story = activeRouteStory("/workbench");

export const AccessibleBrandLabel: Story = {
  args: {
    brand: <span aria-hidden="true">P</span>,
    brandAriaLabel: "Portfolio home",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "Portfolio home" })).toHaveAttribute(
      "href",
      "/",
    );
  },
};
