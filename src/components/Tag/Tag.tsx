import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type TagProps = ComponentPropsWithoutRef<"span">;

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  function Tag({ className, ...props }, ref) {
    const classes = ["portfolio-tag", className].filter(Boolean).join(" ");

    return <span ref={ref} className={classes} {...props} />;
  },
);
