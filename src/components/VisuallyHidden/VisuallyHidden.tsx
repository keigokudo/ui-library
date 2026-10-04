import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type VisuallyHiddenProps = ComponentPropsWithoutRef<"span">;

export const VisuallyHidden = forwardRef<
  HTMLSpanElement,
  VisuallyHiddenProps
>(function VisuallyHidden({ className, ...props }, ref) {
  const classes = ["portfolio-visually-hidden", className]
    .filter(Boolean)
    .join(" ");

  return <span ref={ref} className={classes} {...props} />;
});
