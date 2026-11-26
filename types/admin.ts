import type {
  IssueStatus,
  LandlordServiceMode,
  ListingStatus,
} from "./landlord";

/** Three system roles supported across Urugo. */
export type SystemRole = "ADMIN" | "LANDLORD" | "RENTER";

export type AdminActionCategory =
  | "view"
  | "routine"
  | "sensitive"
  | "consent_required"
  | "restricted";

export type AdminPermission =
  | "admin:access"
  | "users:manage"
  | "properties:verify"
  | "properties:moderate"
  | "tenancies:intervene"
  | "leases:intervene"
  | "renter_history:mediate"
  | "payments:investigate"
  | "payments:request_adjustment"
  | "cases:resolve"
  | "public_content:manage"
  | "settings:manage"
  | "audit:view"
  | "approvals:initiate"
  | "consent:respond";

export type UserAccountStatus =
  | "Active"
  | "Restricted"
  | "Suspended"
  | "Disabled";

export type VerificationStatus =
  | "Pending"
  | "Verified"
  | "Rejected"
  | "Needs Information";

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: SystemRole;
  verification: VerificationStatus;
  status: UserAccountStatus;
  serviceMode?: LandlordServiceMode;
  propertiesCount: number;
  activeLeasesCount: number;
  registeredAt: string;
  lastActivity: string;
  restrictionReason?: string;
  emergencyLockout?: boolean;
  pendingPostReview?: boolean;
}

export interface AdminPropertyRecord {
  id: string;
  title: string;
  landlordId: string;
  landlordName: string;
  location: string;
  province: string;
  district: string;
  sector: string;
  type: "Apartment" | "House" | "Studio" | "Villa";
  rentRwf: number;
  depositRwf: number;
  units: number;
  occupiedUnits: number;
  verification: VerificationStatus;
  listingStatus: ListingStatus;
  isSuspended: boolean;
  isReported: boolean;
  documentsCount: number;
  submittedAt: string;
  updatedAt: string;
  reviewNotes?: string;
}

export interface AdminLeaseRecord {
  id: string;
  renterId: string;
  renterName: string;
  landlordId: string;
  landlordName: string;
  propertyId: string;
  propertyTitle: string;
  unitLabel: string;
  rentRwf: number;
  depositRwf: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Ending Soon" | "Disputed" | "Draft" | "Expired" | "Closed";
  dueDay: number;
  notes?: string;
}

export type AdminPaymentStatus =
  | "Successful"
  | "Pending"
  | "Failed"
  | "Refunded"
  | "Cancelled";

export interface AdminPaymentRecord {
  transactionId: string;
  renterId: string;
  renterName: string;
  landlordId: string;
  landlordName: string;
  propertyTitle: string;
  amountRwf: number;
  method: "MTN Mobile Money" | "Airtel Money" | "Bank payment";
  provider: "MTN MoMo" | "Airtel Money" | "Bank of Kigali";
  status: AdminPaymentStatus;
  reference: string;
  createdAt: string;
  updatedAt: string;
  reconciliationState: "Matched" | "Awaiting Provider" | "Mismatch";
}

export interface AdminFinancialRequest {
  id: string;
  transactionId: string;
  requestType: "Refund" | "Ledger Correction";
  amountRwf: number;
  reason: string;
  evidenceRef: string;
  requestedBy: string;
  createdAt: string;
  status: "Pending Backend Execution" | "Cancelled";
}

export type AdminCaseKind = "complaint" | "moderation";

export type AdminCaseStatus =
  | "Open"
  | "Under Review"
  | "Waiting for Information"
  | "Escalated"
  | "Resolved"
  | "Rejected";

export interface AdminCaseRecord {
  id: string;
  kind: AdminCaseKind;
  category: string;
  reporterName: string;
  subject: string;
  targetType: "property" | "user" | "lease" | "payment";
  targetId: string;
  targetLabel: string;
  createdAt: string;
  assignee: string;
  status: AdminCaseStatus;
  notes: string[];
  resolutionSummary?: string;
}

