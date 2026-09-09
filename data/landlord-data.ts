import {
  LandlordMetric,
  RecentActivityItem,
  AttentionItem,
  LandlordRenter,
  TenancyPayment,
  RentalIssue,
  MonthlyCollectionPoint,
  TenancyOverview,
  RemainingBalance,
  LandlordPropertyItem,
  LandlordNotificationItem,
  LandlordFAQItem,
} from "@/types/landlord";

export const mockLandlordMetrics: LandlordMetric = {
  activeRentersCount: 8,
  currentMonthRentCollectedRwf: 1450000,
  targetMonthRentRwf: 1800000,
  remainingRentBalanceRwf: 350000,
  activeDisputesCount: 1,
  tenanciesEndingSoonCount: 2,

  activeTenants: 8,
  activeProperties: 6,
  pendingPaymentsCount: 3,
  rentalIssuesCount: 1,
};

export const mockRemainingBalance: RemainingBalance = {
  totalRwf: 350000,
  breakdown: [
    { label: "Pending verifications", amountRwf: 270000 },
    { label: "Overdue payments", amountRwf: 80000 },
  ],
};

export const mockMonthlyCollectionHistory: MonthlyCollectionPoint[] = [
  { month: "Mar", expectedRwf: 1800000, collectedRwf: 1800000 },
  { month: "Apr", expectedRwf: 1800000, collectedRwf: 1800000 },
  { month: "May", expectedRwf: 1800000, collectedRwf: 1750000 },
  { month: "Jun", expectedRwf: 1800000, collectedRwf: 1800000 },
  { month: "Jul", expectedRwf: 1800000, collectedRwf: 1600000 },
  { month: "Aug", expectedRwf: 1800000, collectedRwf: 1450000 },
];

export const mockTenancyOverview: TenancyOverview = {
  active: 7,
  endingSoon: 2,
  pendingClosure: 1,
  total: 10,
};

export const mockLandlordAttentionItems: AttentionItem[] = [
  {
    id: "att-1",
    title: "3 payments waiting for review",
    count: 3,
    actionText: "Review Payments",
    href: "/landlord/tenancies/t-101#payments",
    type: "pending_payment",
  },
  {
    id: "att-2",
    title: "1 tenancy ready to be closed",
    count: 1,
    actionText: "Process End Tenancy",
    href: "/landlord/tenancies/t-102",
    type: "ending_tenancy",
  },
  {
    id: "att-3",
    title: "1 rental issue disputed by renter",
    count: 1,
    actionText: "Review Dispute",
    href: "/landlord/blacklist-check/iss-501",
    type: "disputed_issue",
  },
];

export const mockRecentActivities: RecentActivityItem[] = [
  {
    id: "act-1",
    type: "payment_pending",
    title: "Payment waiting for review",
    description: "150,000 RWF submitted via MTN Mobile Money",
    timestamp: "2 hours ago",
    renterName: "Jean Claude",
    propertyTitle: "Kimironko Heights — A-03",
  },
  {
    id: "act-2",
    type: "dispute_submitted",
    title: "Dispute submitted by renter",
    description: "Renter provided WASAC receipt for disputed water bill",
    timestamp: "1 day ago",
    renterName: "Eric Manzi",
    propertyTitle: "Kacyiru View — Studio B",
  },
  {
    id: "act-3",
    type: "payment_approved",
    title: "Payment approved",
    description: "200,000 RWF rent payment approved for August 2026",
    timestamp: "3 days ago",
    renterName: "Divine Uwase",
    propertyTitle: "Kabeza Modern — House 4",
  },
  {
    id: "act-4",
    type: "tenancy_ending",
    title: "Tenancy ending notice",
    description: "Move-out date set for September 15, 2026",
    timestamp: "5 days ago",
    renterName: "Jean Claude",
    propertyTitle: "Kimironko Heights — A-03",
  },
];

