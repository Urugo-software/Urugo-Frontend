import { MoveInCost } from "@/types/properties";

interface MoveInCostProps {
  costs: MoveInCost[];
}

export default function MoveInCostBreakdown({ costs }: MoveInCostProps) {
  const total = costs.reduce((sum, cost) => sum + cost.amount, 0);

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-RW").format(amount);

  return (
    <section>
      <h2 className="text-lg font-extrabold mb-4">Move-in cost breakdown</h2>

      <div className="border border-line  overflow-hidden">
        {costs.map((cost, index) => (
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
          <span className="text-ink">Total to move in</span>

          <span className="font-mono">{formatAmount(total)} RWF</span>
        </div>
      </div>
    </section>
  );
}
