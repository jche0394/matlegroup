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
        <video
          className={styles.video}
          src="/Gen-4 Turbo Slow cinematic push toward the facade of a large contemporary prestige home at dusk Warm interior light glowing through floor-to-ceiling windows Dark timber cladding, stone walls, deep e.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Prestige Melbourne home"
        />
        <div className={styles.overlay} />
      </div>
    </section>
  );
}
