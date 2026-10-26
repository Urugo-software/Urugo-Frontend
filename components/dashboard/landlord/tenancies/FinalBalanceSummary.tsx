"use client";

import { FinalChargeCheck } from "@/types/landlord";
import { Button } from "@/components/ui/button";

interface FinalBalanceSummaryProps {
  charges: FinalChargeCheck[];
  totalOwed: number;
  onBack: () => void;
  onSubmit: () => void;
}

export function FinalBalanceSummary({
  charges,
  totalOwed,
  onBack,
  onSubmit,
}: FinalBalanceSummaryProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-line bg-white shadow-2xs">
        <div className="border-b border-line px-5 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Final Tenancy Balance Summary
          </h3>
        </div>
        <div className="divide-y divide-line">
          <div className="flex justify-between px-5 py-4 text-sm">
            <span className="text-body font-medium">Rent Payments</span>
            <span className="font-semibold text-brand">Cleared</span>
          </div>
          {charges.map((c) => (
            <div
              key={c.chargeType}
              className="flex justify-between px-5 py-4 text-sm"
            >
              <span className="text-body font-medium">
                {c.chargeType} Utility
              </span>
              <span className="font-semibold text-ink">
                {c.status === "Paid"
                  ? "Paid"
                  : c.status === "Not Paid"
                    ? `${c.remainingAmountRwf?.toLocaleString()} RWF`
                    : "Not Applicable"}
              </span>
            </div>
          ))}
          <div className="flex justify-between px-5 py-4 text-sm font-bold">
            <span className="text-ink">Total Remaining Obligation</span>
            <span className={totalOwed > 0 ? "text-amber-700" : "text-brand"}>
              {totalOwed.toLocaleString()} RWF
            </span>
          </div>
        </div>
      </div>

      <div className="border border-line bg-surface p-4 shadow-2xs">
        <p className="text-sm text-body">
          <strong className="font-semibold text-ink">
            Renter Notice Policy:
          </strong>{" "}
          The renter will receive a notification regarding this final accounting
          and is granted 3 days to pay or dispute before any record is
          officially logged.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button
          className="rounded-none cursor-pointer"
          variant="outline"
          onClick={onBack}
        >
          &larr; Back
        </Button>
        <Button
          onClick={onSubmit}
          className="rounded-none cursor-pointer bg-brand text-white hover:bg-brand-deep"
        >
          Submit Tenancy Record
        </Button>
      </div>
    </div>
  );
}
