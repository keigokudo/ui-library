import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Container } from "../Container/Container";
import { ProjectRow } from "./ProjectRow";
import styles from "./ProjectRow.stories.module.css";

const meta = {
  title: "Portfolio/ProjectRow",
  component: ProjectRow,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    index: "01",
    category: "REUSABLE UI SYSTEM",
    title: "@krnjs/react-ui",
    focus: "Design systems · TypeScript · Storybook · npm",
    href: "/work/react-ui",
    className: "story-custom-project-row",
    id: "project-row-story",
  },
  render: (args) => (
    <div className={styles.canvas}>
      <Container>
        <ProjectRow {...args} />
      </Container>
    </div>
  ),
} satisfies Meta<typeof ProjectRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvasElement.querySelector("#project-row-story");
    const arrow = row?.querySelector("[aria-hidden='true']");

    await expect(row).not.toBeNull();
    await expect(row?.tagName).toBe("A");
    await expect(row).toHaveAttribute("href", "/work/react-ui");
    await expect(row).toHaveClass("story-custom-project-row");
    await expect(canvas.getByText("01")).toBeVisible();
    await expect(canvas.getByText("REUSABLE UI SYSTEM")).toBeVisible();
    await expect(canvas.getByText("@krnjs/react-ui")).toBeVisible();
    await expect(
      canvas.getByText("Design systems · TypeScript · Storybook · npm"),
    ).toBeVisible();
    await expect(arrow).toHaveAttribute("aria-hidden", "true");

    await userEvent.tab();
    await expect(row).toHaveFocus();
  },
};

export const CommercialProject: Story = {
  args: {
    index: "02",
    category: "COMMERCIAL CASE STUDY",
    title: "Ottobock Expert Search",
    focus: "Algolia · Geolocation · Geocoding · Integrations",
    href: "/work/ottobock-expert-search",
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(canvas.getByText("@krnjs/react-ui")).toBeVisible();
    await expect(canvas.getByText("↗")).toBeVisible();
    await expect(story?.scrollWidth).toBeLessThanOrEqual(story?.clientWidth ?? 0);
  },
};
