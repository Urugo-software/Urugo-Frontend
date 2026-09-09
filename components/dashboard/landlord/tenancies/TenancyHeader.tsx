import { LandlordRenter } from "@/types/landlord";

interface TenancyHeaderProps {
  renter: LandlordRenter;
}

export function TenancyHeader({ renter }: TenancyHeaderProps) {
  return (
    <div className="border border-line bg-white p-6 shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand block">
            Tenancy Details
          </span>
          <h1 className="mt-1 text-xl sm:text-2xl font-bold text-ink">
            {renter.propertyName} &mdash; Unit {renter.unitNumber}
          </h1>
          <p className="mt-2 text-sm text-body">
            Tenant: <strong className="font-semibold text-ink">{renter.name}</strong> &middot;{" "}
            {renter.phone}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-xs font-semibold border ${
            renter.tenancyStatus === "Active"
              ? "bg-brand-tint text-brand border-blue-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
        >
          {renter.tenancyStatus} Tenancy
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-px bg-line border-t border-line sm:grid-cols-3">
        <div className="bg-white pt-5 pr-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
            Start Date
          </span>
          <span className="mt-2 text-sm font-semibold text-ink block">{renter.startDate}</span>
        </div>
        <div className="bg-white pt-5 px-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
            End Date
          </span>
          <span className="mt-2 text-sm font-medium text-faint block">No end date specified</span>
        </div>
        <div className="bg-white pt-5 pl-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
            Monthly Rent
          </span>
          <span className="mt-2 text-sm font-bold text-brand block">
            {renter.monthlyRentRwf.toLocaleString()} RWF
          </span>
        </div>
      </div>
    </div>
  );
}
