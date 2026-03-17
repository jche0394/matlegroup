import type { FormEvent } from "react";
import { useState } from "react";
import styles from "./Contact.module.css";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: (data.get("name") || "").toString(),
      email: (data.get("email") || "").toString(),
      phone: (data.get("phone") || "").toString(),
      message: (data.get("message") || "").toString(),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to send enquiry");
      }

      setHasSubmitted(true);
      form.reset();
    } catch (err) {
      setError("Something went wrong sending your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <input name="name" type="text" placeholder="Enter your full name" required />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Phone Number</label>
            <input name="phone" type="tel" placeholder="Enter your phone number" />
          </div>

          <div className={styles.field}>
            <label>Tell us about your situation</label>
            <textarea
              name="message"
              placeholder="Share any context that would be helpful for our first conversation"
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </button>
          <p className={styles.note}>
            We&rsquo;ll respond within one business day.
          </p>
          {hasSubmitted && !error && (
            <p className={styles.note}>Thank you — your enquiry has been sent.</p>
          )}
          {error && <p className={styles.note}>{error}</p>}
        </form>
      </div>
    </section>
  );
}
