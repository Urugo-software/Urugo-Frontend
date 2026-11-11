/**
 * Additional Agreements and Supplemental Tenancy Payments
 * Types, interfaces, and state models for secondary agreements linked to a parent residential lease.
 */

export type AdditionalAgreementStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "Paid"
  | "Cancelled"
  | "Disputed";

export type AdditionalAgreementInitiatorRole = "Landlord" | "Renter";

export type AdditionalAgreementCategory =
  | "security_deposit_topup"
  | "property_modification"
  | "pet_addendum"
  | "utility_advance"
  | "damage_repair_charge"
  | "furnishing_supplement"
  | "parking_space"
  | "subletting_permission"
  | "early_termination"
  | "other";

export type SupplementalPaymentStatus =
  | "Unpaid"
  | "Pending_Verification"
  | "Paid"
  | "Refunded"
  | "Waived";

export interface DecisionRecord {
  status: "Pending" | "Accepted" | "Rejected";
  decidedAt?: string;
  partyName: string;
  reason?: string;
  signatureReference?: string;
}

export interface SupplementalProofOfPayment {
  transactionReference: string;
  paymentMethod: "MTN_MOMO" | "AIRTEL_MONEY" | "BANK_TRANSFER" | "CASH_RECEIPT";
  paymentDate: string;
  payerName: string;
  payerPhoneNumber?: string;
  attachmentUrl?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface AdditionalAgreementAuditEvent {
  id: string;
  timestamp: string;
  action:
    | "created"
    | "updated"
    | "accepted"
    | "rejected"
    | "disputed"
    | "payment_submitted"
    | "payment_verified"
    | "cancelled"
    | "closed";
  actorRole: AdditionalAgreementInitiatorRole | "Admin" | "System";
  actorName: string;
  summary: string;
  metadata?: Record<string, unknown>;
}

export interface AdditionalAgreement {
  id: string;
  parentAgreementId: string;
  parentAgreementReference: string;
  title: string;
  description: string;
  category: AdditionalAgreementCategory;
  initiatorRole: AdditionalAgreementInitiatorRole;
  initiatorName: string;

  // Financial obligations
  requiresPayment: boolean;
  paymentAmountRwf: number;
  currency: "RWF";
  paymentDueDate?: string;
  paymentStatus: SupplementalPaymentStatus;

  // Lifecycle status
  status: AdditionalAgreementStatus;

  // Bilateral consent
  landlordDecision: DecisionRecord;
  renterDecision: DecisionRecord;

  // Transaction evidence
  proofOfPayment?: SupplementalProofOfPayment;

  // Audit trail
  timeline: AdditionalAgreementAuditEvent[];

  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface CreateAdditionalAgreementProposalDraft {
  parentAgreementId: string;
  parentAgreementReference: string;
  title: string;
  description: string;
  category: AdditionalAgreementCategory;
  initiatorRole: AdditionalAgreementInitiatorRole;
  requiresPayment: boolean;
  paymentAmountRwf?: number;
  paymentDueDate?: string;
}

export interface AdditionalAgreementFilterParams {
  status?: AdditionalAgreementStatus | "All";
  category?: AdditionalAgreementCategory | "All";
  requiresPayment?: boolean;
  searchQuery?: string;
}

export interface AdditionalAgreementsSummaryStats {
  totalCount: number;
  pendingReviewCount: number;
  acceptedCount: number;
  totalSupplementaryPaidRwf: number;
  totalSupplementaryPendingRwf: number;
}
