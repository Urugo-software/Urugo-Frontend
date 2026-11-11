"use client";

import { AgreementFinancials } from "@/types/agreement.types";
import { formatCurrencyRwf, formatDate } from "@/utils/agreement-utils";

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
          <span className="text-[12.5px] text-faint block">Payment Due</span>
          <span className="font-medium text-ink">
            {financials.paymentDueDay}th of each month
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
          <span className="font-medium text-ink">
            {formatDate(tenancyStartDate)}
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
