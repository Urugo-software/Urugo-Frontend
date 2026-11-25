import { PiHouseLine } from "react-icons/pi";
import { User } from "lucide-react";
import { IoShieldOutline } from "react-icons/io5";
import type { HomeUiRolesDataProps } from "@/types";

export const home_stats = [
  { id: "1", title: "2,140", paragraph: "Verified properties" },
  { id: "2", title: "430+", paragraph: "Registered Landlords" },
  { id: "3", title: "99.2%", paragraph: "Payment success rate" },
  { id: "4", title: "24/7", paragraph: "Zoe availability" },
];

export const ListData = [
  {
    id: 1,
    title: "Listing-only or full management",
    description:
      "Start by listing properties and handling inquiries yourself, or enable full rental management anytime.",
  },
  {
    id: 2,
    title: "One clear landlord dashboard",
    description:
      "Track your properties, individual units, occupancy, and viewing requests from a single view.",
  },
  {
    id: 3,
    title: "Mobile money payment tracking",
    description:
      "Renters submit MTN Mobile Money or Airtel Money payment records with proof for you to review.",
  },
  {
    id: 4,
    title: "Digital lease agreements",
    description:
      "Prepare and keep written lease terms organized so both landlord and renter can access them anytime.",
  },
  {
    id: 5,
    title: "Renter history checks",
    description:
      "Review confirmed rental history records and manage disputes fairly before signing a new lease.",
  },
  {
    id: 6,
    title: "Move-in to move-out records",
    description:
      "Keep tenancy timelines, maintenance updates, and checkout balances clear until the renter leaves.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Describe what you need",
    description:
      "Share your preferred area, bedroom count, and monthly budget in plain English.",
  },
  {
    number: "02",
    title: "Compare Kigali neighborhoods",
    description:
      "Get simple guidance on typical rent ranges and areas that fit your daily commute.",
  },
  {
    number: "03",
    title: "Estimate upfront move-in costs",
    description:
      "See a breakdown of rent, security deposit, and monthly living expenses before visiting.",
  },
  {
    number: "04",
    title: "Explore matching homes",
    description:
      "Jump straight from Zoe's suggestions to full property details and photos.",
  },
  {
    number: "05",
    title: "Contact landlords directly",
    description:
      "Send an inquiry or request an in-person viewing directly from any listing page.",
  },
];

export const userTypes: HomeUiRolesDataProps[] = [
  {
    id: 1,
    Icon: PiHouseLine,
    title: "Landlords",
    description:
      "Choose Listing-Only to advertise properties on your own, or Full Rental Management to run your rentals on Urugo.",
    features: [
      "Publish listings with photos, pricing, and availability",
      "Receive inquiries and manage viewing requests directly",
      "Upgrade anytime for leases, rent tracking, and renter history",
    ],
    onboarding: "Listing-only or managed",
  },
  {
    id: 2,
    Icon: User,
    title: "Home Seekers",
    description:
      "Looking for your next place? Browse public listings freely and contact landlords without middlemen.",
    features: [
      "Search by district, budget, bedrooms, and amenities",
      "Review transparent move-in and monthly cost estimates",
      "Request viewings or ask Zoe for guidance",
    ],
    onboarding: "Free to browse",
  },
  {
    id: 3,
    Icon: IoShieldOutline,
    title: "Renters",
    description:
      "Already renting through a managed landlord? Keep your home details, lease, and payments organized in one account.",
    features: [
      "Access your lease agreement and payment receipts anytime",
      "Submit monthly rent records and track repair requests",
      "Review and respond to rental history notices fairly",
    ],
    onboarding: "Invited by landlord or sign up",
  },
];

export const signUpSteps = [
  {
    key: 1,
    label: "Your details",
    title: "Create your account",
    description: "Enter your name and email address to get started.",
    fields: [
      {
        id: "fullName",
        label: "Full name",
        type: "text",
        autoComplete: "name",
        placeholder: "e.g. Jean Bosco Habimana",
        required: true,
      },
      {
        id: "email",
        label: "Email address",
        type: "email",
        autoComplete: "email",
        placeholder: "you@example.com",
        required: true,
      },
    ],
  },
  {
    key: 2,
    label: "Identification",
    title: "Verify your identity",
    description:
      "Add your phone number and national ID to complete your details.",
    fields: [
      {
        id: "telephone",
        label: "Phone number",
        type: "tel",
        autoComplete: "tel",
        placeholder: "+250 788 000 000",
        required: true,
      },
      {
        id: "nationalId",
        label: "National ID",
        type: "text",
        autoComplete: "off",
        placeholder: "Enter your national ID number",
        required: true,
      },
    ],
  },
  {
    key: 3,
    label: "Photo",
    title: "Add a profile photo",
    description:
      "Add a photo to personalize your account, or skip this step for now.",
  },
] as const;