export const mockLandlordRenters: LandlordRenter[] = [
  {
    id: "r-101",
    name: "Jean Claude",
    isIdentityVerified: true,
    propertyName: "Kimironko Heights",
    unitNumber: "A-03",
    tenancyStatus: "Active",
    monthlyRentRwf: 150000,
    paymentStatus: "Pending",
    startDate: "15 Jan 2024",
    phone: "+250 788 123 456",
  },
  {
    id: "r-102",
    name: "Eric Manzi",
    isIdentityVerified: true,
    propertyName: "Kacyiru View",
    unitNumber: "Studio B",
    tenancyStatus: "Ending",
    monthlyRentRwf: 120000,
    paymentStatus: "Overdue",
    startDate: "01 Feb 2023",
    phone: "+250 788 654 321",
  },
  {
    id: "r-103",
    name: "Divine Uwase",
    isIdentityVerified: true,
    propertyName: "Kabeza Modern",
    unitNumber: "House 4",
    tenancyStatus: "Active",
    monthlyRentRwf: 200000,
    paymentStatus: "Paid",
    startDate: "10 Oct 2024",
    phone: "+250 789 112 233",
  },
];

export const mockTenancyPayments: TenancyPayment[] = [
  {
    id: "pay-101",
    amountRwf: 150000,
    dueDate: "10 Sep 2026",
    period: "September 2026",
    status: "Pending",
    paymentMethod: "MTN Mobile Money (Ref: TXN99823)",
  },
  {
    id: "pay-102",
    amountRwf: 150000,
    dueDate: "10 Aug 2026",
    period: "August 2026",
    status: "Approved",
    paymentMethod: "MTN Mobile Money",
    paidAt: "08 Aug 2026",
  },
  {
    id: "pay-103",
    amountRwf: 150000,
    dueDate: "10 Jul 2026",
    period: "July 2026",
    status: "Approved",
    paymentMethod: "Bank Transfer",
    paidAt: "09 Jul 2026",
  },
];

export const mockRentalIssues: RentalIssue[] = [
  {
    id: "iss-501",
    issueTitle: "Unpaid Water Bill Obligation",
    amountRwf: 50000,
    propertyName: "Kacyiru View — Studio B",
    tenancyPeriod: "01 Feb 2023 - 31 Aug 2026",
    landlordName: "Emmanuel Ntaganda",
    renterName: "Eric Manzi",
    createdDate: "01 Sep 2026",
    status: "Disputed",
    landlordReport: "Renter departed with an unpaid final WASAC water utility balance of 50,000 RWF for July-August period.",
    renterResponse: "I paid the 50,000 RWF bill via WASAC agent on Aug 28th and have attached the digital payment confirmation receipt.",
    evidence: {
      title: "WASAC Agent Payment Confirmation PDF",
      type: "Utility Receipt",
      verified: false,
    },
  },
  {
    id: "iss-502",
    issueTitle: "Final Electricity Bill Balance",
    amountRwf: 18500,
    propertyName: "Kimironko Heights — A-02",
    tenancyPeriod: "10 May 2023 - 10 May 2025",
    landlordName: "Emmanuel Ntaganda",
    renterName: "Alain Patrick",
    createdDate: "12 May 2025",
    status: "Resolved",
    landlordReport: "Unpaid EUCL token purchase balance upon end of tenancy.",
    renterResponse: "Payment cleared on May 14th.",
    evidence: {
      title: "EUCL Token Receipt",
      type: "Payment Receipt",
      verified: true,
    },
  },
];

export const mockLandlordProperties: LandlordPropertyItem[] = [
  {
    id: "prop-101",
    name: "Kimironko Heights",
    location: "Kimironko, Gasabo, Kigali",
    image: "/assets/home/prop1.jpg",
    totalUnits: 6,
    occupiedUnits: 5,
    monthlyRevenueRwf: 900000,
    status: "Partial",
    type: "Apartment Building",
  },
  {
    id: "prop-102",
    name: "Kacyiru View Residency",
    location: "Kacyiru, Gasabo, Kigali",
    image: "/assets/home/prop2.jpg",
    totalUnits: 4,
    occupiedUnits: 4,
    monthlyRevenueRwf: 640000,
    status: "Occupied",
    type: "Apartment Building",
  },
  {
    id: "prop-103",
    name: "Kabeza Modern Estate",
    location: "Kabeza, Kicukiro, Kigali",
    image: "/assets/home/prop3.jpg",
    totalUnits: 3,
    occupiedUnits: 2,
    monthlyRevenueRwf: 500000,
    status: "Partial",
    type: "Villa",
  },
];

