import { HomePricing } from "../../components/Pricing/HomePricing";
import styles from "./PricingPage.module.css";

export function PricingPage() {
  return (
    <main className={styles.page}>
      <HomePricing variant="page" />
    </main>
  );
}
