import type {
  AdminApprovalRequest,
  AdminCaseRecord,
  AdminLeaseRecord,
  AdminPaymentRecord,
  AdminPropertyRecord,
  AdminRenterHistoryRecord,
  AdminUserRecord,
} from "@/types/admin";

export interface AdminOverviewSummary {
  totalUsers: number;
  landlordsCount: number;
  rentersCount: number;
  suspendedUsersCount: number;
  totalProperties: number;
  verifiedPropertiesCount: number;
  pendingPropertiesCount: number;
  activeLeasesCount: number;
  successfulVolumeRwf: number;
  pendingOrFailedPaymentsCount: number;
  openCasesCount: number;
  escalatedCasesCount: number;
  pendingApprovalsCount: number;
  disputedHistoryCount: number;
}

export function computeAdminOverviewSummary(input: {
  users: readonly AdminUserRecord[];
  properties: readonly AdminPropertyRecord[];
  leases: readonly AdminLeaseRecord[];
  payments: readonly AdminPaymentRecord[];
  cases: readonly AdminCaseRecord[];
  approvals: readonly AdminApprovalRequest[];
  renterHistory: readonly AdminRenterHistoryRecord[];
}): AdminOverviewSummary {
  const landlordsCount = input.users.filter(
    (u) => u.role === "LANDLORD",
  ).length;
  const rentersCount = input.users.filter((u) => u.role === "RENTER").length;
  const suspendedUsersCount = input.users.filter(
    (u) => u.status === "Suspended" || u.status === "Restricted",
  ).length;

  const verifiedPropertiesCount = input.properties.filter(
    (p) => p.verification === "Verified",
  ).length;
  const pendingPropertiesCount = input.properties.filter(
    (p) =>
      p.verification === "Pending" || p.verification === "Needs Information",
  ).length;

  const activeLeasesCount = input.leases.filter(
    (l) => l.status === "Active" || l.status === "Ending Soon",
  ).length;

  const successfulVolumeRwf = input.payments
    .filter((p) => p.status === "Successful")
    .reduce((sum, p) => sum + p.amountRwf, 0);

  const pendingOrFailedPaymentsCount = input.payments.filter(
    (p) => p.status === "Pending" || p.status === "Failed",
  ).length;

  const openCases = input.cases.filter(
    (c) => c.status !== "Resolved" && c.status !== "Rejected",
  );
  const escalatedCasesCount = openCases.filter(
    (c) => c.status === "Escalated",
  ).length;

  const pendingApprovalsCount = input.approvals.filter(
    (a) => a.status === "Pending Consent" || a.status === "Approved",
  ).length;

  const disputedHistoryCount = input.renterHistory.filter(
    (h) =>
      h.status === "Reported" ||
      h.status === "Unresolved" ||
      h.status === "Disputed",
  ).length;

  return {
    totalUsers: input.users.length,
    landlordsCount,
    rentersCount,
    suspendedUsersCount,
    totalProperties: input.properties.length,
    verifiedPropertiesCount,
    pendingPropertiesCount,
    activeLeasesCount,
    successfulVolumeRwf,
    pendingOrFailedPaymentsCount,
    openCasesCount: openCases.length,
    escalatedCasesCount,
    pendingApprovalsCount,
    disputedHistoryCount,
  };
}
