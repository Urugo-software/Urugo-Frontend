"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminLeaseRecord } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminLeasesView() {
  const t = useTranslations("admin.leases");
  const locale = useLocale() as AppLocale;
  const leases = useAdminWorkspace((s) => s.leases);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return leases.filter((lease) => {
      const matchStatus = !statusFilter || lease.status === statusFilter;
      const matchQuery =
        !q ||
        lease.id.toLowerCase().includes(q) ||
        lease.renterName.toLowerCase().includes(q) ||
        lease.landlordName.toLowerCase().includes(q) ||
        lease.propertyTitle.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [leases, searchQuery, statusFilter]);

  const columns: AdminTableColumn<AdminLeaseRecord>[] = [
    {
      key: "id",
      header: t("colId"),
      render: (l) => (
        <Link
          href={`/admin/leases/${encodeURIComponent(l.id)}`}
          className="font-semibold text-brand-blue hover:underline"
        >
          {l.id}
        </Link>
      ),
    },
    { key: "renter", header: t("colRenter"), render: (l) => l.renterName },
    { key: "landlord", header: t("colLandlord"), render: (l) => l.landlordName },
    {
      key: "property",
      header: t("colProperty"),
      render: (l) => `${l.propertyTitle} · ${l.unitLabel}`,
    },
    {
      key: "rent",
      header: t("colRent"),
      render: (l) => (
        <span className="font-semibold text-ink">
          {formatRwfLocalized(l.rentRwf, locale)}
        </span>
      ),
    },
    {
      key: "dates",
      header: t("colDates"),
      render: (l) => `${l.startDate} → ${l.endDate}`,
    },
    {
      key: "status",
      header: t("colStatus"),
      render: (l) => (
        <StatusBadge label={l.status} tone={getAdminStatusTone(l.status)} />
      ),
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
              { value: "Active", label: "Active" },
              { value: "Ending Soon", label: "Ending Soon" },
              { value: "Disputed", label: "Disputed" },
              { value: "Draft", label: "Draft" },
              { value: "Expired", label: "Expired" },
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
        getRowKey={(l) => l.id}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setStatusFilter("");
        }}
      />
    </AdminShellSection>
  );
}
