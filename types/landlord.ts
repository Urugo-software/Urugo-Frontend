export type TenancyStatus = "Active" | "Ending" | "Closed";
export type PaymentStatus = "Pending" | "Approved" | "Rejected" | "Disputed";
export type IssueStatus =
  | "Reported"
  | "Unresolved"
  | "Disputed"
  | "Confirmed"
  | "Resolved"
  | "Rejected";

export interface LandlordMetric {
  // Operational Top 5 KPIs
  activeRentersCount: number;
  currentMonthRentCollectedRwf: number;
  targetMonthRentRwf: number;
  remainingRentBalanceRwf: number;
  activeDisputesCount: number;
  tenanciesEndingSoonCount: number;

  // Additional detail fields
  activeTenants: number;
  activeProperties: number;
  pendingPaymentsCount: number;
  rentalIssuesCount: number;
}

export interface RemainingBalanceItem {
  label: string;
  amountRwf: number;
}

export interface RemainingBalance {
  totalRwf: number;
  breakdown: RemainingBalanceItem[];
}

export interface MonthlyCollectionPoint {
  month: string;
  expectedRwf: number;
  collectedRwf: number;
}

export interface TenancyOverview {
  active: number;
  endingSoon: number;
  pendingClosure: number;
  total: number;
}

export interface RecentActivityItem {
  id: string;
  type:
    | "payment_approved"
    | "payment_pending"
    | "tenancy_ending"
    | "issue_reported"
    | "dispute_submitted"
    | "issue_resolved";
  title: string;
  description: string;
  timestamp: string;
  renterName: string;
  propertyTitle: string;
}

export interface AttentionItem {
  id: string;
  title: string;
  count: number;
  actionText: string;
  href: string;
  type: "pending_payment" | "ending_tenancy" | "disputed_issue";
}

export interface LandlordRenter {
  id: string;
  propertyId?: string;
  name: string;
  avatar?: string;
  isIdentityVerified: boolean;
  propertyName: string;
  unitNumber: string;
  tenancyStatus: TenancyStatus;
  monthlyRentRwf: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
  startDate: string;
  phone: string;
}

export type PropertyUnitStatus = "Occupied" | "Vacant" | "Maintenance";

export interface PropertyUnit {
  id: string;
  propertyId: string;
  unitNumber: string;
  floor?: string;
  bedrooms?: number;
  bathrooms?: number;
  monthlyRentRwf: number;
  status: PropertyUnitStatus;
  renterId?: string | null;
  images?: string[];
}

export interface TenancyPayment {
  id: string;
  amountRwf: number;
  dueDate: string;
  period: string;
  status: PaymentStatus;
  paymentMethod?: string;
  rejectionReason?: string;
  paidAt?: string;
}

export interface RentalIssue {
  id: string;
  issueTitle: string;
  amountRwf: number;
  propertyName: string;
  tenancyPeriod: string;
  landlordName: string;
  renterName: string;
  createdDate: string;
  status: IssueStatus;
  landlordReport: string;
  renterResponse?: string;
  evidence?: {
    title: string;
    type: string;
    verified: boolean;
  };
}

export interface LandlordNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: "payment" | "tenancy" | "dispute" | "system";
  isUnread: boolean;
  actionHref?: string;
  actionLabel?: string;
}

export interface LandlordFAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PropertyGroup {
  id: string;
  name: string;
  location?: string;
  coverImage?: string;
}

export interface PropertyMembershipChange {
  propertyIds: readonly string[];
  fromGroupId: PropertyGroup["id"] | null;
  toGroupId: PropertyGroup["id"] | null;
}

export interface LandlordPropertyItem {
  id: string;
  name: string;
  groupId?: PropertyGroup["id"] | null;
  location: string;
  image?: string;
  totalUnits?: number;
  occupiedUnits?: number;
  monthlyRevenueRwf?: number;
  expectedMonthlyRentRwf?: number;
  collectedRentThisMonthRwf?: number;
  hasUnits: boolean;
  status?: "Occupied" | "Partial" | "Vacant";
  type: "APARTMENT" | "HOUSE" | "COMMERCIAL";
}

export interface LandlordNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: "payment" | "tenancy" | "dispute" | "system";
  isUnread: boolean;
  actionHref?: string;
  actionLabel?: string;
}

export interface LandlordFAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface LandlordProfileSettings {
  fullName: string;
  email: string;
  phone: string;
  momoNumber: string;
  bankAccount: string;
}

export interface LandlordNotificationPreferenceItem {
  id: string;
  title: string;
  desc: string;
  defaultChecked: boolean;
}
