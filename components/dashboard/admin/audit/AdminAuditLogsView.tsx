"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminAuditLogEntry } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";

function escapeCsvCell(value: string): string {
  const safe = value.replace(/"/g, '""');
  return `"${safe}"`;
}

export function AdminAuditLogsView() {
  const t = useTranslations("admin.auditLogs");
  const tActions = useTranslations("common.actions");
  const tCommon = useTranslations("admin.common");
  const auditLogs = useAdminWorkspace((s) => s.auditLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<AdminAuditLogEntry | null>(
    null,
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return auditLogs.filter((entry) => {
      const matchCat = !categoryFilter || entry.category === categoryFilter;
      const matchStatus =
        !statusFilter || entry.executionStatus === statusFilter;
      const matchQuery =
        !q ||
        entry.id.toLowerCase().includes(q) ||
        entry.action.toLowerCase().includes(q) ||
        entry.actorName.toLowerCase().includes(q) ||
        entry.targetLabel.toLowerCase().includes(q) ||
        entry.targetId.toLowerCase().includes(q) ||
        entry.reason.toLowerCase().includes(q);
      return matchCat && matchStatus && matchQuery;
    });
  }, [auditLogs, categoryFilter, searchQuery, statusFilter]);

  const categories = [...new Set(auditLogs.map((a) => a.category))];
  const executionStatuses = [
    ...new Set(auditLogs.map((a) => a.executionStatus)),
  ];

  const handleExportCsv = () => {
    try {
      const headers = [
        "ID",
        "Timestamp",
        "Actor",
        "Role",
        "Category",
        "Action",
        "TargetType",
        "TargetID",
        "TargetLabel",
        "Status",
        "Reason",
        "Before",
        "After",
        "ApprovalRequestID",
      ];
      const rows = filtered.map((entry) =>
        [
          entry.id,
          entry.timestamp,
          entry.actorName,
          entry.actorRole,
          entry.category,
          entry.action,
          entry.targetType,
          entry.targetId,
          entry.targetLabel,
          entry.executionStatus,
          entry.reason,
          entry.beforeValue ?? "",
          entry.afterValue ?? "",
          entry.approvalRequestId ?? "",
        ]
          .map(escapeCsvCell)
          .join(","),
      );
      const csv = [headers.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `urugo-audit-logs-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(t("exportedToast"));
    } catch {
      toast.error(tCommon("actionFailed"));
    }
  };

  const columns: AdminTableColumn<AdminAuditLogEntry>[] = [
    {
      key: "action",
      header: t("colAction"),
      render: (entry) => (
        <button
          type="button"
          onClick={() => setSelectedEntry(entry)}
          className="cursor-pointer text-left font-semibold text-brand-blue hover:underline"
        >
          {entry.action}
        </button>
      ),
    },
    {
      key: "actor",
      header: t("colActor"),
      render: (entry) => `${entry.actorName} (${entry.actorRole})`,
    },
    {
      key: "target",
      header: t("colTarget"),
      render: (entry) => `${entry.targetLabel} (${entry.targetId})`,
    },
    {
      key: "status",
      header: t("colStatus"),
      render: (entry) => (
        <StatusBadge
          label={entry.executionStatus}
          tone={getAdminStatusTone(entry.executionStatus)}
        />
      ),
    },
    { key: "time", header: t("colTime"), render: (entry) => entry.timestamp },
  ];

  return (
    <AdminShellSection
      title={t("title")}
      description={t("description")}
      badgeText={t("readOnlyBadge")}
      action={
        <Button
          type="button"
          variant="outline"
          disabled={filtered.length === 0}
          onClick={handleExportCsv}
          className="h-9 rounded-none border-line bg-white px-3.5 text-xs font-semibold text-ink hover:bg-surface"
        >
          <Download aria-hidden="true" className="mr-1.5 size-3.5" />
          {t("exportCsv")}
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
            key: "category",
            label: t("allCategories"),
            options: categories.map((c) => ({ value: c, label: c })),
          },
          {
            key: "status",
            label: t("allExecutionStatuses"),
            options: executionStatuses.map((s) => ({ value: s, label: s })),
          },
        ]}
        selectedFilters={{ category: categoryFilter, status: statusFilter }}
        onFilterChange={(key, val) => {
          if (key === "category") setCategoryFilter(val);
          if (key === "status") setStatusFilter(val);
        }}
        onReset={() => {
          setSearchQuery("");
          setCategoryFilter("");
          setStatusFilter("");
        }}
      />

      <AdminEntityTable
        items={filtered}
        columns={columns}
        getRowKey={(entry) => entry.id}
        pageSize={8}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setCategoryFilter("");
          setStatusFilter("");
        }}
      />

      <ModalDialog
        open={Boolean(selectedEntry)}
        onClose={() => setSelectedEntry(null)}
        title={selectedEntry ? `${selectedEntry.id} · ${selectedEntry.action}` : ""}
        description={selectedEntry?.timestamp}
        footer={
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedEntry(null)}
            className="h-9 rounded-none border-line text-xs font-semibold"
          >
            {tActions("close")}
          </Button>
        }
      >
        {selectedEntry && (
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold text-faint">{t("colActor")}</dt>
              <dd className="text-ink">
                {selectedEntry.actorName} ({selectedEntry.actorRole})
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-faint">{t("colTarget")}</dt>
              <dd className="text-ink">
                {selectedEntry.targetType} · {selectedEntry.targetLabel} (
                {selectedEntry.targetId})
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-faint">{t("reasonLabel")}</dt>
              <dd className="text-ink">{selectedEntry.reason}</dd>
            </div>
            {selectedEntry.approvalRequestId && (
              <div>
                <dt className="text-xs font-semibold text-faint">
                  {t("approvalRequestLabel")}
                </dt>
                <dd className="font-mono text-xs text-ink">
                  {selectedEntry.approvalRequestId}
                </dd>
              </div>
            )}
            {selectedEntry.approvingParties &&
              selectedEntry.approvingParties.length > 0 && (
                <div>
                  <dt className="text-xs font-semibold text-faint">
                    {t("approvingPartiesLabel")}
                  </dt>
                  <dd className="text-xs text-ink">
                    {selectedEntry.approvingParties.join(", ")}
                  </dd>
                </div>
              )}
            {selectedEntry.beforeValue && (
              <div>
                <dt className="text-xs font-semibold text-faint">{t("beforeLabel")}</dt>
                <dd className="border border-line bg-surface p-2 text-xs text-body">
                  {selectedEntry.beforeValue}
                </dd>
              </div>
            )}
            {selectedEntry.afterValue && (
              <div>
                <dt className="text-xs font-semibold text-faint">{t("afterLabel")}</dt>
                <dd className="border border-line bg-surface p-2 text-xs text-ink">
                  {selectedEntry.afterValue}
                </dd>
              </div>
            )}
          </dl>
        )}
      </ModalDialog>
    </AdminShellSection>
  );
}
