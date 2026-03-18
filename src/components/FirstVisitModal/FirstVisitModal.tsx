import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./FirstVisitModal.module.css";

const STORAGE_KEY = "mantle_first_visit_modal_shown_v1";
const CALENDLY_URL = "https://calendly.com/mantlegroupau";

type View = "intro" | "booking";

export function FirstVisitModal() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("intro");
  const calendlyContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (!isOpen || view !== "booking") return;
    if (typeof window === "undefined") return;

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );

    const ensureScript = () =>
      new Promise<void>((resolve) => {
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });

    const init = async () => {
      await ensureScript();
      const win = window as typeof window & {
        Calendly?: {
          initInlineWidget: (options: {
            url: string;
            parentElement: HTMLElement;
            prefill?: Record<string, unknown>;
            utm?: Record<string, unknown>;
          }) => void;
        };
      };
      if (!win.Calendly || !calendlyContainerRef.current) return;

      calendlyContainerRef.current.innerHTML = "";
      win.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: calendlyContainerRef.current,
        prefill: {},
        utm: {},
      });
    };

    void init();
  }, [isOpen, view]);

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
              <div className={styles.bookingTitle}>Book a time</div>
            </div>
            <div className={styles.calendly} ref={calendlyContainerRef} />
          </div>
        )}
      </div>
    </div>
  );
}

