import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type CheckboxControlSize = "sm" | "md" | "lg";

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type"
> & {
  controlSize?: CheckboxControlSize;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, controlSize = "md", ...props }, ref) {
    const classes = [
      "portfolio-selection-control",
      `portfolio-selection-control--${controlSize}`,
      "portfolio-checkbox",
      `portfolio-checkbox--${controlSize}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <input ref={ref} className={classes} {...props} type="checkbox" />;
  },
);
