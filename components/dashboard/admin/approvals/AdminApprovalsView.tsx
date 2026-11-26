"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminApprovalRequest } from "@/types/admin";
import { computeApprovalStatus } from "@/utils/admin-approvals";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";
import { NewAssociationRequestModal } from "./NewAssociationRequestModal";

export function AdminApprovalsView() {
  const t = useTranslations("admin.approvals");
  const approvals = useAdminWorkspace((s) => s.approvals);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return approvals.filter((req) => {
      const liveStatus = computeApprovalStatus(req);
      const matchesStatus = !statusFilter || liveStatus === statusFilter;
      const matchesQuery =
        !q ||
        req.id.toLowerCase().includes(q) ||
        req.title.toLowerCase().includes(q) ||
        req.payload.summary.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [approvals, searchQuery, statusFilter]);

  const columns: AdminTableColumn<AdminApprovalRequest>[] = [
    {
      key: "id",
      header: t("colId"),
      render: (item) => (
        <Link
          href={`/admin/approvals/${encodeURIComponent(item.id)}`}
          className="font-semibold text-brand-blue hover:underline"
        >
          {item.id}
        </Link>
      ),
    },
    {
      key: "title",
      header: t("colAction"),
      render: (item) => (
        <div>
          <p className="font-semibold text-ink">{item.title}</p>
          <p className="text-xs text-body">{item.payload.summary}</p>
        </div>
      ),
    },
    {
      key: "landlord",
      header: t("colLandlord"),
      render: (item) =>
        item.landlordConsent.required ? (
          <StatusBadge
            label={item.landlordConsent.status}
            tone={getAdminStatusTone(item.landlordConsent.status)}
          />
        ) : (
          <span className="text-xs text-faint">—</span>
        ),
    },
    {
      key: "renter",
      header: t("colRenter"),
      render: (item) =>
        item.renterConsent.required ? (
          <StatusBadge
            label={item.renterConsent.status}
            tone={getAdminStatusTone(item.renterConsent.status)}
          />
        ) : (
          <span className="text-xs text-faint">—</span>
        ),
    },
    {
      key: "status",
      header: t("colStatus"),
      render: (item) => {
        const liveStatus = computeApprovalStatus(item);
        return (
          <StatusBadge
            label={liveStatus}
            tone={getAdminStatusTone(liveStatus)}
          />
        );
      },
    },
  ];

  return (
    <AdminShellSection
      title={t("title")}
      description={t("description")}
      action={
        <Button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="h-9 rounded-none bg-brand-blue px-4 text-xs font-semibold text-white hover:bg-brand-deep"
        >
          <Plus aria-hidden="true" className="mr-1.5 size-4" />
          {t("newAssociationBtn")}
        </Button>
      }
    >
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
              { value: "Pending Consent", label: "Pending Consent" },
              { value: "Executed", label: "Executed" },
              { value: "Rejected", label: "Rejected" },
              { value: "Cancelled", label: "Cancelled" },
              { value: "Expired", label: "Expired" },
            ],
          },
        ]}
        selectedFilters={{ status: statusFilter }}
        onFilterChange={(_, value) => setStatusFilter(value)}
        onReset={() => {
          setSearchQuery("");
          setStatusFilter("");
        }}
      />

      <AdminEntityTable
        items={filtered}
        columns={columns}
        getRowKey={(item) => item.id}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setStatusFilter("");
        }}
      />

      <NewAssociationRequestModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </AdminShellSection>
  );
}
