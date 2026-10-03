import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { PageIntro } from "./PageIntro";
import styles from "./PageIntro.stories.module.css";

const meta = {
  title: "Portfolio/PageIntro",
  component: PageIntro,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    eyebrow: "SELECTED WORK",
    heading: "Selected work, across systems and products.",
    description:
      "A focused set of projects across design systems, search experiences and product engineering.",
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <PageIntro {...args} className={styles.intro} />
    </div>
  ),
} satisfies Meta<typeof PageIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headings = canvas.getAllByRole("heading", { level: 1 });

    await expect(canvas.getByText("SELECTED WORK")).toBeVisible();
    await expect(headings).toHaveLength(1);
    await expect(headings[0]).toHaveTextContent(
      "Selected work, across systems and products.",
    );
    await expect(
      canvas.getByText(
        "A focused set of projects across design systems, search experiences and product engineering.",
      ),
    ).toBeVisible();
    await expect(
      canvasElement.querySelector(".portfolio-page-intro__actions"),
    ).toBeNull();
  },
};

export const WithActions: Story = {
  args: {
    eyebrow: "FULL-STACK SOFTWARE ENGINEER",
    heading: "Thoughtful software, built to last.",
    description:
      "Deep frontend expertise, with practical experience across backend systems, APIs, integrations and cloud platforms.",
    actions: (
      <>
        <a
          className={`${styles.action} ${styles.actionPrimary}`}
          href="#selected-work"
        >
          Selected work
        </a>
        <a className={styles.action} href="/about">
          About me
        </a>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("link", { name: "Selected work" }),
    ).toHaveAttribute("href", "#selected-work");
    await expect(canvas.getByRole("link", { name: "About me" })).toHaveAttribute(
      "href",
      "/about",
    );
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  args: {
    actions: (
      <>
        <a className={styles.action} href="#selected-work">
          Selected work
        </a>
        <a className={styles.action} href="/about">
          About me
        </a>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(
      canvas.getByRole("heading", {
        level: 1,
        name: "Selected work, across systems and products.",
      }),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        "A focused set of projects across design systems, search experiences and product engineering.",
      ),
    ).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Selected work" })).toBeVisible();
    await expect(story?.scrollWidth).toBeLessThanOrEqual(story?.clientWidth ?? 0);
  },
};
