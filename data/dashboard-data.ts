import {
  LayoutDashboard,
  Heart,
  Calendar,
  Bot,
  Bell,
  User,
  Settings,
  Clock,
  Building2,
  FileText,
  DollarSign,
  Wrench,
  Folder,
  LucideIcon,
} from "lucide-react";
import { RoleType } from "@/types";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const roleNavItems: Record<RoleType, NavItemConfig[]> = {
  home_seeker: [
    { label: "Dashboard", href: "/home-seeker", icon: LayoutDashboard },
    {
      label: "Saved Properties",
      href: "/home-seeker/saved-properties",
      icon: Heart,
      badge: 4,
    },
    { label: "Visits", href: "/home-seeker/visits", icon: Calendar },
    { label: "Waiting List", href: "/home-seeker/waiting-list", icon: Clock },
    { label: "AI Assistant", href: "#", icon: Bot },
    { label: "Notifications", href: "#", icon: Bell, badge: 1 },
    { label: "Profile", href: "#", icon: User },
  ],
  landlord: [
    { label: "Dashboard", href: "/landlord", icon: LayoutDashboard },
    { label: "My Properties", href: "/properties", icon: Building2, badge: 8 },
    { label: "Applications", href: "#", icon: FileText, badge: 3 },
    { label: "Revenue & Payouts", href: "#", icon: DollarSign },
    { label: "AI Assistant", href: "#", icon: Bot },
    { label: "Notifications", href: "#", icon: Bell, badge: 2 },
    { label: "Settings", href: "#", icon: Settings },
  ],
  renter: [
    { label: "Dashboard", href: "/renter", icon: LayoutDashboard },
    { label: "My Lease", href: "#", icon: FileText },
    { label: "Payments", href: "#", icon: DollarSign },
    { label: "Maintenance", href: "#", icon: Wrench, badge: 1 },
    { label: "Documents", href: "#", icon: Folder },
    { label: "AI Assistant", href: "#", icon: Bot },
    { label: "Notifications", href: "#", icon: Bell },
  ],
};

export interface SavedPropertyItem {
  id: string;
  image: string;
  name: string;
  details: string;
  status: "Available" | "Occupied";
}

export const savedPropertiesData: SavedPropertyItem[] = [
  {
    id: "sp-1",
    image: "/assets/home/prop1.jpg",
    name: "2BR Apartment — Kimironko",
    details: "150,000 RWF/month · Parking, WiFi",
    status: "Available",
  },
  {
    id: "sp-2",
    image: "/assets/home/prop2.jpg",
    name: "Studio — Kacyiru",
    details: "80,000 RWF/month · WiFi included",
    status: "Available",
  },
  {
    id: "sp-3",
    image: "/assets/home/prop3.jpg",
    name: "2BR Apartment — Kabeza",
    details: "180,000 RWF/month · Parking",
    status: "Occupied",
  },
];

export interface WaitingListItem {
  id: string;
  image: string;
  name: string;
  details: string;
  queueBadge: string;
}

export const waitingListData: WaitingListItem[] = [
  {
    id: "wl-1",
    image: "/assets/home/prop3.jpg",
    name: "2BR Apartment — Kabeza",
    details: "Currently occupied · joined waiting list Jul 28",
    queueBadge: "#3 in queue",
  },
];

export interface SearchPreferenceItem {
  label: string;
  value: string;
}

export const searchPreferencesData: SearchPreferenceItem[] = [
  { label: "Location", value: "Remera, Kimironko" },
  { label: "Budget", value: "Up to 200,000 RWF" },
  { label: "Bedrooms", value: "2" },
  { label: "Must-have", value: "Parking" },
];

export interface NextViewingData {
  date: string;
  time: string;
  agent: string;
  propertyName: string;
  propertyImage: string;
  note: string;
}

export const nextViewingData: NextViewingData = {
  date: "Saturday, 22 March",
  time: "2:00 PM",
  agent: "Jean Claude M.",
  propertyName: "2BR Apartment — Kimironko",
  propertyImage: "/assets/home/prop1.jpg",
  note: "You'll get an SMS reminder 1 hour before, plus the landlord's contact number.",
};
