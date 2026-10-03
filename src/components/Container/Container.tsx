import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type ContainerProps = ComponentPropsWithoutRef<"div">;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ className, ...props }, ref) {
    const classes = ["c2-container", className].filter(Boolean).join(" ");

    return <div ref={ref} className={classes} {...props} />;
  },
);
