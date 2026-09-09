import { LandlordRenter } from "@/types/landlord";

interface RenterDetailHeaderProps {
  renter: LandlordRenter;
}

export function RenterDetailHeader({ renter }: RenterDetailHeaderProps) {
  return (
    <div className="border border-line bg-white p-6 shadow-2xs space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-ink">{renter.name}</h1>
            {renter.isIdentityVerified && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-brand-tint text-brand border border-blue-200">
                Identity Verified
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-body">Phone: {renter.phone}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="border border-line bg-surface/50 px-4 py-2.5 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
              Tenancy Status
            </span>
            <span className="mt-0.5 text-sm font-bold text-ink block">{renter.tenancyStatus}</span>
          </div>
          <div className="border border-line bg-surface/50 px-4 py-2.5 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
              Monthly Rent
            </span>
            <span className="mt-0.5 text-sm font-bold text-brand block">
              {renter.monthlyRentRwf.toLocaleString()} RWF
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-line/60 flex flex-wrap gap-6 text-sm text-body">
        <div>
          Property: <strong className="font-semibold text-ink">{renter.propertyName} · Unit {renter.unitNumber}</strong>
        </div>
        <div>
          Started: <strong className="font-semibold text-ink">{renter.startDate}</strong>
        </div>
        <div>
          Payment Status: <strong className="font-semibold text-ink">{renter.paymentStatus}</strong>
        </div>
      </div>
    </div>
  );
}
