import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { LandlordRenter } from "@/types/landlord";

interface UpcomingRentCollectionCardProps {
  renters: LandlordRenter[];
}

export function UpcomingRentCollectionCard({
  renters,
}: UpcomingRentCollectionCardProps) {
  const getStatusBadge = (status: LandlordRenter["paymentStatus"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Overdue":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Paid":
      default:
        return "bg-brand-tint text-brand border-blue-200";
    }
  };

  return (
    <div className=" border border-line bg-white p-6 sm:p-7 shadow-2xs flex flex-col justify-between h-full space-y-4">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Rent Collection Status
          </h3>
          <div className="flex items-center gap-1 text-faint">
            <button
              className="p-1.5 hover:text-ink transition-colors"
              title="Previous period"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className="p-1.5 hover:text-ink transition-colors"
              title="Next period"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-1 text-sm font-semibold text-ink">
          Today, 10 September
        </p>

        {/* Payments List */}
        <div className="mt-4 space-y-3">
          {renters.slice(0, 3).map((renter) => (
            <div
              key={renter.id}
              className="flex items-center justify-between p-3.5 border border-line/60 bg-surface/50 gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-brand-tint text-brand font-bold text-xs border border-blue-200">
                  {renter.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-ink truncate block">
                    {renter.name}
                  </span>
                  <span className="text-xs text-body truncate block mt-0.5">
                    {renter.propertyName} · {renter.unitNumber}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-ink block">
                  {renter.monthlyRentRwf.toLocaleString()} RWF
                </span>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold border ${getStatusBadge(
                    renter.paymentStatus,
                  )}`}
                >
                  {renter.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-line/60">
        <Link
          href="/landlord/renters"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <span>View All Renters</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
