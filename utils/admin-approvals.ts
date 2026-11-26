import type {
  AdminApprovalRequest,
  ApprovalStatus,
} from "@/types/admin";

export const DEFAULT_APPROVAL_EXPIRY_DAYS = 7;

export function buildExpiryIso(
  fromDate = new Date(),
  days = DEFAULT_APPROVAL_EXPIRY_DAYS,
): string {
  const next = new Date(fromDate.getTime());
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

export function isApprovalExpired(
  request: AdminApprovalRequest,
  nowMs = Date.now(),
): boolean {
  if (request.status === "Expired") return true;
  if (request.status !== "Pending Consent") return false;
  const expiryMs = Date.parse(request.expiresAt);
  return Number.isFinite(expiryMs) && nowMs > expiryMs;
}

export function computeApprovalStatus(
  request: AdminApprovalRequest,
  nowMs = Date.now(),
): ApprovalStatus {
  if (request.status === "Executed" || request.status === "Cancelled") {
    return request.status;
  }

  const landlordRejected =
    request.landlordConsent.required &&
    request.landlordConsent.status === "Rejected";
  const renterRejected =
    request.renterConsent.required &&
    request.renterConsent.status === "Rejected";

  if (landlordRejected || renterRejected || request.status === "Rejected") {
    return "Rejected";
  }

  if (isApprovalExpired(request, nowMs)) {
    return "Expired";
  }

  const landlordOk =
    !request.landlordConsent.required ||
    request.landlordConsent.status === "Approved";
  const renterOk =
    !request.renterConsent.required ||
    request.renterConsent.status === "Approved";

  return landlordOk && renterOk ? "Approved" : "Pending Consent";
}

export function canExecuteApproval(
  request: AdminApprovalRequest,
  nowMs = Date.now(),
): { allowed: boolean; reason?: string } {
  const status = computeApprovalStatus(request, nowMs);
  if (status === "Executed") {
    return { allowed: false, reason: "Request has already been executed." };
  }
  if (status === "Rejected") {
    return { allowed: false, reason: "A required party rejected the request." };
  }
  if (status === "Cancelled") {
    return { allowed: false, reason: "Request was cancelled by an administrator." };
  }
  if (status === "Expired") {
    return { allowed: false, reason: "Approval request has expired." };
  }
  if (status !== "Approved") {
    return {
      allowed: false,
      reason: "Required party consent has not been completed yet.",
    };
  }
  return { allowed: true };
}

export function applyPartyConsentDecision(
  request: AdminApprovalRequest,
  party: "landlord" | "renter",
  decision: "Approved" | "Rejected",
  note?: string,
  respondedAt = new Date().toISOString(),
): AdminApprovalRequest {
  const target =
    party === "landlord" ? request.landlordConsent : request.renterConsent;

  if (!target.required) {
    return request;
  }
  if (
    request.status === "Executed" ||
    request.status === "Cancelled" ||
    request.status === "Expired"
  ) {
    return request;
  }

  const updatedTarget = {
    ...target,
    status: decision,
    respondedAt,
    note: note?.trim() || target.note,
  };

  const next: AdminApprovalRequest = {
    ...request,
    landlordConsent:
      party === "landlord" ? updatedTarget : request.landlordConsent,
    renterConsent: party === "renter" ? updatedTarget : request.renterConsent,
  };

  return {
    ...next,
    status: computeApprovalStatus(next),
  };
}

export function getApprovingPartyNames(
  request: AdminApprovalRequest,
): string[] {
  const names: string[] = [];
  if (
    request.landlordConsent.required &&
    request.landlordConsent.status === "Approved"
  ) {
    names.push(`Landlord: ${request.landlordConsent.partyName}`);
  }
  if (
    request.renterConsent.required &&
    request.renterConsent.status === "Approved"
  ) {
    names.push(`Renter: ${request.renterConsent.partyName}`);
  }
  return names;
}
