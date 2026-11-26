import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { computeAdminOverviewSummary } from "@/utils/admin-metrics";

const delay = (ms = 40) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Frontend integration boundary for Admin Dashboard operations.
 * Currently backed by simulated Zustand persistence; replace methods
 * inside this module with HTTP calls to `@/lib/axios` once backend
 * `/api/admin/*` endpoints and server RBAC are live.
 */
export async function fetchAdminOverview() {
  await delay();
  const state = useAdminWorkspace.getState();
  return {
    summary: computeAdminOverviewSummary(state),
    recentPayments: state.payments.slice(0, 5),
    recentAuditLogs: state.auditLogs.slice(0, 5),
    pendingApprovals: state.approvals.filter(
      (a) => a.status === "Pending Consent" || a.status === "Approved",
    ),
  };
}

export async function fetchAdminApprovals() {
  await delay();
  return useAdminWorkspace.getState().approvals;
}

export async function fetchAdminUsers() {
  await delay();
  return useAdminWorkspace.getState().users;
}

export async function fetchAdminProperties() {
  await delay();
  return useAdminWorkspace.getState().properties;
}

export async function fetchAdminLeases() {
  await delay();
  return useAdminWorkspace.getState().leases;
}

export async function fetchAdminPayments() {
  await delay();
  const s = useAdminWorkspace.getState();
  return {
    payments: s.payments,
    financialRequests: s.financialRequests,
  };
}

export async function fetchAdminCases() {
  await delay();
  return useAdminWorkspace.getState().cases;
}

export async function fetchAdminRenterHistory() {
  await delay();
  return useAdminWorkspace.getState().renterHistory;
}

export async function fetchAdminAuditLogs() {
  await delay();
  return useAdminWorkspace.getState().auditLogs;
}
