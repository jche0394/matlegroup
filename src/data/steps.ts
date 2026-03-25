export interface Step {
  num: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    num: 1,
    title: "A conversation — not a pitch",
    description:
      "Short call: your property, pressure points, and what \"handled\" means. No obligation — mutual fit.",
  },
  {
    num: 2,
    title: "An in-person walkthrough",
    description:
      "We walk the property: what is due, what is risk, what would cut friction. Questions before checklists.",
  },
  {
    num: 3,
    title: "A written scope and fee",
    description:
      "Plain-English proposal: what we own, update cadence, inclusions and exclusions, and fees — nothing inferred.",
  },
  {
    num: 4,
    title: "Then we operate it",
    description:
      "From start date we run the engagement. Concise standing updates — ping you only when a decision is truly yours.",
  },
];
