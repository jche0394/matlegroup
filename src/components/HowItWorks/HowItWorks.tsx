import { steps } from "../../data/steps";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>The process</p>
          <h2 className={styles.h2}>
            Call, walkthrough, proposal — then we operate.
          </h2>
          <p className={styles.headerIntro}>
            Four steps before you commit. Scope and fees in writing — then we
            run it.
          </p>
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
