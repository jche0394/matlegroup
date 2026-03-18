import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HowItWorksPage.module.css";

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "The Curation",
    description:
      "We begin with a private consultation to understand your home, your standards, and what you want off your mind — then curate the exact services and cadence around you.",
  },
  {
    title: "The Integration",
    description:
      "We map the nuances of your home—from security protocols to your preferred scent—ensuring our presence is felt only through the quality of the work.",
  },
  {
    title: "The Mastery",
    description:
      "Your home runs on a seamless rhythm — housekeeping, detailing, gardening, and preventative checks — with proactive attention and uncompromising finish.",
  },
  {
    title: "The Stewardship",
    description:
      "Over time, we learn your sanctuary. The experience becomes effortless: fewer decisions, calmer weeks, and a home that remains pristine without the mental load.",
  },
];

const CALENDLY_URL = "https://calendly.com/mantlegroupau";

export function HowItWorksPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hoursCoord, setHoursCoord] = useState(6);
  const [providers, setProviders] = useState(4);
  const [complexity, setComplexity] = useState<"Simple" | "Standard" | "Complex">(
    "Standard",
  );
  const [showDiscretion, setShowDiscretion] = useState(false);

  const calendlyContainerRef = useRef<HTMLDivElement | null>(null);
  const reportPreviewRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!showBooking) return;
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
  }, [showBooking]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowBooking(false);
        setShowReportPreview(false);
      }
      if (e.key === "ArrowLeft") {
        setCarouselIndex((i) => (i - 1 + 5) % 5);
      }
      if (e.key === "ArrowRight") {
        setCarouselIndex((i) => (i + 1) % 5);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    let raf = 0;
    const computeActive = () => {
      raf = 0;
      // Anchor line roughly where the sticky rail sits visually
      const anchorY = 220;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        // Use the step's top edge distance to a stable anchor
        const dist = Math.abs(rect.top - anchorY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = Number(node.getAttribute("data-step-index") || 0);
        }
      }

      setActiveStepIndex((prev) => (prev === bestIdx ? prev : bestIdx));
    };

    const obs = new IntersectionObserver(() => {
      if (raf) return;
      raf = window.requestAnimationFrame(computeActive);
    });

    nodes.forEach((n) => obs.observe(n));
    // Initial compute (on load)
    computeActive();

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(computeActive);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const orchestrations = useMemo(
    () => [
      {
        title: "Mobile detailing",
        subtitle: "A discreet arrival. An immaculate finish.",
        meta: "Interior, exterior, weekly or monthly cadence",
      },
      {
        title: "Master gardening",
        subtitle: "Seasonal rhythm, curated to your landscape.",
        meta: "Pruning, hedging, lawns, irrigation checks",
      },
      {
        title: "Housekeeping",
        subtitle: "Uncompromising standards, quietly maintained.",
        meta: "Deep cleans, rotation plans, linen coordination",
      },
      {
        title: "Pantry & home organisation",
        subtitle: "Order that stays ordered.",
        meta: "Restocks, labelling, storage optimisation",
      },
      {
        title: "Preventative upkeep",
        subtitle: "Problems handled before they become interruptions.",
        meta: "Seasonal checks, minor works, contractor coordination",
      },
    ],
    [],
  );

  const reclaimedHours = useMemo(() => {
    const complexityFactor = complexity === "Simple" ? 0.85 : complexity === "Complex" ? 1.25 : 1;
    const base = hoursCoord + providers * 0.6 + 2.5;
    return Math.max(2, Math.round(base * complexityFactor));
  }, [complexity, hoursCoord, providers]);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <video
            className={styles.heroVideo}
            src="/Video Project 1.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className={styles.heroVignette} />
        </div>
        <p className={styles.eyebrow}>How it works</p>
        <h1 className={styles.h1}>
          A bespoke way to keep your home
          <br />
          pristine — without the mental load.
        </h1>
        <p className={styles.sub}>
          You&rsquo;re not hiring a cleaner. You&rsquo;re reclaiming time — with a
          seamless, curated service that protects your sanctuary through
          discretion and quiet excellence.
        </p>

        <div className={styles.heroActions}>
          <button
            type="button"
            className={styles.primary}
            onClick={() => setShowBooking(true)}
          >
            Book a private consultation
          </button>
          <a className={styles.secondary} href="/services">
            Explore services
          </a>
        </div>
      </header>

      <section className={styles.process} aria-labelledby="process-heading">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2} id="process-heading">
              The process
            </h2>
            <p className={styles.lead}>
              Clear, calm, and effortless — from the first call to recurring
              excellence.
            </p>
          </div>

          <div className={styles.processSticky}>
            <div className={styles.processRail} aria-hidden="true">
              <div className={styles.processRailInner}>
                <div className={styles.processBigNum}>
                  {String(activeStepIndex + 1).padStart(2, "0")}
                </div>
                <div className={styles.processBigNumGhost}>
                  {String(activeStepIndex + 1).padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className={styles.processSteps}>
              {steps.map((s, idx) => (
                <div
                  key={s.title}
                  className={
                    idx === activeStepIndex
                      ? `${styles.processStep} ${styles.processStepActive}`
                      : styles.processStep
                  }
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  data-step-index={idx}
                >
                  <div className={styles.processSmallNum}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className={styles.processTitle}>{s.title}</h3>
                    <p className={styles.processDesc}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.split}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <p className={styles.cardEyebrow}>The vetting difference</p>
              <h2 className={styles.cardTitle}>Security. Excellence. Discretion.</h2>
              <p className={styles.cardBody}>
                Every provider is selected for workmanship and communication. We
                prioritise insured, reliable professionals who respect your home,
                your privacy, and your standards — uncompromising, always.
              </p>
              <p className={styles.cardNote}>
                We reject 90% of service providers to ensure only the most disciplined
                enter your home.
              </p>
              <ul className={styles.bullets}>
                <li>Identity, insurance, and suitability checks</li>
                <li>Quality control and accountability</li>
                <li>Discreet presence, clean finish</li>
              </ul>
            </div>

            <div className={styles.cardAlt}>
              <p className={styles.cardEyebrow}>The single point of contact</p>
              <h2 className={styles.cardTitle}>The Lead Steward.</h2>
              <p className={styles.cardBody}>
                You interact with a dedicated point of contact. We translate your
                priorities into a seamless plan, send concise updates, and request
                approvals only when necessary — effortless by design.
              </p>
              <div className={styles.interfaceStrip}>
                <div>
                  <div className={styles.interfaceLabel}>Updates</div>
                  <div className={styles.interfaceValue}>Concise, scheduled</div>
                </div>
                <div>
                  <div className={styles.interfaceLabel}>Approvals</div>
                  <div className={styles.interfaceValue}>Clear, before spend</div>
                </div>
                <div>
                  <div className={styles.interfaceLabel}>Support</div>
                  <div className={styles.interfaceValue}>On-call coordination</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mirror} aria-labelledby="mirror-heading">
        <div className={styles.container}>
          <div className={styles.mirrorHead}>
            <h2 className={styles.h2} id="mirror-heading">
              What we orchestrate
            </h2>
            <p className={styles.lead}>
              A curated ecosystem of high-end maintenance — seamless, discreet, and
              effortless.
            </p>
          </div>

          <div className={styles.carousel} aria-roledescription="carousel">
            <div className={styles.carouselFrame}>
              <div className={styles.carouselMedia} aria-hidden="true">
                <div
                  className={styles.carouselPlaceholder}
                  data-variant={carouselIndex}
                />
              </div>
              <div className={styles.carouselBody}>
                <div className={styles.carouselKicker}>Curated service</div>
                <h3 className={styles.carouselTitle}>
                  {orchestrations[carouselIndex]?.title}
                </h3>
                <p className={styles.carouselSub}>
                  {orchestrations[carouselIndex]?.subtitle}
                </p>
                <p className={styles.carouselMeta}>
                  {orchestrations[carouselIndex]?.meta}
                </p>

                <div className={styles.carouselControls}>
                  <button
                    type="button"
                    className={styles.carouselBtn}
                    onClick={() =>
                      setCarouselIndex((i) => (i - 1 + orchestrations.length) % orchestrations.length)
                    }
                    aria-label="Previous"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={styles.carouselBtn}
                    onClick={() =>
                      setCarouselIndex((i) => (i + 1) % orchestrations.length)
                    }
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>

                <div className={styles.dots} role="tablist" aria-label="Slides">
                  {orchestrations.map((o, i) => (
                    <button
                      key={o.title}
                      type="button"
                      className={i === carouselIndex ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                      onClick={() => setCarouselIndex(i)}
                      aria-label={`Go to ${o.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tools} aria-labelledby="tools-heading">
        <div className={styles.container}>
          <div className={styles.toolsGrid}>
            <div className={styles.toolCard}>
              <p className={styles.cardEyebrow}>Mental load</p>
              <h2 className={styles.cardTitle}>What you get back.</h2>
              <p className={styles.cardBody}>
                A simple estimate of the time Mantle can reclaim each month when we
                coordinate your home.
              </p>

              <div className={styles.calc}>
                <label className={styles.calcRow}>
                  <span className={styles.calcLabel}>Hours/month coordinating trades</span>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={hoursCoord}
                    onChange={(e) => setHoursCoord(Number(e.target.value))}
                  />
                  <span className={styles.calcValue}>{hoursCoord}h</span>
                </label>

                <label className={styles.calcRow}>
                  <span className={styles.calcLabel}>Service providers you manage</span>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={providers}
                    onChange={(e) => setProviders(Number(e.target.value))}
                  />
                  <span className={styles.calcValue}>{providers}</span>
                </label>

                <label className={styles.calcRow}>
                  <span className={styles.calcLabel}>Property complexity</span>
                  <select
                    className={styles.calcSelect}
                    value={complexity}
                    onChange={(e) =>
                      setComplexity(e.target.value as "Simple" | "Standard" | "Complex")
                    }
                  >
                    <option>Simple</option>
                    <option>Standard</option>
                    <option>Complex</option>
                  </select>
                </label>

                <div className={styles.calcResult}>
                  <div className={styles.calcResultNum}>~{reclaimedHours} hours / month</div>
                  <div className={styles.calcResultLabel}>
                    Reclaimed through bespoke coordination and seamless execution.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.toolCardAlt}>
              <p className={styles.cardEyebrow}>Portfolio</p>
              <h2 className={styles.cardTitle}>A sample monthly report.</h2>
              <p className={styles.cardBody}>
                See the structure behind the calm — what we track, what we action, and
                what we recommend, without clutter.
              </p>

              <div className={styles.previewBox} aria-hidden="true">
                <div className={styles.previewBlur} />
                <div className={styles.previewLine} />
                <div className={styles.previewLine} />
                <div className={styles.previewLineShort} />
              </div>

              <div className={styles.previewActions}>
                <button
                  type="button"
                  className={styles.previewBtn}
                  onClick={() => setShowReportPreview(true)}
                >
                  View a sample monthly report
                </button>
                <button
                  type="button"
                  className={styles.previewLink}
                  onClick={() => setShowDiscretion((v) => !v)}
                >
                  Discretion &amp; Security
                </button>
              </div>

              {showDiscretion && (
                <div className={styles.discretion}>
                  <div className={styles.discretionItem}>
                    <div className={styles.discretionTitle}>Key handling</div>
                    <div className={styles.discretionBody}>
                      Access is documented and controlled. We keep protocols clear and
                      permissions minimal.
                    </div>
                  </div>
                  <div className={styles.discretionItem}>
                    <div className={styles.discretionTitle}>Contractor screening</div>
                    <div className={styles.discretionBody}>
                      We prioritise insured providers with disciplined communication and
                      a discreet presence.
                    </div>
                  </div>
                  <div className={styles.discretionItem}>
                    <div className={styles.discretionTitle}>Reporting controls</div>
                    <div className={styles.discretionBody}>
                      Photos and updates are shared only as needed, with your preferred
                      level of detail.
                    </div>
                  </div>
                  <div className={styles.discretionItem}>
                    <div className={styles.discretionTitle}>Privacy-first communication</div>
                    <div className={styles.discretionBody}>
                      One Lead Steward, one clear line. No noisy group threads. No
                      unnecessary distribution.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>An effortless home starts here.</h2>
            <p className={styles.ctaBody}>
              Book a private consultation. We&rsquo;ll curate the right rhythm for
              your home — and give you the gift of time.
            </p>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => setShowBooking(true)}
            >
              Book a private consultation
            </button>
          </div>
        </div>
      </section>

      {showBooking && (
        <div className={styles.bookingBackdrop} onClick={() => setShowBooking(false)}>
          <div className={styles.bookingModal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.bookingClose}
              onClick={() => setShowBooking(false)}
              aria-label="Close booking"
            >
              ×
            </button>
            <div className={styles.calendly} ref={calendlyContainerRef} />
          </div>
        </div>
      )}

      {showReportPreview && (
        <div
          className={styles.bookingBackdrop}
          onClick={() => setShowReportPreview(false)}
        >
          <div
            className={styles.reportModal}
            ref={reportPreviewRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.bookingClose}
              onClick={() => setShowReportPreview(false)}
              aria-label="Close report preview"
            >
              ×
            </button>
            <div className={styles.reportInner}>
              <div className={styles.reportHeader}>
                <div className={styles.reportTitle}>Sample monthly report</div>
                <div className={styles.reportSub}>
                  A blurred preview — structure without sensitive detail.
                </div>
              </div>
              <div className={styles.reportSheet} aria-hidden="true">
                <div className={styles.reportRow} />
                <div className={styles.reportRow} />
                <div className={styles.reportRow} />
                <div className={styles.reportRowWide} />
                <div className={styles.reportRow} />
                <div className={styles.reportRow} />
              </div>
              <div className={styles.reportFooter}>
                <button
                  type="button"
                  className={styles.previewBtn}
                  onClick={() => {
                    setShowReportPreview(false);
                    setShowBooking(true);
                  }}
                >
                  Book a private consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

