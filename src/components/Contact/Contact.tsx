import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { services } from "../../data/services";
import styles from "./Contact.module.css";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const enquiryReasons = useMemo(
    () => [
      ...services.map((s) => ({ value: s.title, label: s.title })),
      { value: "Not sure yet", label: "Not sure yet" },
    ],
    [],
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: (data.get("name") || "").toString(),
      email: (data.get("email") || "").toString(),
      phone: (data.get("phone") || "").toString(),
      reason: (data.get("reason") || "").toString(),
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

      setPopupMessage("Thank you — your enquiry has been sent.");
      setShowPopup(true);
      form.reset();
    } catch (err) {
      setPopupMessage("Something went wrong sending your enquiry. Please try again.");
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.left}>
        <p className={styles.eyebrow}>Get in touch</p>
        <h2 className={styles.h2}>What does your home need?</h2>
        <div className={styles.divider} />
        <p className={styles.body}>
          We reply personally, usually within a business day. Renovation,
          retainer care, or oversight while you&apos;re away — a few lines is
          enough to start.
        </p>
      </div>

      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input name="name" type="text" placeholder="Name" required />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className={styles.field}>
            <label>Phone Number</label>
            <input name="phone" type="tel" placeholder="Phone (optional)" />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-reason">What brings you to Mantle?</label>
            <div className={styles.selectWrap}>
              <select
                id="contact-reason"
                name="reason"
                required
                defaultValue=""
                aria-required="true"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {enquiryReasons.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message">
              Additional information{" "}
              <span className={styles.optionalMark}>(optional)</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Anything else you would like us to know…"
              rows={4}
            />
          </div>

          <button type="submit" className={styles.submit}>
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>

      {showPopup && (
        <div
          className={styles.popupBackdrop}
          onClick={() => setShowPopup(false)}
        >
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.popupClose}
              onClick={() => setShowPopup(false)}
              aria-label="Close message"
            >
              ×
            </button>
            <p className={styles.popupText}>{popupMessage}</p>
          </div>
        </div>
      )}
    </section>
  );
}
