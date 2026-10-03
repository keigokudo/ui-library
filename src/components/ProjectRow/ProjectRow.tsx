import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

export type ProjectRowProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "children" | "href"
> & {
  index: string;
  category: string;
  title: string;
  focus: string;
  href: string;
};

export const ProjectRow = forwardRef<HTMLAnchorElement, ProjectRowProps>(
  function ProjectRow(
    { className, index, category, title, focus, href, ...props },
    ref,
  ) {
    const classes = ["portfolio-project-row", className].filter(Boolean).join(" ");

    return (
      <a ref={ref} className={classes} href={href} {...props}>
        <span className="portfolio-project-row__index">{index}</span>

        <span className="portfolio-project-row__identity">
          <span className="portfolio-project-row__label">{category}</span>
          <span className="portfolio-project-row__title">{title}</span>
        </span>

        <span className="portfolio-project-row__focus">
          <span className="portfolio-project-row__label">Focus</span>
          <span className="portfolio-project-row__focus-value">{focus}</span>
        </span>

        <span className="portfolio-project-row__arrow" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  },
);
