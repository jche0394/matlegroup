import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ConsultationBookingForm } from "../../components/ConsultationBookingForm";
import { Threads } from "../../components/Threads";
import styles from "./HowItWorksPage.module.css";

type Step = {
  title: string;
  description: string;
};

/** RGB 0–1 — Mantle stone (#8c7b6b) for thread lines on warm-white */
const HOW_IT_WORKS_THREADS_COLOR: [number, number, number] = [
  140 / 255,
  123 / 255,
  107 / 255,
];

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

/** Rough model: coordination slider = hours/month you spend on calls, schedules, site visits. */
const PROPERTY_PROFILE = {
  Simple: {
    coordinationReclaimed: 0.88,
    hoursPerProvider: 0.42,
    planningHours: 1.75,
  },
  Standard: {
    coordinationReclaimed: 0.85,
    hoursPerProvider: 0.55,
    planningHours: 3.25,
  },
  Complex: {
    coordinationReclaimed: 0.82,
    hoursPerProvider: 0.72,
    planningHours: 5.25,
  },
} as const;

/** Integers that sum to `total`, proportional to raw (non-negative) weights. */
function allocateRoundedBreakdown(
  total: number,
  weights: readonly [number, number, number],
): [number, number, number] {
  const [w0, w1, w2] = weights;
  const wsum = w0 + w1 + w2;
  if (total <= 0 || wsum <= 0) return [0, 0, 0];

  const exact: [number, number, number] = [
    (w0 / wsum) * total,
    (w1 / wsum) * total,
    (w2 / wsum) * total,
  ];
  const floors: [number, number, number] = [
    Math.floor(exact[0]),
    Math.floor(exact[1]),
    Math.floor(exact[2]),
  ];
  let rem = total - floors[0] - floors[1] - floors[2];
  const order = [0, 1, 2].sort(
    (i, j) => exact[j]! - floors[j]! - (exact[i]! - floors[i]!),
  );
  const out: [number, number, number] = [...floors];
  for (let k = 0; k < rem; k++) {
    out[order[k]!] += 1;
  }
  return out;
}

