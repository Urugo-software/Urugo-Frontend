export interface Step {
  stepNumber: number;
  title: string;
  description: string;
}

export interface RoleFlow {
  roleId: "home_seeker" | "landlord" | "renter";
  roleName: string;
  steps: Step[];
  banner: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
}

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
        title: "Create your account",
        description:
          "Sign up for Urugo to access available properties and the AI assistant.",
      },
      {
        stepNumber: 2,
        title: "Find a home",
        description:
          "Browse available properties or tell the AI assistant what kind of home you are looking for.",
      },
      {
        stepNumber: 3,
        title: "Explore the details",
        description:
          "Check the price, location, photos, amenities, and estimated rental costs of each property.",
      },
      {
        stepNumber: 4,
        title: "Choose your home",
        description:
          "Found a property you like? Continue with the rental process and provide the required information.",
      },
    ],
    banner: {
      title: "Ready to find your next home?",
      description:
        "Explore properties and use Urugo's tools to make your home search easier.",
      ctaText: "Find a Home →",
      ctaHref: "/properties",
    },
  },

  landlord: {
    roleId: "landlord",
    roleName: "For Landlords",
    steps: [
      {
        stepNumber: 1,
        title: "Get registered",
        description:
          "An Urugo admin verifies your identity and registers your landlord account.",
      },
      {
        stepNumber: 2,
        title: "Add your properties",
        description:
          "Add your properties with photos, prices, locations, descriptions, amenities, and other important details.",
      },
      {
        stepNumber: 3,
        title: "Manage your properties",
        description:
          "Update your property information, photos, availability, and other details whenever you need.",
      },
      {
        stepNumber: 4,
        title: "Manage your rentals",
        description:
          "Manage renters, track payments, leases, and other important rental information from your dashboard.",
      },
    ],
    banner: {
      title: "Your properties, managed in one place.",
      description:
        "Urugo helps you manage your properties, renters, payments, leases, and rental information from one dashboard.",
      ctaText: "See the Dashboard →",
      ctaHref: "/dashboard",
    },
  },

  renter: {
    roleId: "renter",
    roleName: "For Renters",
    steps: [
      {
        stepNumber: 1,
        title: "Find your home",
        description:
          "Choose a property that fits your needs, budget, and preferred location.",
      },
      {
        stepNumber: 2,
        title: "Complete the rental process",
        description:
          "Provide the required information and complete the steps needed to rent the property.",
      },
      {
        stepNumber: 3,
        title: "Manage your lease",
        description:
          "Access your lease and important rental information from your Urugo account.",
      },
      {
        stepNumber: 4,
        title: "Track your payments",
        description:
          "View your rental payments, payment status, and other important records from your dashboard.",
      },
    ],
    banner: {
      title: "Make renting easier with Urugo.",
      description:
        "Keep your lease, payments, and important rental information organized in one place.",
      ctaText: "Go to Dashboard →",
      ctaHref: "/dashboard",
    },
  },
};
