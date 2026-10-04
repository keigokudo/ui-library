import { createRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Switch } from "./Switch";
import styles from "./Switch.stories.module.css";

const switchRef = createRef<HTMLInputElement>();

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    id: "notifications-setting",
    name: "notifications",
    value: "enabled",
    required: true,
    className: "story-custom-switch",
    onChange: fn(),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={styles.label} htmlFor="notifications-setting">
        <Switch {...args} ref={switchRef} data-purpose="setting" />
        Enable notifications
      </label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole("switch", {
      name: "Enable notifications",
    });

    await expect(control.tagName).toBe("INPUT");
    await expect(control).toHaveAttribute("type", "checkbox");
    await expect(control).toHaveAttribute("role", "switch");
    await expect(control).not.toBeChecked();
    await expect(control).toBeRequired();
    await expect(control).toHaveAttribute("name", "notifications");
    await expect(control).toHaveAttribute("value", "enabled");
    await expect(control).toHaveAttribute("data-purpose", "setting");
    await expect(control).toHaveClass(
      "portfolio-selection-control--md",
      "portfolio-switch--md",
      "story-custom-switch",
    );
    await expect(switchRef.current).toBe(control);
    await expect(switchRef.current).toBeInstanceOf(HTMLInputElement);

    await userEvent.click(control);
    await expect(control).toBeChecked();

    control.blur();
    await userEvent.tab();
    await expect(control).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(control).not.toBeChecked();
    await expect(args.onChange).toHaveBeenCalledTimes(2);
  },
};

export const On: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.stack}>
        <label className={styles.label}>
          <Switch defaultChecked />
          Uncontrolled enabled setting
        </label>
        <label className={styles.label}>
          <Switch checked onChange={fn()} />
          Controlled enabled setting
        </label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uncontrolled = canvas.getByRole("switch", {
      name: "Uncontrolled enabled setting",
    });
    const controlled = canvas.getByRole("switch", {
      name: "Controlled enabled setting",
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
            <Switch controlSize={controlSize} />
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
        canvas.getByRole("switch", { name: controlSize }),
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
    const control = within(canvasElement).getByRole("switch", {
      name: "Enable notifications",
    });

    await expect(control).toBeDisabled();
    control.click();
    await expect(control).toBeChecked();
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("switch", {
        name: "Enable notifications",
      }),
    ).toHaveAttribute("aria-invalid", "true");
  },
};

export const FormUsage: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <form className={styles.stack} id="settings-form">
        <label className={styles.label}>
          <Switch
            aria-labelledby="automatic-save-label"
            defaultChecked
            form="settings-form"
            name="automaticSave"
            value="on"
          />
          <span id="automatic-save-label">Enable automatic saving</span>
        </label>
      </form>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole("switch", {
      name: "Enable automatic saving",
    });
    const label = canvas.getByText("Enable automatic saving");
    const form = canvasElement.querySelector("form");

    await expect(control).toHaveAttribute(
      "aria-labelledby",
      "automatic-save-label",
    );
    await expect(control).toHaveAttribute("form", "settings-form");

    await userEvent.click(label);
    await expect(control).not.toBeChecked();
    await userEvent.click(label);
    await expect(control).toBeChecked();
    await expect(new FormData(form ?? undefined).get("automaticSave")).toBe(
      "on",
    );
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <label className={`${styles.label} ${styles.narrow}`}>
        <Switch aria-label="Enable continuous synchronization" />
        Enable continuous synchronization across all connected environments
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const story = canvasElement.querySelector(`.${styles.canvas}`);

    await expect(
      canvas.getByRole("switch", {
        name: "Enable continuous synchronization",
      }),
    ).toHaveAttribute("aria-label", "Enable continuous synchronization");
    await expect(story?.scrollWidth).toBeLessThanOrEqual(
      story?.clientWidth ?? 0,
    );
  },
};
