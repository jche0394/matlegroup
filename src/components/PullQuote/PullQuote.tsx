import styles from "./PullQuote.module.css";

export function PullQuote() {
  return (
    <section className={styles.section}>
      <blockquote className={styles.quote}>
        &ldquo;The kind of service that used to require a full-time household
        manager — now available to anyone who values their time.&rdquo;
      </blockquote>
      <p className={styles.attr}>Mantle Home Management — Melbourne</p>
    </section>
  );
}
