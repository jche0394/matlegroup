import type { Service } from "../../data/services";
import styles from "./Services.module.css";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.num}>{service.num}</span>
      <span className={styles.tag}>{service.tag}</span>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.tagline}>{service.tagline}</p>
      <div className={styles.divider} />
      <p className={styles.desc}>{service.description}</p>

      <ul className={styles.features}>
        {service.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <div className={styles.differentiator}>
        <span className={styles.differentiatorLabel}>
          What no competitor offers
        </span>
        <p>{service.differentiator}</p>
      </div>

      <a href="#contact" className={styles.link}>
        Enquire about this service
      </a>
    </article>
  );
}
