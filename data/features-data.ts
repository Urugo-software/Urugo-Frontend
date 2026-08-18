import { Feature } from "@/types";
import {
  Bell,
  FileText,
  LayoutGrid,
  Shield,
  Wallet,
  Smartphone,
  CalendarClock,
  ChartColumnIncreasing,
  Check,
  Clock,
} from "lucide-react";

export const renterFeatures: Feature[] = [
  {
    id: 1,
    title: "Pay from your phone",
    description:
      "No bank visits, no cash. Pay via mobile money and upload your receipt in seconds.",
    Icon: Smartphone,
  },
  {
    id: 2,
    title: "Rental credit score",
    description:
      "Every on-time payment builds a track record that follows you to your next lease.",
    Icon: Clock,
  },
  {
    id: 3,
    title: "Digital lease, always on hand",
    description:
      "Every term clearly written and downloadable  nothing verbal, nothing forgotten.",
    Icon: FileText,
  },
  {
    id: 4,
    title: "Standard 5-day grace period",
    description:
      "Clear, consistent late-fee rules  no arbitrary penalties or surprise evictions.",
    Icon: CalendarClock,
  },
  {
    id: 5,
    title: "Proof of every payment",
    description:
      'The platform holds your payment history  no more "I paid" disputes with a landlord.',
    Icon: Check,
  },
  {
    id: 6,
    title: "Payment status notifications",
    description:
      "Know immediately when a landlord approves or rejects your submitted payment.",
    Icon: Bell,
  },
];
export const landlordFeatures: Feature[] = [
  {
    id: 1,
    title: "Dashboard overview",
    description:
      "See every property and payment status at a glance, color-coded by urgency.",

    Icon: LayoutGrid,
  },
  {
    id: 2,
    title: "Mobile money payments",
    description:
      "Tenants pay via MTN or Airtel Money and upload proof  you approve from anywhere.",
    Icon: Wallet,
  },
  {
    id: 3,
    title: "Blacklist check",
    description:
      "Search a tenant's payment history before you sign a lease  avoid repeat bad renters.",
    Icon: Shield,
  },
  {
    id: 4,
    title: "Automated reminders",
    description:
      "SMS and email reminders sent automatically before rent is due  no manual chasing.",

    Icon: Bell,
  },
  {
    id: 5,
    title: "Digital lease agreements",
    description:
      "Sign online, stored securely in the cloud  legal proof if disputes ever arise.",
    Icon: FileText,
  },
  {
    id: 6,
    title: "Income & tax reports",
    description:
      "Generate occupancy and income reports across every property with one click.",
    Icon: ChartColumnIncreasing,
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
