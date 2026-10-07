import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

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
    const github = canvas.getByRole("link", { name: "GitHub ↗" });

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
    await expect(
      canvas.queryByRole("link", { name: "LinkedIn ↗" }),
    ).not.toBeInTheDocument();
  },
};

const exampleIdentity = "Alex Example · Developer";
const exampleGithub = "https://github.com/example";
const exampleLinkedin = "https://www.linkedin.com/in/example";

export const ConfigurableIdentity: Story = {
  args: {
    identity: exampleIdentity,
    githubHref: exampleGithub,
    linkedinHref: exampleLinkedin,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("contentinfo")).toBeVisible();
    await expect(canvas.getByText(exampleIdentity)).toBeVisible();
    await expect(
      canvas.queryByText("Let’s build something that lasts."),
    ).not.toBeInTheDocument();
    const contact = within(canvas.getByRole("navigation", { name: "Contact" }));
    for (const [label, href] of [
      ["GitHub ↗", exampleGithub],
      ["LinkedIn ↗", exampleLinkedin],
    ]) {
      const link = contact.getByRole("link", { name: label });
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await userEvent.tab();
      await expect(link).toHaveFocus();
      await expect(getComputedStyle(link).outlineStyle).toBe("solid");
      await expect(getComputedStyle(link).outlineWidth).toBe("3px");
    }
  },
};

export const NarrowViewport: Story = {
  args: ConfigurableIdentity.args,
  render: (args) => (
    <div className={`${styles.canvas} ${styles.narrow}`}>
      <SiteFooter {...args} />
    </div>
  ),
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const story = canvasElement.querySelector(`.${styles.canvas}`);
    await expect(canvas.getByText(exampleIdentity)).toBeVisible();
    for (const link of canvas.getAllByRole("link")) {
      await expect(link).toBeVisible();
    }
    await expect(story?.scrollWidth).toBeLessThanOrEqual(story?.clientWidth ?? 0);
  },
};
