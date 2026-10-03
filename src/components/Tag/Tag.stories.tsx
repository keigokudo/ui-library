import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Tag } from "./Tag";
import styles from "./Tag.stories.module.css";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: "React",
    className: "story-custom-tag",
    id: "tag-story",
    title: "Technology tag",
  },
  render: (args) => (
    <div className={styles.canvas}>
      <Tag {...args} />
    </div>
  ),
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const tag = canvasElement.querySelector("#tag-story");

    await expect(tag).not.toBeNull();
    await expect(tag).toHaveTextContent("React");
    await expect(tag).toHaveClass("story-custom-tag");
    await expect(tag).toHaveAttribute("title", "Technology tag");
    await expect(tag?.tagName).toBe("SPAN");
    await expect(tag).not.toHaveAttribute("role");
    await expect(tag).not.toHaveAttribute("tabindex");
  },
};

export const Group: Story = {
  render: () => (
    <div className={styles.canvas}>
      <div className={styles.group}>
        <Tag>React</Tag>
        <Tag>TypeScript</Tag>
        <Tag>Node.js</Tag>
      </div>
    </div>
  ),
};

export const LongLabel: Story = {
  args: {
    children: "Design systems and component architecture",
  },
};
