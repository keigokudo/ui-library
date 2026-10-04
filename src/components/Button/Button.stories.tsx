import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "./Button";
import styles from "./Button.stories.module.css";

const buttonRef = createRef<HTMLButtonElement>();

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: "Save",
    className: "story-custom-button",
    id: "save-button",
    name: "intent",
    value: "save",
    title: "Save the current changes",
    form: "settings-form",
    "aria-describedby": "button-description",
    "aria-label": "Save changes",
    onClick: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <Button {...args} ref={buttonRef} data-purpose="release-contract" />
      <p id="button-description" className={styles.description}>
        Saves the current changes.
      </p>
    </div>
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Save changes" });

    await expect(button.tagName).toBe("BUTTON");
    await expect(button).toHaveAttribute("type", "button");
    await expect(button).toHaveClass(
      "portfolio-button",
      "portfolio-button--primary",
      "portfolio-button--md",
      "story-custom-button",
    );
    await expect(button).toHaveAttribute(
      "aria-describedby",
      "button-description",
    );
    await expect(button).toHaveAttribute("id", "save-button");
    await expect(button).toHaveAttribute("name", "intent");
    await expect(button).toHaveAttribute("value", "save");
    await expect(button).toHaveAttribute("title", "Save the current changes");
    await expect(button).toHaveAttribute("form", "settings-form");
    await expect(button).toHaveAttribute("data-purpose", "release-contract");
    await expect(button).not.toHaveAttribute("role");
    await expect(buttonRef.current).toBe(button);
    await expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);

    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};

export const Variants: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "Primary" })).toHaveClass(
      "portfolio-button--primary",
    );
    await expect(
      canvas.getByRole("button", { name: "Secondary" }),
    ).toHaveClass("portfolio-button--secondary");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "Small" })).toHaveClass(
      "portfolio-button--sm",
    );
    await expect(canvas.getByRole("button", { name: "Medium" })).toHaveClass(
      "portfolio-button--md",
    );
    await expect(canvas.getByRole("button", { name: "Large" })).toHaveClass(
      "portfolio-button--lg",
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <Button
          {...args}
          aria-describedby={undefined}
          aria-label="Disabled primary"
        >
          Disabled primary
        </Button>
        <Button
          {...args}
          aria-describedby={undefined}
          aria-label="Disabled secondary"
          variant="secondary"
        >
          Disabled secondary
        </Button>
      </div>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const primary = canvas.getByRole("button", { name: "Disabled primary" });
    const secondary = canvas.getByRole("button", {
      name: "Disabled secondary",
    });

    await expect(primary).toBeDisabled();
    await expect(secondary).toBeDisabled();
    primary.click();
    secondary.click();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const NativeTypes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <Button>Default button</Button>
        <Button type="submit">Submit button</Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("button", { name: "Default button" }),
    ).toHaveAttribute("type", "button");
    await expect(
      canvas.getByRole("button", { name: "Submit button" }),
    ).toHaveAttribute("type", "submit");
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={`${styles.row} ${styles.narrow}`}>
        <Button>Continue</Button>
        <Button variant="secondary">
          Review the complete application before continuing
        </Button>
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
