"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { localizeDisplayDate } from "@/i18n/display-format";
import { formatRwfLocalized } from "@/i18n/formatting";
import { cn } from "@/lib/utils";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { RentalIssue } from "@/types/landlord";
import { getIssueStatusMeta, isIssueActionable } from "@/utils/rental-debt";

const SEED_ISSUE_IDS = new Set(["iss-501", "iss-502"]);

interface DisputeDetailsViewProps {
  issueId?: string;
  issue?: RentalIssue;
}

export function DisputeDetailsView({
  issueId,
  issue: initialIssue,
}: DisputeDetailsViewProps) {
  const t = useTranslations("landlord.renterHistory.detail");
  const tStatusMeta = useTranslations("landlord.renterHistory.statusMeta");
  const tSeed = useTranslations("landlord.seed.issues");
  const locale = useLocale() as AppLocale;
  const { issues, updateIssueStatus } = useLandlordWorkspace();
  const issue = issueId
    ? issues.find((i) => i.id === issueId)
    : initialIssue
      ? (issues.find((i) => i.id === initialIssue.id) ?? initialIssue)
      : undefined;

  const [receiptOpen, setReceiptOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<"confirm" | "reject" | null>(
    null,
  );

  if (!issue) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
        <EmptyStateBox
          icon={ShieldAlert}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
          action={
            <Link
              href="/landlord/renter-history"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
            >
              {t("backToHistory")}
            </Link>
          }
        />
      </main>
    );
  }

  const meta = getIssueStatusMeta(issue.status);
  const statusLabel = tStatusMeta(`${issue.status}.label`);
  const statusDesc = tStatusMeta(`${issue.status}.description`);
  const canAct = isIssueActionable(issue.status);
  const isSeed = SEED_ISSUE_IDS.has(issue.id);
  const issueTitle = isSeed ? tSeed(`${issue.id}.issueTitle`) : issue.issueTitle;
  const landlordReport = isSeed
    ? tSeed(`${issue.id}.landlordReport`)
    : issue.landlordReport;
  const renterResponse = isSeed
    ? tSeed(`${issue.id}.renterResponse`)
    : issue.renterResponse;
  const evidenceTitle =
    isSeed && issue.evidence
      ? tSeed(`${issue.id}.evidenceTitle`)
      : issue.evidence?.title;
  const evidenceType =
    isSeed && issue.evidence
      ? tSeed(`${issue.id}.evidenceType`)
      : issue.evidence?.type;

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div>
        <Link
          href="/landlord/renter-history"
          className="inline-flex items-center gap-2 text-sm font-semibold text-body transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{t("backToHistory")}</span>
        </Link>
      </div>

      {/* Header Card */}
      <div className="space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                {issueTitle}
              </h2>
              <span aria-hidden="true" className="text-line">&middot;</span>
              <StatusBadge label={statusLabel} tone={meta.tone} />
            </div>
            <p className="text-xs text-body">
              <strong className="text-ink">{issue.renterName}</strong> ·{" "}
              {issue.propertyName} ·{" "}
              {t("tenancyInline", {
                period: localizeDisplayDate(issue.tenancyPeriod, locale),
              })}
            </p>
          </div>

          <div className="border border-line bg-surface/50 px-4 py-2.5 text-left sm:text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint">
              {t("reportedAmountLabel")}
            </span>
            <p className="font-ibm text-lg font-bold text-ink">
              {formatRwfLocalized(issue.amountRwf, locale)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-3 text-xs text-body">
          <span>
            {t("reportedOn", {
              date: localizeDisplayDate(issue.createdDate, locale),
            })}
          </span>
          {issue.noticeDeadlineDate && (
            <span className="inline-flex items-center gap-1.5 font-medium text-ink">
              <Clock aria-hidden="true" className="size-3.5 text-amber-700" />
              {t("noticeDeadline", {
                date: localizeDisplayDate(issue.noticeDeadlineDate, locale),
              })}
              {issue.daysRemaining !== undefined && issue.daysRemaining > 0
                ? t("daysRemainingSuffix", { count: issue.daysRemaining })
                : ""}
            </span>
          )}
          <span className="text-faint">{statusDesc}</span>
        </div>
      </div>

      {/* Statements Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-3 border border-line bg-white p-5 shadow-2xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("landlordReportHeading")}
          </h3>
          <p className="text-sm leading-relaxed text-ink">{landlordReport}</p>
        </div>

        <div className="space-y-3 border border-line bg-white p-5 shadow-2xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("renterResponseHeading")}
          </h3>
          {renterResponse ? (
            <p className="text-sm leading-relaxed text-ink">{renterResponse}</p>
          ) : (
            <p className="text-xs italic text-body">{t("noResponseYet")}</p>
          )}

          {issue.evidence && (
            <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-surface/50 p-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <FileText
                  aria-hidden="true"
                  className="size-4 shrink-0 text-brand-blue"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-ink">
                    {evidenceTitle}
                  </p>
                  <p className="inline-flex items-center gap-1 text-[11px] text-faint">
                    <span>{evidenceType}</span>
                    <span>·</span>
                    {issue.evidence.verified ? (
                      <span className="inline-flex items-center gap-0.5 text-emerald-700">
                        <ShieldCheck aria-hidden="true" className="size-3" />
                        {t("verified")}
                      </span>
                    ) : (
                      <span>{t("awaitingVerification")}</span>
                    )}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setReceiptOpen(true)}
                className="h-8 cursor-pointer rounded-none text-xs"
              >
                {t("inspectReceipt")}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Resolution Actions */}
      <div className="border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          {t("resolutionHeading")}
        </h3>

        {canAct ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                updateIssueStatus(issue.id, "Resolved");
                toast.success(t("toastResolved"));
              }}
              className="cursor-pointer rounded-none bg-emerald-700 text-xs text-white hover:bg-emerald-800"
            >
              <CheckCircle2 aria-hidden="true" className="size-4" />
              {t("acceptProofBtn")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmModal("confirm")}
              className="cursor-pointer rounded-none border-rose-200 text-xs text-rose-700 hover:bg-rose-50"
            >
              {t("confirmObligationBtn")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmModal("reject")}
              className="cursor-pointer rounded-none text-xs"
            >
              {t("dismissReportBtn")}
            </Button>
          </div>
        ) : (
          <p className="mt-3 text-xs text-body">
            {t("finalizedNoteBefore")}
            <strong>{statusLabel}</strong>
            {t("finalizedNoteAfter")}
          </p>
        )}
      </div>

      {/* Receipt Preview Modal */}
      <ModalDialog
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        title={evidenceTitle ?? t("receiptFallbackTitle")}
        description={t("receiptSubmittedBy", {
          type: evidenceType ?? t("evidenceFallbackType"),
          name: issue.renterName,
        })}
        footer={
          <Button
            type="button"
            variant="outline"
            onClick={() => setReceiptOpen(false)}
            className="cursor-pointer rounded-none"
          >
            {t("close")}
          </Button>
        }
      >
        <div className="space-y-3 border border-line bg-surface/50 p-4 text-xs text-body">
          <p>
            <strong>{t("docLabel")}</strong> {evidenceTitle}
          </p>
          <p>
            <strong>{t("categoryLabel")}</strong> {evidenceType}
          </p>
          <p>
            <strong>{t("verificationStatusLabel")}</strong>{" "}
            {issue.evidence?.verified
              ? t("verifiedProof")
              : t("pendingManualVerification")}
          </p>
          <p className="text-faint">{t("previewPendingNote")}</p>
        </div>
      </ModalDialog>

      {/* Confirm Decision Alert */}
      <ModalDialog
        open={confirmModal !== null}
        onClose={() => setConfirmModal(null)}
        variant="alert"
        title={
          confirmModal === "confirm"
            ? t("confirmModalTitle")
            : t("dismissModalTitle")
        }
        description={
          confirmModal === "confirm"
            ? t("confirmModalDesc", {
                amount: formatRwfLocalized(issue.amountRwf, locale),
                name: issue.renterName,
              })
            : t("dismissModalDesc", { name: issue.renterName })
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmModal(null)}
              className="cursor-pointer rounded-none"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              variant={confirmModal === "confirm" ? "destructive" : "default"}
              onClick={() => {
                if (confirmModal === "confirm") {
                  updateIssueStatus(issue.id, "Confirmed");
                  toast.success(t("toastConfirmed"));
                } else {
                  updateIssueStatus(issue.id, "Rejected");
                  toast.success(t("toastDismissed"));
                }
                setConfirmModal(null);
              }}
              className="cursor-pointer rounded-none"
            >
              {confirmModal === "confirm"
                ? t("confirmObligationSubmit")
                : t("dismissReportBtn")}
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">
          {confirmModal === "confirm"
            ? t("confirmBodyNote")
            : t("dismissBodyNote")}
        </p>
      </ModalDialog>
    </main>
  );
}
