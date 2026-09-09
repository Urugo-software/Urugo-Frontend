import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RenterMaintenanceSummaryCard({ count }: { count: number }) {
  return (
    <div className="flex flex-col justify-between  border border-line bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-faint uppercase tracking-wider">
          Maintenance Requests
        </span>
      </div>
      <div className="my-3">
        <div className="text-2xl font-bold text-ink">{count} Active</div>
        <p className="text-[12.5px] mt-2 text-body ">
          {count > 0
            ? "Requests currently being processed"
            : "No active maintenance issues"}
        </p>
      </div>
      <Link
        href="/renter/maintenance"
        className="flex items-center duration-300 justify-between pt-2 text-[12px] hover:font-semibold text-gray-400 hover:text-brand hover:underline"
      >
        <span>Manage Requests</span>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
