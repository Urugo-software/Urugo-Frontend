import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function RenterMaintenanceSummaryCard({ count }: { count: number }) {
  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-faint">
          Maintenance
        </span>
        <StatusBadge
          label={count > 0 ? "Active" : "All Clear"}
          tone={count > 0 ? "info" : "success"}
        />
      </div>

      <div className="my-3.5">
        <div className="font-ibm text-2xl font-bold text-ink">
          {count} {count === 1 ? "Open Request" : "Open Requests"}
        </div>
        <p className="mt-1.5 text-xs text-body">
          {count > 0
            ? "Requests currently pending or in progress."
            : "No active maintenance issues reported."}
        </p>
      </div>

      <Link
        href="/renter/maintenance"
        className="flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand-blue hover:underline"
      >
        <span>Manage Requests</span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
