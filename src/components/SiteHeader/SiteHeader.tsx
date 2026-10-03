import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { Container } from "../Container/Container";

const GITHUB_URL = "https://github.com/keigokudo";

type InternalPath = "/" | "/work" | "/about";

export type SiteHeaderProps = ComponentPropsWithoutRef<"header"> & {
  currentPath?: string;
};

export const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(
  function SiteHeader({ className, currentPath, ...props }, ref) {
    const classes = ["c2-site-header", className].filter(Boolean).join(" ");
    const current = (path: InternalPath) =>
      currentPath === path ? "page" : undefined;

    return (
      <header ref={ref} className={classes} {...props}>
        <Container>
          <div className="c2-site-header__row">
            <a
              className="c2-site-header__brand"
              href="/"
              aria-current={current("/")}
            >
              KEIGO KUDO
            </a>

            <nav aria-label="Primary">
              <ul className="c2-site-header__navigation">
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
                    GitHub
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
