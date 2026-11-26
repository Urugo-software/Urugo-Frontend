"use client";

import { useMemo, useState } from "react";
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

export function AdminAuditLogsView() {
  const t = useTranslations("admin.auditLogs");
  const tActions = useTranslations("common.actions");
  const auditLogs = useAdminWorkspace((s) => s.auditLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<AdminAuditLogEntry | null>(
    null,
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return auditLogs.filter((entry) => {
      const matchCat = !categoryFilter || entry.category === categoryFilter;
      const matchQuery =
        !q ||
        entry.action.toLowerCase().includes(q) ||
        entry.actorName.toLowerCase().includes(q) ||
        entry.targetLabel.toLowerCase().includes(q) ||
        entry.targetId.toLowerCase().includes(q) ||
        entry.reason.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [auditLogs, categoryFilter, searchQuery]);

  const categories = [...new Set(auditLogs.map((a) => a.category))];

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
        ]}
        selectedFilters={{ category: categoryFilter }}
        onFilterChange={(_, val) => setCategoryFilter(val)}
        onReset={() => {
          setSearchQuery("");
          setCategoryFilter("");
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
