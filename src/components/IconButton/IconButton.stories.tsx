import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { IconButton } from "./IconButton";
import styles from "./IconButton.stories.module.css";

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="1em"
      viewBox="0 0 16 16"
      width="1em"
    >
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="1em"
      viewBox="0 0 16 16"
      width="1em"
    >
      <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const iconButtonRef = createRef<HTMLButtonElement>();

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: <PlusIcon />,
    "aria-label": "Add item",
    className: "story-custom-icon-button",
    id: "add-item-button",
    title: "Add an item",
    onClick: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <IconButton
        {...args}
        ref={iconButtonRef}
        data-purpose="compact-action"
      />
    </div>
  ),
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Add item" });

    await expect(button.tagName).toBe("BUTTON");
    await expect(button).toHaveAttribute("type", "button");
    await expect(button).toHaveClass(
      "portfolio-action--secondary",
      "portfolio-icon-button--secondary",
      "portfolio-icon-button--md",
      "story-custom-icon-button",
    );
    await expect(button).toHaveAttribute("aria-label", "Add item");
    await expect(button).toHaveAttribute("id", "add-item-button");
    await expect(button).toHaveAttribute("title", "Add an item");
    await expect(button).toHaveAttribute("data-purpose", "compact-action");
    await expect(button).not.toHaveAttribute("role");
    await expect(iconButtonRef.current).toBe(button);
    await expect(iconButtonRef.current).toBeInstanceOf(HTMLButtonElement);

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    button.blur();
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

export const Variants: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <IconButton aria-label="Add primary item" variant="primary">
          <PlusIcon />
        </IconButton>
        <IconButton aria-label="Add secondary item">
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("button", { name: "Add primary item" }),
    ).toHaveClass("portfolio-action--primary");
    await expect(
      canvas.getByRole("button", { name: "Add secondary item" }),
    ).toHaveClass("portfolio-action--secondary");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <IconButton aria-label="Add small item" size="sm">
          <PlusIcon />
        </IconButton>
        <IconButton aria-label="Add medium item" size="md">
          <PlusIcon />
        </IconButton>
        <IconButton aria-label="Add large item" size="lg">
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("button", { name: "Add small item" }),
    ).toHaveClass("portfolio-icon-button--sm");
    await expect(
      canvas.getByRole("button", { name: "Add medium item" }),
    ).toHaveClass("portfolio-icon-button--md");
    await expect(
      canvas.getByRole("button", { name: "Add large item" }),
    ).toHaveClass("portfolio-icon-button--lg");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Add item" });

    await expect(button).toBeDisabled();
    button.click();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const AccessibleLabels: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <IconButton aria-label="Close dialog">
          <CloseIcon />
        </IconButton>
        <span className={styles.label} id="add-control-label">
          Add another item
        </span>
        <IconButton aria-labelledby="add-control-label">
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("button", { name: "Close dialog" }),
    ).toHaveAttribute("aria-label", "Close dialog");
    await expect(
      canvas.getByRole("button", { name: "Add another item" }),
    ).toHaveAttribute("aria-labelledby", "add-control-label");
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={`${styles.row} ${styles.narrow}`}>
        <IconButton aria-label="Previous item">←</IconButton>
        <IconButton aria-label="Close panel">
          <CloseIcon />
        </IconButton>
        <IconButton aria-label="Next item">→</IconButton>
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
