import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type SelectControlSize = "sm" | "md" | "lg";

export type SelectProps = ComponentPropsWithoutRef<"select"> & {
  controlSize?: SelectControlSize;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, controlSize = "md", ...props }, ref) {
    const classes = [
      "portfolio-form-control",
      `portfolio-form-control--${controlSize}`,
      "portfolio-select",
      `portfolio-select--${controlSize}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <select ref={ref} className={classes} {...props} />;
  },
);
