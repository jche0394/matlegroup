import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>Melbourne Home Management</p>
        <h1 className={styles.h1}>
          Your home,
          <br />
          taken completely
          <br />
          <em>under our mantle.</em>
        </h1>
        <p className={styles.sub}>
          We manage your home, your renovation, and your property — so you never
          have to think about it again.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>
            Start a Conversation
          </a>
          <a href="#services" className={styles.btnGhost}>
            Explore Services
          </a>
        </div>
        <div className={styles.trustRow}>
          <span className={styles.trustPill}>Discreet, relationship-based service</span>
          <span className={styles.trustPill}>Insured and contractor-vetted</span>
          <span className={styles.trustPill}>Based in inner Melbourne</span>
        </div>
      </div>

      <div className={styles.right}>
        <img
          className={styles.img}
          src="https://images5.alphacoders.com/343/343021.jpg"
          alt="Prestige Melbourne home interior"
        />
        <div className={styles.overlay} />
      </div>
    </section>
  );
}
