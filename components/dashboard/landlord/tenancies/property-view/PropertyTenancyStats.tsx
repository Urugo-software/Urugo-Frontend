import { AlertCircle, DoorOpen, Wallet } from "lucide-react";
import type { PropertyTenancySummary } from "@/utils/property-tenancies";
import { formatCurrencyRwf } from "@/utils/agreement-utils";

interface PropertyTenancyStatsProps {
  summary: PropertyTenancySummary;
}

export function PropertyTenancyStats({ summary }: PropertyTenancyStatsProps) {
  const occupancyPercent =
    summary.totalUnits > 0
      ? Math.round((summary.occupiedUnits / summary.totalUnits) * 100)
      : 0;

  return (
    <section
      aria-label="Building summary metrics"
      className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
    >
      <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
            Occupancy
          </span>
          <DoorOpen className="size-4 shrink-0 text-faint" />
        </div>
        <div className="mt-2.5 space-y-1">
          <p className="font-ibm text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {summary.occupiedUnits} / {summary.totalUnits} Units
          </p>
          <p className="text-sm text-body">
            {summary.vacantUnits === 0
              ? `${occupancyPercent}% · Fully occupied`
              : `${occupancyPercent}% · ${summary.vacantUnits} ${summary.vacantUnits === 1 ? "unit" : "units"} vacant`}
          </p>
        </div>
        <div aria-hidden="true" className="mt-3 h-1.5 w-full overflow-hidden bg-surface">
          <div
            className="h-full bg-brand transition-all"
            style={{ width: `${Math.min(100, Math.max(0, occupancyPercent))}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
            Monthly Rent
          </span>
          <Wallet className="size-4 shrink-0 text-faint" />
        </div>
        <div className="mt-2.5 space-y-1">
          <p className="font-ibm text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {formatCurrencyRwf(summary.monthlyRentRwf)}
          </p>
          <p className="text-sm text-body">From active unit leases</p>
        </div>
      </div>

      <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
            Needs Attention
          </span>
          <AlertCircle className="size-4 shrink-0 text-faint" />
        </div>
        <div className="mt-2.5 space-y-1">
          <p
            className={`font-ibm text-xl font-bold tracking-tight sm:text-2xl ${
              summary.attentionCount > 0 ? "text-amber-700" : "text-emerald-700"
            }`}
          >
            {summary.attentionCount}
          </p>
          <p className="text-sm text-body">
            {summary.attentionCount === 0
              ? "All leases in good standing"
              : "Pending, overdue, or ending leases"}
          </p>
        </div>
      </div>
    </section>
  );
}
