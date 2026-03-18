import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FaqPage.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  name: string;
  items: FaqItem[];
}

const faqData: FaqCategory[] = [
  {
    name: "General",
    items: [
      {
        question: "What does Mantle do?",
        answer:
          "Mantle is a home and property management service. We coordinate maintenance, manage projects, and handle contractor communication and admin so you don’t have to.",
      },
      {
        question: "Where do you operate?",
        answer:
          "We’re based in Melbourne and primarily support inner Melbourne and the eastern suburbs. If you’re slightly outside this area, enquire and we’ll confirm availability.",
      },
      {
        question: "Who is this for?",
        answer:
          "Time-poor owners, travelling clients, families juggling work, and absentee owners who want their home looked after with consistent oversight and clear communication.",
      },
      {
        question: "Do I need to switch all my contractors to Mantle’s?",
        answer:
          "No. We can work with your existing contractors where appropriate, or recommend trusted providers where needed. Our role is to coordinate and manage outcomes on your behalf.",
      },
      {
        question: "How do you communicate updates?",
        answer:
          "You’ll get concise updates with photos where helpful, plus clear approval requests before any spend. Cadence depends on the service (retainer vs project-based).",
      },
    ],
  },
  {
    name: "Services",
    items: [
      {
        question: "What services do you offer?",
        answer:
          "Renovation project management, lifestyle home maintenance (retainer), and absentee property management. Services are tailored to your property and how involved you want to be.",
      },
      {
        question: "Can you handle emergencies?",
        answer:
          "Yes. For retainer clients we can coordinate urgent response (e.g. leaks, faults) and keep you updated. Emergency callouts and contractor fees are charged separately.",
      },
      {
        question: "Do you do inspections?",
        answer:
          "Yes. We can schedule routine inspections, seasonal checks, and pre/post works walk-throughs, with photo notes and a clear action plan.",
      },
      {
        question: "Can you manage a renovation without me being on-site?",
        answer:
          "Yes. We coordinate trades, track progress, and communicate decisions and approvals remotely so you can stay hands-off while still informed.",
      },
    ],
  },
  {
    name: "Pricing",
    items: [
      {
        question: "How is pricing structured?",
        answer:
          "Depending on your needs, services are either a monthly retainer (ongoing maintenance / oversight) or a fixed/project-based management fee (renovations and defined scopes).",
      },
      {
        question: "Do you charge a markup on contractor invoices?",
        answer:
          "We’re transparent. Any management fees are agreed upfront. Contractor invoices can be paid directly by you, or handled by us with clear records—depending on what you prefer.",
      },
      {
        question: "Can I start small?",
        answer:
          "Yes. Many clients start with a walkthrough and a short list of immediate fixes. From there, we can move into a structured maintenance plan or ongoing retainer.",
      },
    ],
  },
  {
    name: "Process",
    items: [
      {
        question: "What’s the first step?",
        answer:
          "A short introductory call to understand your home and what’s taking your time. Then (if it’s a fit) an in-person walkthrough and a tailored proposal.",
      },
      {
        question: "How do approvals work?",
        answer:
          "We confirm scope and cost before proceeding. You approve quotes and any variations. We keep approvals simple and documented so there are no surprises.",
      },
      {
        question: "How do you choose contractors?",
        answer:
          "We prioritise reliability, communication, and quality. Where possible, we work with trusted providers and verify insurance/licensing appropriate to the work.",
      },
    ],
  },
];

export function FaqPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const categories = useMemo(
    () => faqData.map((c) => ({ name: c.name, count: c.items.length })),
    [],
  );

  const toggle = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToCategory = (name: string) => {
    const id = `category-${name.toLowerCase()}`;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Frequently Asked Questions</h1>
      </div>

      <div className={styles.tabsWrap}>
        <div className={styles.tabsInner}>
          <div className={styles.tabs}>
            {categories.map((c) => (
              <button
                key={c.name}
                type="button"
                className={styles.tab}
                onClick={() => scrollToCategory(c.name)}
              >
                {c.name} ({c.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {faqData.map((category) => {
            const categoryId = `category-${category.name.toLowerCase()}`;
            return (
              <section key={category.name} id={categoryId} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.h2}>
                    {category.name}{" "}
                    <span className={styles.count}>({category.items.length})</span>
                  </h2>
                </div>

                <div className={styles.items}>
                  {category.items.map((item, index) => {
                    const key = `${category.name}-${index}`;
                    const isOpen = open[key] === true;
                    return (
                      <div key={key} className={styles.item}>
                        <button
                          type="button"
                          className={styles.q}
                          onClick={() => toggle(category.name, index)}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.qText}>{item.question}</span>
                          <span className={styles.icon} aria-hidden>
                            {isOpen ? "–" : "+"}
                          </span>
                        </button>
                        {isOpen && <div className={styles.a}>{item.answer}</div>}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaBody}>
              Reach out and we&rsquo;ll point you to the right service and next
              steps.
            </p>
            <div className={styles.ctaActions}>
              <a className={styles.ctaBtn} href="/#contact">
                Contact us
              </a>
              <Link className={styles.ctaLink} to="/services">
                View services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

