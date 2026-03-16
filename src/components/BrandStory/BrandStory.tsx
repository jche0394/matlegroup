import styles from "./BrandStory.module.css";

export function BrandStory() {
  return (
    <section className={styles.section}>
      <div className={styles.imgWrap}>
        <img
          className={styles.img}
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyaminmellish-106399.jpg&fm=jpg"
          alt="Fireplace mantle detail"
        />
        <div className={styles.accent} />
      </div>

      <div>
        <p className={styles.eyebrow}>Why Mantle</p>
        <h2 className={styles.h2}>
          The heart of every home deserves to be looked after.
        </h2>
        <p className={styles.body}>
          A mantle is the centrepiece of a home — the fireplace surround, the
          heart of a room. And to take something under your mantle means to take
          full responsibility for it.
        </p>
        <p className={styles.body}>
          Both meanings describe exactly what we do. We take your home completely
          under our mantle — every repair, every contractor, every inspection —
          handled with the same care you would give it yourself, if you had the
          time.
        </p>
        <div className={styles.divider} />
        <p className={styles.promise}>
          &ldquo;We take your home completely under our mantle — so you never
          have to think about it again.&rdquo;
        </p>
      </div>
    </section>
  );
}
