import { createRef } from "react";
import type { MouseEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { ButtonLink } from "./ButtonLink";
import styles from "./ButtonLink.stories.module.css";

const buttonLinkRef = createRef<HTMLAnchorElement>();

const meta = {
  title: "Components/ButtonLink",
  component: ButtonLink,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    children: "View project",
    href: "#project",
    className: "story-custom-button-link",
    id: "project-link",
    title: "View the selected project",
    "aria-label": "View project",
    onClick: fn((event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    }),
  },
  render: (args) => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <ButtonLink
        {...args}
        ref={buttonLinkRef}
        data-purpose="project-navigation"
      />
      <span id="project" />
    </div>
  ),
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "View project" });

    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "#project");
    await expect(link).toHaveClass(
      "portfolio-action--primary",
      "portfolio-action--md",
      "portfolio-button-link--primary",
      "portfolio-button-link--md",
      "story-custom-button-link",
    );
    await expect(link).toHaveAttribute("id", "project-link");
    await expect(link).toHaveAttribute("title", "View the selected project");
    await expect(link).toHaveAttribute("data-purpose", "project-navigation");
    await expect(link).not.toHaveAttribute("role");
    await expect(buttonLinkRef.current).toBe(link);
    await expect(buttonLinkRef.current).toBeInstanceOf(HTMLAnchorElement);

    await userEvent.tab();
    await expect(link).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Variants: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <ButtonLink href="#primary">Primary</ButtonLink>
        <ButtonLink href="#secondary" variant="secondary">
          Secondary
        </ButtonLink>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "Primary" })).toHaveClass(
      "portfolio-action--primary",
    );
    await expect(canvas.getByRole("link", { name: "Secondary" })).toHaveClass(
      "portfolio-action--secondary",
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={styles.row}>
        <ButtonLink href="#small" size="sm">
          Small
        </ButtonLink>
        <ButtonLink href="#medium" size="md">
          Medium
        </ButtonLink>
        <ButtonLink href="#large" size="lg">
          Large
        </ButtonLink>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "Small" })).toHaveClass(
      "portfolio-action--sm",
    );
    await expect(canvas.getByRole("link", { name: "Medium" })).toHaveClass(
      "portfolio-action--md",
    );
    await expect(canvas.getByRole("link", { name: "Large" })).toHaveClass(
      "portfolio-action--lg",
    );
  },
};

export const External: Story = {
  args: {
    children: "Open Storybook",
    href: "https://aquamarine-quokka-e5ba7c.netlify.app/",
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "Open Storybook",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Open Storybook" });

    await expect(link).toHaveAttribute(
      "href",
      "https://aquamarine-quokka-e5ba7c.netlify.app/",
    );
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  },
};

export const Disabled: Story = {
  args: {
    children: "Unavailable project",
    disabled: true,
    href: "#unavailable",
    "aria-label": "Unavailable project",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText("Unavailable project");
    const locationBeforeActivation = window.location.href;

    await expect(link).toHaveAttribute("aria-disabled", "true");
    await expect(link).toHaveAttribute("tabindex", "-1");
    await userEvent.click(link);
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(window.location.href).toBe(locationBeforeActivation);
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.canvas}`}>
      <div className={`${styles.row} ${styles.narrow}`}>
        <ButtonLink href="#continue">
          Continue to the complete project case study and implementation notes
        </ButtonLink>
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
