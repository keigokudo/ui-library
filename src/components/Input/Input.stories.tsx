import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Input } from "./Input";
import styles from "./Input.stories.module.css";

const inputRef = createRef<HTMLInputElement>();

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    id: "profile-name",
    name: "profileName",
    type: "text",
    size: 30,
    required: true,
    placeholder: "Ada Lovelace",
    className: "story-custom-input",
    "aria-describedby": "profile-name-description",
    onChange: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="profile-name">
          Profile name
        </label>
        <Input
          {...args}
          ref={inputRef}
          data-purpose="profile-identity"
        />
        <p className={styles.description} id="profile-name-description">
          Used as the public display name.
        </p>
      </div>
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Profile name");

    await expect(input.tagName).toBe("INPUT");
    await expect(input).toHaveAttribute("type", "text");
    await expect(input).toHaveAttribute("size", "30");
    await expect(input).toBeRequired();
    await expect(input).toHaveAttribute("placeholder", "Ada Lovelace");
    await expect(input).toHaveAttribute(
      "aria-describedby",
      "profile-name-description",
    );
    await expect(input).toHaveAttribute("data-purpose", "profile-identity");
    await expect(input).toHaveClass(
      "portfolio-form-control--md",
      "portfolio-input--md",
      "story-custom-input",
    );
    await expect(input).not.toHaveAttribute("role");
    await expect(inputRef.current).toBe(input);
    await expect(inputRef.current).toBeInstanceOf(HTMLInputElement);

    await userEvent.type(input, "Ada");
    await expect(input).toHaveValue("Ada");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Small</span>
          <Input aria-label="Small input" controlSize="sm" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Medium</span>
          <Input aria-label="Medium input" controlSize="md" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Large</span>
          <Input aria-label="Large input" controlSize="lg" />
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText("Small input")).toHaveClass(
      "portfolio-form-control--sm",
    );
    await expect(canvas.getByLabelText("Medium input")).toHaveClass(
      "portfolio-form-control--md",
    );
    await expect(canvas.getByLabelText("Large input")).toHaveClass(
      "portfolio-form-control--lg",
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText("Profile name")).toBeDisabled();
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "Existing profile name",
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("Profile name"),
    ).toHaveAttribute("readonly");
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    "aria-describedby": "profile-name-description",
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("Profile name"),
    ).toHaveAttribute("aria-invalid", "true");
  },
};

export const InputTypes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        {(["text", "email", "password", "search"] as const).map((type) => (
          <label className={styles.field} key={type}>
            <span className={styles.label}>{type}</span>
            <Input aria-label={`${type} input`} type={type} />
          </label>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const type of ["text", "email", "password", "search"]) {
      await expect(canvas.getByLabelText(`${type} input`)).toHaveAttribute(
        "type",
        type,
      );
    }
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={`${styles.field} ${styles.narrow}`}>
        <span className={styles.label}>Repository URL</span>
        <Input
          aria-label="Repository URL"
          placeholder="https://example.com/a/very/long/repository/location/that/must/remain/contained"
          type="url"
        />
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(story?.scrollWidth).toBeLessThanOrEqual(
      story?.clientWidth ?? 0,
    );
  },
};
