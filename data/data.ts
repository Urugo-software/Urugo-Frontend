import prop1 from "../public/assets/home/prop1.jpg";
import prop2 from "../public/assets/home/prop2.jpg";
import prop3 from "../public/assets/home/prop3.jpg";
import prop4 from "../public/assets/home/prop4.jpg";
import prop5 from "../public/assets/home/prop5.jpg";

// icons
import { PiHouseLine } from "react-icons/pi";
import { User } from "lucide-react";
import { IoShieldOutline } from "react-icons/io5";

// types
import { HomeUiRolesDataProps } from "@/types";

export const home_stats = [
  { id: "1", title: "2,140", paragraph: "verified properties" },
  { id: "2", title: "430+", paragraph: "Registered Landlords" },
  { id: "3", title: "99.2%", paragraph: "Payment success rate" },
  { id: "4", title: "24/7", paragraph: "AI assistant availability" },
];

export const available_properties = [
  {
    id: "0001",
    image: prop1,
    title: "Cozy Studio Apartment",
    location: "Kacyiru, Kigali",
    price: "100,000",
    amenities: ["Wifi", "Water"],
  },
  {
    id: "0002",

    image: prop2,
    title: "Spacious 3BR House",
    location: "Nyarutarama, Kigali",
    price: "300,000",
    amenities: ["Parking", "Garden", "Security"],
  },
  {
    id: "0003",

    image: prop3,
    title: "Furnished 1BR",
    location: "Kicukiro, Kigali",
    price: "200,000",
    amenities: ["Furnished", "Wifi"],
  },
  {
    id: "0004",

    image: prop4,
    title: "Modern 4BR Villa",
    location: "Gacuriro, Kigali",
    price: "500,000",
    amenities: ["Pool", "Parking", "Security"],
  },
  {
    id: "0005",

    image: prop5,
    title: "Modern 4BR Villa",
    location: "Gacuriro, Kigali",
    price: "500,000",
    amenities: ["Pool", "Parking", "Security"],
  },
];
export const ListData = [
  {
    id: 1,
    title: "Dashboard overview",
    description: "See every property and payment status at a glance.",
  },
  {
    id: 2,
    title: "Online payments",
    description:
      "Tenants pay via MTN or Airtel Money — you receive it in your account.",
  },
  {
    id: 3,
    title: "Blacklist check",
    description: "Search a tenant's payment history before you sign a lease.",
  },
  {
    id: 4,
    title: "Automated reminders",
    description:
      "SMS and email reminders sent automatically before rent is due.",
  },
  {
    id: 5,
    title: "Digital lease agreements",
    description:
      "Sign online, stored securely in the cloud, always accessible.",
  },
  {
    id: 6,
    title: "Tax reports",
    description: "Generate income and occupancy reports with one click.",
  },
];
export const steps = [
  {
    number: "01",
    title: "Guest registration",
    description: "Collects your name, phone, and email conversationally.",
  },
  {
    number: "02",
    title: "Natural language search",
    description: "Describe what you want — no filters required.",
  },
  {
    number: "03",
    title: "Budget advisor",
    description: "Tells you what you can really afford based on income.",
  },
  {
    number: "04",
    title: "Neighborhood guide",
    description: "Explains an area's pros, cons, and typical rent range.",
  },
  {
    number: "05",
    title: "Move-in calculator",
    description: "Total upfront cost plus real monthly cost, broken down.",
  },
  {
    number: "06",
    title: "Express interest",
    description: "Occupied home? Get notified the moment it's free.",
  },
];
export const userTypes: HomeUiRolesDataProps[] = [
  {
    id: 1,
    Icon: PiHouseLine,
    title: "Landlords",
    description:
      "Onboarded by an admin or licensed agent after document checks.",
    features: [
      "Mobile money collection, instant receipts",
      "Color-coded payment dashboard",
      "Blacklist check before signing",
    ],
    onboarding: "Added by Agent ",
  },
  {
    id: 2,
    Icon: User,
    title: "Guests",
    description: "Just looking? Register in seconds, no forms required.",
    features: [
      "Chat-based registration with the AI",
      "Natural language property search",
      "Join a waiting list for occupied homes",
    ],
    onboarding: "Self-registration, instant",
  },
  {
    id: 3,
    Icon: IoShieldOutline,
    title: "Renters",
    description: "Onboarded by an admin once a lease is ready to sign.",
    features: [
      "5-day grace period, no surprises",
      "Digital lease, always accessible",
      "Payment history builds your credit score",
    ],
    onboarding: "Added by Landlord",
  },
];

export const signUpSteps = [
  {
    key: 1,
    label: "Account details",
    title: "Create your account",
    description:
      "Tell us who you are and where we can reach you to start the signup flow.",
    fields: [
      {
        id: "fullName",
        label: "Full name",
        type: "text",
        autoComplete: "name",
        placeholder: "Leon Sterlling",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        autoComplete: "email",
        placeholder: "jane@example.com",
        required: true,
      },
    ],
  },
  {
    key: 2,
    label: "Security",
    title: "Secure your account",
    description:
      "Choose a strong password and confirm it to finish creating your profile.",
    fields: [
      {
        id: "password",
        label: "Password",
        type: "password",
        autoComplete: "new-password",
        placeholder: "Create a strong password",
        required: true,
      },
      {
        id: "confirmPassword",
        label: "Confirm password",
        type: "password",
        autoComplete: "new-password",
        placeholder: "Repeat your password",
        required: true,
      },
    ],
  },
] as const;
