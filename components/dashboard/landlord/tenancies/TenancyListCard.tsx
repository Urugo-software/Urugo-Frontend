import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PropertyCover } from "@/components/dashboard/landlord/properties/PropertyCover";
import type { LandlordPropertyItem, LandlordRenter } from "@/types/landlord";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import { PaymentStatusBadge, TenancyStatusBadge } from "./StatusBadges";

interface TenancyListCardProps {
  renter: LandlordRenter;
  property?: LandlordPropertyItem;
}

export function TenancyListCard({ renter, property }: TenancyListCardProps) {
  const propertyName = property?.name ?? renter.propertyName;
  const heading = property && !property.hasUnits ? propertyName : `Unit ${renter.unitNumber}`;

  return (
    <article className="flex flex-col justify-between overflow-hidden border border-line bg-white shadow-2xs">
      <div>
        <div className="relative h-36 w-full border-b border-line bg-surface">
          <PropertyCover
            key={property?.image ?? renter.id}
            src={property?.image}
            className="h-full w-full"
          />
          <div className="absolute right-3 top-3 shadow-2xs">
            <TenancyStatusBadge status={renter.tenancyStatus} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {property && property.hasUnits && (
                <Link
                  href={`/landlord/tenancies?property=${encodeURIComponent(property.id)}`}
                  className="block truncate text-xs font-semibold uppercase tracking-wider text-faint hover:text-brand hover:underline"
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
            <PaymentStatusBadge status={renter.paymentStatus} />
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold text-ink">{renter.name}</span>
              <span className="shrink-0 text-sm font-medium text-body">{renter.phone}</span>
            </div>
            <p className="mt-1.5 text-sm text-body">
              Lease started{" "}
              <strong className="font-semibold text-ink">{renter.startDate}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line bg-surface/40 px-5 py-3.5">
        <div>
          <span className="block text-[12.5px] font-medium text-faint">Monthly Rent</span>
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
    </article>
  );
}
