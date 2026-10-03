import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { SectionHeader } from "./SectionHeader";
import styles from "./SectionHeader.stories.module.css";

const meta = {
  title: "Portfolio/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    heading: "SELECTED WORK",
    meta: "Systems · Products · Integrations",
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <SectionHeader {...args} />
    </div>
  ),
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { level: 2, name: "SELECTED WORK" }),
    ).toBeVisible();
    await expect(
      canvas.getByText("Systems · Products · Integrations"),
    ).toBeVisible();
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
      canvas.getByRole("heading", { level: 2, name: "SELECTED WORK" }),
    ).toBeVisible();
    await expect(
      canvas.getByText("Systems · Products · Integrations"),
    ).toBeVisible();
    await expect(story?.scrollWidth).toBeLessThanOrEqual(story?.clientWidth ?? 0);
  },
};
