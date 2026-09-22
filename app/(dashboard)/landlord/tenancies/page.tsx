import Link from "next/link";
import { mockLandlordRenters } from "@/data/landlord-data";
import { ArrowRight } from "lucide-react";

export default function LandlordTenanciesPage() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-white p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Tenancy Management</h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-body">
          Manage active lease contracts, review rental obligations, and safely process end-of-tenancy closures.
        </p>
      </div>

      {/* Tenancy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockLandlordRenters.map((renter) => (
          <div
            key={renter.id}
            className="flex flex-col justify-between border border-line bg-white p-6 shadow-2xs"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
                    {renter.propertyName}
                  </span>
                  <h2 className="mt-1 text-base font-bold text-ink">Unit {renter.unitNumber}</h2>
                </div>
                <span
                  className={`shrink-0 px-2.5 py-1 text-xs font-semibold border ${
                    renter.tenancyStatus === "Active"
                      ? "bg-brand-tint text-brand border-blue-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {renter.tenancyStatus}
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-line">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink">{renter.name}</span>
                  <span className="text-xs font-medium text-faint">{renter.phone}</span>
                </div>
                <p className="mt-2 text-sm text-body">
                  Lease Started: <span className="font-semibold text-ink">{renter.startDate}</span>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
              <div>
                <span className="text-xs text-faint block">Monthly Rent</span>
                <span className="text-sm font-bold text-brand block">
                  {renter.monthlyRentRwf.toLocaleString()} RWF
                </span>
              </div>
              <Link
                href={`/landlord/tenancies/${renter.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
              >
                <span>Manage Tenancy</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
