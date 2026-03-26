import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

/** Default playback id for https://player.mux.com/{id} (from Mux dashboard for this asset). */
const DEFAULT_MUX_PLAYBACK_ID =
  "PrK02RSeupnJwm1ADeG2GllQD01PQ802RVKoE1u5CtS8Uo";

function muxHeroSrc(playbackId: string) {
  const title = "hero-video";
  const params = new URLSearchParams({
    "metadata-video-title": title,
    "video-title": title,
    muted: "true",
    autoplay: "true",
    loop: "true",
    controls: "false",
  });
  return `https://player.mux.com/${playbackId}?${params.toString()}`;
}

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function IconPlay({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Hero() {
  const playbackId =
    import.meta.env.VITE_MUX_PLAYBACK_ID ?? DEFAULT_MUX_PLAYBACK_ID;

  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <div className={styles.iframeShell}>
          <iframe
            className={styles.muxIframe}
            src={muxHeroSrc(playbackId)}
            title="hero-video — background"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <div className={styles.overlay} aria-hidden />
        <div className={styles.overlayGlow} aria-hidden />
        <div className={styles.vignette} aria-hidden />
      </div>

      <div className={styles.content}>
        <div className={styles.announce}>
          <span className={styles.announceTag}>Melbourne</span>
          <span className={styles.announceText}>
            Renovations, upkeep &amp; remote oversight — one team
          </span>
        </div>

        <h1 className={styles.h1}>
          <em>Your home,</em>
          <br />
          under our mantle.
        </h1>

        <p className={styles.sub}>
          Complete home management for Melbourne&apos;s prestige properties.
        </p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.btnPrimary}>
            Get in touch
            <IconArrowUpRight className={styles.btnIcon} />
          </a>
          <Link to="/how-it-works" className={styles.btnGhost}>
            <IconPlay className={styles.playIcon} />
            How it works
          </Link>
        </div>

        <a
          href="#story"
          className={styles.scrollCue}
          aria-label="Scroll to Why Mantle"
        >
          <IconChevronDown className={styles.scrollCueIcon} />
        </a>
      </div>

      <div className={styles.trustDock}>
        <p className={styles.trustIntro}>
          Melbourne · private clients · vetted trades
        </p>
        <div className={styles.trustLogos} aria-hidden="true">
          <span className={styles.trustWord}>Insured</span>
          <span className={styles.trustWord}>Vetted</span>
          <span className={styles.trustWord}>Reports</span>
          <span className={styles.trustWord}>Quiet</span>
        </div>
      </div>
    </section>
  );
}
