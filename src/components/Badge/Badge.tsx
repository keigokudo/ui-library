import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "error";

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: BadgeTone;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone = "neutral", ...props },
  ref,
) {
  const classes = [
    tone !== "neutral" && "portfolio-feedback-tone",
    tone !== "neutral" && `portfolio-feedback-tone--${tone}`,
    "portfolio-badge",
    `portfolio-badge--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span ref={ref} className={classes} {...props} />;
});
