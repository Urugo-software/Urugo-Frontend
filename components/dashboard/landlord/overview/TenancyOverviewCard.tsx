import { TenancyOverview } from "@/types/landlord";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TenancyOverviewCardProps {
  overview: TenancyOverview;
}

export function TenancyOverviewCard({ overview }: TenancyOverviewCardProps) {
  const activePercent = Math.round((overview.active / overview.total) * 100);
  const endingPercent = Math.round((overview.endingSoon / overview.total) * 100);
  const closurePercent = Math.round((overview.pendingClosure / overview.total) * 100);

  return (
    <div className="border border-line bg-white p-6 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Tenancy Status Overview
          </h3>
          <span className="text-xs font-semibold text-ink bg-surface px-2.5 py-1 border border-line">
            {overview.total} Total Tenancies
          </span>
        </div>

        <p className="mt-1 text-sm text-body">
          Current distribution across all registered lease contracts.
        </p>

        {/* Multi-segment progress bar */}
        <div className="mt-5">
          <div className="flex h-3 w-full overflow-hidden border border-line/60 bg-surface">
            <div
              className="bg-emerald-600 transition-all duration-300"
              style={{ width: `${activePercent}%` }}
              title={`Active: ${overview.active}`}
            />
            <div
              className="bg-amber-500 transition-all duration-300"
              style={{ width: `${endingPercent}%` }}
              title={`Ending Soon: ${overview.endingSoon}`}
            />
            <div
              className="bg-blue-600 transition-all duration-300"
              style={{ width: `${closurePercent}%` }}
              title={`Pending Closure: ${overview.pendingClosure}`}
            />
          </div>
        </div>

        {/* Breakdown List */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-line/60 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 rounded-full bg-emerald-600" />
              <div>
                <span className="text-sm font-semibold text-ink block">Active Leases</span>
                <span className="text-xs text-faint">Healthy ongoing contracts</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-ink">{overview.active}</span>
              <span className="text-xs text-faint block">{activePercent}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-line/60 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 rounded-full bg-amber-500" />
              <div>
                <span className="text-sm font-semibold text-ink block">Ending Soon</span>
                <span className="text-xs text-faint">Leases expiring in &lt; 30 days</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-amber-700">{overview.endingSoon}</span>
              <span className="text-xs text-faint block">{endingPercent}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 rounded-full bg-blue-600" />
              <div>
                <span className="text-sm font-semibold text-ink block">Pending Closure</span>
                <span className="text-xs text-faint">Final checkout & meter review</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-blue-700">{overview.pendingClosure}</span>
              <span className="text-xs text-faint block">{closurePercent}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-line">
        <Link
          href="/landlord/tenancies"
          className="inline-flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-ink hover:text-brand transition-colors"
        >
          <span>Manage All Tenancies</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
