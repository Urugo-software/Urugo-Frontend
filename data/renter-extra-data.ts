import type {
  RenterDocument,
  RenterFaqItem,
  RenterMaintenance,
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
    updatedNote: "Plumber scheduled by landlord for inspection.",
  },
  {
    id: "maint-102",
    title: "Kitchen Switch Replacement",
    description: "Light switch near the sink is unresponsive.",
    category: "Electrical",
    priority: "Low",
    status: "Resolved",
    createdAt: "15 Aug 2026",
    updatedNote: "Switch replaced and tested.",
  },
];

export const mockRenterDocuments: RenterDocument[] = [
  {
    id: "doc-01",
    title: "Lease Agreement — Apartment A-03",
    category: "Lease Agreement",
    date: "15 Jan 2024",
    size: "1.8 MB",
    referenceId: "agr-002",
    summary:
      "Residential lease agreement for Kimironko Heights, Unit A-03 (150,000 RWF/month).",
  },
  {
    id: "doc-02",
    title: "Rent Receipt — August 2026",
    category: "Payment Receipt",
    date: "08 Aug 2026",
    size: "340 KB",
    referenceId: "pay-02",
    summary:
      "Confirmed payment of 150,000 RWF via MTN Mobile Money (Ref: MTN-884210).",
  },
  {
    id: "doc-03",
    title: "Rent Receipt — July 2026",
    category: "Payment Receipt",
    date: "09 Jul 2026",
    size: "320 KB",
    referenceId: "pay-03",
    summary:
      "Confirmed payment of 150,000 RWF via AIRTEL Money (Ref: AIR-672104).",
  },
];

export const mockRenterNotifications: RenterNotification[] = [
  {
    id: "notif-01",
    title: "September Rent Reminder",
    message: "Your rent payment of 150,000 RWF is due on 10 Sep 2026.",
    date: "05 Sep 2026",
    read: false,
    category: "rent",
    href: "/renter/payments/pay-rent",
    actionLabel: "Pay Rent",
  },
  {
    id: "notif-03",
    title: "Maintenance Status Update",
    message:
      "Your request 'Bathroom Tap Leakage' has been marked In Progress.",
    date: "03 Sep 2026",
    read: true,
    category: "maintenance",
    href: "/renter/maintenance",
    actionLabel: "Track Request",
  },
  {
    id: "notif-04",
    title: "Lease Agreement Ready",
    message:
      "Your residential lease agreement AGR-2026-0043 is available for review.",
    date: "01 Sep 2026",
    read: true,
    category: "lease",
    href: "/renter/lease",
    actionLabel: "Open Lease",
  },
];

export const mockRenterNotificationPrefs = [
  {
    id: "rent_due",
    label: "Rent Due Reminders",
    description: "Receive reminders before your monthly rent due date.",
    defaultOn: true,
  },
  {
    id: "maintenance",
    label: "Maintenance Updates",
    description: "Updates when your landlord changes a repair request status.",
    defaultOn: true,
  },
  {
    id: "lease",
    label: "Lease & History Notices",
    description: "Alerts about lease agreements, receipts, and notice windows.",
    defaultOn: true,
  },
] as const;

export const mockRenterFaqs: RenterFaqItem[] = [
  {
    id: "rfaq-1",
    category: "Payments",
    question: "How do I submit my monthly rent payment?",
    answer:
      "Open Payments and select Pay Rent Now. Choose MTN Mobile Money, AIRTEL Money, or Bank Transfer, enter your transaction reference or upload your confirmation screenshot, and submit.",
  },
  {
    id: "rfaq-2",
    category: "Payments",
    question: "Where can I download my rent payment receipts?",
    answer:
      "All confirmed payment receipts appear automatically on both the Payments page (View Receipt) and the Documents page.",
  },
  {
    id: "rfaq-3",
    category: "Lease & Documents",
    question: "How do I review or sign my lease agreement?",
    answer:
      "Go to Lease to inspect your lease terms, due date, security deposit, and open the full lease agreement document. You can preview, download, or sign pending agreements directly.",
  },
  {
    id: "rfaq-4",
    category: "Maintenance",
    question: "How do I report a maintenance problem in my apartment?",
    answer:
      "Visit Maintenance and click Report New Issue. Provide a clear title, category, priority, and description so your landlord can schedule repairs.",
  },
  {
    id: "rfaq-5",
    category: "Rental History",
    question: "What happens if my landlord logs a rental obligation notice?",
    answer:
      "You receive a 3-day notice window before any obligation can be confirmed. In Rental History, you can either settle the balance or submit a dispute with payment proof for review.",
  },
  {
    id: "rfaq-6",
    category: "Discovery",
    question: "Can I browse new homes and request viewings as a renter?",
    answer:
      "Yes. Use Explore Homes to search available listings by district, budget, and bedrooms, message landlords with inquiries, and book viewing visits.",
  },
];
