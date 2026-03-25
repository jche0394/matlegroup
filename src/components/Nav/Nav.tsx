import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

export function Nav() {
  const { pathname } = useLocation();
  const onHero = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const linkItems = (
    <>
      <li>
        <Link to="/how-it-works">How It Works</Link>
      </li>
      <li className={styles.divider} aria-hidden="true">
        |
      </li>
      <li>
        <Link to={{ pathname: "/", hash: "services" }}>Services</Link>
      </li>
      <li className={styles.divider} aria-hidden="true">
        |
      </li>
      <li>
        <Link to="/pricing">Pricing</Link>
      </li>
      <li className={styles.divider} aria-hidden="true">
        |
      </li>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
    </>
  );

  return (
    <nav
      className={`${styles.nav} ${onHero ? styles.themeHero : styles.themePage}`}
    >
      <Link to="/" className={styles.logo}>
        Mantle
      </Link>

      <div className={styles.heroCluster}>
        <ul className={styles.links}>{linkItems}</ul>
        <a href="/#contact" className={styles.cta}>
          Enquire
          <svg
            className={styles.ctaIcon}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </div>

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
            <Link
              to={{ pathname: "/", hash: "services" }}
              onClick={closeMenu}
            >
              Services
            </Link>
            <Link to="/pricing" onClick={closeMenu}>
              Pricing
            </Link>
            <Link to="/faq" onClick={closeMenu}>
              FAQ
            </Link>
            <a href="/#contact" onClick={closeMenu}>
              Enquire
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
