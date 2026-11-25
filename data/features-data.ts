import type { Feature } from "@/types";
import {
  Bell,
  Building2,
  Calendar,
  Compass,
  FileText,
  LayoutGrid,
  MessageSquare,
  Shield,
  Smartphone,
  Sparkles,
  Wallet,
  Wrench,
} from "lucide-react";

export const landlordFeatures: Feature[] = [
  {
    id: 1,
    title: "Listing-only mode",
    description:
      "Advertise properties with photos, prices, and availability, and handle inquiries on your own.",
    Icon: Building2,
  },
  {
    id: 2,
    title: "Full rental management",
    description:
      "Upgrade anytime on the same account to track units, tenants, leases, and monthly rent.",
    Icon: LayoutGrid,
  },
  {
    id: 3,
    title: "Viewing requests & inquiries",
    description:
      "Confirm, reschedule, or reply to prospective renters directly from your dashboard.",
    Icon: Calendar,
  },
  {
    id: 4,
    title: "Mobile money payment tracking",
    description:
      "Renters submit MTN Mobile Money or Airtel Money payment records with proof for you to review.",
    Icon: Wallet,
  },
  {
    id: 5,
    title: "Digital lease agreements",
    description:
      "Keep written lease terms organized so both landlord and renter can view them anytime.",
    Icon: FileText,
  },
  {
    id: 6,
    title: "Renter history checks",
    description:
      "Review confirmed rental history records and handle unresolved notices fairly before signing.",
    Icon: Shield,
  },
];

export const renterFeatures: Feature[] = [
  {
    id: 1,
    title: "Submit rent from your phone",
    description:
      "Record MTN Mobile Money, Airtel Money, or bank transfer payments with your reference number.",
    Icon: Smartphone,
  },
  {
    id: 2,
    title: "Digital lease, always on hand",
    description:
      "Review your lease terms, due date, and security deposit details anytime without paper hunting.",
    Icon: FileText,
  },
  {
    id: 3,
    title: "Payment receipts & records",
    description:
      "Access your payment history and downloadable receipt copies in one organized place.",
    Icon: Wallet,
  },
  {
    id: 4,
    title: "Maintenance requests",
    description:
      "Report repairs in your unit and follow progress from pending to resolved.",
    Icon: Wrench,
  },
  {
    id: 5,
    title: "Fair rental history notices",
    description:
      "Receive a 3-day notice window to settle or dispute any reported balance with proof.",
    Icon: Shield,
  },
  {
    id: 6,
    title: "Clear dashboard notifications",
    description:
      "Stay informed about rent due dates, maintenance updates, and landlord responses.",
    Icon: Bell,
  },
];

export const homeSeekerFeatures: Feature[] = [
  {
    id: 1,
    title: "Search homes across Rwanda",
    description:
      "Filter rental listings by district, monthly budget, bedrooms, and key amenities.",
    Icon: Compass,
  },
  {
    id: 2,
    title: "Clear move-in cost breakdowns",
    description:
      "See upfront rent, security deposit, and monthly costs upfront before booking a visit.",
    Icon: FileText,
  },
  {
    id: 3,
    title: "Direct landlord contact",
    description:
      "Send questions or request an in-person viewing directly from any property page.",
    Icon: MessageSquare,
  },
  {
    id: 4,
    title: "Zoe search guidance",
    description:
      "Describe what you need in plain English to get quick suggestions and cost guidance.",
    Icon: Sparkles,
  },
];

export const featureService = [
  { id: 1, title: "For Landlords", href: "#landlords" },
  { id: 2, title: "For Renters", href: "#renters" },
  { id: 3, title: "For Home Seekers", href: "#home-seekers" },
  { id: 4, title: "Meet Zoe", href: "#ai-assistant" },
];
