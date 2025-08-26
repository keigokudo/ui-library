"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { clsx } from "../../utils/utils";
import useEscapeKey from "../../hooks/useEscapeKey";
import useClickOutside from "../../hooks/useClickOutside";

type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

type HeaderProps = {
  logo: React.ReactNode;
  navItems?: NavItem[];
};

export default function Header({ logo, navItems = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu on Escape key press
  useEscapeKey(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  const headerRef = useClickOutside<HTMLDivElement>(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  // Close menu when a nav item is clicked
  const handleNavItemClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container} ref={headerRef}>
        <div className={styles.logo}>{logo}</div>
        <nav
          className={clsx(styles.nav, { [styles.navOpen]: isMenuOpen })}
          aria-label="Main navigation"
        >
          <ul>
            {navItems.map(({ label, href, isActive }) => {
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={clsx({ [styles.active]: isActive })}
                    onClick={handleNavItemClick}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label="Toggle navigation"
        >
          <span className={styles.hamburgerIcon} />
        </button>
      </div>
    </header>
  );
}
