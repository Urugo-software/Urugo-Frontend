"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  OverviewStatGrid,
  type OverviewStatCardItem,
} from "@/components/dashboard/landlord/overview/OverviewStatGrid";
import type { AppLocale } from "@/i18n/config";
import { formatNumberLocalized, formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { computeAdminOverviewSummary } from "@/utils/admin-metrics";

export function AdminMetricGrid() {
  const t = useTranslations("admin.overview.metrics");
  const locale = useLocale() as AppLocale;
  const users = useAdminWorkspace((s) => s.users);
  const properties = useAdminWorkspace((s) => s.properties);
  const leases = useAdminWorkspace((s) => s.leases);
  const payments = useAdminWorkspace((s) => s.payments);
  const cases = useAdminWorkspace((s) => s.cases);
  const approvals = useAdminWorkspace((s) => s.approvals);
  const renterHistory = useAdminWorkspace((s) => s.renterHistory);

  const items = useMemo<OverviewStatCardItem[]>(() => {
    const summary = computeAdminOverviewSummary({
      users,
      properties,
      leases,
      payments,
      cases,
      approvals,
      renterHistory,
    });

    return [
      {
        label: t("users"),
        value: formatNumberLocalized(summary.totalUsers, locale),
        helper: t("usersHelper", {
          landlords: summary.landlordsCount,
          renters: summary.rentersCount,
        }),
        href: "/admin/users",
      },
      {
        label: t("properties"),
        value: formatNumberLocalized(summary.totalProperties, locale),
        helper: t("propertiesHelper", {
          verified: summary.verifiedPropertiesCount,
          pending: summary.pendingPropertiesCount,
        }),
        href: "/admin/properties",
        accent: summary.pendingPropertiesCount > 0 ? "warning" : "default",
      },
      {
        label: t("activeLeases"),
        value: formatNumberLocalized(summary.activeLeasesCount, locale),
        helper: t("activeLeasesHelper", {
          approvals: summary.pendingApprovalsCount,
        }),
        href: "/admin/leases",
      },
      {
        label: t("paymentVolume"),
        value: formatRwfLocalized(summary.successfulVolumeRwf, locale),
        helper: t("paymentVolumeHelper", {
          issues: summary.pendingOrFailedPaymentsCount,
        }),
        href: "/admin/payments",
        accent:
          summary.pendingOrFailedPaymentsCount > 0 ? "warning" : "success",
      },
      {
        label: t("openCases"),
        value: formatNumberLocalized(summary.openCasesCount, locale),
        helper: t("openCasesHelper", {
          escalated: summary.escalatedCasesCount,
        }),
        href: "/admin/complaints",
        accent: summary.escalatedCasesCount > 0 ? "danger" : "default",
      },
      {
        label: t("pendingApprovals"),
        value: formatNumberLocalized(summary.pendingApprovalsCount, locale),
        helper: t("pendingApprovalsHelper", {
          suspended: summary.suspendedUsersCount,
        }),
        href: "/admin/approvals",
        accent: summary.pendingApprovalsCount > 0 ? "warning" : "success",
      },
    ];
  }, [
    approvals,
    cases,
    leases,
    locale,
    payments,
    properties,
    renterHistory,
    t,
    users,
  ]);

  return <OverviewStatGrid items={items} />;
}
