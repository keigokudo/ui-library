
import { useState } from "react";
import styles from "./header.module.scss";
import { clsx } from "../../utils/utils";

type NavItem = {
  label: string;
  href: string;
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
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
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
