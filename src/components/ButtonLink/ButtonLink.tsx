import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

export type ButtonLinkVariant = "primary" | "secondary";

export type ButtonLinkSize = "sm" | "md" | "lg";

export type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  disabled?: boolean;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    {
      "aria-disabled": ariaDisabled,
      className,
      disabled = false,
      onClick,
      size = "md",
      tabIndex,
      variant = "primary",
      ...props
    },
    ref,
  ) {
    const classes = [
      "portfolio-action",
      `portfolio-action--${variant}`,
      `portfolio-action--${size}`,
      "portfolio-button-link",
      `portfolio-button-link--${variant}`,
      `portfolio-button-link--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    }

    return (
      <a
        ref={ref}
        aria-disabled={disabled ? true : ariaDisabled}
        className={classes}
        onClick={handleClick}
        tabIndex={disabled ? -1 : tabIndex}
        {...props}
      />
    );
  },
);
