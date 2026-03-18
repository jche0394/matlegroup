import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        Mantle
      </Link>
      <ul className={styles.links}>
        <li>
          <Link to="/how-it-works">How It Works</Link>
        </li>
        <li className={styles.divider} aria-hidden="true">
          |
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li className={styles.divider} aria-hidden="true">
          |
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
      <a href="#contact" className={styles.cta}>
        Enquire
      </a>

      <button
        type="button"
        className={styles.menuButton}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((v) => !v)}
      >
        <span className={styles.menuIcon} aria-hidden="true" />
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenuBackdrop} onClick={closeMenu}>
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/how-it-works" onClick={closeMenu}>
              How It Works
            </Link>
            <Link to="/services" onClick={closeMenu}>
              Services
            </Link>
            <Link to="/faq" onClick={closeMenu}>
              FAQ
            </Link>
            <a href="#contact" onClick={closeMenu}>
              Enquire
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
