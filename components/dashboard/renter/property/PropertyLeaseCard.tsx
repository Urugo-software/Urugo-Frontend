import { RenterProperty } from "@/types/renter";
import CardHeader from "./CardHeader";

export function PropertyLeaseCard({ property }: { property: RenterProperty }) {
  return (
    <div className=" border border-line bg-white p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <CardHeader title="Lease Information" />

        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
          {property.leaseStatus}
        </span>
      </div>
      <div className="space-y-3 text-[12.5px]">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <span className="text-faint">Monthly Rent</span>
          <span className="font-bold text-ink">
            RWF {property.monthlyRentRwf.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-line pb-2">
          <span className="text-faint">Move-in Date</span>
          <span className="font-medium text-ink">{property.moveInDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-faint">Lease End Date</span>
          <span className="font-medium text-ink">{property.leaseEnd}</span>
        </div>
      </div>
    </div>
  );
}
