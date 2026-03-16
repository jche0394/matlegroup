export interface Step {
  num: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    num: 1,
    title: "A conversation, not a sales pitch",
    description:
      "We start with a 30-minute call to understand your home, your situation, and what's taking up your time. There's no obligation and no script — we're finding out whether we're the right fit for each other.",
  },
  {
    num: 2,
    title: "A property walkthrough",
    description:
      "We visit your home in person. We look at what needs attention, what's coming up, and what would make the biggest difference to your daily life. We come with questions, not a clipboard.",
  },
  {
    num: 3,
    title: "A tailored service proposal",
    description:
      "We put together a clear proposal — what we'll handle, how often you'll hear from us, and exactly what it costs. No ambiguity, no surprises.",
  },
  {
    num: 4,
    title: "We take it from here",
    description:
      "From the day you start with Mantle, your home is looked after. You'll hear from us every Friday with a brief update on anything we've handled that week. Nothing else requires your attention.",
  },
];
