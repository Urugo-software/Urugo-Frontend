import {
  RenterMaintenance,
  RenterDocument,
  RenterNotification,
} from "@/types/renter";

export const mockRenterMaintenance: RenterMaintenance[] = [
  {
    id: "maint-101",
    title: "Bathroom Tap Leakage",
    description: "The tap in the primary bathroom drips continuously.",
    category: "Plumbing",
    priority: "Medium",
    status: "In Progress",
    createdAt: "02 Sep 2026",
  },
  {
    id: "maint-102",
    title: "Kitchen Switch Replacement",
    description: "Light switch near the sink is unresponsive.",
    category: "Electrical",
    priority: "Low",
    status: "Resolved",
    createdAt: "15 Aug 2026",
  },
];

export const mockRenterDocuments: RenterDocument[] = [
  {
    id: "doc-01",
    title: "Lease Agreement — Apartment A-03",
    category: "Lease Contract",
    date: "15 Jan 2024",
    size: "1.8 MB",
  },
  {
    id: "doc-02",
    title: "Rent Receipt — August 2026",
    category: "Payment Receipt",
    date: "08 Aug 2026",
    size: "340 KB",
  },
  {
    id: "doc-03",
    title: "Electricity Meter Statement — August 2026",
    category: "Utility Bill",
    date: "08 Aug 2026",
    size: "210 KB",
  },
];

export const mockRenterNotifications: RenterNotification[] = [
  {
    id: "notif-01",
    title: "September Rent Reminder",
    message: "Your rent payment of RWF 150,000 is due on September 10.",
    date: "05 Sep 2026",
    read: false,
    category: "rent",
  },
  {
    id: "notif-02",
    title: "Electricity Usage Update",
    message: "You have used 68% of your monthly electricity limit.",
    date: "04 Sep 2026",
    read: false,
    category: "electricity",
  },
  {
    id: "notif-03",
    title: "Maintenance Status Update",
    message: "Your request 'Bathroom Tap Leakage' has been marked In Progress.",
    date: "03 Sep 2026",
    read: true,
    category: "maintenance",
  },
];
