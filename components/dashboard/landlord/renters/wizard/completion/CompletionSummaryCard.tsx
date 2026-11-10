"use client";

import { Building2, ExternalLink, User } from "lucide-react";
import {
  formatRwf,
  FullRenterRegistrationSubmission,
} from "../../types/renter-wizard.types";

interface CompletionSummaryCardProps {
  submission: FullRenterRegistrationSubmission;
}

export function CompletionSummaryCard({
  submission,
}: CompletionSummaryCardProps) {
  const maskedNid =
    submission.identity.nationalId.length === 16
      ? `${submission.identity.nationalId.slice(0, 4)}********${submission.identity.nationalId.slice(-4)}`
      : submission.identity.nationalId || "Self-service link generated";

  return (
    <div className="border border-line bg-white shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line bg-surface/50 p-4 sm:p-5">
        <div>
          <h4 className="text-sm font-semibold text-ink">
            {submission.mode === "manual"
              ? submission.identity.fullName || "New Renter Record"
              : "Simulated Onboarding Invitation"}
          </h4>
          <p className="mt-0.5 text-xs text-body">
            Recorded at {submission.submittedAt}
          </p>
        </div>

        <span className="self-start sm:self-auto inline-flex items-center border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink">
          {submission.tenancy.isConfigured
            ? "Tenancy Configured"
            : "Identity-Only Record"}
        </span>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">
        {/* Left Column: Contact & Identity */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <User className="size-4 text-ink" />
            <h5 className="text-xs font-semibold text-ink uppercase tracking-wider">
              Identity & Contact
            </h5>
          </div>

          {submission.mode === "manual" ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-body">Email Address</span>
                <span className="font-medium text-ink">
                  {submission.identity.email || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">Phone Number</span>
                <span className=" font-medium text-ink">
                  {submission.identity.phoneNumber || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line/70 pt-2.5">
                <span className="text-body">National ID</span>
                <span className=" font-medium text-ink">{maskedNid}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 text-xs">
              <span className="text-body block">Invitation Link Generated</span>
              <div className="flex items-center justify-between gap-2 border border-line bg-surface p-2.5  text-xs text-ink break-all">
                <span>{submission.simulatedLink?.url}</span>
              </div>
              <p className="text-[11px] text-faint">
                Link active for 24 hours. Renter completes onboarding
                self-service.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Tenancy Information */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-ink" />
            <h5 className="text-xs font-semibold text-ink uppercase tracking-wider">
              Tenancy Terms
            </h5>
          </div>

          {submission.tenancy.isConfigured ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-body">Assigned Property</span>
                <span className="font-medium text-ink text-right">
                  {submission.propertyName || "Assigned Property"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">Monthly Rent</span>
                <span className=" font-medium text-ink">
                  {formatRwf(Number(submission.tenancy.monthlyRentRwf) || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body">Commencement Date</span>
                <span className="font-medium text-ink">
                  {submission.tenancy.startDate || "Immediate"}
                </span>
              </div>
              {submission.paymentSummary && (
                <div className="flex items-center justify-between border-t border-line/70 pt-2.5">
                  <span className="font-medium text-ink">
                    Initial Move-in Due
                  </span>
                  <span className=" font-semibold text-ink">
                    {formatRwf(submission.paymentSummary.totalInitialAmount)}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="py-2 text-xs text-body leading-relaxed">
              <p>
                No active property unit assigned. The renter profile is safely
                stored and can be attached to a lease agreement anytime from the
                tenancy directory.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
