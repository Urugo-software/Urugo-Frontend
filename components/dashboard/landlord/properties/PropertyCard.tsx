import Link from "next/link";
import { MapPin, ChevronRight, Layers } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { LandlordPropertyItem } from "@/types/landlord";
import Image from "next/image";

const statusStyles: Record<string, string> = {
  Occupied: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Partial: "bg-blue-50 text-blue-700 border-blue-200",
  Vacant: "bg-amber-50 text-amber-700 border-amber-200",
};

interface PropertyCardProps {
  property: LandlordPropertyItem;
}

export function PropertyCard({ property: prop }: PropertyCardProps) {
  const occupancyPct =
    prop.hasUnits &&
    typeof prop.occupiedUnits === "number" &&
    typeof prop.totalUnits === "number" &&
    prop.totalUnits > 0
      ? Math.round((prop.occupiedUnits / prop.totalUnits) * 100)
      : undefined;

  return (
    <div className="border border-line bg-white shadow-2xs flex flex-col justify-between hover:border-brand/40 transition-colors rounded-none">
      <div>
        {/* Header Image / Badge Banner */}
        <div className="relative h-44 bg-surface/80 border-b border-line overflow-hidden">
          {prop.image ? (
            <Image
              src={prop.image}
              alt={prop.name}
              fill
              className=" object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
          )}
          <div className="absolute top-3 right-3 z-20">
            <span
              className={`px-3 py-1 text-xs font-semibold border ${statusStyles[prop.status] ?? statusStyles.Vacant}`}
            >
              {prop.status}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-20">
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider block">
              {prop.type}
            </span>
            <h3 className="text-lg font-bold text-white truncate mt-0.5">
              {prop.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-2 text-[13px] text-body">
            <MapPin className="h-4 w-4 text-faint shrink-0 mt-0.5" />
            <span className="truncate">{prop.location}</span>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-line/60">
            {typeof occupancyPct === "number" && (
              <div className="p-3 border border-line/60 bg-surface/30">
                <span className="text-[11px] font-semibold text-faint uppercase block">
                  Units Occupied
                </span>
                <span className="text-base font-bold text-ink block mt-0.5">
                  {prop.occupiedUnits} / {prop.totalUnits}{" "}
                  <span className="text-xs font-normal text-faint">
                    ({occupancyPct}%)
                  </span>
                </span>
              </div>
            )}

            <div className="p-3 border border-line/60 bg-surface/30 ">
              <span className="text-[11px] font-semibold text-faint uppercase block">
                Monthly Revenue
              </span>
              <span className="text-base font-bold text-ink block mt-0.5">
                {prop.monthlyRevenueRwf.toLocaleString()}{" "}
                <span className="text-[11px] text-faint">RWF</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-surface/40 border-t border-line flex items-center justify-between gap-3">
        {prop.hasUnits ? (
          <Link
            href={`/landlord/tenancies?property=${prop.id}`}
            className="text-[13.5px] font-semibold text-brand hover:underline flex items-center gap-1"
          >
            <Layers className="h-3.5 w-3.5" />
            View Units & Leases
          </Link>
        ) : (
          <Link
            href={`/landlord/tenancies?property=${prop.id}`}
            className="text-[13.5px] font-semibold text-brand hover:underline flex items-center gap-1"
          >
            <Layers className="h-3.5 w-3.5" />
            View Lease
          </Link>
        )}

        <CustomButton
          title="Manage"
          variant="light"
          className="h-8 text-xs rounded-none"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </CustomButton>
      </div>
    </div>
  );
}
