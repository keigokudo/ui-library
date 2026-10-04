import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Textarea } from "./Textarea";
import styles from "./Textarea.stories.module.css";

const textareaRef = createRef<HTMLTextAreaElement>();

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    id: "project-notes",
    name: "projectNotes",
    rows: 4,
    maxLength: 240,
    required: true,
    placeholder: "Add implementation notes",
    className: "story-custom-textarea",
    "aria-describedby": "project-notes-description",
    onChange: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="project-notes">
          Project notes
        </label>
        <Textarea
          {...args}
          ref={textareaRef}
          data-purpose="project-context"
        />
        <p className={styles.description} id="project-notes-description">
          Include the context needed for the next person.
        </p>
      </div>
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText("Project notes");

    await expect(textarea.tagName).toBe("TEXTAREA");
    await expect(textarea).toHaveAttribute("rows", "4");
    await expect(textarea).toHaveAttribute("maxlength", "240");
    await expect(textarea).toBeRequired();
    await expect(textarea).toHaveAttribute(
      "placeholder",
      "Add implementation notes",
    );
    await expect(textarea).toHaveAttribute(
      "aria-describedby",
      "project-notes-description",
    );
    await expect(textarea).toHaveAttribute("data-purpose", "project-context");
    await expect(textarea).toHaveClass(
      "portfolio-form-control--md",
      "portfolio-textarea--md",
      "story-custom-textarea",
    );
    await expect(textarea).not.toHaveAttribute("role");
    await expect(textareaRef.current).toBe(textarea);
    await expect(textareaRef.current).toBeInstanceOf(HTMLTextAreaElement);

    await userEvent.type(textarea, "Clear constraints.");
    await expect(textarea).toHaveValue("Clear constraints.");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Small</span>
          <Textarea aria-label="Small textarea" controlSize="sm" rows={3} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Medium</span>
          <Textarea aria-label="Medium textarea" controlSize="md" rows={3} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Large</span>
          <Textarea aria-label="Large textarea" controlSize="lg" rows={3} />
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText("Small textarea")).toHaveClass(
      "portfolio-form-control--sm",
    );
    await expect(canvas.getByLabelText("Medium textarea")).toHaveClass(
      "portfolio-form-control--md",
    );
    await expect(canvas.getByLabelText("Large textarea")).toHaveClass(
      "portfolio-form-control--lg",
    );
  },
};

export const Rows: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Two rows</span>
          <Textarea aria-label="Two row textarea" rows={2} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Six rows</span>
          <Textarea aria-label="Six row textarea" rows={6} />
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText("Two row textarea")).toHaveAttribute(
      "rows",
      "2",
    );
    await expect(canvas.getByLabelText("Six row textarea")).toHaveAttribute(
      "rows",
      "6",
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("Project notes"),
    ).toBeDisabled();
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: "Approved implementation notes remain readable.",
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("Project notes"),
    ).toHaveAttribute("readonly");
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("Project notes"),
    ).toHaveAttribute("aria-invalid", "true");
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={`${styles.field} ${styles.narrow}`}>
        <span className={styles.label}>Release notes</span>
        <Textarea
          aria-label="Release notes"
          defaultValue="A long-form release note must remain contained within a narrow viewport while preserving native vertical resizing."
          rows={6}
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
