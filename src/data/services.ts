export interface Service {
  num: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  differentiator: string;
}

export const services: Service[] = [
  {
    num: "01",
    tag: "Highest Value",
    title: "Renovation Project Management",
    tagline: "We sit on your side of the table.",
    description:
      "Managing your builder, tradies, timeline and budget on your behalf. You receive weekly updates and never make a single site visit or contractor call.",
    features: [
      "Builder and tradie management",
      "Budget tracking and reporting",
      "Weekly progress updates",
      "Timeline management",
      "Variation and dispute handling",
    ],
    differentiator:
      "A dedicated person managing your interests across the entire project — not the builder's, not the architect's. Yours.",
  },
  {
    num: "02",
    tag: "Monthly Retainer",
    title: "Lifestyle Home Maintenance",
    tagline:
      "Everything your home needs, handled before you notice it needs it.",
    description:
      "Proactive and reactive maintenance coordination on a monthly retainer. Seasonal checks, contractor scheduling, emergency response, and complete admin and invoicing.",
    features: [
      "Seasonal property inspections",
      "Contractor scheduling",
      "Emergency response",
      "Supplier relationships managed",
      "All admin and invoicing handled",
    ],
    differentiator:
      "A proactive maintenance calendar tailored to your specific property. We identify problems before you ever notice them.",
  },
  {
    num: "03",
    tag: "Underserved Niche",
    title: "Absentee Property Management",
    tagline: "Your eyes on the ground, wherever you are in the world.",
    description:
      "Full property oversight for clients who are travelling, living abroad, or own investment properties they cannot regularly visit. Your property is never unwatched.",
    features: [
      "Regular property inspections",
      "Weekly video walkthroughs",
      "Emergency contractor response",
      "Mail and utility management",
      "Photo and video reporting",
    ],
    differentiator:
      "Structured weekly video walkthroughs sent directly to you, wherever you are. No other Melbourne home concierge does this.",
  },
];
