import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Container } from "./Container";
import styles from "./Container.stories.module.css";

const meta = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: "The dashed edge marks the standard content boundary.",
    className: styles.previewBoundary,
    id: "container-story",
    title: "Portfolio container boundary",
  },
  render: ({ children, ...args }) => (
    <div className={styles.canvas}>
      <Container {...args}>
        <div className={styles.content}>{children}</div>
      </Container>
    </div>
  ),
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WideViewport: Story = {
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector("#container-story");

    await expect(container).not.toBeNull();
    await expect(container).toHaveTextContent(
      "The dashed edge marks the standard content boundary.",
    );
    await expect(container).toHaveClass(styles.previewBoundary);
    await expect(container).toHaveAttribute(
      "title",
      "Portfolio container boundary",
    );
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
};
