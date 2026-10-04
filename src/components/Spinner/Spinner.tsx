import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = ComponentPropsWithoutRef<"span"> & {
  size?: SpinnerSize;
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { "aria-hidden": ariaHidden = true, className, size = "md", ...props },
    ref,
  ) {
    const classes = [
      "portfolio-spinner",
      `portfolio-spinner--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span
        ref={ref}
        aria-hidden={ariaHidden}
        className={classes}
        {...props}
      />
    );
  },
);
