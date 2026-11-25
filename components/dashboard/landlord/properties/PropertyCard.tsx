"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Layers, Pencil } from "lucide-react";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordPropertyItem, ListingStatus } from "@/types/landlord";
import { formatPropertyRent, formatRwf } from "@/utils/format";
import { PortfolioCard, type ViewMode } from "./PortfolioCard";

const LISTING_TONE: Record<ListingStatus, StatusTone> = {
  Published: "success",
  Draft: "neutral",
  Paused: "warning",
  Rented: "info",
  Archived: "neutral",
};

const OCCUPANCY_TONE: Record<
  NonNullable<LandlordPropertyItem["status"]>,
  StatusTone
> = {
  Occupied: "success",
  Partial: "info",
  Vacant: "warning",
};

export function PropertyCard({
  property,
  viewMode = "grid",
  membershipActions,
}: {
  property: LandlordPropertyItem;
  viewMode?: ViewMode;
  membershipActions?: ReactNode;
}) {
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const { id, name, type, location, image, status, hasUnits, totalUnits, occupiedUnits } =
    property;
  const listingStatus: ListingStatus =
    property.listingStatus ?? (status === "Occupied" ? "Rented" : "Published");
  const monthlyRent = formatPropertyRent(property);

  return (
    <PortfolioCard
      name={name}
      location={location}
      cover={image}
      mode={viewMode}
      menuId={`property-menu-${id}`}
      action={
        <Link
          href={`/landlord/properties/${encodeURIComponent(id)}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand-blue hover:underline"
        >
          <span>View Property</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      }
      menu={
        <>
          <DropdownMenuItem
            render={
              <Link
                href={`/landlord/properties/${encodeURIComponent(id)}/edit`}
              />
            }
          >
            <Pencil aria-hidden="true" /> Edit Property
          </DropdownMenuItem>
          {serviceMode === "managed" && (
            <DropdownMenuItem
              render={
                <Link
                  href={`/landlord/tenancies?property=${encodeURIComponent(id)}`}
                />
              }
            >
              <Layers aria-hidden="true" />{" "}
              {hasUnits ? "Units & Leases" : "Manage Lease"}
            </DropdownMenuItem>
          )}
          {membershipActions}
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
        <span className="tracking-wide text-body">{type}</span>
        <span aria-hidden="true" className="text-line">&middot;</span>
        <StatusBadge
          label={listingStatus}
          tone={LISTING_TONE[listingStatus]}
        />
        {serviceMode === "managed" && status && (
          <>
            <span aria-hidden="true" className="text-line">&middot;</span>
            <StatusBadge label={status} tone={OCCUPANCY_TONE[status]} />
          </>
        )}
      </div>

      <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {monthlyRent !== undefined && (
          <div>
            <dt className="text-xs text-faint">
              {hasUnits ? "Expected monthly rent" : "Monthly rent"}
            </dt>
            <dd className="font-ibm font-semibold text-ink">
              {formatRwf(monthlyRent)}
            </dd>
          </div>
        )}
        {hasUnits && totalUnits !== undefined && (
          <div>
            <dt className="text-xs text-faint">Units</dt>
            <dd className="font-ibm font-semibold text-ink">
              {occupiedUnits ?? 0}/{totalUnits} occupied
            </dd>
          </div>
        )}
      </dl>
    </PortfolioCard>
  );
}