export interface AdminRenterHistoryRecord {
  id: string;
  renterId: string;
  renterName: string;
  landlordId: string;
  landlordName: string;
  propertyTitle: string;
  recordTitle: string;
  amountRwf: number;
  reportedBy: "Landlord";
  createdAt: string;
  evidenceSummary: string;
  status: IssueStatus;
  reviewNote?: string;
}

export type ApprovalActionType =
  | "renter_landlord_association"
  | "property_landlord_association"
  | "landlord_service_mode_change"
  | "lease_material_edit";

export type ApprovalStatus =
  | "Pending Consent"
  | "Approved"
  | "Executed"
  | "Rejected"
  | "Cancelled"
  | "Expired";

export type PartyConsentState = "Pending" | "Approved" | "Rejected";

export interface PartyConsentRecord {
  required: boolean;
  partyId: string;
  partyName: string;
  status: PartyConsentState;
  respondedAt?: string;
  note?: string;
}

export interface AdminApprovalPayload {
  renterId?: string;
  renterName?: string;
  landlordId?: string;
  landlordName?: string;
  propertyId?: string;
  propertyTitle?: string;
  unitLabel?: string;
  leaseId?: string;
  newServiceMode?: LandlordServiceMode;
  rentRwf?: number;
  depositRwf?: number;
  startDate?: string;
  endDate?: string;
  summary: string;
}

export interface AdminApprovalRequest {
  id: string;
  actionType: ApprovalActionType;
  title: string;
  targetType: "tenancy" | "property" | "user" | "lease";
  targetId: string;
  initiatedBy: string;
  reason: string;
  evidenceRef: string;
  createdAt: string;
  expiresAt: string;
  status: ApprovalStatus;
  executedAt?: string;
  landlordConsent: PartyConsentRecord;
  renterConsent: PartyConsentRecord;
  payload: AdminApprovalPayload;
}

export type AuditCategory =
  | "user"
  | "property"
  | "tenancy"
  | "lease"
  | "financial"
  | "dispute"
  | "moderation"
  | "public_content"
  | "config"
  | "admin_access"
  | "approval";

export interface AdminAuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: SystemRole;
  category: AuditCategory;
  action: string;
  targetType: string;
  targetId: string;
  targetLabel: string;
  reason: string;
  beforeValue?: string;
  afterValue?: string;
  approvalRequestId?: string;
  approvingParties?: string[];
  executionStatus:
    | "Executed"
    | "Pending Consent"
    | "Pending Backend Execution"
    | "Rejected"
    | "Cancelled";
  notificationIds?: string[];
}

export interface AdminNotificationItem {
  id: string;
  title: string;
  message: string;
  audience: "Admins" | "All users" | "Landlords" | "Renters" | "Specific users";
  channel: string;
  category: "verification" | "approval" | "dispute" | "security" | "system";
  createdAt: string;
  isUnread: boolean;
  href: string;
  deliveryStatus: "Delivered" | "Simulated (In-app only)";
}

export interface PublicAnnouncement {
  enabled: boolean;
  title: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PublicFaqItem {
  id: string;
  audience: "Home Seeker" | "Landlord" | "Renter";
  question: string;
  answer: string;
}

export interface AdminPublicContentConfig {
  announcement: PublicAnnouncement;
  featuredPropertyIds: string[];
  faqs: PublicFaqItem[];
  supportPhone: string;
  supportEmail: string;
}

export interface AdminPlatformSettings {
  platformName: string;
  currency: "RWF";
  defaultLocation: string;
  maintenanceMode: boolean;
  maintenanceReason: string;
  allowNewRegistrations: boolean;
  requirePropertyVerificationBeforePublic: boolean;
  requireLandlordIdentityVerification: boolean;
  disputeNoticeWindowDays: number;
}
