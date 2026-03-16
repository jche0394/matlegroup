import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        Mantle
      </Link>
      <ul className={styles.links}>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/how-it-works">How It Works</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <a href="#contact" className={styles.cta}>
        Enquire
      </a>
    </nav>
  );
}
