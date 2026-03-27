import { Link } from "react-router-dom";
import { ConsultationBookingForm } from "../../components/ConsultationBookingForm";
import styles from "./BookingPage.module.css";

export function BookingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link to="/" className={styles.back}>
          ← Back to home
        </Link>
        <p className={styles.eyebrow}>Private consultation</p>
        <h1 className={styles.h1}>Book a time with Mantle</h1>
        <p className={styles.lead}>
          Share your details and when you&apos;re generally available. We&apos;ll
          confirm your consultation directly — no third-party scheduler required.
        </p>
        <ConsultationBookingForm source="booking-page" />
      </div>
    </main>
  );
}
