import type { Service } from "../../data/services";
import styles from "./Services.module.css";

interface ServiceCardProps {
  service: Service;
  index: number;
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${0.08 + index * 0.09}s` }}
      aria-labelledby={`service-${service.num}-title`}
    >
      <div className={styles.cardMedia}>
        <img
          className={styles.cardImg}
          src={service.imageSrc}
          alt={service.imageAlt}
          width={960}
          height={640}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.cardMediaGradient} aria-hidden="true" />
        <span className={styles.num}>{service.num}</span>
      </div>

      <div className={styles.cardBody}>
        <span className={styles.tag}>{service.tag}</span>
        <h3 className={styles.title} id={`service-${service.num}-title`}>
          {service.title}
        </h3>
        <p className={styles.tagline}>{service.tagline}</p>
        <div className={styles.divider} aria-hidden="true" />
        <p className={styles.desc}>{service.description}</p>

        <ul className={styles.features}>
          {service.features.map((f) => (
            <li key={f}>
              <IconCheck className={styles.featureCheck} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className={styles.differentiator}>
          <span className={styles.differentiatorLabel}>
            What no competitor offers
          </span>
          <p>{service.differentiator}</p>
        </div>

        <a href="/#contact" className={styles.link}>
          Enquire about this service
        </a>
      </div>
    </article>
  );
}
