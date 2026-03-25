export interface Service {
  num: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  differentiator: string;
  /** Placeholder photography (replace with brand assets when ready). */
  imageSrc: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    num: "01",
    tag: "Renovations",
    title: "Renovation Project Management",
    tagline: "Your advocate — not the builder's.",
    description:
      "We run the build on your behalf: builders and trades, programme, budget, and variations. You get concise weekly reporting; we handle site and contractor communications.",
    features: [
      "Builder and tradie management",
      "Budget tracking and reporting",
      "Weekly progress updates",
      "Timeline management",
      "Variation and dispute handling",
    ],
    differentiator:
      "A dedicated person managing your interests across the entire project — not the builder's, not the architect's. Yours.",
    imageSrc: "https://picsum.photos/seed/mantle-reno/960/640",
    imageAlt:
      "Placeholder image: architecture and construction of a prestige home",
  },
  {
    num: "02",
    tag: "Retainer care",
    title: "Lifestyle Home Maintenance",
    tagline: "Checks, fixes, and admin — on a rhythm.",
    description:
      "Monthly retainer for the home you live in: planned inspections, contractor booking, emergency response, and consolidated invoicing — so small problems do not become urgent ones.",
    features: [
      "Seasonal property inspections",
      "Contractor scheduling",
      "Emergency response",
      "Supplier relationships managed",
      "All admin and invoicing handled",
    ],
    differentiator:
      "A proactive maintenance calendar tailored to your specific property. We identify problems before you ever notice them.",
    imageSrc: "https://picsum.photos/seed/mantle-home/960/640",
    imageAlt:
      "Placeholder image: warm interior of a well-maintained residence",
  },
  {
    num: "03",
    tag: "Away from home",
    title: "Absentee Property Management",
    tagline: "Eyes on site when you can't be in Melbourne.",
    description:
      "For travel, work abroad, or investment stock you rarely visit: scheduled inspections, agreed reporting, utilities and mail coordination, and rapid contractor dispatch when something goes wrong.",
    features: [
      "Regular property inspections",
      "Weekly video walkthroughs",
      "Emergency contractor response",
      "Mail and utility management",
      "Photo and video reporting",
    ],
    differentiator:
      "Optional weekly video walkthroughs, delivered on a schedule you set — visibility without flying home for every detail.",
    imageSrc: "https://picsum.photos/seed/mantle-away/960/640",
    imageAlt:
      "Placeholder image: residential street and property viewed from approach",
  },
];
