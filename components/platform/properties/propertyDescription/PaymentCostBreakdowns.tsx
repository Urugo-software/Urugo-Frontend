import { MoveInCost, RecurringCost } from "@/types/properties";

interface PaymentCostBreakdownProps {
  moveInCosts: MoveInCost[];
  recurringCosts: RecurringCost[];
}

export default function PaymentCostBreakdown({
  moveInCosts,
  recurringCosts,
}: PaymentCostBreakdownProps) {
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-RW").format(amount);

  const moveInTotal = moveInCosts.reduce((sum, cost) => sum + cost.amount, 0);

  const tenantMonthlyTotal = recurringCosts
    .filter((cost) => cost.payer === "TENANT")
    .reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <section>
      <h2 className="text-lg font-extrabold mb-6">Payment & Costs</h2>

      {/* Before moving in */}
      <div className="mb-7">
        <h3 className="text-sm font-bold text-gray-800 tracking-tight mb-3">
          Before moving in
        </h3>

        <div className="border border-line overflow-hidden">
          {moveInCosts.map((cost, index) => (
            <div
              key={`${cost.label}-${index}`}
              className="flex justify-between px-4.5 py-3.5 text-sm border-b border-line"
            >
              <span className="text-body">{cost.label}</span>

              <span className="font-mono font-semibold">
                {formatAmount(cost.amount)} RWF
              </span>
            </div>
          ))}

          <div className="flex justify-between px-4.5 py-3.5 text-sm bg-surface font-bold">
            <span className="text-ink">Estimated amount needed</span>

            <span className="font-mono">{formatAmount(moveInTotal)} RWF</span>
          </div>
        </div>
      </div>

      {/* Recurring costs */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 tracking-tight mb-3">
          Monthly costs
        </h3>

        <div className="border border-line overflow-hidden">
          {recurringCosts.map((cost, index) => (
            <div
              key={`${cost.label}-${index}`}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4.5 py-3.5 text-sm border-b border-line"
            >
              <span className="text-body">{cost.label}</span>

              <div className="grid tracking-tight font-medium text-[13px]  grid-cols-2">
                {cost.isEstimated ? (
                  <span className=" font-medium mr-2  text-gray-400 px-1.5 ">
                    Estimated
                  </span>
                ) : (
                  <span />
                )}

                <span
                  className={`
                   ${
                     cost.payer === "TENANT"
                       ? "text-brand-deep   ml-auto"
                       : "text-faint"
                   }
                 
                 bg-brand/8 rounded-full w-18 px-2 py-1  text-[12px] font-semibold flex justify-center items-center gap-1.5`}
                >
                  {cost.payer === "TENANT" ? "Tenant" : "Landlord"}
                </span>
              </div>
            </div>
          ))}

          <div className="px-4.5 py-4 bg-surface">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm tracking font-bold text-gray-800">
                  Estimated Monthly Tenant Payment
                </p>
              </div>

              <span className="font-mono font-bold">
                {formatAmount(tenantMonthlyTotal)} RWF
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-faint mt-3">
        Monthly costs are estimates and may vary depending on actual usage.
      </p>
    </section>
  );
}
