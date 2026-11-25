"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { RentalIssue } from "@/types/landlord";
import { getIssueStatusMeta } from "@/utils/rental-debt";

interface RenterHistorySummaryProps {
  issues: RentalIssue[];
  completedTenanciesCount?: number;
}

export function RenterHistorySummary({
  issues,
  completedTenanciesCount = 1,
}: RenterHistorySummaryProps) {
  const t = useTranslations("landlord.renters.detail.history");
  const tStatusMeta = useTranslations("landlord.renterHistory.statusMeta");
  const locale = useLocale() as AppLocale;
  const confirmedCount = issues.filter(
    (i) => getIssueStatusMeta(i.status).isConfirmedObligation,
  ).length;
  const openCount = issues.filter(
    (i) =>
      i.status === "Reported" ||
      i.status === "Unresolved" ||
      i.status === "Disputed",
  ).length;

  return (
    <section className="space-y-5 border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("heading")}
          </h3>
          <p className="mt-1 text-sm font-semibold text-ink">{t("subtitle")}</p>
        </div>

        <Link
          href="/landlord/renter-history"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
        >
          <span>{t("openRentalHistory")}</span>
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-line bg-surface/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("recordedTenancies")}
          </p>
          <p className="mt-1 font-ibm text-xl font-bold text-ink">
            {completedTenanciesCount}
          </p>
        </div>
        <div className="border border-line bg-surface/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("openUnderReview")}
          </p>
          <p className="mt-1 font-ibm text-xl font-bold text-amber-700">
            {openCount}
          </p>
        </div>
        <div className="border border-line bg-surface/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("confirmedObligations")}
          </p>
          <p className="mt-1 font-ibm text-xl font-bold text-rose-700">
            {confirmedCount}
          </p>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="flex items-center gap-2.5 border border-emerald-200 bg-emerald-50/70 p-4 text-xs font-medium text-emerald-900">
          <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-emerald-600" />
          <span>{t("noIssues")}</span>
        </div>
      ) : (
        <div className="divide-y divide-line border border-line">
          {issues.map((issue) => {
            const meta = getIssueStatusMeta(issue.status);
            return (
              <Link
                key={issue.id}
                href={`/landlord/renter-history/${issue.id}`}
                className="flex flex-wrap items-center justify-between gap-3 p-4 transition-colors hover:bg-surface/40"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {issue.issueTitle}
                  </p>
                  <p className="mt-0.5 text-xs text-faint">
                    {issue.propertyName} · {issue.createdDate}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-ibm text-sm font-bold text-ink">
                    {formatRwfLocalized(issue.amountRwf, locale)}
                  </span>
                  <StatusBadge
                    label={tStatusMeta(`${issue.status}.label`)}
                    tone={meta.tone}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
