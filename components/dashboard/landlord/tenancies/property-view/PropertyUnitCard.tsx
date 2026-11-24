import Link from "next/link";
import { ArrowRight, BedDouble, Images, Phone, ShieldCheck, UserPlus } from "lucide-react";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { PropertyCover } from "@/components/dashboard/landlord/properties/PropertyCover";
import { cn } from "@/lib/utils";
import type { PropertyUnit } from "@/types/landlord";
import type { ResolvedPropertyDoor } from "@/utils/property-tenancies";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import {
  OccupancyBadge,
  PaymentStatusBadge,
  TenancyStatusBadge,
} from "../StatusBadges";

interface PropertyUnitCardProps {
  door: ResolvedPropertyDoor;
  propertyId: string;
  onManageUnit: (unit: PropertyUnit) => void;
  viewMode?: ViewMode;
}

function formatUnitTitle(unitNumber: string) {
  return /^(unit|studio|suite|house|room|apt)\b/i.test(unitNumber.trim())
    ? unitNumber
    : `Unit ${unitNumber}`;
}

export function PropertyUnitCard({
  door,
  propertyId,
  onManageUnit,
  viewMode = "grid",
}: PropertyUnitCardProps) {
  const { unit, renter } = door;
  const isOccupied = renter !== null;
  const isList = viewMode === "list";
  const photoCount = unit.images?.length ?? 0;
  const title = formatUnitTitle(unit.unitNumber);
  const specs = [
    unit.floor,
    unit.bedrooms ? `${unit.bedrooms} Bed` : null,
    unit.bathrooms ? `${unit.bathrooms} Bath` : null,
  ].filter(Boolean);

  return (
    <article
      className={cn(
        "flex overflow-hidden border border-line bg-white shadow-2xs",
        isList ? "flex-col md:flex-row" : "flex-col justify-between",
      )}
    >
      <button
        type="button"
        onClick={() => onManageUnit(unit)}
        aria-label={`View or update photos for ${title}`}
        className={cn(
          "group relative block shrink-0 cursor-pointer overflow-hidden bg-surface text-left",
          isList
            ? "h-40 w-full border-b border-line md:h-auto md:w-52 md:border-b-0 md:border-r"
            : "h-40 w-full border-b border-line",
        )}
      >
        <PropertyCover
          key={unit.images?.[0] ?? unit.id}
          src={unit.images?.[0]}
          className="h-full w-full transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 border border-line bg-white/95 px-2.5 py-0.5 text-[12.5px] font-semibold text-ink shadow-2xs">
          <Images aria-hidden="true" className="size-3.5 text-brand" />
          {photoCount > 0 ? `${photoCount} ${photoCount === 1 ? "photo" : "photos"}` : "Add photos"}
        </span>
      </button>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-between",
          isList && "md:flex-row md:items-center",
        )}
      >
        <div className={cn("min-w-0 flex-1 p-4 sm:p-5", isList && "md:py-4")}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                <h3 className="truncate text-lg font-bold text-ink">{title}</h3>
                {isOccupied ? (
                  <TenancyStatusBadge
                    status={renter.tenancyStatus}
                    label={renter.tenancyStatus === "Ending" ? "Ending Soon" : "Active"}
                  />
                ) : (
                  <OccupancyBadge status={unit.status} />
                )}
              </div>
              {specs.length > 0 && (
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-body">
                  <BedDouble aria-hidden="true" className="size-4 shrink-0 text-faint" />
                  <span>{specs.join(" · ")}</span>
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onManageUnit(unit)}
              className="shrink-0 cursor-pointer text-sm font-semibold text-body hover:text-brand hover:underline"
            >
              Edit unit
            </button>
          </div>

          <div className={cn("mt-4 border-t border-line pt-4", isList && "md:mt-3 md:pt-3")}>
            {isOccupied ? (
              <div className={cn("space-y-2", isList && "md:flex md:flex-wrap md:items-center md:justify-between md:gap-4 md:space-y-0")}>
                <div className="flex items-center justify-between gap-3 md:justify-start">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-sm font-bold text-ink">
                      {renter.name}
                    </span>
                    {renter.isIdentityVerified && (
                      <ShieldCheck
                        aria-label="Identity verified"
                        className="size-4 shrink-0 text-success"
                      />
                    )}
                  </div>
                  <PaymentStatusBadge status={renter.paymentStatus} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-body">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone aria-hidden="true" className="size-3.5 text-faint" />
                    {renter.phone}
                  </span>
                  <span>
                    Since <strong className="font-semibold text-ink">{renter.startDate}</strong>
                  </span>
                </div>
              </div>
            ) : (
              <p className="border border-dashed border-line bg-surface/50 px-3.5 py-3 text-sm text-body">
                {unit.status === "Maintenance"
                  ? "Under maintenance before next move-in."
                  : "Available for a monthly residential lease."}
              </p>
            )}
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-4 border-t border-line bg-surface/40 px-4 py-3.5 sm:px-5",
            isList &&
              "md:w-52 md:shrink-0 md:flex-col md:items-end md:justify-center md:gap-2.5 md:self-stretch md:border-l md:border-t-0",
          )}
        >
          <div className={isList ? "md:text-right" : undefined}>
            <span className="block text-[12.5px] font-medium text-faint">
              {isOccupied ? "Monthly Rent" : "Asking Rent"}
            </span>
            <span className="block font-ibm text-base font-bold text-brand">
              {formatCurrencyRwf(renter?.monthlyRentRwf ?? unit.monthlyRentRwf)}
            </span>
          </div>

          {isOccupied ? (
            <Link
              href={`/landlord/tenancies/${encodeURIComponent(renter.id)}?fromProperty=${encodeURIComponent(propertyId)}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              <span>Manage Lease</span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ) : (
            <Link
              href="/landlord/renters/add"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              <UserPlus aria-hidden="true" className="size-4" />
              <span>Assign Renter</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
