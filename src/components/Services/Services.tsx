import { services } from "../../data/services";
import { ServiceCard } from "./ServiceCard";
import styles from "./Services.module.css";

export function Services() {
  return (
    <>
      <section
        className={styles.pageHero}
        aria-labelledby="services-hero-heading"
      >
        <div className={styles.pageHeroInner}>
          <p className={styles.pageEyebrow}>What we do</p>
          <h1 id="services-hero-heading" className={styles.pageH1}>
            Three pillars.
            <br />
            One accountable contact.
          </h1>
          <p className={styles.pageLead}>
            Estate-level care without an in-house team — renovations, rhythm
            maintenance, or oversight when you are not on site.
          </p>
          <p className={styles.pageSub}>
            The point is subtraction: fewer vendor threads and surprises. You
            stay informed; you do not run the operation.
          </p>
          <ul className={styles.trustChips}>
            <li>Vetted trades</li>
            <li>Inner Melbourne</li>
            <li>Scope in writing</li>
          </ul>
        </div>
      </section>

      <section className={styles.section} id="services" aria-labelledby="services-detail-heading">
        <h2 id="services-detail-heading" className={styles.srOnly}>
          Service details
        </h2>
        <p className={styles.bandIntro}>
          Each pillar below is spelled out end to end — combine two if your
          situation needs it.
        </p>
        <div className={styles.grid}>
          {services.map((s, index) => (
            <ServiceCard key={s.num} service={s} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
