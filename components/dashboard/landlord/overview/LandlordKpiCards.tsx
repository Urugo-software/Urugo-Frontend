import { Users, Clock } from "lucide-react";
import { LandlordMetric } from "@/types/landlord";

interface LandlordKpiCardsProps {
  metrics: LandlordMetric;
}

export function LandlordKpiCards({ metrics }: LandlordKpiCardsProps) {
  return (
    <div className="flex flex-col justify-between  gap-5 h-full">
      {/* 1. Total Active Renters */}
      <div className="border border-line bg-white p-6 sm:p-7 shadow-2xs flex-1 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
            Total Active Renters
          </span>
          <span className="mt-2 text-3xl sm:text-4xl font-bold text-ink block">
            {metrics.activeRentersCount}
          </span>
          <span className="mt-1.5 text-sm font-medium text-body block">
            Active verified leases
          </span>
        </div>
      </div>

      {/* 2. Tenancies Ending Soon */}
      <div className="border border-line bg-white p-6 sm:p-7 shadow-2xs flex-1 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
            Ending Soon (&lt;30 Days)
          </span>
          <span className="mt-2 text-3xl sm:text-4xl font-bold text-ink block">
            {metrics.tenanciesEndingSoonCount}
          </span>
          <span className="mt-1.5 text-sm font-medium text-body block">
            Requires checkout review
          </span>
        </div>
      </div>
    </div>
  );
}
