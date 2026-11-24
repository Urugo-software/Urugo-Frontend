import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { PropertyCover } from "@/components/dashboard/landlord/properties/PropertyCover";
import { cn } from "@/lib/utils";
import type { LandlordPropertyItem, LandlordRenter } from "@/types/landlord";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import { PaymentStatusBadge, TenancyStatusBadge } from "./StatusBadges";

interface TenancyListCardProps {
  renter: LandlordRenter;
  property?: LandlordPropertyItem;
  viewMode?: ViewMode;
}

export function TenancyListCard({
  renter,
  property,
  viewMode = "grid",
}: TenancyListCardProps) {
  const isList = viewMode === "list";
  const propertyName = property?.name ?? renter.propertyName;
  const heading =
    property && !property.hasUnits ? propertyName : `Unit ${renter.unitNumber}`;

  return (
    <article
      className={cn(
        "flex overflow-hidden border border-line bg-white shadow-2xs",
        isList ? "flex-col md:flex-row" : "flex-col justify-between",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 bg-surface",
          isList
            ? "h-36 w-full border-b border-line md:h-auto md:w-52 md:border-b-0 md:border-r"
            : "h-36 w-full border-b border-line",
        )}
      >
        <PropertyCover
          key={property?.image ?? renter.id}
          src={property?.image}
          className="h-full w-full"
        />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-between",
          isList && "md:flex-row md:items-center",
        )}
      >
        <div className={cn("min-w-0 flex-1 p-5", isList && "md:py-4")}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              {property?.hasUnits && (
                <Link
                  href={`/landlord/tenancies?property=${encodeURIComponent(property.id)}`}
                  className="block truncate text-[12.5px] font-semibold uppercase tracking-wider text-faint hover:text-brand hover:underline"
                >
                  {propertyName}
                </Link>
              )}
              <h2 className="mt-0.5 text-base font-bold text-ink">
                {property && !property.hasUnits ? (
                  <Link
                    href={`/landlord/tenancies?property=${encodeURIComponent(property.id)}`}
                    className="hover:text-brand hover:underline"
                  >
                    {heading}
                  </Link>
                ) : (
                  heading
                )}
              </h2>
              {property?.location && (
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-body">
                  <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-faint" />
                  <span className="truncate">{property.location}</span>
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <TenancyStatusBadge status={renter.tenancyStatus} />
              <span aria-hidden="true" className="text-line">|</span>
              <PaymentStatusBadge status={renter.paymentStatus} />
            </div>
          </div>

          <div
            className={cn(
              "mt-4 border-t border-line pt-4",
              isList && "md:mt-3 md:flex md:flex-wrap md:items-center md:gap-x-6 md:gap-y-1 md:pt-3",
            )}
          >
            <div className="flex items-center justify-between gap-3 md:justify-start">
              <span className="truncate text-sm font-bold text-ink">
                {renter.name}
              </span>
              <span className="shrink-0 text-sm text-body">{renter.phone}</span>
            </div>
            <p className={cn("mt-1.5 text-sm text-body", isList && "md:mt-0")}>
              Started{" "}
              <strong className="font-semibold text-ink">{renter.startDate}</strong>
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-4 border-t border-line bg-surface/40 px-5 py-3.5",
            isList &&
              "md:w-52 md:shrink-0 md:flex-col md:items-end md:justify-center md:gap-2.5 md:self-stretch md:border-l md:border-t-0",
          )}
        >
          <div className={isList ? "md:text-right" : undefined}>
            <span className="block text-[12.5px] font-medium text-faint">
              Monthly Rent
            </span>
            <span className="block font-ibm text-base font-bold text-brand">
              {formatCurrencyRwf(renter.monthlyRentRwf)}
            </span>
          </div>
          <Link
            href={`/landlord/tenancies/${encodeURIComponent(renter.id)}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            <span>Manage Tenancy</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
