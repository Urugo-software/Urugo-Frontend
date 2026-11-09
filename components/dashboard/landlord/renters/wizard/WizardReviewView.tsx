"use client";

import { Building2, CheckCircle2, Edit3, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRwf, WizardReviewViewProps } from "../types/renter-wizard.types";

export function WizardReviewView({
  mode,
  identity,
  tenancy,
  properties,
  paymentSummary,
  simulatedLink,
  onBackToEdit,
  onConfirm,
}: WizardReviewViewProps) {
  const selectedProperty = properties.find((p) => p.id === tenancy.propertyId);
  const maskedNid =
    identity.nationalId.length === 16
      ? `${identity.nationalId.slice(0, 4)}********${identity.nationalId.slice(-4)}`
      : identity.nationalId || "Not provided";

  return (
    <div className="space-y-8 sm:space-y-9">
      {/* Notice Banner */}
      <div className="border border-line bg-surface p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ink" />
          <div>
            <h3 className="text-base font-bold text-ink">
              Ready for Final Registration Review
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-body">
              Please inspect the renter identity details and configured tenancy
              terms below. You can navigate back to modify any section prior to
              confirming.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Renter Details Section */}
        <div className="border border-line bg-white shadow-2xs">
          <div className="flex items-center justify-between border-b border-line bg-surface/50 p-4">
            <div className="flex items-center gap-2">
              <User className="size-4 text-ink" />
              <h4 className="text-sm font-bold text-ink">Renter Information</h4>
            </div>
            <button
              type="button"
              onClick={() => onBackToEdit(1)}
              className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-ink hover:underline"
            >
              <Edit3 className="size-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-5 space-y-3.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                Registration Type
              </span>
              <span className="inline-flex items-center border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold text-ink">
                {mode === "manual" ? "Direct Manual Entry" : "Onboarding Link"}
              </span>
            </div>

            {mode === "manual" ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Full Legal Name
                  </span>
                  <span className="font-semibold text-ink">
                    {identity.fullName || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Email Address
                  </span>
                  <span className="font-medium text-ink">
                    {identity.email || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Phone Number
                  </span>
                  <span className="font-mono text-xs font-medium text-ink">
                    {identity.phoneNumber || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-line pt-3.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    National ID (Masked)
                  </span>
                  <span className="font-mono text-xs font-bold text-ink">
                    {maskedNid}
                  </span>
                </div>
              </>
            ) : (
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
                  Generated Link Preview
                </span>
                <p className="font-mono text-xs bg-surface p-2.5 border border-line break-all text-ink">
                  {simulatedLink?.url || "Simulated Link Generated"}
                </p>
                <p className="text-xs text-faint">
                  Expires in 24 hours · Renter will complete identity submission self-service.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tenancy & Payment Section */}
        <div className="border border-line bg-white shadow-2xs">
          <div className="flex items-center justify-between border-b border-line bg-surface/50 p-4">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-ink" />
              <h4 className="text-sm font-bold text-ink">Tenancy Terms</h4>
            </div>
            <button
              type="button"
              onClick={() => onBackToEdit(2)}
              className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-ink hover:underline"
            >
              <Edit3 className="size-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="p-5 space-y-3.5 text-sm">
            {tenancy.isConfigured ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Assigned Property
                  </span>
                  <span className="font-semibold text-ink text-right">
                    {selectedProperty?.name || "Property Assigned"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Location
                  </span>
                  <span className="text-xs text-body text-right">
                    {selectedProperty?.location || "Kigali, Rwanda"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Monthly Rent
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink">
                    {formatRwf(paymentSummary.monthlyRent)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Start Date
                  </span>
                  <span className="font-medium text-ink">
                    {tenancy.startDate || "Immediately"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Duration
                  </span>
                  <span className="font-medium text-ink">
                    {tenancy.durationOption === "open"
                      ? "Open-ended (Flexible)"
                      : tenancy.durationOption === "custom"
                        ? `${tenancy.customDurationMonths} Months (Custom)`
                        : `${tenancy.durationOption} Months`}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-line pt-3.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Monthly Due Day
                  </span>
                  <span className="font-medium text-ink">
                    {tenancy.paymentDueDay}
                    {tenancy.paymentDueDay === 1
                      ? "st"
                      : tenancy.paymentDueDay === 2
                        ? "nd"
                        : tenancy.paymentDueDay === 3
                          ? "rd"
                          : "th"}{" "}
                    of each month
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-line pt-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">
                    Expected Move-in Total
                  </span>
                  <span className="font-mono text-base font-bold text-ink">
                    {formatRwf(paymentSummary.totalInitialAmount)}
                  </span>
                </div>
              </>
            ) : (
              <div className="py-6 text-center space-y-2">
                <p className="text-xs font-bold text-ink uppercase tracking-wider">
                  Tenancy Configuration Skipped
                </p>
                <p className="text-xs text-body leading-relaxed max-w-sm mx-auto">
                  This renter will be registered as an identity-only record in your
                  landlord account. You can assign them to a property and lease at
                  any time from the tenancies dashboard.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={() => onBackToEdit(2)}
          className="h-11 cursor-pointer rounded-none border-line bg-white px-5 text-sm font-semibold text-ink hover:bg-surface transition-colors"
        >
          ← Edit Tenancy Details
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          className="h-11 cursor-pointer rounded-none bg-ink px-7 text-sm font-semibold text-white hover:bg-black transition-colors"
        >
          Confirm & Save Renter
        </Button>
      </div>
    </div>
  );
}
