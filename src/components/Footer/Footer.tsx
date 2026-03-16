import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.logo}>Mantle</span>
        <p className={styles.tagline}>
          Your home, taken completely under our mantle.
        </p>
        <p className={styles.subcopy}>
          Discreet, long‑term home and property management for time‑poor owners
          in inner Melbourne and the eastern suburbs.
        </p>
      </div>

      <div className={styles.col}>
        <h4>Services</h4>
        <ul>
          <li>
            <Link to="/services">Renovation Management</Link>
          </li>
          <li>
            <Link to="/services">Home Maintenance</Link>
          </li>
          <li>
            <Link to="/services">Absentee Property</Link>
          </li>
        </ul>
      </div>

      <div className={styles.col}>
        <h4>Company</h4>
        <ul>
          <li>
            <Link to="/">About Mantle</Link>
          </li>
          <li>
            <Link to="/how-it-works">How It Works</Link>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>

      <div className={styles.col}>
        <h4>Contact</h4>
        <ul>
          <li>
            <a href="mailto:hello@mantlegroup.com.au">
              hello@mantlegroup.com.au
            </a>
          </li>
          <li>
            <span>Melbourne, Victoria</span>
          </li>
        </ul>
      </div>

      <div className={styles.bottom}>
        <p className={styles.legal}>
          &copy; 2025 Mantle Home Management. All rights reserved.
        </p>
        <p className={styles.abn}>
          ABN 57 630 047 694 ·{" "}
          <Link to="/privacy">Privacy Policy</Link> ·{" "}
          <Link to="/terms">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
