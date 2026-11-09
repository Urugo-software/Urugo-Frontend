"use client";

import { Check, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRwf, WizardCompletionViewProps } from "../types/renter-wizard.types";

export function WizardCompletionView({
  submission,
  onRegisterAnother,
  onDone,
}: WizardCompletionViewProps) {
  const maskedNid =
    submission.identity.nationalId.length === 16
      ? `${submission.identity.nationalId.slice(0, 4)}********${submission.identity.nationalId.slice(-4)}`
      : submission.identity.nationalId || "Self-service link generated";

  return (
    <div className="space-y-8 sm:space-y-9">
      {/* Success Notification */}
      <div className="border border-line bg-surface p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-xs">
            <Check className="size-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="inline-flex items-center border border-line bg-white px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">
              Registration Recorded (Preview)
            </span>
            <h3 className="mt-1.5 text-lg font-bold text-ink">
              Renter Successfully Prepared
            </h3>
            <p className="mt-1 text-sm text-body leading-relaxed max-w-xl">
              The renter record has been captured in local frontend state. In the
              full production workflow, this initiates the National ID verification,
              debt record review, and tenancy agreement preparation.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Review Card */}
      <div className="border border-line bg-surface/40 p-6 sm:p-7 space-y-5 text-sm">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h4 className="text-base font-bold text-ink">
              {submission.mode === "manual"
                ? submission.identity.fullName || "New Renter Record"
                : "Simulated Onboarding Invitation"}
            </h4>
            <p className="text-xs text-faint">
              Submitted at {submission.submittedAt} · Mode:{" "}
              {submission.mode === "manual" ? "Direct Registration" : "Invitation Link"}
            </p>
          </div>

          <span className="inline-flex items-center border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink">
            {submission.tenancy.isConfigured
              ? "Tenancy Configured"
              : "Identity-Only Record"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-faint block">
              Contact & Identity
            </span>
            {submission.mode === "manual" ? (
              <div className="space-y-1.5 text-xs text-body">
                <div>
                  Email:{" "}
                  <strong className="text-ink">{submission.identity.email}</strong>
                </div>
                <div>
                  Phone:{" "}
                  <strong className="text-ink font-mono">
                    {submission.identity.phoneNumber}
                  </strong>
                </div>
                <div>
                  National ID:{" "}
                  <strong className="text-ink font-mono">{maskedNid}</strong>
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-xs text-body">
                <p className="font-mono bg-white p-2 border border-line text-xs break-all text-ink">
                  {submission.simulatedLink?.url}
                </p>
                <p className="text-faint text-[11px]">
                  Invitation valid for 24 hours.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-faint block">
              Tenancy Details
            </span>
            {submission.tenancy.isConfigured ? (
              <div className="space-y-1.5 text-xs text-body">
                <div>
                  Property:{" "}
                  <strong className="text-ink">
                    {submission.propertyName || "Assigned Property"}
                  </strong>
                </div>
                <div>
                  Monthly Rent:{" "}
                  <strong className="text-ink font-mono">
                    {formatRwf(Number(submission.tenancy.monthlyRentRwf) || 0)}
                  </strong>
                </div>
                <div>
                  Start Date:{" "}
                  <strong className="text-ink">
                    {submission.tenancy.startDate}
                  </strong>
                </div>
                {submission.paymentSummary && (
                  <div>
                    Initial Move-in Due:{" "}
                    <strong className="text-ink font-mono font-bold">
                      {formatRwf(submission.paymentSummary.totalInitialAmount)}
                    </strong>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-faint leading-relaxed">
                No active property assigned yet. You can associate a tenancy lease
                from the landlord dashboard.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={onRegisterAnother}
          className="h-11 cursor-pointer gap-2 rounded-none border-line bg-white px-5 text-sm font-semibold text-ink hover:bg-surface transition-colors"
        >
          <RotateCcw className="size-4" />
          <span>Register Another Renter</span>
        </Button>

        <Button
          type="button"
          onClick={onDone}
          className="h-11 cursor-pointer gap-2 rounded-none bg-ink px-6 text-sm font-semibold text-white hover:bg-black transition-colors"
        >
          <span>Done (View Renters)</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
