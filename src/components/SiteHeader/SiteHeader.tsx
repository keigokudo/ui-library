import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Container } from "../Container/Container";

const GITHUB_URL = "https://github.com/keigokudo";

type InternalPath = "/" | "/work" | "/about";

export type SiteHeaderProps = ComponentPropsWithoutRef<"header"> & {
  brand: ReactNode;
  brandAriaLabel?: string;
  /** Current pathname. Non-root navigation also matches slash-delimited descendants. */
  currentPath?: string;
};

export const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(
  function SiteHeader(
    { brand, brandAriaLabel, className, currentPath, ...props },
    ref,
  ) {
    const classes = ["portfolio-site-header", className].filter(Boolean).join(" ");
    const current = (path: InternalPath) =>
      currentPath === path ||
      (path !== "/" && currentPath?.startsWith(`${path}/`))
        ? "page"
        : undefined;

    return (
      <header ref={ref} className={classes} {...props}>
        <Container>
          <div className="portfolio-site-header__row">
            <a
              className="portfolio-site-header__brand"
              href="/"
              aria-label={brandAriaLabel}
            >
              {brand}
            </a>

            <nav aria-label="Primary">
              <ul className="portfolio-site-header__navigation">
                <li>
                  <a href="/" aria-current={current("/")}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/work" aria-current={current("/work")}>
                    Work
                  </a>
                </li>
                <li>
                  <a href="/about" aria-current={current("/about")}>
                    About
                  </a>
                </li>
                <li>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </header>
    );
  },
);
