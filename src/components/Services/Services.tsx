import { services } from "../../data/services";
import { ServiceCard } from "./ServiceCard";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-heading">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>What We Do</p>
          <h2 className={styles.h2} id="services-heading">
            Three pillars.
            <br />
            One point of contact.
          </h2>
          <p className={styles.subIntro}>
            For time-poor professionals, travelling owners, and families who want
            their home handled with the same care they would give it themselves.
          </p>
        </div>
        <p className={styles.headerRight}>
          Every service Mantle provides exists to remove something from your
          plate — permanently. Our clients don&rsquo;t coordinate contractors,
          they don&rsquo;t chase tradies, and they don&rsquo;t think about their
          property on a Tuesday afternoon.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((s) => (
          <ServiceCard key={s.num} service={s} />
        ))}
      </div>
    </section>
  );
}
