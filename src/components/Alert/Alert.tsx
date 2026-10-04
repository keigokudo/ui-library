import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type AlertTone = "info" | "success" | "warning" | "error";

export type AlertProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
  tone?: AlertTone;
  title?: ReactNode;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { children, className, title, tone = "info", ...props },
  ref,
) {
  const classes = [
    "portfolio-feedback-tone",
    `portfolio-feedback-tone--${tone}`,
    "portfolio-alert",
    `portfolio-alert--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} {...props}>
      {title != null && (
        <strong className="portfolio-alert__title">{title}</strong>
      )}
      {children}
    </div>
  );
});
