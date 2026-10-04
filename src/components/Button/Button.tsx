import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "primary" | "secondary";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      size = "md",
      type = "button",
      variant = "primary",
      ...props
    },
    ref,
  ) {
    const classes = [
      "portfolio-button",
      `portfolio-button--${variant}`,
      `portfolio-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <button ref={ref} type={type} className={classes} {...props} />;
  },
);
