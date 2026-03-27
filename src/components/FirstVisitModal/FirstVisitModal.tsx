import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ConsultationBookingForm } from "../ConsultationBookingForm";
import styles from "./FirstVisitModal.module.css";

const STORAGE_KEY = "mantle_first_visit_modal_shown_v1";

type View = "intro" | "booking";

export function FirstVisitModal() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("intro");

  const shouldRenderOnThisRoute = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    if (!shouldRenderOnThisRoute) return;
    if (typeof window === "undefined") return;

    const alreadyShown = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      window.localStorage.setItem(STORAGE_KEY, "1");
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [shouldRenderOnThisRoute]);

  const close = () => {
    setIsOpen(false);
    setView("intro");
  };

  if (!shouldRenderOnThisRoute) return null;
  if (!isOpen) return null;

  return (
    <div className={styles.root} role="dialog" aria-modal="true">
      <div className={styles.backdrop} onClick={close} />

      <div className={styles.modal}>
        <button
          type="button"
          onClick={close}
          className={styles.close}
          aria-label="Close modal"
        >
          <span aria-hidden>×</span>
        </button>

        {view === "intro" ? (
          <div className={styles.grid}>
            <div className={styles.left}>
              <div className={styles.brand}>Mantle</div>
              <h2 className={styles.title}>
                A calm home,
                <br />
                without the admin.
              </h2>
              <p className={styles.body}>
                If you&rsquo;re time-poor (or travelling), we coordinate
                maintenance and manage projects with quiet, consistent oversight.
              </p>

              <button
                type="button"
                className={styles.primary}
                onClick={() => setView("booking")}
              >
                Book a call
              </button>

              <p className={styles.legal}>
                By getting started, you agree to our{" "}
                <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>

            <div className={styles.right}>
              <div className={styles.card}>
                <div className={styles.cardEyebrow}>Typical outcomes</div>
                <div className={styles.cardMetric}>
                  <span className={styles.cardNumber}>0</span>
                  <span className={styles.cardLabel}>tradies to chase</span>
                </div>
                <div className={styles.cardDivider} />
                <ul className={styles.cardList}>
                  <li>One point of contact</li>
                  <li>Weekly updates when active</li>
                  <li>Clear approval before spend</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.booking}>
            <div className={styles.bookingHeader}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => setView("intro")}
              >
                Back
              </button>
              <div className={styles.bookingTitle}>Request a consultation</div>
            </div>
            <div className={`${styles.bookingFormWrap} customScrollbar`}>
              <ConsultationBookingForm source="first-visit-modal" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
