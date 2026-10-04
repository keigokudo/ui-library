import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Select } from "./Select";
import styles from "./Select.stories.module.css";

const selectRef = createRef<HTMLSelectElement>();

const projectOptions = (
  <>
    <option disabled value="">
      Choose a project
    </option>
    <option value="react-ui">React UI</option>
    <option value="expert-search">Expert Search</option>
  </>
);

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: projectOptions,
    id: "active-project",
    name: "activeProject",
    defaultValue: "",
    required: true,
    className: "story-custom-select",
    "aria-describedby": "active-project-description",
    onChange: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="active-project">
          Active project
        </label>
        <Select
          {...args}
          ref={selectRef}
          data-purpose="project-selection"
        />
        <p className={styles.description} id="active-project-description">
          Choose the project to open.
        </p>
      </div>
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText("Active project");

    await expect(select.tagName).toBe("SELECT");
    await expect(canvas.getAllByRole("option")).toHaveLength(3);
    await expect(select).toHaveValue("");
    await expect(select).toBeRequired();
    await expect(select).toHaveAttribute(
      "aria-describedby",
      "active-project-description",
    );
    await expect(select).toHaveAttribute("data-purpose", "project-selection");
    await expect(select).toHaveClass(
      "portfolio-form-control--md",
      "portfolio-select--md",
      "story-custom-select",
    );
    await expect(select).not.toHaveAttribute("role");
    await expect(selectRef.current).toBe(select);
    await expect(selectRef.current).toBeInstanceOf(HTMLSelectElement);

    await userEvent.selectOptions(select, "expert-search");
    await expect(select).toHaveValue("expert-search");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        {(["sm", "md", "lg"] as const).map((controlSize) => (
          <label className={styles.field} key={controlSize}>
            <span className={styles.label}>{controlSize}</span>
            <Select
              aria-label={`${controlSize} select`}
              controlSize={controlSize}
              defaultValue="react-ui"
            >
              {projectOptions}
            </Select>
          </label>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const controlSize of ["sm", "md", "lg"]) {
      await expect(canvas.getByLabelText(`${controlSize} select`)).toHaveClass(
        `portfolio-form-control--${controlSize}`,
      );
    }
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("Active project"),
    ).toBeDisabled();
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("Active project"),
    ).toHaveAttribute("aria-invalid", "true");
  },
};

export const Multiple: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={styles.field}>
        <span className={styles.label}>Visible projects</span>
        <Select
          aria-label="Visible projects"
          defaultValue={["react-ui", "expert-search"]}
          multiple
        >
          <option value="react-ui">React UI</option>
          <option value="expert-search">Expert Search</option>
          <option value="phrase-recall">PhraseRecall</option>
        </Select>
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText("Visible projects");

    await expect(select).toHaveAttribute("multiple");
    await expect(select).toHaveValue(["react-ui", "expert-search"]);
  },
};

export const NativeSize: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={styles.field}>
        <span className={styles.label}>Three visible options</span>
        <Select
          aria-label="Three visible options"
          controlSize="sm"
          defaultValue="react-ui"
          size={3}
        >
          <option value="react-ui">React UI</option>
          <option value="expert-search">Expert Search</option>
          <option value="phrase-recall">PhraseRecall</option>
          <option value="portfolio">Portfolio</option>
        </Select>
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByLabelText(
      "Three visible options",
    );

    await expect(select).toHaveAttribute("size", "3");
    await expect(select).toHaveClass("portfolio-form-control--sm");
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={`${styles.field} ${styles.narrow}`}>
        <span className={styles.label}>Deployment destination</span>
        <Select aria-label="Deployment destination" defaultValue="preview">
          <option value="preview">
            Preview environment with an intentionally long descriptive name
          </option>
          <option value="production">Production</option>
        </Select>
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
