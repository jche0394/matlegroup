export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  model: string;
  includes: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "lifestyle",
    title: "Lifestyle home maintenance",
    subtitle: "For the home you live in — planned rhythm, fewer surprises.",
    model: "Monthly retainer",
    includes: [
      "Scope agreed after walkthrough — visits, checks, and coordination defined in writing",
      "Contractor booking and site coordination within your approved cadence",
      "Consolidated admin and invoicing for work we manage on your behalf",
    ],
  },
  {
    id: "absentee",
    title: "Absentee property management",
    subtitle: "Eyes on your property when you're away from Melbourne.",
    model: "Monthly retainer",
    includes: [
      "Inspection and reporting cadence matched to how often you want visibility",
      "Utilities, mail, and access coordination as set out in your proposal",
      "Rapid dispatch to vetted trades when something needs attention",
    ],
  },
];
