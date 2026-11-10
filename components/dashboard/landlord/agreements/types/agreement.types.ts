export type AgreementStatus =
  | "Draft"
  | "Ready for Review"
  | "Sent"
  | "Viewed"
  | "Changes Requested"
  | "Awaiting Renter Signature"
  | "Awaiting Landlord Signature"
  | "Signed"
  | "Declined"
  | "Expired"
  | "Superseded"
  | "Cancelled";

export type AgreementLanguage = "en" | "rw";

export interface AgreementArticle {
  id: string;
  number: number;
  standardNumber?: number;
  title: string;
  content: string;
  isStandard: boolean;
  isCustom?: boolean;
}

export interface AgreementParty {
  name: string;
  phone: string;
  nationalId: string;
  email: string;
  address?: string;
}

export interface AgreementProperty {
  id: string;
  name: string;
  unitNumber: string;
  address: string;
  district: string;
  propertyType: string;
}

export interface AgreementFinancials {
  monthlyRentRwf: number;
  paymentDueDay: number;
  advanceMonths: number;
  totalAdvanceRwf: number;
  securityDepositRwf: number;
  otherChargesRwf?: number;
  totalInitialAmountRwf: number;
  currency: "RWF";
}

export interface RenterChangeRequest {
  id: string;
  articleId: string;
  articleNumber: number;
  articleTitle: string;
  requestedChange: string;
  reason: string;
  status: "Pending" | "Accepted" | "Declined";
  createdAt: string;
}

export interface AgreementSignature {
  signedBy: string;
  nationalId?: string;
  signedAt: string;
  signatureType: "Electronic" | "Physical Upload";
  ipAddress?: string;
}

export interface Agreement {
  id: string;
  referenceNumber: string;
  landlord: AgreementParty;
  renter: AgreementParty;
  property: AgreementProperty;
  financials: AgreementFinancials;
  tenancyStartDate: string;
  tenancyEndDate?: string;
  tenancyDurationMonths?: number;
  language: AgreementLanguage;
  status: AgreementStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  articles: AgreementArticle[];
  renterSignature?: AgreementSignature;
  landlordSignature?: AgreementSignature;
  changeRequests?: RenterChangeRequest[];
  supersededBy?: string;
  supersedes?: string;
}

export type AgreementFilterTab =
  | "all"
  | "drafts"
  | "in_review"
  | "awaiting_signatures"
  | "signed"
  | "archived";
