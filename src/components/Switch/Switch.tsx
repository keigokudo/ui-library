import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type SwitchControlSize = "sm" | "md" | "lg";

export type SwitchProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "role" | "type"
> & {
  controlSize?: SwitchControlSize;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({ className, controlSize = "md", ...props }, ref) {
    const classes = [
      "portfolio-selection-control",
      `portfolio-selection-control--${controlSize}`,
      "portfolio-switch",
      `portfolio-switch--${controlSize}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        className={classes}
        {...props}
        role="switch"
        type="checkbox"
      />
    );
  },
);
