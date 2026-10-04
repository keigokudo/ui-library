import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Badge } from "./Badge";
import styles from "./Badge.stories.module.css";

const badgeRef = createRef<HTMLSpanElement>();

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: "Draft",
    className: "story-custom-badge",
    id: "document-status",
    title: "Current document status",
    "aria-describedby": "badge-context",
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <Badge {...args} ref={badgeRef} data-purpose="status-label" />
      <span id="badge-context">Document status</span>
    </div>
  ),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Draft");

    await expect(badge.tagName).toBe("SPAN");
    await expect(badge).toHaveClass(
      "portfolio-badge--neutral",
      "story-custom-badge",
    );
    await expect(badge).not.toHaveAttribute("role");
    await expect(badge).toHaveAttribute("id", "document-status");
    await expect(badge).toHaveAttribute("title", "Current document status");
    await expect(badge).toHaveAttribute("aria-describedby", "badge-context");
    await expect(badge).toHaveAttribute("data-purpose", "status-label");
    await expect(badgeRef.current).toBe(badge);
    await expect(badgeRef.current).toBeInstanceOf(HTMLSpanElement);
  },
};

export const Tones: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        {(["neutral", "info", "success", "warning", "error"] as const).map(
          (tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ),
        )}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const tone of ["neutral", "info", "success", "warning", "error"]) {
      await expect(canvas.getByText(tone)).toHaveClass(
        `portfolio-badge--${tone}`,
      );
    }
  },
};

export const LongContent: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <Badge tone="warning">
        Awaiting review from the deployment and accessibility teams
      </Badge>
    </div>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <p className={styles.prose}>
        Package validation <Badge tone="success">Passed</Badge> and publication
        remains <Badge tone="neutral">Manual</Badge>.
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
      <div className={styles.narrow}>
        <Badge tone="info">
          Processing a deliberately long status description within a narrow
          application layout
        </Badge>
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
