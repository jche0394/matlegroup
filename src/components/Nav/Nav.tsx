import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

const NAV_SOLID_THRESHOLD_PX = 72;

export function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  /** On home: light nav on hero video; dark-on-glass after #story reaches the top */
  const [pastHero, setPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const lightOnGlass = !onHome || pastHero;

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

  useEffect(() => {
    if (!onHome) {
      setPastHero(false);
      return;
    }

    const updatePastHero = () => {
      const story = document.getElementById("story");
      if (!story) {
        setPastHero(false);
        return;
      }
      setPastHero(story.getBoundingClientRect().top < NAV_SOLID_THRESHOLD_PX);
    };

    updatePastHero();
    const raf = requestAnimationFrame(updatePastHero);
    window.addEventListener("scroll", updatePastHero, { passive: true });
    window.addEventListener("resize", updatePastHero);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updatePastHero);
      window.removeEventListener("resize", updatePastHero);
    };
  }, [onHome]);

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
      className={`${styles.nav} ${lightOnGlass ? styles.themePage : styles.themeHero}`}
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
            <Link to="/" onClick={closeMenu} className={styles.mobileHomeLink}>
              Home
            </Link>
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
            <a
              href="/#contact"
              onClick={closeMenu}
              className={styles.mobileEnquire}
            >
              Enquire
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
