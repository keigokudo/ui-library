import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type RadioControlSize = "sm" | "md" | "lg";

export type RadioProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type"
> & {
  controlSize?: RadioControlSize;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, controlSize = "md", ...props },
  ref,
) {
  const classes = [
    "portfolio-selection-control",
    `portfolio-selection-control--${controlSize}`,
    "portfolio-radio",
    `portfolio-radio--${controlSize}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input ref={ref} className={classes} {...props} type="radio" />;
});
