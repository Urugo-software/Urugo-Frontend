"use client";

import Link from "next/link";
import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { RentalIssue } from "@/types/landlord";
import { formatRwf } from "@/utils/format";
import { getIssueStatusMeta, isIssueActionable } from "@/utils/rental-debt";

interface DisputeDetailsViewProps {
  issueId?: string;
  issue?: RentalIssue;
}

export function DisputeDetailsView({
  issueId,
  issue: initialIssue,
}: DisputeDetailsViewProps) {
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
          title="Rental history record not found"
          description="This obligation record does not exist or may have been removed."
          action={
            <Link
              href="/landlord/renter-history"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
            >
              Back to Renter History
            </Link>
          }
        />
      </main>
    );
  }

  const meta = getIssueStatusMeta(issue.status);
  const canAct = isIssueActionable(issue.status);

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div>
        <Link
          href="/landlord/renter-history"
          className="inline-flex items-center gap-2 text-sm font-semibold text-body transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>Back to Renter History</span>
        </Link>
      </div>

      {/* Header Card */}
      <div className="space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                {issue.issueTitle}
              </h2>
              <span aria-hidden="true" className="text-line">&middot;</span>
              <StatusBadge label={meta.label} tone={meta.tone} />
            </div>
            <p className="text-xs text-body">
              <strong className="text-ink">{issue.renterName}</strong> ·{" "}
              {issue.propertyName} · Tenancy: {issue.tenancyPeriod}
            </p>
          </div>

          <div className="border border-line bg-surface/50 px-4 py-2.5 text-left sm:text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint">
              Reported Amount
            </span>
            <p className="font-ibm text-lg font-bold text-ink">
              {formatRwf(issue.amountRwf)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-3 text-xs text-body">
          <span>Reported on {issue.createdDate}</span>
          {issue.noticeDeadlineDate && (
            <span className="inline-flex items-center gap-1.5 font-medium text-ink">
              <Clock aria-hidden="true" className="size-3.5 text-amber-700" />
              3-day notice deadline: {issue.noticeDeadlineDate}
              {issue.daysRemaining !== undefined && issue.daysRemaining > 0
                ? ` (${issue.daysRemaining}d remaining)`
                : ""}
            </span>
          )}
          <span className="text-faint">{meta.description}</span>
        </div>
      </div>

      {/* Statements Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-3 border border-line bg-white p-5 shadow-2xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Landlord Report
          </h3>
          <p className="text-sm leading-relaxed text-ink">
            {issue.landlordReport}
          </p>
        </div>

        <div className="space-y-3 border border-line bg-white p-5 shadow-2xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Renter Response & Evidence
          </h3>
          {issue.renterResponse ? (
            <p className="text-sm leading-relaxed text-ink">
              {issue.renterResponse}
            </p>
          ) : (
            <p className="text-xs italic text-body">
              No renter response submitted yet within the 3-day notice window.
            </p>
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
                    {issue.evidence.title}
                  </p>
                  <p className="inline-flex items-center gap-1 text-[11px] text-faint">
                    <span>{issue.evidence.type}</span>
                    <span>·</span>
                    {issue.evidence.verified ? (
                      <span className="inline-flex items-center gap-0.5 text-emerald-700">
                        <ShieldCheck aria-hidden="true" className="size-3" />
                        Verified
                      </span>
                    ) : (
                      <span>Awaiting verification</span>
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
                Inspect Receipt
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Resolution Actions */}
      <div className="border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          Resolution Decision
        </h3>

        {canAct ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                updateIssueStatus(issue.id, "Resolved");
                toast.success("Case marked as Resolved.");
              }}
              className="cursor-pointer rounded-none bg-emerald-700 text-xs text-white hover:bg-emerald-800"
            >
              <CheckCircle2 aria-hidden="true" className="size-4" />
              Accept Proof & Mark Resolved
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmModal("confirm")}
              className="cursor-pointer rounded-none border-rose-200 text-xs text-rose-700 hover:bg-rose-50"
            >
              Confirm Unpaid Obligation
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmModal("reject")}
              className="cursor-pointer rounded-none text-xs"
            >
              Dismiss Report
            </Button>
          </div>
        ) : (
          <p className="mt-3 text-xs text-body">
            This case is finalized as <strong>{meta.label}</strong>. No further
            status changes are pending.
          </p>
        )}
      </div>

      {/* Receipt Preview Modal */}
      <ModalDialog
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        title={issue.evidence?.title ?? "Uploaded Receipt"}
        description={`${issue.evidence?.type ?? "Evidence"} submitted by ${issue.renterName}`}
        footer={
          <Button
            type="button"
            variant="outline"
            onClick={() => setReceiptOpen(false)}
            className="cursor-pointer rounded-none"
          >
            Close
          </Button>
        }
      >
        <div className="space-y-3 border border-line bg-surface/50 p-4 text-xs text-body">
          <p>
            <strong>Document:</strong> {issue.evidence?.title}
          </p>
          <p>
            <strong>Category:</strong> {issue.evidence?.type}
          </p>
          <p>
            <strong>Verification Status:</strong>{" "}
            {issue.evidence?.verified
              ? "Verified payment proof"
              : "Pending manual verification"}
          </p>
          <p className="text-faint">
            File download/preview streams will connect once backend document
            storage is live.
          </p>
        </div>
      </ModalDialog>

      {/* Confirm Decision Alert */}
      <ModalDialog
        open={confirmModal !== null}
        onClose={() => setConfirmModal(null)}
        variant="alert"
        title={
          confirmModal === "confirm"
            ? "Confirm unpaid obligation?"
            : "Dismiss rental report?"
        }
        description={
          confirmModal === "confirm"
            ? `Confirm ${formatRwf(issue.amountRwf)} as a verified unpaid obligation on ${issue.renterName}'s rental history?`
            : `Close this report as dismissed without recording any debt for ${issue.renterName}?`
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmModal(null)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={confirmModal === "confirm" ? "destructive" : "default"}
              onClick={() => {
                if (confirmModal === "confirm") {
                  updateIssueStatus(issue.id, "Confirmed");
                  toast.success("Unpaid obligation confirmed.");
                } else {
                  updateIssueStatus(issue.id, "Rejected");
                  toast.success("Report dismissed without debt.");
                }
                setConfirmModal(null);
              }}
              className="cursor-pointer rounded-none"
            >
              {confirmModal === "confirm"
                ? "Confirm Obligation"
                : "Dismiss Report"}
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">
          {confirmModal === "confirm"
            ? "Only confirm after reviewing any renter proof and verifying the 3-day notice window."
            : "Dismissed reports remain closed in the audit log with zero debt impact."}
        </p>
      </ModalDialog>
    </main>
  );
}
