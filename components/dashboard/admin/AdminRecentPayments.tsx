"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { getAdminStatusTone } from "@/utils/admin-status-tone";

export function AdminRecentPayments() {
  const t = useTranslations("admin.overview.recentPayments");
  const tActions = useTranslations("common.actions");
  const locale = useLocale() as AppLocale;
  const payments = useAdminWorkspace((s) => s.payments);

  return (
    <section className="border border-line bg-white shadow-2xs">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-ink">{t("title")}</h3>
          <p className="mt-0.5 text-xs text-body">{t("subtitle")}</p>
        </div>
        <Link
          href="/admin/payments"
          className="text-xs font-semibold text-brand-blue hover:underline"
        >
          {tActions("viewAll")}
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead className="border-b border-line bg-surface/70 text-xs font-semibold uppercase tracking-wider text-faint">
            <tr>
              <th className="px-5 py-3">{t("colTx")}</th>
              <th className="px-5 py-3">{t("colRenter")}</th>
              <th className="px-5 py-3">{t("colProperty")}</th>
              <th className="px-5 py-3">{t("colAmount")}</th>
              <th className="px-5 py-3">{t("colStatus")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {payments.slice(0, 5).map((payment) => (
              <tr
                key={payment.transactionId}
                className="text-sm hover:bg-surface/40"
              >
                <td className="px-5 py-3.5 font-semibold">
                  <Link
                    href={`/admin/payments/${encodeURIComponent(payment.transactionId)}`}
                    className="text-brand-blue hover:underline"
                  >
                    {payment.transactionId}
                  </Link>
                </td>
                <td className="px-5 py-3.5 font-medium text-ink">
                  {payment.renterName}
                </td>
                <td className="px-5 py-3.5 text-body">
                  {payment.propertyTitle}
                </td>
                <td className="px-5 py-3.5 font-semibold text-ink">
                  {formatRwfLocalized(payment.amountRwf, locale)}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge
                    label={payment.status}
                    tone={getAdminStatusTone(payment.status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
