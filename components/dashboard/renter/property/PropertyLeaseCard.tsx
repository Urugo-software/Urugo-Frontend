import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { RenterProperty } from "@/types/renter";
import { formatRwf } from "@/utils/format";
import CardHeader from "./CardHeader";

export function PropertyLeaseCard({ property }: { property: RenterProperty }) {
  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <CardHeader title="Lease Information" />
          <StatusBadge
            label={property.leaseStatus}
            tone={property.leaseStatus === "Active" ? "success" : "warning"}
          />
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="text-body">Monthly Rent</span>
            <span className="font-ibm font-bold text-ink">
              {formatRwf(property.monthlyRentRwf)}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-line pb-2.5">
            <span className="text-body">Move-in Date</span>
            <span className="font-semibold text-ink">{property.moveInDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body">Lease Term</span>
            <span className="font-semibold text-ink">
              {property.leaseEnd ?? "Open-ended monthly lease"}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/renter/lease"
        className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand-blue hover:underline"
      >
        <span>View Full Lease &amp; Agreement</span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
