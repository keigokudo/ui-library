import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { IconButton } from "../IconButton/IconButton";
import { Input } from "../Input/Input";
import { Spinner } from "../Spinner/Spinner";
import { VisuallyHidden } from "./VisuallyHidden";
import styles from "./VisuallyHidden.stories.module.css";

const visuallyHiddenRef = createRef<HTMLSpanElement>();

const meta = {
  title: "Components/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: "Additional context for assistive technology.",
    className: "story-custom-visually-hidden",
    id: "assistive-context",
    lang: "en",
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <p className={styles.explanation}>
          The following context remains in the document and accessibility tree,
          but is removed from the visual layout.
        </p>
        <VisuallyHidden
          {...args}
          ref={visuallyHiddenRef}
          data-purpose="assistive-context"
        />
      </div>
    </div>
  ),
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByText(
      "Additional context for assistive technology.",
    );

    await expect(content.tagName).toBe("SPAN");
    await expect(content).toHaveClass(
      "portfolio-visually-hidden",
      "story-custom-visually-hidden",
    );
    await expect(content).toHaveAttribute("id", "assistive-context");
    await expect(content).toHaveAttribute("lang", "en");
    await expect(content).toHaveAttribute(
      "data-purpose",
      "assistive-context",
    );
    await expect(content).not.toHaveAttribute("hidden");
    await expect(content).not.toHaveAttribute("aria-hidden");
    await expect(visuallyHiddenRef.current).toBe(content);
    await expect(visuallyHiddenRef.current).toBeInstanceOf(HTMLSpanElement);
  },
};

export const WithIconButton: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <p className={styles.explanation}>
          The hidden text provides the icon-only button's accessible name.
        </p>
        <IconButton>
          <span aria-hidden="true">×</span>
          <VisuallyHidden>Close dialog</VisuallyHidden>
        </IconButton>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("button", { name: "Close dialog" }),
    ).toBeVisible();
  },
};

export const InStatus: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div aria-live="polite" className={styles.status} role="status">
        <Spinner />
        <VisuallyHidden>Loading results</VisuallyHidden>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole("status");

    await expect(status).toHaveTextContent("Loading results");
    await expect(status.querySelector(".portfolio-spinner")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  },
};

export const AccessibleDescription: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={styles.stack} htmlFor="password-example">
        Password
        <Input
          aria-describedby="password-requirements"
          id="password-example"
          type="password"
        />
      </label>
      <VisuallyHidden id="password-requirements">
        Password must contain at least twelve characters.
      </VisuallyHidden>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText("Password");

    await expect(input).toHaveAccessibleDescription(
      "Password must contain at least twelve characters.",
    );
  },
};
