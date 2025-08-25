import { useState } from "react";
import styles from "./header.module.scss";
import { clsx } from "../../utils/utils";

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
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
