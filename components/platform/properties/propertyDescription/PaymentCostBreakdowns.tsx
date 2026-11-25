import type { MoveInCost, RecurringCost } from "@/types/properties";
import { formatRwf } from "@/utils/format";

interface PaymentCostBreakdownProps {
  moveInCosts: MoveInCost[];
  recurringCosts: RecurringCost[];
}

export default function PaymentCostBreakdown({
  moveInCosts,
  recurringCosts,
}: PaymentCostBreakdownProps) {
  const moveInTotal = moveInCosts.reduce((sum, cost) => sum + cost.amount, 0);

  const tenantMonthlyTotal = recurringCosts
    .filter((cost) => cost.payer === "TENANT")
    .reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <section>
      <h2 className="mb-6 text-lg font-extrabold text-ink">
        Payment &amp; Costs
      </h2>

      {/* Before moving in */}
      <div className="mb-7">
        <h3 className="mb-3 text-sm font-bold tracking-tight text-ink">
          Before moving in
        </h3>

        <div className="overflow-hidden border border-line">
          {moveInCosts.map((cost, index) => (
            <div
              key={`${cost.label}-${index}`}
              className="flex items-center justify-between gap-4 border-b border-line px-4.5 py-3.5 text-sm"
            >
              <span className="text-body">{cost.label}</span>
              <span className="shrink-0 font-mono font-semibold text-ink">
                {formatRwf(cost.amount)}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 bg-surface px-4.5 py-3.5 text-sm font-bold">
            <span className="text-ink">Estimated total to move in</span>
            <span className="shrink-0 font-mono text-ink">
              {formatRwf(moveInTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Recurring monthly costs */}
      <div>
        <h3 className="mb-3 text-sm font-bold tracking-tight text-ink">
          Monthly costs
        </h3>

        <div className="overflow-hidden border border-line">
          {recurringCosts.map((cost, index) => {
            const isTenant = cost.payer === "TENANT";
            const amountLabel =
              cost.amount === 0 && !isTenant
                ? "Included"
                : formatRwf(cost.amount);

            return (
              <div
                key={`${cost.label}-${index}`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4.5 py-3.5 text-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ink">{cost.label}</span>
                  {cost.isEstimated && (
                    <span className="text-xs text-faint">(Estimated)</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold ${
                      isTenant ? "text-brand-deep" : "text-faint"
                    }`}
                  >
                    {isTenant ? "Paid by renter" : "Paid by landlord"}
                  </span>
                  <span className="min-w-24 text-right font-mono font-semibold text-ink">
                    {amountLabel}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 bg-surface px-4.5 py-4 text-sm font-bold">
            <span className="text-ink">Estimated monthly renter total</span>
            <span className="shrink-0 font-mono text-ink">
              {formatRwf(tenantMonthlyTotal)}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-faint">
        Monthly estimates may vary depending on household usage and final lease
        terms agreed with the landlord.
      </p>
    </section>
  );
}
