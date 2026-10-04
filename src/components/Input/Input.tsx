import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type InputControlSize = "sm" | "md" | "lg";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  controlSize?: InputControlSize;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, controlSize = "md", ...props },
  ref,
) {
  const classes = [
    "portfolio-form-control",
    `portfolio-form-control--${controlSize}`,
    "portfolio-input",
    `portfolio-input--${controlSize}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input ref={ref} className={classes} {...props} />;
});
