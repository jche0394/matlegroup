import { Link } from "react-router-dom";
import { services } from "../../data/services";
import styles from "./Services.module.css";

const HOME_SERVICE_NUMS = new Set(["02", "03"]);

const homeCtaLabel: Record<string, string> = {
  "02": "Discuss lifestyle maintenance",
  "03": "Discuss absentee management",
};

export function HomeServices() {
  const homeServices = services.filter((s) => HOME_SERVICE_NUMS.has(s.num));

  return (
    <section
      className={styles.section}
      id="services"
      aria-labelledby="home-services-heading"
    >
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>What we do</p>
          <h2 className={styles.h2} id="home-services-heading">
            Maintenance for the home you live in.
            <br />
            Oversight when you can&apos;t be there.
          </h2>
        </div>
        <p className={styles.headerRight}>
          Monthly retainers tailored after a walkthrough — one accountable
          contact, scope and fees in writing.
        </p>
      </div>

      <div className={styles.gridHome}>
        {homeServices.map((service, index) => (
          <article
            key={service.num}
            className={styles.homeCard}
            style={{ animationDelay: `${0.06 + index * 0.1}s` }}
          >
            <div className={styles.homeCardMedia}>
              <img
                className={styles.homeCardImg}
                src={service.imageSrc}
                alt={service.imageAlt}
                width={640}
                height={400}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.homeCardMediaShade} aria-hidden="true" />
            </div>

            <div className={styles.homeCardBody}>
              <span className={styles.homeCardTag}>{service.tag}</span>
              <h3 className={styles.homeCardTitle}>{service.title}</h3>
              <p className={styles.homeCardTagline}>{service.tagline}</p>
              <Link
                to={{ pathname: "/", hash: "contact" }}
                className={styles.homeCardButton}
              >
                {homeCtaLabel[service.num] ?? "Discuss this service"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
