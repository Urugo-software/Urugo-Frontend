export type LandlordServiceMode = "listing_only" | "managed";

export type ListingStatus =
  | "Draft"
  | "Published"
  | "Paused"
  | "Rented"
  | "Archived";

export type TenancyStatus = "Active" | "Ending" | "Closed";
export type PaymentStatus = "Pending" | "Approved" | "Rejected" | "Disputed";
export type PaymentRejectionCategory =
  | "money_not_received"
  | "wrong_amount"
  | "duplicate_payment"
  | "invalid_receipt"
  | "other";

export type IssueStatus =
  | "Reported"
  | "Unresolved"
  | "Disputed"
  | "Confirmed"
  | "Resolved"
  | "Rejected";

export type InquiryStatus = "New" | "Replied" | "Archived";
export type ViewingStatus = "Pending" | "Confirmed" | "Rescheduled" | "Rejected";

export interface ContactVisibilitySettings {
  showPhone: boolean;
  showWhatsApp: boolean;
  showEmail: boolean;
}

export interface LandlordMetric {
  activeRentersCount: number;
  currentMonthRentCollectedRwf: number;
  targetMonthRentRwf: number;
  remainingRentBalanceRwf: number;
  activeDisputesCount: number;
  tenanciesEndingSoonCount: number;
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
    | "issue_resolved"
    | "inquiry_received"
    | "viewing_requested";
  title: string;
  description: string;
  timestamp: string;
  renterName: string;
  propertyTitle: string;
  href?: string;
}

export interface AttentionItem {
  id: string;
  title: string;
  count: number;
  actionText: string;
  href: string;
  type:
    | "pending_payment"
    | "ending_tenancy"
    | "disputed_issue"
    | "pending_inquiry"
    | "pending_viewing";
}

export interface LandlordRenter {
  id: string;
  propertyId?: string;
  name: string;
  email?: string;
  avatar?: string;
  isIdentityVerified: boolean;
  propertyName: string;
  unitNumber: string;
  tenancyStatus: TenancyStatus;
  monthlyRentRwf: number;
  securityDepositRwf?: number;
  paymentStatus: "Paid" | "Pending" | "Overdue";
  startDate: string;
  endDate?: string;
  phone: string;
  agreementId?: string;
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
  renterId?: string;
  renterName?: string;
  propertyId?: string;
  propertyName?: string;
  unitNumber?: string;
  amountRwf: number;
  dueDate: string;
  period: string;
  status: PaymentStatus;
  paymentMethod?: string;
  reference?: string;
  rejectionCategory?: PaymentRejectionCategory;
  rejectionReason?: string;
  createsUnpaidBalance?: boolean;
  paidAt?: string;
}

export interface RentalIssue {
  id: string;
  renterId?: string;
  propertyId?: string;
  issueTitle: string;
  obligationType?: "rent" | "water" | "electricity" | "other";
  amountRwf: number;
  propertyName: string;
  tenancyPeriod: string;
  landlordName: string;
  renterName: string;
  createdDate: string;
  noticeDeadlineDate?: string;
  daysRemaining?: number;
  status: IssueStatus;
  landlordReport: string;
  renterResponse?: string;
  evidence?: {
    title: string;
    type: string;
    verified: boolean;
  };
}

export interface LandlordInquiryReply {
  id: string;
  sender: "landlord" | "seeker";
  text: string;
  timestamp: string;
}

export interface LandlordInquiry {
  id: string;
  propertyId: string;
  propertyName: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
  replies: LandlordInquiryReply[];
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail: string;
  preferredDate: string;
  preferredTime: string;
  note?: string;
  status: ViewingStatus;
  rejectionReason?: string;
  createdAt: string;
}

export interface LandlordNotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category:
    | "payment"
    | "tenancy"
    | "dispute"
    | "inquiry"
    | "viewing"
    | "system";
  isUnread: boolean;
  actionHref?: string;
  actionLabel?: string;
}

export interface LandlordFAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  serviceScope?: "all" | LandlordServiceMode;
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
  gallery?: string[];
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  securityDepositRwf?: number;
  availableFrom?: string;
  listingStatus?: ListingStatus;
  viewsCount?: number;
  totalUnits?: number;
  occupiedUnits?: number;
  monthlyRevenueRwf?: number;
  expectedMonthlyRentRwf?: number;
  collectedRentThisMonthRwf?: number;
  hasUnits: boolean;
  status?: "Occupied" | "Partial" | "Vacant";
  type: "APARTMENT" | "HOUSE" | "COMMERCIAL";
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
