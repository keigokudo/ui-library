import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type IconButtonVariant = "primary" | "secondary";

export type IconButtonSize = "sm" | "md" | "lg";

export type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      className,
      size = "md",
      type = "button",
      variant = "secondary",
      ...props
    },
    ref,
  ) {
    const classes = [
      "portfolio-action",
      `portfolio-action--${variant}`,
      "portfolio-icon-button",
      `portfolio-icon-button--${variant}`,
      `portfolio-icon-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <button ref={ref} type={type} className={classes} {...props} />;
  },
);
