import { steps } from "../../data/steps";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>The Process</p>
          <h2 className={styles.h2}>
            From first conversation
            <br />
            to completely looked after.
          </h2>
        </div>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
