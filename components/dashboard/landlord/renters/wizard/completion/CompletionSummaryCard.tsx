"use client";

import { Building2, User } from "lucide-react";
import {
  formatRwf,
  FullRenterRegistrationSubmission,
} from "@/types/renter-wizard.types";
import { formatCommencementDisplay } from "@/utils/rent-schedule-utils";

interface CompletionSummaryCardProps {
  submission: FullRenterRegistrationSubmission;
}

export function CompletionSummaryCard({
  submission,
}: CompletionSummaryCardProps) {
  const isLinkMode = submission.mode === "link";
  const maskedNid =
    submission.identity.nationalId.length === 16
      ? `${submission.identity.nationalId.slice(0, 4)}********${submission.identity.nationalId.slice(-4)}`
      : submission.identity.nationalId || "On file";

  const commencementLabel = submission.tenancy.useFirstPaymentAsCommencement
    ? formatCommencementDisplay({
        commencementStatus: "pending_first_payment",
        startDate: submission.tenancy.startDate,
      }).display
    : submission.tenancy.startDate || "Immediate";

  return (
    <div className="border border-line bg-white shadow-2xs">
      <div className="flex flex-col gap-3 border-b border-line bg-surface/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h4 className="text-sm font-semibold text-ink">
            {isLinkMode
              ? "Onboarding Invitation Link"
              : submission.identity.fullName || "Renter Record"}
          </h4>
          <p className="mt-0.5 text-xs text-body">
            Recorded at {submission.submittedAt}
            {submission.mode === "existing" && " · Existing Portfolio Tenant"}
          </p>
        </div>

        <span
          className={`self-start text-xs font-semibold sm:self-auto ${
            submission.tenancy.isConfigured ? "text-success" : "text-body"
          }`}
        >
          {submission.tenancy.isConfigured
            ? "Tenancy Configured"
            : "Identity-Only Record"}
        </span>
      </div>

      <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <User aria-hidden="true" className="size-4 text-ink" />
            <h5 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Identity & Contact
            </h5>
          </div>

          {!isLinkMode ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">Email Address</span>
                <span className="font-medium text-ink">
                  {submission.identity.email || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">Phone Number</span>
                <span className="font-medium text-ink">
                  {submission.identity.phoneNumber || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                <span className="text-body">National ID</span>
                <span className="font-medium text-ink">{maskedNid}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 text-xs">
              <span className="block text-body">Invitation Link Generated</span>
              <div className="break-all border border-line bg-surface p-2.5 text-xs text-ink">
                {submission.simulatedLink?.url || "Generated in session"}
              </div>
              <p className="text-xs text-faint">
                Share this link with the prospective tenant to complete
                self-service registration.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Building2 aria-hidden="true" className="size-4 text-ink" />
            <h5 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Tenancy Terms
            </h5>
          </div>

          {submission.tenancy.isConfigured ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">Assigned Property</span>
                <span className="text-right font-medium text-ink">
                  {submission.propertyName || "Assigned Property"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">Monthly Rent</span>
                <span className="font-ibm font-medium text-ink">
                  {formatRwf(Number(submission.tenancy.monthlyRentRwf) || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-body">Commencement Date</span>
                <span className="text-right font-medium text-ink">
                  {commencementLabel}
                </span>
              </div>
              {submission.paymentSummary && (
                <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                  <span className="font-medium text-ink">
                    Initial Move-in Due
                  </span>
                  <span className="font-ibm font-semibold text-ink">
                    {formatRwf(submission.paymentSummary.totalInitialAmount)}
                  </span>
                </div>
              )}
              {submission.agreementRef && (
                <div className="flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                  <span className="text-body">Lease Agreement</span>
                  <span className="font-ibm font-semibold text-ink">
                    {submission.agreementRef} (
                    {submission.selectedLanguage === "rw"
                      ? "Kinyarwanda"
                      : "English"}
                    )
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="py-2 text-xs leading-relaxed text-body">
              No active property unit assigned. The renter profile is stored and
              can be attached to a lease agreement anytime.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
