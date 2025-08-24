import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, expect, within, userEvent } from "storybook/test";
import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["outlined", "filled", "standard"],
      description: "Input style variant",
      defaultValue: "outlined",
    },
    inputSize: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      description: "Input size",
      defaultValue: "medium",
    },
    label: {
      control: "text",
      description: "Input label",
    },
    placeholder: {
      control: "text",
      description: "Input placeholder text",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    error: {
      control: "text",
      description: "Error message (takes priority over helperText)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    isFullWidth: {
      control: "boolean",
      description: "Make input take full width of container",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel"],
      description: "Input type",
      defaultValue: "text",
    },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    onChange: { action: "changed" },
  },
  args: {
    onFocus: fn(),
    onBlur: fn(),
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Email Address",
    placeholder: "Enter your email",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/email address/i);

    await expect(input).toBeInTheDocument();
    await userEvent.click(input);
    await expect(args.onFocus).toHaveBeenCalled();

    await userEvent.type(input, "test@example.com");
    await expect(args.onChange).toHaveBeenCalled();
    await expect(input).toHaveValue("test@example.com");

    await userEvent.tab(); // Blur the input
    await expect(args.onBlur).toHaveBeenCalled();
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Full Name",
    placeholder: "Enter your full name",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/full name/i);
    await expect(input).toBeInTheDocument();
  },
};

export const Standard: Story = {
  args: {
    variant: "standard",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    type: "tel",
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    inputSize: "small",
    label: "Small Input",
    placeholder: "Small size input",
  },
};

export const MediumSize: Story = {
  args: {
    inputSize: "medium",
    label: "Medium Input",
    placeholder: "Medium size input",
  },
};

export const LargeSize: Story = {
  args: {
    inputSize: "large",
    label: "Large Input",
    placeholder: "Large size input",
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    helperText: "Password must be at least 8 characters long",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText(
      /password must be at least 8 characters long/i
    );
    await expect(helperText).toBeInTheDocument();
  },
};

// With error state
export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    error: "Please enter a valid email address",
    helperText: "This helper text should not be visible when error is present",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorText = canvas.getByText(/please enter a valid email address/i);
    await expect(errorText).toBeInTheDocument();

    // Helper text should not be visible when error is present
    const helperText = canvas.queryByText(
      /this helper text should not be visible/i
    );
    await expect(helperText).not.toBeInTheDocument();
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
    helperText: "This input cannot be edited",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/disabled input/i);
    await expect(input).toBeDisabled();
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "This input takes full width",
    isFullWidth: true,
    helperText: "This input spans the full width of its container",
  },
  parameters: {
    layout: "padded", // Override centered layout to show full width
  },
};

// Without label (placeholder only)
export const WithoutLabel: Story = {
  args: {
    placeholder: "No label, just placeholder",
    helperText: "This input has no label, only placeholder text",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(/no label, just placeholder/i);
    await expect(input).toBeInTheDocument();
  },
};

// Pre-filled value
export const WithDefaultValue: Story = {
  args: {
    label: "Pre-filled Input",
    defaultValue: "This is pre-filled text",
    helperText: "This input has a default value",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByDisplayValue(/this is pre-filled text/i);
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveValue("This is pre-filled text");
  },
};

// Complex example with all features
export const ComplexExample: Story = {
  args: {
    variant: "outlined",
    inputSize: "large",
    label: "Company Email",
    type: "email",
    placeholder: "john.doe@company.com",
    helperText: "Use your company email for verification",
    isFullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/company email/i);

    // Test focus
    await userEvent.click(input);
    await expect(args.onFocus).toHaveBeenCalled();

    // Test typing
    await userEvent.type(input, "john.doe@company.com");
    await expect(input).toHaveValue("john.doe@company.com");

    // Test blur
    await userEvent.tab();
    await expect(args.onBlur).toHaveBeenCalled();

    // Verify helper text is visible
    const helperText = canvas.getByText(
      /use your company email for verification/i
    );
    await expect(helperText).toBeInTheDocument();
  },
};
