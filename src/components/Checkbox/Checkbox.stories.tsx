import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Checkbox } from "./Checkbox";
import styles from "./Checkbox.stories.module.css";

const checkboxRef = createRef<HTMLInputElement>();

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    id: "remember-preference",
    name: "rememberPreference",
    value: "yes",
    required: true,
    className: "story-custom-checkbox",
    onChange: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={styles.label} htmlFor="remember-preference">
        <Checkbox
          {...args}
          ref={checkboxRef}
          data-purpose="preference"
        />
        Remember this preference
      </label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", {
      name: "Remember this preference",
    });

    await expect(checkbox.tagName).toBe("INPUT");
    await expect(checkbox).toHaveAttribute("type", "checkbox");
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).toBeRequired();
    await expect(checkbox).toHaveAttribute("name", "rememberPreference");
    await expect(checkbox).toHaveAttribute("value", "yes");
    await expect(checkbox).toHaveAttribute("data-purpose", "preference");
    await expect(checkbox).toHaveClass(
      "portfolio-selection-control--md",
      "portfolio-checkbox--md",
      "story-custom-checkbox",
    );
    await expect(checkboxRef.current).toBe(checkbox);
    await expect(checkboxRef.current).toBeInstanceOf(HTMLInputElement);

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    checkbox.blur();
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};

export const Checked: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <label className={styles.label}>
          <Checkbox defaultChecked />
          Uncontrolled default selection
        </label>
        <label className={styles.label}>
          <Checkbox checked onChange={fn()} />
          Controlled selection
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uncontrolled = canvas.getByRole("checkbox", {
      name: "Uncontrolled default selection",
    });
    const controlled = canvas.getByRole("checkbox", {
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
            <Checkbox controlSize={controlSize} />
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
        canvas.getByRole("checkbox", { name: controlSize }),
      ).toHaveClass(`portfolio-selection-control--${controlSize}`);
    }
  },
};

export const Disabled: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", {
      name: "Remember this preference",
    });

    await expect(checkbox).toBeDisabled();
    checkbox.click();
    await expect(checkbox).toBeChecked();
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("checkbox", {
        name: "Remember this preference",
      }),
    ).toHaveAttribute("aria-invalid", "true");
  },
};

export const FormUsage: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <form className={styles.stack} id="preferences-form">
        <label className={styles.label}>
          <Checkbox
            defaultChecked
            form="preferences-form"
            name="updates"
            value="email"
          />
          Receive email updates
        </label>
      </form>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", {
      name: "Receive email updates",
    });
    const form = canvasElement.querySelector("form");

    await expect(checkbox).toHaveAttribute("form", "preferences-form");
    await expect(new FormData(form ?? undefined).get("updates")).toBe("email");
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={`${styles.label} ${styles.narrow}`}>
        <Checkbox />
        Remember this preference across future sessions and connected devices
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
