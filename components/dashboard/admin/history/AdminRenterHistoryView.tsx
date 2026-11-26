"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminRenterHistoryRecord } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { getIssueStatusMeta } from "@/utils/rental-debt";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminRenterHistoryView() {
  const t = useTranslations("admin.renterHistory");
  const locale = useLocale() as AppLocale;
  const records = useAdminWorkspace((s) => s.renterHistory);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return records.filter((r) => {
      const matchStatus = !statusFilter || r.status === statusFilter;
      const matchQuery =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.renterName.toLowerCase().includes(q) ||
        r.recordTitle.toLowerCase().includes(q) ||
        r.propertyTitle.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [records, searchQuery, statusFilter]);

  const columns: AdminTableColumn<AdminRenterHistoryRecord>[] = [
    {
      key: "id",
      header: t("colId"),
      render: (r) => (
        <Link
          href={`/admin/renter-history/${encodeURIComponent(r.id)}`}
          className="font-semibold text-brand-blue hover:underline"
        >
          {r.id}
        </Link>
      ),
    },
    { key: "renter", header: t("colRenter"), render: (r) => r.renterName },
    {
      key: "record",
      header: t("colRecord"),
      render: (r) => (
        <div>
          <p className="font-semibold text-ink">{r.recordTitle}</p>
          <p className="text-xs text-body">{r.propertyTitle}</p>
        </div>
      ),
    },
    {
      key: "amount",
      header: t("colAmount"),
      render: (r) => (
        <span className="font-semibold text-ink">
          {formatRwfLocalized(r.amountRwf, locale)}
        </span>
      ),
    },
    {
      key: "evidence",
      header: t("colEvidence"),
      render: (r) => r.evidenceSummary,
    },
    {
      key: "status",
      header: t("colStatus"),
      render: (r) => {
        const meta = getIssueStatusMeta(r.status);
        return (
          <StatusBadge
            label={r.status}
            tone={getAdminStatusTone(
              meta.isConfirmedObligation ? "Rejected" : r.status,
            )}
          />
        );
      },
    },
  ];

  return (
    <AdminShellSection title={t("title")} description={t("description")}>
      <AdminFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={t("searchPlaceholder")}
        searchLabel={t("searchPlaceholder")}
        filters={[
          {
            key: "status",
            label: t("allStatuses"),
            options: [
              { value: "Reported", label: "Reported" },
              { value: "Unresolved", label: "Unresolved" },
              { value: "Disputed", label: "Disputed" },
              { value: "Confirmed", label: "Confirmed" },
              { value: "Resolved", label: "Resolved" },
              { value: "Rejected", label: "Rejected" },
            ],
          },
        ]}
        selectedFilters={{ status: statusFilter }}
        onFilterChange={(_, val) => setStatusFilter(val)}
        onReset={() => {
          setSearchQuery("");
          setStatusFilter("");
        }}
      />

      <AdminEntityTable
        items={filtered}
        columns={columns}
        getRowKey={(r) => r.id}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setStatusFilter("");
        }}
      />
    </AdminShellSection>
  );
}
