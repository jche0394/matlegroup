import { services } from "../../data/services";
import styles from "./Services.module.css";

export function HomeServices() {
  return (
    <section className={styles.section} aria-labelledby="home-services-heading">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>What We Do</p>
          <h2 className={styles.h2} id="home-services-heading">
            Three ways we look
            <br />
            after your home.
          </h2>
        </div>
        <p className={styles.headerRight}>
          A quick look at the core ways Mantle can remove home and property
          admin from your week.
        </p>
      </div>

      <div className={styles.gridHome}>
        {services.map((service) => (
          <div key={service.num} className={styles.cardHome}>
            <span className={styles.tag}>{service.tag}</span>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.tagline}>{service.tagline}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

