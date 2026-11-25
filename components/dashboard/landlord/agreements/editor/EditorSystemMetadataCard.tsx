"use client";

import { useState } from "react";
import { Agreement } from "@/types/agreement.types";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import {
  formatCommencementDisplay,
  getOrdinalSuffix,
} from "@/utils/rent-schedule-utils";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";

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
      <div className="border border-line bg-surface/30 px-4 py-3.5 text-[12.5px]">
        <div className="mb-2.5 flex items-center justify-between border-b border-line pb-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-ink">
            Tenancy Details
          </span>
          <div className="flex items-center gap-3">
            {onEditTenancy && (
              <button
                type="button"
                onClick={onEditTenancy}
                className="cursor-pointer text-[12.5px] font-semibold text-brand underline hover:text-ink"
              >
                Edit Tenancy Details
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex cursor-pointer items-center gap-1 text-[12.5px] font-medium text-faint underline hover:text-ink"
            >
              <span>View details</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <span className="block text-[12.5px] text-faint">Renter</span>
            <span className="block truncate text-[13px] font-medium text-ink">
              {agreement.renter.name}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">
              Property &amp; Unit
            </span>
            <span className="block truncate text-[13px] font-medium text-ink">
              {agreement.property.name}, Unit {agreement.property.unitNumber}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">Monthly Rent</span>
            <span className="text-[13px] font-medium text-ink">
              {formatCurrencyRwf(agreement.financials.monthlyRentRwf)}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">
              Security Deposit
            </span>
            <span className="text-[13px] font-medium text-ink">
              {formatCurrencyRwf(agreement.financials.securityDepositRwf)}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">Commencement</span>
            <span
              className={`text-[13px] font-medium ${commencement.isPending ? "italic text-amber-800" : "text-ink"}`}
            >
              {commencement.display}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">Duration</span>
            <span className="text-[13px] font-medium text-ink">
              {agreement.tenancyDurationMonths ?? 12} Months
            </span>
          </div>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tenancy Configuration"
        description={`Agreement ${agreement.referenceNumber}`}
        maxWidthClassName="max-w-lg"
        footer={
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="h-8.5 cursor-pointer rounded-none border-line px-4 text-[12.5px] font-medium"
          >
            Close
          </Button>
        }
      >
        <div className="space-y-4 text-[12.5px]">
          <div className="space-y-2">
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-ink">
              Parties
            </span>
            <div className="grid grid-cols-1 gap-3 border border-line bg-surface/20 p-3 sm:grid-cols-2">
              <div>
                <span className="block text-[12.5px] text-faint">Landlord</span>
                <p className="text-[13px] font-medium text-ink">
                  {agreement.landlord.name}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  {agreement.landlord.phone}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  ID: {agreement.landlord.nationalId}
                </p>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">Renter</span>
                <p className="text-[13px] font-medium text-ink">
                  {agreement.renter.name}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  {agreement.renter.phone}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  ID: {agreement.renter.nationalId}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-ink">
              Premises
            </span>
            <div className="space-y-1 border border-line bg-surface/20 p-3">
              <p className="text-[13px] font-medium text-ink">
                {agreement.property.name} &middot; Unit{" "}
                {agreement.property.unitNumber}
              </p>
              <p className="text-faint">
                {agreement.property.address}, {agreement.property.district}
              </p>
              <p className="text-faint">
                Type: {agreement.property.propertyType}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-ink">
              Payment Schedule
            </span>
            <div className="grid grid-cols-1 gap-2 border border-line bg-surface/20 p-3 sm:grid-cols-2">
              <div>
                <span className="block text-[12.5px] text-faint">
                  Monthly Rent Due Date
                </span>
                <span className="text-[13px] font-medium text-ink">
                  {dueDay}
                  {dueSuffix} of each month
                  {dueDay >= 29 ? " (or month end)" : ""}
                </span>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">
                  Advance Payment
                </span>
                <span className="text-[13px] font-medium text-ink">
                  {agreement.financials.advanceMonths} Month(s) (
                  {formatCurrencyRwf(agreement.financials.totalAdvanceRwf)})
                </span>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">
                  Security Deposit
                </span>
                <span className="text-[13px] font-medium text-ink">
                  {formatCurrencyRwf(agreement.financials.securityDepositRwf)}
                </span>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">
                  Total Initial Due
                </span>
                <span className="text-[13px] font-semibold text-ink">
                  {formatCurrencyRwf(
                    agreement.financials.totalInitialAmountRwf,
                  )}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[12.5px] italic text-faint">
            Note: Financial specifications are set during tenancy creation and
            cannot be modified inside the clause editor.
          </p>
        </div>
      </ModalDialog>
    </>
  );
}
