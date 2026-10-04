import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type ProgressProps = ComponentPropsWithoutRef<"progress">;

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  function Progress({ className, ...props }, ref) {
    const classes = ["portfolio-progress", className]
      .filter(Boolean)
      .join(" ");

    return <progress ref={ref} className={classes} {...props} />;
  },
);
