"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { cn } from "@/lib/utils";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RentalIssue } from "@/types/landlord";
import { getIssueStatusMeta, isIssueActionable } from "@/utils/rental-debt";
import { DisputeIssueModal } from "./DisputeIssueModal";
import { RenterIssueCard } from "./RenterIssueCard";
import { SettleIssueModal } from "./SettleIssueModal";

type HistoryFilter = "all" | "actionable" | "confirmed" | "resolved";

export function RenterRentalHistoryView() {
  const t = useTranslations("renter.rentalHistory");
  const locale = useLocale() as AppLocale;
  const [filter, setFilter] = useState<HistoryFilter>("all");
  const [disputeTarget, setDisputeTarget] = useState<RentalIssue | null>(null);
  const [settleTarget, setSettleTarget] = useState<RentalIssue | null>(null);
  const profile = useRenterWorkspace((s) => s.profile);
  const allIssues = useLandlordWorkspace((s) => s.issues);

  const myIssues = useMemo(() => {
    const name = profile.name.trim().toLowerCase();
    const matched = allIssues.filter(
      (i) => i.renterName.trim().toLowerCase() === name || i.id === "iss-501",
    );
    return matched.length > 0 ? matched : allIssues;
  }, [allIssues, profile.name]);

  const confirmedDebtRwf = useMemo(
    () =>
      myIssues
        .filter((i) => getIssueStatusMeta(i.status).isConfirmedObligation)
        .reduce((sum, i) => sum + i.amountRwf, 0),
    [myIssues],
  );

  const openNoticeCount = myIssues.filter((i) => isIssueActionable(i.status)).length;
  const resolvedCount = myIssues.filter(
    (i) => i.status === "Resolved" || i.status === "Rejected",
  ).length;

  const filtered = myIssues.filter((i) => {
    if (filter === "actionable") return isIssueActionable(i.status);
    if (filter === "confirmed") return i.status === "Confirmed";
    if (filter === "resolved") {
      return i.status === "Resolved" || i.status === "Rejected";
    }
    return true;
  });

  const tabs: Array<{ id: HistoryFilter; label: string }> = [
    { id: "all", label: t("tabs.all") },
    { id: "actionable", label: t("tabs.actionable") },
    { id: "confirmed", label: t("tabs.confirmed") },
    { id: "resolved", label: t("tabs.resolved") },
  ];

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
            {t("stats.confirmedDebt")}
          </span>
          <p
            className={`mt-2 font-ibm text-xl font-bold ${
              confirmedDebtRwf > 0 ? "text-rose-700" : "text-success"
            }`}
          >
            {formatRwfLocalized(confirmedDebtRwf, locale)}
          </p>
          <p className="mt-1 text-xs text-body">{t("stats.confirmedDebtHint")}</p>
        </div>

        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("stats.openNotices")}
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-amber-700">
            {openNoticeCount}
          </p>
          <p className="mt-1 text-xs text-body">{t("stats.openNoticesHint")}</p>
        </div>

        <div className="border border-line bg-white p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("stats.resolvedRecords")}
          </span>
          <p className="mt-2 font-ibm text-xl font-bold text-ink">
            {resolvedCount}
          </p>
          <p className="mt-1 text-xs text-body">
            {t("stats.resolvedRecordsHint")}
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label={t("tabs.ariaLabel")}
        className="flex items-center gap-6 overflow-x-auto border-b border-line"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={filter === tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "-mb-px cursor-pointer whitespace-nowrap border-b-2 pb-3 pt-1 text-sm transition-colors",
              filter === tab.id
                ? "border-ink font-semibold text-ink"
                : "border-transparent font-medium text-body hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyStateBox
          icon={ShieldCheck}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((issue) => (
            <RenterIssueCard
              key={issue.id}
              issue={issue}
              onDispute={setDisputeTarget}
              onSettle={setSettleTarget}
            />
          ))}
        </div>
      )}

      <DisputeIssueModal
        issue={disputeTarget}
        onClose={() => setDisputeTarget(null)}
      />
      <SettleIssueModal
        issue={settleTarget}
        onClose={() => setSettleTarget(null)}
      />
    </div>
  );
}
