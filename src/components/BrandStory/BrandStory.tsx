import styles from "./BrandStory.module.css";

export function BrandStory() {
  return (
    <section
      className={styles.section}
      id="story"
      aria-labelledby="brand-story-heading"
    >
      <div className={styles.inner}>
        <div className={styles.imgWrap}>
          <img
            className={styles.img}
            src="/main.jpg"
            alt="Fireplace mantle detail in a refined Melbourne home"
          />
          <div className={styles.accent} aria-hidden="true" />
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Why Mantle</p>
          <h2 className={styles.h2} id="brand-story-heading">
            The hearth of the home — and full responsibility.
          </h2>
          <p className={styles.body}>
            A mantle is where a room gathers. To take something under your
            mantle is to shelter it properly — not hand it off loosely.
          </p>
          <p className={styles.body}>
            Your choices stay yours. We own the chase: trades, site rhythm, and
            follow-through — renovations, maintenance, or a place you can&apos;t
            always be at.
          </p>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.promise}>
            Looked after end to end — the mental load sits with us, not you.
          </p>
        </div>
      </div>
    </section>
  );
}
