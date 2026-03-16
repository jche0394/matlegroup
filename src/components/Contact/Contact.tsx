import type { FormEvent } from "react";
import styles from "./Contact.module.css";

export function Contact() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.left}>
        <p className={styles.eyebrow}>Get in Touch</p>
        <h2 className={styles.h2}>Tell us about your home.</h2>
        <div className={styles.divider} />
        <p className={styles.body}>
          We respond to every enquiry personally, usually within one business
          day. If you&rsquo;re not sure which service fits your situation, just
          tell us what&rsquo;s taking up your time — we&rsquo;ll work it out
          from there.
        </p>
      </div>

      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email address" />
          </div>

          <div className={styles.field}>
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>

          <div className={styles.field}>
            <label>Tell us about your situation</label>
            <textarea placeholder="Share any context that would be helpful for our first conversation" />
          </div>

          <button type="submit" className={styles.submit}>
            Send Enquiry
          </button>
          <p className={styles.note}>
            We&rsquo;ll respond within one business day.
          </p>
        </form>
      </div>
    </section>
  );
}
