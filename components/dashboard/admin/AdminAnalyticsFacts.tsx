"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";

export function AdminAnalyticsFacts() {
  const t = useTranslations("admin.analytics");
  const locale = useLocale() as AppLocale;
  const properties = useAdminWorkspace((s) => s.properties);
  const payments = useAdminWorkspace((s) => s.payments);

  const avgRent = properties.length
    ? Math.round(
        properties.reduce((sum, p) => sum + p.rentRwf, 0) / properties.length,
      )
    : 0;
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const occupiedUnits = properties.reduce((sum, p) => sum + p.occupiedUnits, 0);
  const occupancyRate = totalUnits
    ? Math.round((occupiedUnits / totalUnits) * 100)
    : 0;
  const verifiedRate = properties.length
    ? Math.round(
        (properties.filter((p) => p.verification === "Verified").length /
          properties.length) *
          100,
      )
    : 0;

  const successfulSum = payments
    .filter((p) => p.status === "Successful")
    .reduce((sum, p) => sum + p.amountRwf, 0);
  const refundedSum = payments
    .filter((p) => p.status === "Refunded")
    .reduce((sum, p) => sum + p.amountRwf, 0);
  const failedCount = payments.filter((p) => p.status === "Failed").length;
  const pendingCount = payments.filter((p) => p.status === "Pending").length;

  const groups = [
    {
      title: t("propertySummary"),
      facts: [
        [t("avgRent"), formatRwfLocalized(avgRent, locale)],
        [t("occupancy"), `${occupancyRate}%`],
        [t("verificationRate"), `${verifiedRate}%`],
        [t("totalUnits"), String(totalUnits)],
      ],
    },
    {
      title: t("paymentSummary"),
      facts: [
        [t("successfulVolume"), formatRwfLocalized(successfulSum, locale)],
        [t("refundedVolume"), formatRwfLocalized(refundedSum, locale)],
        [t("failedPayments"), String(failedCount)],
        [t("pendingPayments"), String(pendingCount)],
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {groups.map((group) => (
        <section
          key={group.title}
          className="border border-line bg-white shadow-2xs"
        >
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-sm font-bold text-ink">{group.title}</h3>
          </div>
          <div className="grid gap-x-8 px-5 sm:grid-cols-2">
            {group.facts.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 border-b border-line py-3.5 text-sm"
              >
                <span className="text-body">{label}</span>
                <span className="font-semibold text-ink">{value}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
