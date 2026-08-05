interface Feature {
  id: number;
  title: string;
  description: string;
}

export const landlordFeatures: Feature[] = [
  {
    id: 1,
    title: "Dashboard overview",
    description:
      "See every property and payment status at a glance, color-coded by urgency.",
  },
  {
    id: 2,
    title: "Mobile money payments",
    description:
      "Tenants pay via MTN or Airtel Money and upload proof — you approve from anywhere.",
  },
  {
    id: 3,
    title: "Blacklist check",
    description:
      "Search a tenant's payment history before you sign a lease — avoid repeat bad renters.",
  },
  {
    id: 4,
    title: "Automated reminders",
    description:
      "SMS and email reminders sent automatically before rent is due — no manual chasing.",
  },
  {
    id: 5,
    title: "Digital lease agreements",
    description:
      "Sign online, stored securely in the cloud — legal proof if disputes ever arise.",
  },
  {
    id: 6,
    title: "Income & tax reports",
    description:
      "Generate occupancy and income reports across every property with one click.",
  },
];
export const featureService = [
  {
    id: 1,
    title: "For Landlords",
  },
  {
    id: 2,
    title: "For Renters",
  },
  {
    id: 3,
    title: "AI Assistant",
  },
  {
    id: 4,
    title: "Trust & Verification",
  },
];
