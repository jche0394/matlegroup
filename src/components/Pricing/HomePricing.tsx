import { Link } from "react-router-dom";
import { pricingPlans } from "../../data/pricing";
import styles from "./HomePricing.module.css";

type Props = {
  /** Standalone /pricing page: page H1 + extra top padding handled by page shell */
  variant?: "home" | "page";
};

export function HomePricing({ variant = "home" }: Props) {
  const isPage = variant === "page";

  return (
    <section
      className={`${styles.section} ${isPage ? styles.sectionStandalone : ""}`}
      id="pricing"
      aria-labelledby={isPage ? "pricing-page-title" : "pricing-heading"}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          {isPage ? (
            <>
              <p className={styles.eyebrow}>Fees</p>
              <h1 className={styles.pageTitle} id="pricing-page-title">
                Pricing &amp; retainers
              </h1>
              <p className={styles.intro}>
                Ongoing care runs on a clear monthly retainer, sized after we
                understand your home. Renovation and one-off project work is
                quoted separately — fixed or staged fees, agreed before work
                starts.
              </p>
            </>
          ) : (
            <>
              <p className={styles.eyebrow}>Investment</p>
              <h2 className={styles.h2} id="pricing-heading">
                Retainers tailored after a walkthrough.
              </h2>
              <p className={styles.intro}>
                You see scope and fees in writing before you commit. Contractor
                costs stay transparent — management is agreed upfront.
              </p>
            </>
          )}
        </header>

        <div className={styles.grid}>
          {pricingPlans.map((plan) => (
            <article key={plan.id} className={styles.card}>
              <span className={styles.model}>{plan.model}</span>
              <h3 className={styles.cardTitle}>{plan.title}</h3>
              <p className={styles.cardSubtitle}>{plan.subtitle}</p>
              <ul className={styles.list}>
                {plan.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <footer className={styles.foot}>
          <p>
            Exact retainers depend on property size, access, and the rhythm you
            need — confirmed in your proposal.
          </p>
          <Link
            to={{ pathname: "/", hash: "contact" }}
            className={styles.cta}
          >
            Request a proposal
          </Link>
          <div>
            <Link to="/faq" className={styles.faqLink}>
              FAQ — pricing &amp; contractors
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
