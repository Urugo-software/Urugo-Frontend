"use client";

import { Building2, Edit3 } from "lucide-react";
import { LandlordPropertyItem } from "@/types/landlord";
import {
  formatRwf,
  InitialPaymentCalculation,
  TenancyConfigDraft,
} from "@/types/renter-wizard.types";
import {
  formatCommencementDisplay,
  getOrdinalSuffix,
} from "@/utils/rent-schedule-utils";

interface ReviewTenancyTermsCardProps {
  tenancy: TenancyConfigDraft;
  properties: LandlordPropertyItem[];
  paymentSummary: InitialPaymentCalculation;
  onEdit: () => void;
}

export function ReviewTenancyTermsCard({
  tenancy,
  properties,
  paymentSummary,
  onEdit,
}: ReviewTenancyTermsCardProps) {
  const selectedProperty = properties.find((p) => p.id === tenancy.propertyId);
  const commencement = formatCommencementDisplay({
    startDate: tenancy.startDate,
    useFirstPaymentAsCommencement: tenancy.useFirstPaymentAsCommencement,
    commencementStatus: tenancy.commencementStatus,
    confirmedPaymentDate: tenancy.confirmedPaymentDate,
  });

  const dueDay = tenancy.paymentDueDay || 1;
  const dueSuffix = getOrdinalSuffix(dueDay);

  return (
    <div className="border border-line bg-white shadow-2xs text-[12.5px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line bg-surface/50 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center border border-line bg-white text-ink">
            <Building2 className="size-3.5" />
          </div>
          <h4 className="text-[14px] font-semibold text-ink">Tenancy Terms</h4>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] font-medium text-body hover:text-ink transition-colors"
        >
          <Edit3 className="size-3.5" />
          <span>Edit</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3.5 text-[13px]">
        {tenancy.isConfigured ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-body">Assigned Property</span>
              <span className="text-[12.5px] font-medium text-ink text-right">
                {selectedProperty?.name || "Property Assigned"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-body">Location</span>
              <span className="text-[12.5px] text-body text-right">
                {selectedProperty?.location || "Kigali, Rwanda"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-body">Monthly Rent</span>
              <span className="font-mono text-[13px] font-medium text-ink">
                {formatRwf(paymentSummary.monthlyRent)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-body">Commencement Date</span>
              <div className="flex items-center gap-2">
                {commencement.isPending && (
                  <span className="inline-flex items-center border border-amber-300 bg-amber-50 px-2 py-0.5 text-[12.5px] font-semibold text-amber-800">
                    Pending Confirmation
                  </span>
                )}
                <span className="text-[12.5px] font-medium text-ink text-right">
                  {commencement.display}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-body">Duration</span>
              <span className="text-[12.5px] font-medium text-ink">
                {tenancy.durationOption === "open"
                  ? "Open-ended (Flexible)"
                  : tenancy.durationOption === "custom"
                    ? `${tenancy.customDurationMonths} Months (Custom)`
                    : `${tenancy.durationOption} Months`}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-3.5">
              <span className="text-[12.5px] text-body">Monthly Rent Due Date</span>
              <span className="text-[12.5px] font-medium text-ink">
                {dueDay}{dueSuffix} of each month
                {dueDay >= 29 ? " (or month end)" : ""}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-3.5">
              <span className="text-[12.5px] font-semibold text-ink">
                Expected Move-in Total
              </span>
              <span className="font-mono text-base font-semibold text-ink">
                {formatRwf(paymentSummary.totalInitialAmount)}
              </span>
            </div>
          </>
        ) : (
          <div className="py-6 text-center space-y-2">
            <p className="text-[13px] font-medium text-ink">
              Tenancy Configuration Skipped
            </p>
            <p className="text-[12.5px] text-body leading-relaxed max-w-sm mx-auto">
              This renter will be registered as an identity-only record in your
              landlord account. You can assign them to a property and lease at
              any time from the tenancies dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
