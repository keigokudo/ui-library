import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Container } from "../Container/Container";

export type PageIntroProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  eyebrow: ReactNode;
  heading: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
};

export const PageIntro = forwardRef<HTMLElement, PageIntroProps>(
  function PageIntro(
    { actions, className, description, eyebrow, heading, ...props },
    ref,
  ) {
    const classes = ["portfolio-page-intro", className]
      .filter(Boolean)
      .join(" ");

    return (
      <section ref={ref} className={classes} {...props}>
        <Container>
          <div className="portfolio-page-intro__content">
            <p className="portfolio-page-intro__eyebrow">{eyebrow}</p>
            <h1 className="portfolio-page-intro__heading">{heading}</h1>
            <p className="portfolio-page-intro__description">{description}</p>
            {actions != null && (
              <div className="portfolio-page-intro__actions">{actions}</div>
            )}
          </div>
        </Container>
      </section>
    );
  },
);
