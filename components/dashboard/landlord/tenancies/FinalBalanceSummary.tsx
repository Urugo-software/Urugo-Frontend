"use client";

import { Button } from "@/components/ui/button";
import { formatCurrencyRwf } from "@/utils/agreement-utils";

interface FinalBalanceSummaryProps {
  approvedCount: number;
  unpaidRentRwf: number;
  onBack: () => void;
  onSubmit: () => void;
}

export function FinalBalanceSummary({
  approvedCount,
  unpaidRentRwf,
  onBack,
  onSubmit,
}: FinalBalanceSummaryProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-line bg-white shadow-2xs">
        <div className="border-b border-line px-5 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Final Rent Summary
          </h3>
        </div>
        <div className="divide-y divide-line">
          <div className="flex justify-between px-5 py-4 text-sm">
            <span className="font-medium text-body">Approved Rent Payments</span>
            <span className="font-semibold text-ink">
              {approvedCount} {approvedCount === 1 ? "payment" : "payments"}
            </span>
          </div>
          <div className="flex justify-between px-5 py-4 text-sm">
            <span className="font-medium text-body">Rent Account Status</span>
            <span
              className={
                unpaidRentRwf > 0
                  ? "font-semibold text-amber-700"
                  : "font-semibold text-emerald-700"
              }
            >
              {unpaidRentRwf > 0 ? "Unpaid Balance" : "Cleared"}
            </span>
          </div>
          <div className="flex justify-between px-5 py-4 text-sm font-bold">
            <span className="text-ink">Remaining Rent Balance</span>
            <span
              className={`font-ibm ${
                unpaidRentRwf > 0 ? "text-amber-700" : "text-brand"
              }`}
            >
              {formatCurrencyRwf(unpaidRentRwf)}
            </span>
          </div>
        </div>
      </div>

      <div className="border border-line bg-surface p-4 shadow-2xs">
        <p className="text-sm text-body">
          <strong className="font-semibold text-ink">Renter Notice Policy:</strong>{" "}
          The renter will receive a notification regarding this final rent summary
          and has 3 days to settle or dispute before the tenancy record closes.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button
          className="cursor-pointer rounded-none"
          variant="outline"
          onClick={onBack}
        >
          &larr; Back
        </Button>
        <Button
          onClick={onSubmit}
          className="cursor-pointer rounded-none bg-brand text-white hover:bg-brand-deep"
        >
          Submit Tenancy Record
        </Button>
      </div>
    </div>
  );
}
