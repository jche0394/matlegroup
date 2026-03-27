import type { FormEvent } from "react";
import { useState } from "react";
import styles from "./ConsultationBookingForm.module.css";

export type ConsultationBookingSource =
  | "booking-page"
  | "how-it-works-modal"
  | "first-visit-modal";

type Props = {
  source: ConsultationBookingSource;
  className?: string;
};

export function ConsultationBookingForm({ source, className }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
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
      preferredTimes: (data.get("preferredTimes") || "").toString(),
      notes: (data.get("notes") || "").toString(),
      source,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setDone(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again or email hello@mantlegroup.com.au.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className={`${styles.success} ${className ?? ""}`.trim()}>
        Thank you — we&apos;ve received your request. We&apos;ll reach out shortly to
        confirm a time for your private consultation.
      </div>
    );
  }

  return (
    <form
      className={`${styles.form} ${className ?? ""}`.trim()}
      onSubmit={handleSubmit}
    >
      {error ? (
        <p className={styles.note} role="alert">
          {error}
        </p>
      ) : null}

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label htmlFor={`cb-name-${source}`}>Full name</label>
          <input
            id={`cb-name-${source}`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Name"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`cb-email-${source}`}>Email</label>
          <input
            id={`cb-email-${source}`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`cb-phone-${source}`}>
          Phone <span className={styles.optionalMark}>(optional)</span>
        </label>
        <input
          id={`cb-phone-${source}`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Best number for a return call"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={`cb-times-${source}`}>
          Preferred days &amp; times{" "}
          <span className={styles.optionalMark}>(optional)</span>
        </label>
        <textarea
          id={`cb-times-${source}`}
          name="preferredTimes"
          placeholder="e.g. weekday mornings, or Tue 2–5pm next week"
          rows={3}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={`cb-notes-${source}`}>
          Anything else we should know{" "}
          <span className={styles.optionalMark}>(optional)</span>
        </label>
        <textarea
          id={`cb-notes-${source}`}
          name="notes"
          placeholder="Property area, scope, or how you heard about Mantle…"
          rows={3}
        />
      </div>

      <p className={styles.note}>
        We reply personally, usually within one business day — this is a request,
        not a confirmed calendar hold.
      </p>

      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Request consultation"}
      </button>
    </form>
  );
}
