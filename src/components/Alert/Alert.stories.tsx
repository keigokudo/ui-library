import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Alert } from "./Alert";
import styles from "./Alert.stories.module.css";

const alertRef = createRef<HTMLDivElement>();

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: "Your changes are ready to review.",
    className: "story-custom-alert",
    id: "review-notice",
    "aria-describedby": "review-context",
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <Alert {...args} ref={alertRef} data-purpose="contextual-feedback" />
        <span id="review-context">Review context</span>
      </div>
    </div>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByText("Your changes are ready to review.");

    await expect(alert.tagName).toBe("DIV");
    await expect(alert).toHaveClass(
      "portfolio-feedback-tone--info",
      "portfolio-alert--info",
      "story-custom-alert",
    );
    await expect(alert).not.toHaveAttribute("role");
    await expect(alert).toHaveAttribute("id", "review-notice");
    await expect(alert).toHaveAttribute("aria-describedby", "review-context");
    await expect(alert).toHaveAttribute(
      "data-purpose",
      "contextual-feedback",
    );
    await expect(alertRef.current).toBe(alert);
    await expect(alertRef.current).toBeInstanceOf(HTMLDivElement);
  },
};

export const Tones: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        {(["info", "success", "warning", "error"] as const).map((tone) => (
          <Alert key={tone} title={`${tone} notice`} tone={tone}>
            This message demonstrates the {tone} feedback treatment.
          </Alert>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const tone of ["info", "success", "warning", "error"]) {
      await expect(canvas.getByText(`${tone} notice`)).toBeVisible();
      await expect(
        canvas.getByText(
          `This message demonstrates the ${tone} feedback treatment.`,
        ),
      ).toHaveClass(`portfolio-alert--${tone}`);
    }
  },
};

export const WithTitle: Story = {
  args: {
    title: <span>Check your details</span>,
    tone: "warning",
    children: "Some information needs attention before you continue.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Check your details").closest("strong"),
    ).toHaveClass("portfolio-alert__title");
    await expect(
      canvas.getByText("Some information needs attention before you continue."),
    ).toBeVisible();
  },
};

export const LiveRegionExample: Story = {
  args: {
    role: "alert",
    tone: "error",
    title: "Submission failed",
    children:
      "The consumer explicitly opts into an assertive announcement here.",
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("alert"),
    ).toHaveTextContent("Submission failed");
  },
};

export const RichContent: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <Alert title="Before publishing" tone="info">
        <p className={styles.content}>Confirm the following items:</p>
        <ul className={styles.content}>
          <li>Review the generated package.</li>
          <li>Run the consumer smoke test.</li>
        </ul>
      </Alert>
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
        <Alert title="Integration notice" tone="success">
          The package remains compatible with a deliberately long application
          context and must stay contained within the available viewport.
        </Alert>
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
