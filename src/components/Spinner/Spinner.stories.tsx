import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Spinner } from "./Spinner";
import styles from "./Spinner.stories.module.css";

const spinnerRef = createRef<HTMLSpanElement>();

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    className: "story-custom-spinner",
    id: "loading-indicator",
    title: "Decorative loading indicator",
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <Spinner {...args} ref={spinnerRef} data-purpose="loading-visual" />
    </div>
  ),
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector(".portfolio-spinner");

    await expect(spinner?.tagName).toBe("SPAN");
    await expect(spinner).toHaveClass(
      "portfolio-spinner--md",
      "story-custom-spinner",
    );
    await expect(spinner).toHaveAttribute("aria-hidden", "true");
    await expect(spinner).toHaveAttribute("id", "loading-indicator");
    await expect(spinner).toHaveAttribute(
      "title",
      "Decorative loading indicator",
    );
    await expect(spinner).toHaveAttribute("data-purpose", "loading-visual");
    await expect(spinnerRef.current).toBe(spinner);
    await expect(spinnerRef.current).toBeInstanceOf(HTMLSpanElement);
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const size of ["sm", "md", "lg"]) {
      await expect(
        canvasElement.querySelector(`.portfolio-spinner--${size}`),
      ).not.toBeNull();
    }
  },
};

export const InStatus: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div aria-live="polite" className={styles.status} role="status">
        <Spinner />
        <span>Loading results…</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole("status");
    const spinner = status.querySelector(".portfolio-spinner");

    await expect(status).toHaveTextContent("Loading results…");
    await expect(spinner).toHaveAttribute("aria-hidden", "true");
  },
};

export const InButtonLikeContext: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.buttonLike}>
        <Spinner size="sm" />
        <span>Saving</span>
      </div>
    </div>
  ),
};

export const ReducedMotionDocumentation: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <Spinner />
      <p className={styles.documentation}>
        With reduced motion enabled, rotation stops and the indicator remains
        visible as a stable broken ring.
      </p>
    </div>
  ),
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={`${styles.status} ${styles.narrow}`} role="status">
        <Spinner />
        <span>Loading the complete application status and validation data…</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(story?.scrollWidth).toBeLessThanOrEqual(
      story?.clientWidth ?? 0,
    );
  },
};
