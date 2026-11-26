"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { computeAdminOverviewSummary } from "@/utils/admin-metrics";

export function AdminAttentionPanel() {
  const t = useTranslations("admin.overview.attention");
  const users = useAdminWorkspace((s) => s.users);
  const properties = useAdminWorkspace((s) => s.properties);
  const leases = useAdminWorkspace((s) => s.leases);
  const payments = useAdminWorkspace((s) => s.payments);
  const cases = useAdminWorkspace((s) => s.cases);
  const approvals = useAdminWorkspace((s) => s.approvals);
  const renterHistory = useAdminWorkspace((s) => s.renterHistory);

  const summary = computeAdminOverviewSummary({
    users,
    properties,
    leases,
    payments,
    cases,
    approvals,
    renterHistory,
  });

  const rows = [
    {
      title: t("verificationTitle"),
      detail: t("verificationDetail", { count: summary.pendingPropertiesCount }),
      href: "/admin/property-verification",
      count: summary.pendingPropertiesCount,
    },
    {
      title: t("approvalsTitle"),
      detail: t("approvalsDetail", { count: summary.pendingApprovalsCount }),
      href: "/admin/approvals",
      count: summary.pendingApprovalsCount,
    },
    {
      title: t("paymentsTitle"),
      detail: t("paymentsDetail", {
        count: summary.pendingOrFailedPaymentsCount,
      }),
      href: "/admin/payments",
      count: summary.pendingOrFailedPaymentsCount,
    },
    {
      title: t("casesTitle"),
      detail: t("casesDetail", {
        open: summary.openCasesCount,
        escalated: summary.escalatedCasesCount,
      }),
      href: "/admin/complaints",
      count: summary.openCasesCount,
    },
    {
      title: t("historyTitle"),
      detail: t("historyDetail", { count: summary.disputedHistoryCount }),
      href: "/admin/renter-history",
      count: summary.disputedHistoryCount,
    },
  ];

  return (
    <section className="border border-line bg-white shadow-2xs">
      <div className="border-b border-line px-5 py-4">
        <h3 className="text-sm font-bold text-ink">{t("title")}</h3>
        <p className="mt-0.5 text-xs text-body">{t("subtitle")}</p>
      </div>
      <div className="divide-y divide-line px-5">
        {rows.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between gap-3 py-3.5 transition-colors hover:text-brand-blue"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-0.5 text-xs text-body">{item.detail}</p>
            </div>
            <span className="flex shrink-0 items-center gap-2">
              <span className="min-w-7 border border-line bg-surface px-2 py-0.5 text-center text-xs font-bold text-ink">
                {item.count}
              </span>
              <ArrowRight aria-hidden="true" className="size-4 text-faint" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
