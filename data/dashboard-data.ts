import {
  LayoutDashboard,
  Heart,
  Calendar,
  Bot,
  Bell,
  User,
  Clock,
  Building2,
  FileText,
  DollarSign,
  Wrench,
  Folder,
  MessageSquare,
  ScrollText,
  CreditCard,
  ShieldCheck,
  Settings,
  History,
  Compass,
  CheckSquare,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { RoleType } from "@/types";
import type { LandlordServiceMode } from "@/types/landlord";

export interface NavItemConfig {
  label: string;
  labelKey?: string;
  sectionKey?: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface LandlordBadgeCounts {
  inquiries?: number;
  viewings?: number;
  payments?: number;
  issues?: number;
  notifications?: number;
}

export function getLandlordNavItems(
  serviceMode: LandlordServiceMode,
  badges: LandlordBadgeCounts = {},
): NavItemConfig[] {
  const countOrUndefined = (n?: number) => (n && n > 0 ? n : undefined);

  const sharedBase: NavItemConfig[] = [
    { label: "Dashboard", labelKey: "dashboard", href: "/landlord", icon: LayoutDashboard },
    { label: "My Properties", labelKey: "myProperties", href: "/landlord/properties", icon: Building2 },
    {
      label: "Inquiries",
      labelKey: "inquiries",
      href: "/landlord/inquiries",
      icon: MessageSquare,
      badge: countOrUndefined(badges.inquiries),
    },
    {
      label: "Viewings",
      labelKey: "viewings",
      href: "/landlord/viewings",
      icon: Calendar,
      badge: countOrUndefined(badges.viewings),
    },
  ];

  const managedItems: NavItemConfig[] = [
    { label: "Renters", labelKey: "renters", href: "/landlord/renters", icon: User },
    { label: "Agreements", labelKey: "agreements", href: "/landlord/agreements", icon: FileText },
    { label: "Tenancies", labelKey: "tenancies", href: "/landlord/tenancies", icon: ScrollText },
    {
      label: "Payments",
      labelKey: "payments",
      href: "/landlord/payments",
      icon: CreditCard,
      badge: countOrUndefined(badges.payments),
    },
    {
      label: "Renter History",
      labelKey: "renterHistory",
      href: "/landlord/renter-history",
      icon: History,
      badge: countOrUndefined(badges.issues),
    },
  ];

  const notificationsItem: NavItemConfig = {
    label: "Notifications",
    labelKey: "notifications",
    href: "/landlord/notifications",
    icon: Bell,
    badge: countOrUndefined(badges.notifications),
  };

  return serviceMode === "listing_only"
    ? [...sharedBase, notificationsItem]
    : [...sharedBase, ...managedItems, notificationsItem];
}

export interface RenterNavOptions {
  activeInquiries?: number;
  pendingPayments?: number;
  activeMaintenance?: number;
  actionableIssues?: number;
  unreadNotifications?: number;
}

export function getRenterNavItems(
  options: RenterNavOptions = {},
): NavItemConfig[] {
  const badge = (n?: number) => (n && n > 0 ? n : undefined);

  return [
    { label: "Overview", labelKey: "overview", href: "/renter", icon: LayoutDashboard },
    { label: "Explore Homes", labelKey: "exploreHomes", href: "/renter/explore", icon: Compass },
    {
      label: "Inquiries & Visits",
      labelKey: "inquiriesAndVisits",
      href: "/renter/inquiries",
      icon: Calendar,
      badge: badge(options.activeInquiries),
    },
    { label: "My Property", labelKey: "myProperty", href: "/renter/property", icon: Building2 },
    { label: "Lease", labelKey: "lease", href: "/renter/lease", icon: ScrollText },
    {
      label: "Payments",
      labelKey: "payments",
      href: "/renter/payments",
      icon: DollarSign,
      badge: badge(options.pendingPayments),
    },
    {
      label: "Maintenance",
      labelKey: "maintenance",
      href: "/renter/maintenance",
      icon: Wrench,
      badge: badge(options.activeMaintenance),
    },
    {
      label: "Rental History",
      labelKey: "rentalHistory",
      href: "/renter/rental-history",
      icon: History,
      badge: badge(options.actionableIssues),
    },
    { label: "Documents", labelKey: "documents", href: "/renter/documents", icon: Folder },
    { label: "Messages", labelKey: "messages", href: "/renter/messages", icon: MessageSquare },
    {
      label: "Notifications",
      labelKey: "notifications",
      href: "/renter/notifications",
      icon: Bell,
      badge: badge(options.unreadNotifications),
    },
  ];
}

export function isNavItemActive(
  pathname: string,
  href: string,
  rootHref: string,
): boolean {
  if (href === "#") return false;
  if (href === rootHref) return pathname === rootHref;
  return pathname === href || pathname.startsWith(`${href}/`);
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
    {
      label: "Notifications",
      href: "/home-seeker/notifications",
      icon: Bell,
      badge: 1,
    },
    { label: "Profile", href: "/home-seeker/profile", icon: User },
  ],
  landlord: [
    { label: "Dashboard", href: "/landlord", icon: LayoutDashboard },
    {
      label: "My Properties",
      href: "/landlord/properties",
      icon: Building2,
      badge: 6,
    },
    { label: "Renters", href: "/landlord/renters", icon: User, badge: 8 },
    { label: "Agreements", href: "/landlord/agreements", icon: FileText },
    { label: "Tenancies", href: "/landlord/tenancies", icon: ScrollText },
    {
      label: "Renter History",
      href: "/landlord/renter-history",
      icon: FileText,
      badge: 1,
    },
    {
      label: "Notifications",
      href: "/landlord/notifications",
      icon: Bell,
      badge: 2,
    },
  ],
  renter: [
    { label: "Overview", href: "/renter", icon: LayoutDashboard },
    { label: "My Property", href: "/renter/property", icon: Building2 },
    { label: "Lease", href: "/renter/lease", icon: ScrollText },
    { label: "Payments", href: "/renter/payments", icon: DollarSign },
    {
      label: "Maintenance",
      href: "/renter/maintenance",
      icon: Wrench,
      badge: 1,
    },
    {
      label: "Messages",
      href: "/renter/messages",
      icon: MessageSquare,
      badge: 1,
    },
    { label: "Documents", href: "/renter/documents", icon: Folder },
    {
      label: "Notifications",
      href: "/renter/notifications",
      icon: Bell,
      badge: 2,
    },
  ],
};

export interface AdminBadgeCounts {
  approvals?: number;
  verification?: number;
  complaints?: number;
  moderation?: number;
  notifications?: number;
}

export function getAdminNavItems(
  badges: AdminBadgeCounts = {},
): NavItemConfig[] {
  const badge = (n?: number) => (n && n > 0 ? n : undefined);

  return [
    { label: "Overview", labelKey: "overview", sectionKey: "adminSectionOverview", href: "/admin", icon: LayoutDashboard },
    { label: "Analytics", labelKey: "analytics", sectionKey: "adminSectionOverview", href: "/admin/analytics", icon: Calendar },
    { label: "Approvals", labelKey: "approvals", sectionKey: "adminSectionOperations", href: "/admin/approvals", icon: CheckSquare, badge: badge(badges.approvals) },
    { label: "Verification", labelKey: "verification", sectionKey: "adminSectionOperations", href: "/admin/property-verification", icon: ShieldCheck, badge: badge(badges.verification) },
    { label: "Complaints", labelKey: "complaints", sectionKey: "adminSectionOperations", href: "/admin/complaints", icon: MessageSquare, badge: badge(badges.complaints) },
    { label: "Moderation", labelKey: "moderation", sectionKey: "adminSectionOperations", href: "/admin/moderation", icon: Wrench, badge: badge(badges.moderation) },
    { label: "Users", labelKey: "users", sectionKey: "adminSectionDirectory", href: "/admin/users", icon: User },
    { label: "Properties", labelKey: "properties", sectionKey: "adminSectionDirectory", href: "/admin/properties", icon: Building2 },
    { label: "Leases", labelKey: "leases", sectionKey: "adminSectionDirectory", href: "/admin/leases", icon: ScrollText },
    { label: "Renter's History", labelKey: "renterHistory", sectionKey: "adminSectionDirectory", href: "/admin/renter-history", icon: FileText },
    { label: "Payments", labelKey: "payments", sectionKey: "adminSectionFinance", href: "/admin/payments", icon: CreditCard },
    { label: "Notifications", labelKey: "notifications", sectionKey: "adminSectionFinance", href: "/admin/notifications", icon: Bell, badge: badge(badges.notifications) },
    { label: "Public Content", labelKey: "publicContent", sectionKey: "adminSectionGovernance", href: "/admin/public-content", icon: Globe },
    { label: "Audit Logs", labelKey: "auditLogs", sectionKey: "adminSectionGovernance", href: "/admin/audit-logs", icon: Clock },
    { label: "Admin Management", labelKey: "adminManagement", sectionKey: "adminSectionGovernance", href: "/admin/admin-management", icon: User },
    { label: "Settings", labelKey: "settings", sectionKey: "adminSectionGovernance", href: "/admin/settings", icon: Settings },
  ];
}

export const adminNavItems: NavItemConfig[] = getAdminNavItems();

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
