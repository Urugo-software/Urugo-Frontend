import { Building2, CheckCircle2, DoorOpen, Wallet } from "lucide-react";
import { formatCurrencyRwf } from "@/utils/agreement-utils";

interface GroupSummaryStatsProps {
  propertyCount: number;
  totalUnits?: number;
  occupiedUnits?: number;
  expectedRentRwf?: number;
  collectedRentRwf?: number;
}

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "default" | "success";
  progressPercent?: number;
}

function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  accent = "default",
  progressPercent,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-faint">
          {label}
        </span>
        <Icon className="size-4 shrink-0 text-faint" />
      </div>

      <div className="mt-2.5 space-y-1">
        <p
          className={`font-ibm text-xl font-bold tracking-tight sm:text-2xl ${
            accent === "success" ? "text-emerald-700" : "text-ink"
          }`}
        >
          {value}
        </p>
        <p className="text-xs text-body">{helper}</p>
      </div>

      {progressPercent !== undefined && (
        <div
          aria-hidden="true"
          className="mt-3 h-1.5 w-full overflow-hidden bg-surface"
        >
          <div
            className={`h-full transition-all ${
              accent === "success" ? "bg-emerald-600" : "bg-brand"
            }`}
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function GroupSummaryStats({
  propertyCount,
  totalUnits,
  occupiedUnits,
  expectedRentRwf,
  collectedRentRwf,
}: GroupSummaryStatsProps) {
  const hasUnits =
    totalUnits !== undefined && occupiedUnits !== undefined && totalUnits > 0;
  const occupancyPercent = hasUnits
    ? Math.round((occupiedUnits / totalUnits) * 100)
    : undefined;

  const collectionPercent =
    expectedRentRwf !== undefined &&
    collectedRentRwf !== undefined &&
    expectedRentRwf > 0
      ? Math.round((collectedRentRwf / expectedRentRwf) * 100)
      : undefined;

  return (
    <section
      aria-label="Group summary metrics"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4"
    >
      <StatCard
        label="Properties"
        value={String(propertyCount)}
        helper={propertyCount === 1 ? "Property in group" : "Properties in group"}
        icon={Building2}
      />

      {hasUnits && (
        <StatCard
          label="Units Occupied"
          value={`${occupiedUnits} / ${totalUnits}`}
          helper={`${occupancyPercent}% occupancy rate`}
          icon={DoorOpen}
          progressPercent={occupancyPercent}
        />
      )}

      {expectedRentRwf !== undefined && (
        <StatCard
          label="Expected Rent"
          value={formatCurrencyRwf(expectedRentRwf)}
          helper="Monthly projected"
          icon={Wallet}
        />
      )}

      {collectedRentRwf !== undefined && (
        <StatCard
          label="Rent Collected"
          value={formatCurrencyRwf(collectedRentRwf)}
          helper={
            collectionPercent !== undefined
              ? `${collectionPercent}% collected this month`
              : "Collected this month"
          }
          icon={CheckCircle2}
          accent="success"
          progressPercent={collectionPercent}
        />
      )}
    </section>
  );
}
