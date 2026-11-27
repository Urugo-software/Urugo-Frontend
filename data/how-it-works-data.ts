import type { RoleFlow } from "@/types";

export const howItWorksData: Record<
  "home_seeker" | "landlord" | "renter",
  RoleFlow
> = {
  home_seeker: {
    roleId: "home_seeker",
    roleName: "For Home Seekers",
    steps: [
      {
        stepNumber: 1,
        title: "Browse available homes",
        description:
          "Search public listings by district, budget, bedrooms, and amenities with no account required.",
      },
      {
        stepNumber: 2,
        title: "Review photos & real costs",
        description:
          "Inspect property photos, included amenities, monthly rent, and upfront move-in estimates.",
      },
      {
        stepNumber: 3,
        title: "Ask questions or book a visit",
        description:
          "Send an inquiry or request an in-person viewing directly from the property page.",
      },
      {
        stepNumber: 4,
        title: "Move in with clarity",
        description:
          "Visit the home, agree on lease terms with the landlord, and transition smoothly into your renter account if managed on Urugo.",
      },
    ],
    banner: {
      title: "Ready to find your next home?",
      description:
        "Browse available properties across Rwanda or ask Zoe for quick guidance.",
      ctaText: "Browse Properties",
      ctaHref: "/properties",
    },
  },

  landlord: {
    roleId: "landlord",
    roleName: "For Landlords",
    steps: [
      {
        stepNumber: 1,
        title: "Choose your service path",
        description:
          "Create an account and pick Listing-Only to advertise homes independently, or Full Rental Management to manage everything on Urugo.",
      },
      {
        stepNumber: 2,
        title: "Publish your properties",
        description:
          "Add photos, monthly rent, location, units, and availability so home seekers can find your listings.",
      },
      {
        stepNumber: 3,
        title: "Handle inquiries & viewings",
        description:
          "Reply to questions and confirm or reschedule property viewing requests from your dashboard.",
      },
      {
        stepNumber: 4,
        title: "Manage rentals when ready",
        description:
          "With Full Rental Management (which you can enable anytime), manage renters, leases, mobile money payment records, and renter history.",
      },
    ],
    banner: {
      title: "List a property or manage your full portfolio.",
      description:
        "Start with Listing-Only mode or switch to Full Rental Management on the same landlord account anytime.",
      ctaText: "Go to Landlord Dashboard",
      ctaHref: "/landlord",
    },
  },

  renter: {
    roleId: "renter",
    roleName: "For Renters",
    steps: [
      {
        stepNumber: 1,
        title: "Join your rental workspace",
        description:
          "Use the secure invitation email from your landlord to verify your email and activate your renter account before viewing your rental details.",
      },
      {
        stepNumber: 2,
        title: "Review your lease & terms",
        description:
          "Check your monthly rent, due date, security deposit, and downloadable lease agreement anytime.",
      },
      {
        stepNumber: 3,
        title: "Submit payments & keep receipts",
        description:
          "Record MTN Mobile Money, Airtel Money, or bank rent payments and access your receipt history.",
      },
      {
        stepNumber: 4,
        title: "Track repairs & rental history",
        description:
          "Log maintenance issues, message your landlord, and review any rental history notices until move-out.",
      },
    ],
    banner: {
      title: "Keep your tenancy organized from day one.",
      description:
        "Access your lease, payment history, repair requests, and documents in one simple dashboard.",
      ctaText: "Go to Renter Dashboard",
      ctaHref: "/renter",
    },
  },
};
