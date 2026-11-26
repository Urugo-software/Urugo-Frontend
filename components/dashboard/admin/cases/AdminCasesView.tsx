"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminCaseKind, AdminCaseRecord } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminCasesView({ kind }: { kind: AdminCaseKind }) {
  const t = useTranslations(
    kind === "complaint" ? "admin.complaints" : "admin.moderation",
  );
  const cases = useAdminWorkspace((s) => s.cases);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const basePath =
    kind === "complaint" ? "/admin/complaints" : "/admin/moderation";

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return cases
      .filter((c) => c.kind === kind)
      .filter((c) => {
        const matchStatus = !statusFilter || c.status === statusFilter;
        const matchQuery =
          !q ||
          c.id.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.targetLabel.toLowerCase().includes(q) ||
          c.reporterName.toLowerCase().includes(q);
        return matchStatus && matchQuery;
      });
  }, [cases, kind, searchQuery, statusFilter]);

  const columns: AdminTableColumn<AdminCaseRecord>[] = [
    {
      key: "id",
      header: t("colId"),
      render: (c) => (
        <Link
          href={`${basePath}/${encodeURIComponent(c.id)}`}
          className="font-semibold text-brand-blue hover:underline"
        >
          {c.id}
        </Link>
      ),
    },
    {
      key: "subject",
      header: t("colSubject"),
      render: (c) => (
        <div>
          <p className="font-semibold text-ink">{c.subject}</p>
          <p className="text-xs text-body">
            {c.category} · {c.targetLabel}
          </p>
        </div>
      ),
    },
    { key: "reporter", header: t("colReporter"), render: (c) => c.reporterName },
    { key: "assignee", header: t("colAssignee"), render: (c) => c.assignee },
    {
      key: "status",
      header: t("colStatus"),
      render: (c) => (
        <StatusBadge label={c.status} tone={getAdminStatusTone(c.status)} />
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
              { value: "Open", label: "Open" },
              { value: "Under Review", label: "Under Review" },
              { value: "Waiting for Information", label: "Waiting for Information" },
              { value: "Escalated", label: "Escalated" },
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
        getRowKey={(c) => c.id}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setStatusFilter("");
        }}
      />
    </AdminShellSection>
  );
}