export function HowItWorksPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hoursCoord, setHoursCoord] = useState(6);
  const [providers, setProviders] = useState(4);
  const [complexity, setComplexity] = useState<"Simple" | "Standard" | "Complex">(
    "Standard",
  );
  const [showDiscretion, setShowDiscretion] = useState(false);

  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowBooking(false);
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
    () =>
      [
        {
          title: "Pantry & home organisation",
          subtitle: "Order that stays ordered.",
          meta: "Restocks, labelling, storage optimisation",
          imageSrc: "/homeorganisation.jpg",
          imageAlt: "Organised pantry shelves and storage",
        },
        {
          title: "Mobile detailing",
          subtitle: "A discreet arrival. An immaculate finish.",
          meta: "Interior, exterior, weekly or monthly cadence",
          imageSrc: "/mobiledetail.jpg",
          imageAlt: "Vehicle detailing at the residence",
        },
        {
          title: "Master gardening",
          subtitle: "Seasonal rhythm, curated to your landscape.",
          meta: "Pruning, hedging, lawns, irrigation checks",
          imageSrc: "/gardening.jpg",
          imageAlt: "Garden and landscape maintenance",
        },
        {
          title: "Housekeeping",
          subtitle: "Uncompromising standards, quietly maintained.",
          meta: "Deep cleans, rotation plans, linen coordination",
          imageSrc: "/housekeeping.jpg",
          imageAlt: "Immaculate interior living space",
        },
        {
          title: "Preventative upkeep",
          subtitle: "Problems handled before they become interruptions.",
          meta: "Seasonal checks, minor works, contractor coordination",
          imageSrc: "/upkeep.jpg",
          imageAlt: "Home maintenance and seasonal checks",
        },
      ] as const,
    [],
  );

  const reclaimed = useMemo(() => {
    const cfg = PROPERTY_PROFILE[complexity];
    const coordRaw = hoursCoord * cfg.coordinationReclaimed;
    const provRaw = providers * cfg.hoursPerProvider;
    const hasActivity = hoursCoord > 0 || providers > 0;
    const planRaw = hasActivity ? cfg.planningHours : 0;

    const totalHours = Math.max(0, coordRaw + provRaw + planRaw);
    const total = Math.round(totalHours);

    const [coordPart, provPart, planPart] = allocateRoundedBreakdown(total, [
      coordRaw,
      provRaw,
      planRaw,
    ]);

    return { total, coordPart, provPart, planPart };
  }, [complexity, hoursCoord, providers]);

  return (
    <main className={styles.page}>
      <header className={styles.heroShell}>
        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.heroThreads}>
            <Threads
              color={HOW_IT_WORKS_THREADS_COLOR}
              amplitude={1.8}
              distance={0.5}
              enableMouseInteraction={true}
            />
          </div>
        </div>
        <div className={styles.hero}>
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
            <Link
              className={styles.secondary}
              to={{ pathname: "/", hash: "services" }}
            >
              Explore services
            </Link>
          </div>
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

      <section className={styles.tools} aria-labelledby="tools-heading">
        <div className={styles.container}>
          <div className={styles.toolsGrid}>
            <div className={`${styles.toolCard} ${styles.toolCardOrchestrate}`}>
              <p className={styles.cardEyebrow}>Behind the calm</p>
              <h2 className={styles.cardTitle} id="tools-heading">
                What we orchestrate.
              </h2>
              <p className={styles.cardBody}>
                A curated ecosystem of high-end maintenance — seamless, discreet, and
                effortless. One Lead Steward aligns trades, detail, and rhythm — so
                nothing falls through the cracks and you stay out of the weeds.
              </p>
              <ul className={styles.orchestrateList}>
                {orchestrations.map((o) => (
                  <li key={o.title} className={styles.orchestrateItem}>
                    <div className={styles.orchestrateMedia}>
                      <img
                        src={o.imageSrc}
                        alt={o.imageAlt}
                        width={640}
                        height={480}
                        loading="lazy"
                        decoding="async"
                        className={styles.orchestrateImg}
                      />
                    </div>
                    <div className={styles.orchestrateCopy}>
                      <span className={styles.orchestrateItemTitle}>{o.title}</span>
                      <span className={styles.orchestrateItemSub}>{o.subtitle}</span>
                      <span className={styles.orchestrateItemMeta}>{o.meta}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.toolCard} ${styles.toolCardCalculator}`}>
              <p className={styles.cardEyebrow}>Mental load</p>
              <h2 className={styles.cardTitle}>Time you could reclaim.</h2>
              <p className={styles.cardBody}>
                A rough monthly estimate of coordination and admin lifted off your
                calendar — not a quote. Tune the sliders to reflect your home.
              </p>

              <div className={styles.calc}>
                <label className={styles.calcRow}>
                  <span className={styles.calcRowHead}>
                    <span className={styles.calcLabel}>
                      Hours you spend coordinating trades
                    </span>
                    <span className={styles.calcValue}>{hoursCoord}h / mo</span>
                  </span>
                  <input
                    type="range"
                    className={styles.calcRange}
                    style={
                      {
                        "--calc-fill": `${(hoursCoord / 20) * 100}%`,
                      } as CSSProperties
                    }
                    min={0}
                    max={20}
                    value={hoursCoord}
                    aria-valuetext={`${hoursCoord} hours per month`}
                    onChange={(e) => setHoursCoord(Number(e.target.value))}
                  />
                </label>

                <label className={styles.calcRow}>
                  <span className={styles.calcRowHead}>
                    <span className={styles.calcLabel}>
                      Trades &amp; suppliers you juggle
                    </span>
                    <span className={styles.calcValue}>{providers}</span>
                  </span>
                  <input
                    type="range"
                    className={styles.calcRange}
                    style={
                      {
                        "--calc-fill": `${(providers / 10) * 100}%`,
                      } as CSSProperties
                    }
                    min={0}
                    max={10}
                    value={providers}
                    aria-valuetext={`${providers} providers`}
                    onChange={(e) => setProviders(Number(e.target.value))}
                  />
                </label>

                <div className={styles.calcRow}>
                  <span className={styles.calcLabel}>Property profile</span>
                  <div
                    className={styles.complexityGroup}
                    role="radiogroup"
                    aria-label="Property profile"
                  >
                    {(["Simple", "Standard", "Complex"] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        role="radio"
                        aria-checked={complexity === c}
                        className={
                          complexity === c
                            ? styles.complexityBtnActive
                            : styles.complexityBtn
                        }
                        onClick={() => setComplexity(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <p className={styles.calcHint}>
                    Simple: compact home, fewer moving parts. Complex: larger
                    footprint, more systems and visits.
                  </p>
                </div>

                <div className={styles.calcResult}>
                  <p className={styles.calcResultEyebrow}>Estimated monthly time saved</p>
                  <div className={styles.calcResultNum}>
                    ~{reclaimed.total} hours / month
                  </div>
                  <ul className={styles.calcBreakdown} aria-label="Estimate breakdown">
                    <li>
                      <span>Coordinating trades</span>
                      <span>{reclaimed.coordPart} h</span>
                    </li>
                    <li>
                      <span>Supplier admin &amp; follow-ups</span>
                      <span>{reclaimed.provPart} h</span>
                    </li>
                    <li>
                      <span>Rhythm, planning &amp; handovers</span>
                      <span>{reclaimed.planPart} h</span>
                    </li>
                  </ul>
                  <p className={styles.calcDisclaimer}>
                    Illustrative only — your Lead Steward sets the real cadence after a
                    walkthrough.
                  </p>
                </div>

                <div className={styles.discretionToggle}>
                  <button
                    type="button"
                    className={styles.discretionTrigger}
                    onClick={() => setShowDiscretion((v) => !v)}
                    aria-expanded={showDiscretion}
                  >
                    <span className={styles.discretionTriggerLabel}>
                      Discretion &amp; security
                    </span>
                    <span className={styles.discretionTriggerHint} aria-hidden="true">
                      {showDiscretion ? "−" : "+"}
                    </span>
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
                      <div className={styles.discretionTitle}>
                        Privacy-first communication
                      </div>
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
            <div className={`${styles.bookingModalInner} customScrollbar`}>
              <p className={styles.bookingModalEyebrow}>Private consultation</p>
              <h2 className={styles.bookingModalTitle}>Request a time</h2>
              <p className={styles.bookingModalLead}>
                We&apos;ll confirm your appointment directly — usually within one
                business day.
              </p>
              <ConsultationBookingForm source="how-it-works-modal" />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

