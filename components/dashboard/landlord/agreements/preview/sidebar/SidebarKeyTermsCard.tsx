"use client";

import { AgreementFinancials } from "@/types/agreement.types";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import {
  formatCommencementDisplay,
  getOrdinalSuffix,
} from "@/utils/rent-schedule-utils";

interface Props {
  financials: AgreementFinancials;
  tenancyStartDate: string;
  tenancyDurationMonths?: number;
}

export function SidebarKeyTermsCard({
  financials,
  tenancyStartDate,
  tenancyDurationMonths,
}: Props) {
  const commencement = formatCommencementDisplay({
    startDate: tenancyStartDate,
  });
  const dueDay = financials.paymentDueDay || 1;
  const dueSuffix = getOrdinalSuffix(dueDay);

  return (
    <div className="border border-line bg-white p-5 space-y-3.5 text-[12.5px]">
      <h3 className="font-semibold uppercase tracking-wider text-faint border-b border-line pb-2.5">
        Key Tenancy Terms
      </h3>

      <div className="grid grid-cols-2 gap-3 text-[13px]">
        <div>
          <span className="text-[12.5px] text-faint block">Monthly Rent</span>
          <span className="font-bold text-ink text-[14px]">
            {formatCurrencyRwf(financials.monthlyRentRwf)}
          </span>
        </div>

        <div>
          <span className="text-[12.5px] text-faint block">Security Deposit</span>
          <span className="font-semibold text-ink text-[13.5px]">
            {formatCurrencyRwf(financials.securityDepositRwf)}
          </span>
        </div>

        <div>
          <span className="text-[12.5px] text-faint block">Monthly Rent Due</span>
          <span className="font-medium text-ink">
            {dueDay}{dueSuffix} of each month
            {dueDay >= 29 ? " (or month end)" : ""}
          </span>
        </div>

        <div>
          <span className="text-[12.5px] text-faint block">Advance Rent</span>
          <span className="font-medium text-ink">
            {financials.advanceMonths} month(s)
          </span>
        </div>

        <div>
          <span className="text-[12.5px] text-faint block">Commencement</span>
          <span
            className={`font-medium ${commencement.isPending ? "text-amber-800 italic" : "text-ink"}`}
          >
            {commencement.display}
          </span>
        </div>

        <div>
          <span className="text-[12.5px] text-faint block">Duration</span>
          <span className="font-medium text-ink">
            {tenancyDurationMonths ?? 12} Months
          </span>
        </div>
      </div>
    </div>
  );
}