export const mockLandlordNotifications: LandlordNotificationItem[] = [
  {
    id: "notif-1",
    title: "New Rent Payment Receipt Submitted",
    message: "Jean Claude submitted a payment receipt of 150,000 RWF for September 2026 rent at Kimironko Heights (A-03).",
    timestamp: "10 minutes ago",
    category: "payment",
    isUnread: true,
    actionHref: "/landlord/tenancies",
    actionLabel: "Review Payment",
  },
  {
    id: "notif-2",
    title: "Blacklist Dispute Statement Submitted",
    message: "Eric Manzi responded with a payment confirmation receipt for the 50,000 RWF water bill dispute at Kacyiru View.",
    timestamp: "2 hours ago",
    category: "dispute",
    isUnread: true,
    actionHref: "/landlord/blacklist-check",
    actionLabel: "View Dispute Details",
  },
  {
    id: "notif-3",
    title: "Tenancy Agreement Renewal Reminder",
    message: "Tenancy for Divine Uwase at Kabeza Modern Estate is due for renewal in 28 days.",
    timestamp: "1 day ago",
    category: "tenancy",
    isUnread: false,
    actionHref: "/landlord/tenancies",
    actionLabel: "View Tenancy",
  },
  {
    id: "notif-4",
    title: "System Maintenance Notice",
    message: "Mobile money reconciliation system will undergo scheduled maintenance on Saturday 02:00 - 04:00 AM.",
    timestamp: "3 days ago",
    category: "system",
    isUnread: false,
  },
];

export const mockLandlordFaqs: LandlordFAQItem[] = [
  {
    id: "faq-1",
    question: "How do I register a new tenancy agreement?",
    answer: "Go to the Tenancies page and click 'Create Tenancy'. Enter the tenant's phone or national ID to initiate verification. Once confirmed, both parties can digitally review and sign.",
    category: "Tenancies",
  },
  {
    id: "faq-2",
    question: "How are rent payments reconciled via MTN Mobile Money / Bank?",
    answer: "When a renter sends rent via MTN Mobile Money or bank transfer, they submit the transaction reference on Urugo. You will receive an immediate notification to review and confirm the payment receipt.",
    category: "Payments",
  },
  {
    id: "faq-3",
    question: "What is the Blacklist Check and how do I report a defaulting tenant?",
    answer: "The Blacklist Check feature allows landlords to report unresolved rental breaches (unpaid bills, damage). The tenant is notified and has 14 days to resolve or dispute before the report is finalized.",
    category: "Blacklist",
  },
  {
    id: "faq-4",
    question: "How do I process a tenancy closure or security deposit refund?",
    answer: "Navigate to the active tenancy details page, select 'End Tenancy', perform the joint checkout checklist, and enter any final utility deductions.",
    category: "Tenancies",
  },
];

export const mockLandlordSettings = {
  fullName: "Emmanuel Ntaganda",
  email: "emmanuel.ntaganda@example.com",
  phone: "+250 788 123 456",
  momoNumber: "0788123456",
  bankAccount: "BK — 00012345678",
};

export const mockNotificationPreferences = [
  {
    id: "pref-1",
    title: "SMS Payment Alerts",
    desc: "Receive immediate SMS when a tenant submits rent receipt.",
    defaultChecked: true,
  },
  {
    id: "pref-2",
    title: "Tenancy Renewal Reminders",
    desc: "Get notified 30 days before tenancy lease expiration.",
    defaultChecked: true,
  },
  {
    id: "pref-3",
    title: "Dispute Activity Updates",
    desc: "Email notifications when a renter responds to a blacklist claim.",
    defaultChecked: true,
  },
];
