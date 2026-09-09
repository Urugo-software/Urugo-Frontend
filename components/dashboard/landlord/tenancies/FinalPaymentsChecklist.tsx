"use client";

import { FinalChargeCheck } from "@/types/landlord";
import { Input } from "@/components/ui/input";

interface FinalPaymentsChecklistProps {
  charges: FinalChargeCheck[];
  onChargeChange: (
    type: FinalChargeCheck["chargeType"],
    status: FinalChargeCheck["status"],
    amount?: number
  ) => void;
}

export function FinalPaymentsChecklist({
  charges,
  onChargeChange,
}: FinalPaymentsChecklistProps) {
  return (
    <div className="border border-line bg-white shadow-2xs">
      <div className="border-b border-line px-5 py-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          Final Utility Obligations
        </h3>
        <p className="mt-1 text-sm text-body">
          Select the status for each utility bill at the end of this tenancy.
        </p>
      </div>

      <div className="divide-y divide-line">
        {charges.map((charge) => (
          <div key={charge.chargeType} className="px-5 py-5">
            <p className="text-sm font-semibold text-ink">{charge.chargeType} Bill</p>

            <div className="mt-3 flex flex-wrap items-center gap-6 text-sm">
              {(["Paid", "Not Paid", "Not Applicable"] as const).map((opt) => (
                <label key={opt} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name={`charge-${charge.chargeType}`}
                    checked={charge.status === opt}
                    onChange={() =>
                      onChargeChange(
                        charge.chargeType,
                        opt,
                        opt === "Not Paid" ? charge.remainingAmountRwf || 50000 : undefined
                      )
                    }
                    className="text-brand"
                  />
                  <span
                    className={
                      opt === "Not Paid"
                        ? "font-semibold text-amber-700"
                        : opt === "Paid"
                          ? "font-semibold text-brand"
                          : "text-faint"
                    }
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>

            {charge.status === "Not Paid" && (
              <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <p className="text-sm font-medium text-body">Remaining Owed (RWF):</p>
                <Input
                  type="number"
                  value={charge.remainingAmountRwf || 0}
                  onChange={(e) =>
                    onChargeChange(
                      charge.chargeType,
                      "Not Paid",
                      Math.max(0, Number(e.target.value))
                    )
                  }
                  className="h-9 max-w-[180px] text-sm font-semibold"
                  placeholder="50000"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
