"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRenterPayments } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { summarizeRenterPayments } from "@/utils/renter-helpers";
import { PaymentStatusOverviewCard } from "./PaymentStatusOverviewCard";
import { PaymentHistoryTable } from "./PaymentHistoryTable";

export function RenterPaymentsView() {
  const t = useTranslations("renter.payments");
  const locale = useLocale() as AppLocale;
  const { isLoading, isError, refetch } = useRenterPayments();
  const payments = useRenterWorkspace((s) => s.payments);

  if (isLoading) return <SectionLoading message={t("loading")} />;
  if (isError) {
    return (
      <SectionError
        message={t("loadError")}
        onRetry={() => void refetch()}
      />
    );
  }

  const summary = summarizeRenterPayments(payments);
  const featured = summary.pendingPayment ?? payments[0];

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("stats.balanceDue")}
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-ink">
            {formatRwfLocalized(summary.outstandingRwf, locale)}
          </p>
        </div>
        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("stats.totalPaid")}
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-success">
            {formatRwfLocalized(summary.totalPaidRwf, locale)}
          </p>
        </div>
        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("stats.receiptsAvailable")}
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-ink">
            {summary.paidCount}
          </p>
        </div>
      </div>

      <PaymentStatusOverviewCard payment={featured} />
      <PaymentHistoryTable payments={payments} />
    </div>
  );
}
