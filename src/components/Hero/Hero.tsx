import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const [showBooking, setShowBooking] = useState(false);
  const calendlyContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!showBooking) return;
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

    win.Calendly.initInlineWidget({
      url: "https://calendly.com/mantlegroupau",
      parentElement: calendlyContainerRef.current,
      prefill: {},
      utm: {},
    });
  }, [showBooking]);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>Melbourne Home Management</p>
        <h1 className={styles.h1}>
          Your home,
          <br />
          taken completely
          <br />
          <em>under our mantle.</em>
        </h1>
        <p className={styles.sub}>
          We manage your home, your renovation, and your property — so you never
          have to think about it again.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>
            Start a Conversation
          </a>
          <a href="#services" className={styles.btnGhost}>
            Explore Services
          </a>
          <button
            type="button"
            className={styles.btnBooking}
            onClick={() => setShowBooking(true)}
          >
            Book a time
          </button>
        </div>
        <div className={styles.trustRow}>
          <span className={styles.trustPill}>Discreet, relationship-based service</span>
          <span className={styles.trustPill}>Insured and contractor-vetted</span>
          <span className={styles.trustPill}>Based in inner Melbourne</span>
        </div>
      </div>

      <div className={styles.right}>
        <video
          className={styles.video}
          src="/Video Project 1.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Prestige Melbourne home"
        />
        <div className={styles.overlay} />
      </div>

      {showBooking && (
        <div
          className={styles.bookingBackdrop}
          onClick={() => setShowBooking(false)}
        >
          <div
            className={styles.bookingModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.bookingClose}
              onClick={() => setShowBooking(false)}
              aria-label="Close booking"
            >
              ×
            </button>
            <div
              ref={calendlyContainerRef}
              style={{ minWidth: "320px", height: "100%" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
