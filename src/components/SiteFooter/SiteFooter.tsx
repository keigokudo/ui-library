import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { Container } from "../Container/Container";

const GITHUB_URL = "https://github.com/keigokudo";

export type SiteFooterProps = ComponentPropsWithoutRef<"footer">;

export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(
  function SiteFooter({ className, ...props }, ref) {
    const classes = ["c2-site-footer", className].filter(Boolean).join(" ");

    return (
      <footer ref={ref} className={classes} {...props}>
        <Container>
          <div className="c2-site-footer__row">
            <p className="c2-site-footer__message">
              Let’s build something that lasts.
            </p>

            <nav aria-label="Contact">
              <ul className="c2-site-footer__links">
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
      </footer>
    );
  },
);
