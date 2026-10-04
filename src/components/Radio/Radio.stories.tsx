import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Radio } from "./Radio";
import styles from "./Radio.stories.module.css";

const radioRef = createRef<HTMLInputElement>();

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    id: "standard-plan",
    name: "singlePlan",
    value: "standard",
    required: true,
    className: "story-custom-radio",
    onChange: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={styles.label} htmlFor="standard-plan">
        <Radio {...args} ref={radioRef} data-purpose="plan-selection" />
        Standard plan
      </label>
    </div>
  ),
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: "Standard plan" });

    await expect(radio.tagName).toBe("INPUT");
    await expect(radio).toHaveAttribute("type", "radio");
    await expect(radio).not.toBeChecked();
    await expect(radio).toBeRequired();
    await expect(radio).toHaveAttribute("name", "singlePlan");
    await expect(radio).toHaveAttribute("value", "standard");
    await expect(radio).toHaveAttribute("data-purpose", "plan-selection");
    await expect(radio).toHaveClass(
      "portfolio-selection-control--md",
      "portfolio-radio--md",
      "story-custom-radio",
    );
    await expect(radioRef.current).toBe(radio);
    await expect(radioRef.current).toBeInstanceOf(HTMLInputElement);

    await userEvent.click(radio);
    await expect(radio).toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(1);
  },
};

export const Selected: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <label className={styles.label}>
          <Radio defaultChecked name="uncontrolled-plan" value="basic" />
          Uncontrolled default selection
        </label>
        <label className={styles.label}>
          <Radio checked name="controlled-plan" onChange={fn()} value="pro" />
          Controlled selection
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uncontrolled = canvas.getByRole("radio", {
      name: "Uncontrolled default selection",
    });
    const controlled = canvas.getByRole("radio", {
      name: "Controlled selection",
    });

    await expect(uncontrolled).toBeChecked();
    await expect(controlled).toBeChecked();
    await userEvent.click(controlled);
    await expect(controlled).toBeChecked();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        {(["sm", "md", "lg"] as const).map((controlSize) => (
          <label className={styles.label} key={controlSize}>
            <Radio controlSize={controlSize} name={`size-${controlSize}`} />
            {controlSize}
          </label>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const controlSize of ["sm", "md", "lg"]) {
      await expect(
        canvas.getByRole("radio", { name: controlSize }),
      ).toHaveClass(`portfolio-selection-control--${controlSize}`);
    }
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const radio = within(canvasElement).getByRole("radio", {
      name: "Standard plan",
    });

    await expect(radio).toBeDisabled();
    radio.click();
    await expect(radio).not.toBeChecked();
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("radio", { name: "Standard plan" }),
    ).toHaveAttribute("aria-invalid", "true");
  },
};

export const NativeGroup: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <label className={styles.label}>
          <Radio defaultChecked name="plan" value="basic" />
          Basic plan
        </label>
        <label className={styles.label}>
          <Radio name="plan" value="pro" />
          Pro plan
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const basic = canvas.getByRole("radio", { name: "Basic plan" });
    const pro = canvas.getByRole("radio", { name: "Pro plan" });

    await expect(basic).toBeChecked();
    await expect(pro).not.toBeChecked();

    basic.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(pro).toHaveFocus();
    await expect(pro).toBeChecked();
    await expect(basic).not.toBeChecked();

    await userEvent.click(basic);
    await expect(basic).toBeChecked();
    await expect(pro).not.toBeChecked();
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={`${styles.label} ${styles.narrow}`}>
        <Radio name="delivery" value="managed" />
        Use the managed delivery option with automatic environment promotion
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
