"use client";

import { CheckCircle2, FileText, ShieldAlert } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { IssueStatus, RentalIssue } from "@/types/landlord";
import { getIssueStatusMeta, isIssueActionable } from "@/utils/rental-debt";

const STATUS_META_KEYS: Record<IssueStatus, string> = {
  Reported: "reported",
  Unresolved: "unresolved",
  Disputed: "disputed",
  Confirmed: "confirmed",
  Resolved: "resolved",
  Rejected: "rejected",
};

interface RenterIssueCardProps {
  issue: RentalIssue;
  onDispute: (issue: RentalIssue) => void;
  onSettle: (issue: RentalIssue) => void;
}

export function RenterIssueCard({
  issue,
  onDispute,
  onSettle,
}: RenterIssueCardProps) {
  const t = useTranslations("renter.rentalHistory");
  const locale = useLocale() as AppLocale;
  const meta = getIssueStatusMeta(issue.status);
  const statusKey = STATUS_META_KEYS[issue.status];
  const canRespond =
    isIssueActionable(issue.status) || issue.status === "Confirmed";

  return (
    <article className="space-y-4 border border-line bg-white p-5 shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-bold text-ink">{issue.issueTitle}</h3>
            <StatusBadge
              label={t(`statusMeta.${statusKey}.label`)}
              tone={meta.tone}
            />
          </div>
          <p className="mt-1 text-xs text-body">
            {issue.propertyName} &middot; {issue.tenancyPeriod} &middot;{" "}
            {t("card.landlordLabel")}{" "}
            <strong className="font-semibold text-ink">
              {issue.landlordName}
            </strong>
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="block font-ibm text-lg font-bold text-ink">
            {formatRwfLocalized(issue.amountRwf, locale)}
          </span>
          {typeof issue.daysRemaining === "number" &&
            issue.daysRemaining > 0 && (
              <span className="text-xs font-semibold text-amber-700">
                {issue.daysRemaining === 1
                  ? t("card.daysLeftSingle", { days: issue.daysRemaining })
                  : t("card.daysLeftPlural", { days: issue.daysRemaining })}
              </span>
            )}
        </div>
      </div>

      <p className="text-xs text-body">
        {t(`statusMeta.${statusKey}.description`)}
      </p>

      <div className="space-y-2 text-sm">
        <div className="border-l-2 border-line bg-surface/50 px-3.5 py-2.5">
          <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
            {t("card.landlordReport", { date: issue.createdDate })}
          </span>
          <p className="mt-1 text-ink">{issue.landlordReport}</p>
        </div>

        {issue.renterResponse && (
          <div className="border-l-2 border-brand-blue bg-brand-tint/30 px-3.5 py-2.5">
            <span className="block text-xs font-semibold uppercase tracking-wider text-brand-blue">
              {t("card.yourResponse")}
            </span>
            <p className="mt-1 text-ink">{issue.renterResponse}</p>
          </div>
        )}

        {issue.evidence && (
          <div className="inline-flex items-center gap-2 border border-line bg-surface/40 px-3 py-1.5 text-xs text-body">
            <FileText aria-hidden="true" className="size-3.5 text-brand-blue" />
            <span>{issue.evidence.title}</span>
            <StatusBadge
              label={
                issue.evidence.verified ? "Verified" : t("card.underReview")
              }
              tone={issue.evidence.verified ? "success" : "warning"}
            />
          </div>
        )}
      </div>

      {canRespond && (
        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line pt-4">
          {issue.status !== "Confirmed" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onDispute(issue)}
              className="h-9 cursor-pointer rounded-none text-xs font-semibold"
            >
              <ShieldAlert aria-hidden="true" className="size-4" />
              {issue.status === "Disputed"
                ? t("card.updateDispute")
                : t("card.disputeSubmit")}
            </Button>
          )}
          <Button
            type="button"
            onClick={() => onSettle(issue)}
            className="h-9 cursor-pointer rounded-none text-xs font-semibold"
          >
            <CheckCircle2 aria-hidden="true" className="size-4" />
            {t("card.recordSettlement")}
          </Button>
        </div>
      )}
    </article>
  );
}
