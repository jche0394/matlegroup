import { Link, type To } from "react-router-dom";
import styles from "./SitemapPage.module.css";

type SitemapLink = {
  to: To;
  label: string;
  hint?: string;
};

type SitemapGroup = {
  key: string;
  eyebrow: string;
  title: string;
  items: SitemapLink[];
};

const groups: SitemapGroup[] = [
  {
    key: "home",
    eyebrow: "Mantle",
    title: "Homepage",
    items: [
      { to: "/", label: "Home", hint: "Overview" },
      { to: { pathname: "/", hash: "story" }, label: "Why Mantle", hint: "Our story" },
      {
        to: { pathname: "/", hash: "services" },
        label: "Services",
        hint: "What we do",
      },
      { to: { pathname: "/", hash: "how" }, label: "The process", hint: "How it works" },
      {
        to: { pathname: "/", hash: "pricing" },
        label: "Pricing",
        hint: "Retainers",
      },
      { to: { pathname: "/", hash: "contact" }, label: "Contact", hint: "Enquiry" },
    ],
  },
  {
    key: "pages",
    eyebrow: "Explore",
    title: "Main pages",
    items: [
      { to: "/how-it-works", label: "How it works", hint: "Full guide" },
      { to: "/book", label: "Book a consultation", hint: "Request a call" },
      { to: "/pricing", label: "Pricing", hint: "Dedicated page" },
      { to: "/faq", label: "FAQ", hint: "Answers" },
    ],
  },
  {
    key: "legal",
    eyebrow: "Legal",
    title: "Policies",
    items: [
      { to: "/privacy", label: "Privacy policy" },
      { to: "/terms", label: "Terms of service" },
    ],
  },
];

export function SitemapPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Site directory</p>
          <h1 className={styles.h1}>Sitemap</h1>
          <p className={styles.lead}>
            Every public page and main section — quick links, clear hierarchy.
          </p>
        </header>

        <div className={styles.groups}>
          {groups.map((group) => (
            <section
              key={group.key}
              className={styles.group}
              aria-labelledby={`sitemap-${group.key}`}
            >
              <div className={styles.groupHead}>
                <p className={styles.groupEyebrow}>{group.eyebrow}</p>
                <h2 className={styles.groupTitle} id={`sitemap-${group.key}`}>
                  {group.title}
                </h2>
              </div>
              <ul className={styles.linkList}>
                {group.items.map((item) => (
                  <li key={`${group.key}-${item.label}`}>
                    <Link to={item.to} className={styles.link}>
                      <span className={styles.linkText}>
                        <span className={styles.linkLabel}>{item.label}</span>
                        {item.hint ? (
                          <span className={styles.linkHint}>{item.hint}</span>
                        ) : null}
                      </span>
                      <span className={styles.linkArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className={styles.footerNote}>
          For search engines:{" "}
          <a href="/sitemap.xml">XML sitemap</a>
        </p>
      </div>
    </main>
  );
}
