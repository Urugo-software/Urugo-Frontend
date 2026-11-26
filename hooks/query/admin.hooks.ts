"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminApprovals,
  fetchAdminAuditLogs,
  fetchAdminCases,
  fetchAdminLeases,
  fetchAdminOverview,
  fetchAdminPayments,
  fetchAdminProperties,
  fetchAdminRenterHistory,
  fetchAdminUsers,
} from "@/api/admin.api";

export function useAdminOverviewQuery() {
  return useQuery({
    queryKey: ["admin", "overview"],
    queryFn: fetchAdminOverview,
  });
}

export function useAdminApprovalsQuery() {
  return useQuery({
    queryKey: ["admin", "approvals"],
    queryFn: fetchAdminApprovals,
  });
}

export function useAdminUsersQuery() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchAdminUsers,
  });
}

export function useAdminPropertiesQuery() {
  return useQuery({
    queryKey: ["admin", "properties"],
    queryFn: fetchAdminProperties,
  });
}

export function useAdminLeasesQuery() {
  return useQuery({
    queryKey: ["admin", "leases"],
    queryFn: fetchAdminLeases,
  });
}

export function useAdminPaymentsQuery() {
  return useQuery({
    queryKey: ["admin", "payments"],
    queryFn: fetchAdminPayments,
  });
}

export function useAdminCasesQuery() {
  return useQuery({
    queryKey: ["admin", "cases"],
    queryFn: fetchAdminCases,
  });
}

export function useAdminRenterHistoryQuery() {
  return useQuery({
    queryKey: ["admin", "renter-history"],
    queryFn: fetchAdminRenterHistory,
  });
}

export function useAdminAuditLogsQuery() {
  return useQuery({
    queryKey: ["admin", "audit-logs"],
    queryFn: fetchAdminAuditLogs,
  });
}
