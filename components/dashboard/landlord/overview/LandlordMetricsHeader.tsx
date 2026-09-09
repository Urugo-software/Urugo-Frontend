import { LandlordMetric } from "@/types/landlord";
import { Users, CheckCircle2, AlertCircle, ShieldAlert, CalendarClock } from "lucide-react";

interface LandlordMetricsHeaderProps {
  metrics: LandlordMetric;
}

export function LandlordMetricsHeader({ metrics }: LandlordMetricsHeaderProps) {
  const collectionPercentage = Math.round(
    (metrics.currentMonthRentCollectedRwf / metrics.targetMonthRentRwf) * 100
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Active Renters */}
      <div className="border border-line bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-faint">
            <span>Active Renters</span>
            <Users className="h-4 w-4 text-faint" />
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold text-ink">
            {metrics.activeRentersCount}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[13px] text-body">
          <span className="inline-flex items-center gap-1.5 text-success font-medium">
            <span className="h-2 w-2 rounded-full bg-success" /> Active Leases
          </span>
          <span className="text-faint font-semibold">{metrics.activeRentersCount} units</span>
        </div>
      </div>

      {/* 2. Current Month Rent Collected */}
      <div className="border border-line bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-faint">
            <span>Rent Collected</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <div className="mt-3 text-xl sm:text-2xl font-bold text-ink">
            {metrics.currentMonthRentCollectedRwf.toLocaleString()} <span className="text-xs font-semibold text-faint">RWF</span>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-[12.5px]">
            <span className="text-body font-medium">{collectionPercentage}% collected</span>
            <span className="text-faint font-medium">Target: {(metrics.targetMonthRentRwf / 1000000).toFixed(1)}M</span>
          </div>
          <div className="h-1.5 w-full bg-surface overflow-hidden border border-line/40">
            <div
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${Math.min(collectionPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Remaining Rent Balance */}
      <div className="border border-line bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-faint">
            <span>Remaining Balance</span>
            <AlertCircle className="h-4 w-4 text-brand" />
          </div>
          <div className="mt-3 text-xl sm:text-2xl font-bold text-ink">
            {metrics.remainingRentBalanceRwf.toLocaleString()} <span className="text-xs font-semibold text-faint">RWF</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[13px] text-body">
          <span className="text-brand font-medium">
            {metrics.pendingPaymentsCount} pending review
          </span>
          <span className="text-faint font-semibold">Due this mo</span>
        </div>
      </div>

      {/* 4. Active Disputes */}
      <div className="border border-line bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-faint">
            <span>Active Disputes</span>
            <ShieldAlert className={`h-4 w-4 ${metrics.activeDisputesCount > 0 ? "text-warn" : "text-faint"}`} />
          </div>
          <div className={`mt-3 text-2xl sm:text-3xl font-bold ${metrics.activeDisputesCount > 0 ? "text-warn" : "text-ink"}`}>
            {metrics.activeDisputesCount}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[13px] text-body">
          {metrics.activeDisputesCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-warn font-medium">
              <span className="h-2 w-2 rounded-full bg-warn animate-pulse" /> Needs resolution
            </span>
          ) : (
            <span className="text-faint font-medium">All clear</span>
          )}
          <span className="text-faint font-semibold">Rental issues</span>
        </div>
      </div>

      {/* 5. Tenancies Ending Soon */}
      <div className="border border-line bg-white p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-faint">
            <span>Ending Soon</span>
            <CalendarClock className="h-4 w-4 text-faint" />
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold text-ink">
            {metrics.tenanciesEndingSoonCount}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-[13px] text-body">
          <span className="text-body font-medium">Leases in 30 days</span>
          <span className="text-faint font-semibold">Actions pending</span>
        </div>
      </div>
    </div>
  );
}
