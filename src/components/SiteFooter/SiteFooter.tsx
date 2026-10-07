import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Container } from "../Container/Container";

const GITHUB_URL = "https://github.com/keigokudo";

export type SiteFooterProps = ComponentPropsWithoutRef<"footer"> & {
  /** Replaces the default editorial message with consumer-supplied identity content. */
  identity?: ReactNode;
  /** Defaults to the existing Portfolio GitHub destination. */
  githubHref?: string;
  /** Omitted unless a LinkedIn destination is supplied. */
  linkedinHref?: string;
};

export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(
  function SiteFooter(
    { className, identity, githubHref = GITHUB_URL, linkedinHref, ...props },
    ref,
  ) {
    const classes = ["portfolio-site-footer", className].filter(Boolean).join(" ");

    return (
      <footer ref={ref} className={classes} {...props}>
        <Container>
          <div className="portfolio-site-footer__row">
            <p
              className={
                identity === undefined
                  ? "portfolio-site-footer__message"
                  : "portfolio-site-footer__identity"
              }
            >
              {identity === undefined
                ? "Let’s build something that lasts."
                : identity}
            </p>

            <nav aria-label="Contact">
              <ul className="portfolio-site-footer__links">
                <li>
                  <a
                    href={githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>
                </li>
                {linkedinHref && (
                  <li>
                    <a
                      href={linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn ↗
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </Container>
      </footer>
    );
  },
);
