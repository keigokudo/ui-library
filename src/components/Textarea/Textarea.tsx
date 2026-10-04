import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type TextareaControlSize = "sm" | "md" | "lg";

export type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  controlSize?: TextareaControlSize;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, controlSize = "md", ...props }, ref) {
    const classes = [
      "portfolio-form-control",
      `portfolio-form-control--${controlSize}`,
      "portfolio-textarea",
      `portfolio-textarea--${controlSize}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <textarea ref={ref} className={classes} {...props} />;
  },
);
