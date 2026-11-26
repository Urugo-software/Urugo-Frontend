"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AdminAttentionPanel } from "./AdminAttentionPanel";
import { AdminGeographyPanel } from "./AdminGeographyPanel";
import { AdminGrowthCharts } from "./AdminGrowthCharts";
import { AdminMetricGrid } from "./AdminMetricGrid";
import { AdminPaymentsChart } from "./AdminPaymentsChart";
import { AdminRecentPayments } from "./AdminRecentPayments";
import { AdminShellSection } from "./shared/AdminShellSection";
import { useAdminWorkspace } from "@/store/admin-workspace.store";

export function AdminOverview() {
  const t = useTranslations("admin.overview");
  const auditLogs = useAdminWorkspace((s) => s.auditLogs);

  return (
    <AdminShellSection
      title={t("title")}
      description={t("description")}
      action={
        <Link
          href="/admin/approvals"
          className="inline-flex h-9 items-center border border-line bg-ink px-4 text-xs font-semibold text-white hover:bg-ink/90"
        >
          {t("openApprovals")}
        </Link>
      }
    >
      <AdminMetricGrid />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <AdminPaymentsChart />
        <AdminAttentionPanel />
      </div>

      <AdminGrowthCharts />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <AdminRecentPayments />
        <AdminGeographyPanel />
      </div>

      <section className="border border-line bg-white shadow-2xs">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-ink">{t("recentAuditTitle")}</h3>
            <p className="mt-0.5 text-xs text-body">{t("recentAuditSubtitle")}</p>
          </div>
          <Link
            href="/admin/audit-logs"
            className="text-xs font-semibold text-brand-blue hover:underline"
          >
            {t("viewAuditLogs")}
          </Link>
        </div>
        <div className="divide-y divide-line px-5">
          {auditLogs.slice(0, 4).map((entry) => (
            <div
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="font-semibold text-ink">
                  {entry.action} · {entry.targetLabel}
                </p>
                <p className="text-xs text-body">
                  {entry.actorName} — {entry.reason}
                </p>
              </div>
              <span className="text-xs text-faint">{entry.timestamp}</span>
            </div>
          ))}
        </div>
      </section>
    </AdminShellSection>
  );
}
