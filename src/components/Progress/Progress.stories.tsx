import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Progress } from "./Progress";
import styles from "./Progress.stories.module.css";

const progressRef = createRef<HTMLProgressElement>();

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    "aria-label": "Upload progress",
    className: "story-custom-progress",
    id: "upload-progress",
    max: 100,
    value: 40,
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <Progress
          {...args}
          ref={progressRef}
          data-purpose="task-progress"
        />
      </div>
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const progress = within(canvasElement).getByRole("progressbar", {
      name: "Upload progress",
    });

    await expect(progress.tagName).toBe("PROGRESS");
    await expect(progress).toHaveAttribute("value", "40");
    await expect(progress).toHaveAttribute("max", "100");
    await expect(progress).toHaveClass(
      "portfolio-progress",
      "story-custom-progress",
    );
    await expect(progress).toHaveAttribute("id", "upload-progress");
    await expect(progress).toHaveAttribute("data-purpose", "task-progress");
    await expect(progress).not.toHaveAttribute("role");
    await expect(progressRef.current).toBe(progress);
    await expect(progressRef.current).toBeInstanceOf(HTMLProgressElement);
  },
};

export const Determinate: Story = {
  args: {
    "aria-label": "Processing progress",
    max: 200,
    value: 75,
  },
  play: async ({ canvasElement }) => {
    const progress = within(canvasElement).getByRole("progressbar", {
      name: "Processing progress",
    }) as HTMLProgressElement;

    await expect(progress.value).toBe(75);
    await expect(progress.max).toBe(200);
    await expect(progress.position).toBeCloseTo(0.375);
  },
};

export const Indeterminate: Story = {
  args: {
    "aria-label": "Waiting for progress",
    value: undefined,
  },
  play: async ({ canvasElement }) => {
    const progress = within(canvasElement).getByRole("progressbar", {
      name: "Waiting for progress",
    }) as HTMLProgressElement;

    await expect(progress).not.toHaveAttribute("value");
    await expect(progress.position).toBe(-1);
  },
};

export const DifferentValues: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        {[15, 50, 100].map((value) => (
          <div className={styles.example} key={value}>
            <span className={styles.label} id={`progress-${value}-label`}>
              {value}% complete
            </span>
            <Progress
              aria-labelledby={`progress-${value}-label`}
              max={100}
              value={value}
            />
          </div>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const value of [15, 50, 100]) {
      const progress = canvas.getByRole("progressbar", {
        name: `${value}% complete`,
      });

      await expect(progress).toHaveAttribute("value", String(value));
      await expect(progress).toHaveAttribute("max", "100");
    }
  },
};

export const AccessibleLabel: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <span id="report-progress-label">Generating report</span>
        <Progress
          aria-describedby="report-progress-description"
          aria-labelledby="report-progress-label"
          max={10}
          value={6}
        />
        <span id="report-progress-description">Six of ten steps complete.</span>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const progress = within(canvasElement).getByRole("progressbar", {
      name: "Generating report",
    });

    await expect(progress).toHaveAttribute(
      "aria-labelledby",
      "report-progress-label",
    );
    await expect(progress).toHaveAccessibleDescription(
      "Six of ten steps complete.",
    );
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={`${styles.stack} ${styles.narrow}`}>
        <span id="narrow-progress-label">
          Synchronising a deliberately long collection of application records
        </span>
        <Progress
          aria-labelledby="narrow-progress-label"
          max={100}
          value={64}
        />
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
