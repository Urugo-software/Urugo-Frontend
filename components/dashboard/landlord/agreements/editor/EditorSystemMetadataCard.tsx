"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Agreement } from "@/types/agreement.types";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import {
  formatCommencementDisplay,
  getOrdinalSuffix,
} from "@/utils/rent-schedule-utils";
import { Button } from "@/components/ui/button";

interface Props {
  agreement: Agreement;
  onEditTenancy?: () => void;
}

export function EditorSystemMetadataCard({ agreement, onEditTenancy }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const commencement = formatCommencementDisplay({
    startDate: agreement.tenancyStartDate,
    commencementStatus: agreement.commencementStatus,
    confirmedPaymentDate: agreement.firstPaymentConfirmedAt,
  });

  const dueDay = agreement.financials.paymentDueDay || 1;
  const dueSuffix = getOrdinalSuffix(dueDay);

  return (
    <>
      {/* Compact Tenancy Details Bar */}
      <div className="border border-line bg-surface/30 px-4 py-3.5 text-[12.5px]">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-line">
          <span className="font-semibold text-ink text-[12.5px] uppercase tracking-wider">
            Tenancy Details
          </span>
          <div className="flex items-center gap-3">
            {onEditTenancy && (
              <button
                type="button"
                onClick={onEditTenancy}
                className="text-[12.5px] text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer"
              >
                Edit Tenancy Details
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[12.5px] text-faint hover:text-ink font-medium underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View details</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <span className="text-[12.5px] text-faint block">Renter</span>
            <span className="text-[13px] font-medium text-ink truncate block">
              {agreement.renter.name}
            </span>
          </div>
          <div>
            <span className="text-[12.5px] text-faint block">Property & Unit</span>
            <span className="text-[13px] font-medium text-ink truncate block">
              {agreement.property.name}, Unit {agreement.property.unitNumber}
            </span>
          </div>
          <div>
            <span className="text-[12.5px] text-faint block">Monthly Rent</span>
            <span className="text-[13px] font-medium text-ink">
              {formatCurrencyRwf(agreement.financials.monthlyRentRwf)}
            </span>
          </div>
          <div>
            <span className="text-[12.5px] text-faint block">Security Deposit</span>
            <span className="text-[13px] font-medium text-ink">
              {formatCurrencyRwf(agreement.financials.securityDepositRwf)}
            </span>
          </div>
          <div>
            <span className="text-[12.5px] text-faint block">Commencement</span>
            <span
              className={`text-[13px] font-medium ${commencement.isPending ? "text-amber-800 italic" : "text-ink"}`}
            >
              {commencement.display}
            </span>
          </div>
          <div>
            <span className="text-[12.5px] text-faint block">Duration</span>
            <span className="text-[13px] font-medium text-ink">
              {agreement.tenancyDurationMonths ?? 12} Months
            </span>
          </div>
        </div>
      </div>

      {/* Tenancy Configuration Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg border border-line bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5 bg-surface/40">
              <h3 className="text-sm font-semibold text-ink">
                Tenancy Configuration
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-faint hover:text-ink cursor-pointer p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-[12.5px]">
              {/* Contracting Parties */}
              <div className="space-y-2">
                <span className="font-semibold text-ink uppercase tracking-wider text-[12.5px] block">
                  Parties
                </span>
                <div className="grid grid-cols-2 gap-3 border border-line p-3 bg-surface/20">
                  <div>
                    <span className="text-faint block text-[12.5px]">Landlord</span>
                    <p className="font-medium text-ink text-[13px]">{agreement.landlord.name}</p>
                    <p className="text-faint font-mono text-[12.5px]">{agreement.landlord.phone}</p>
                    <p className="text-faint font-mono text-[12.5px]">ID: {agreement.landlord.nationalId}</p>
                  </div>
                  <div>
                    <span className="text-faint block text-[12.5px]">Renter</span>
                    <p className="font-medium text-ink text-[13px]">{agreement.renter.name}</p>
                    <p className="text-faint font-mono text-[12.5px]">{agreement.renter.phone}</p>
                    <p className="text-faint font-mono text-[12.5px]">ID: {agreement.renter.nationalId}</p>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-1">
                <span className="font-semibold text-ink uppercase tracking-wider text-[12.5px] block">
                  Premises
                </span>
                <div className="border border-line p-3 bg-surface/20 space-y-1">
                  <p className="font-medium text-ink text-[13px]">
                    {agreement.property.name} &middot; Unit {agreement.property.unitNumber}
                  </p>
                  <p className="text-faint">{agreement.property.address}, {agreement.property.district}</p>
                  <p className="text-faint">Type: {agreement.property.propertyType}</p>
                </div>
              </div>

              {/* Financial Terms */}
              <div className="space-y-1">
                <span className="font-semibold text-ink uppercase tracking-wider text-[12.5px] block">
                  Payment Schedule
                </span>
                <div className="border border-line p-3 bg-surface/20 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-faint block text-[12.5px]">Monthly Rent Due Date</span>
                    <span className="font-medium text-ink text-[13px]">
                      {dueDay}{dueSuffix} of each month
                      {dueDay >= 29 ? " (or month end)" : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-faint block text-[12.5px]">Advance Payment</span>
                    <span className="font-medium text-ink text-[13px]">
                      {agreement.financials.advanceMonths} Month(s) ({formatCurrencyRwf(agreement.financials.totalAdvanceRwf)})
                    </span>
                  </div>
                  <div>
                    <span className="text-faint block text-[12.5px]">Security Deposit</span>
                    <span className="font-medium text-ink text-[13px]">
                      {formatCurrencyRwf(agreement.financials.securityDepositRwf)}
                    </span>
                  </div>
                  <div>
                    <span className="text-faint block text-[12.5px]">Total Initial Due</span>
                    <span className="font-semibold text-ink text-[13px]">
                      {formatCurrencyRwf(agreement.financials.totalInitialAmountRwf)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[12.5px] text-faint italic">
                Note: Financial specifications are set during tenancy creation and cannot be modified inside the clause editor.
              </p>
            </div>

            <div className="border-t border-line px-5 py-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="rounded-none border-line text-[12.5px] font-medium h-8.5 px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
