import Link from "next/link";
import { Building2, Folder, MapPin, Pencil, Plus, UserPlus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PropertyCover } from "@/components/dashboard/landlord/properties/PropertyCover";
import { cn } from "@/lib/utils";
import type { LandlordPropertyItem, PropertyGroup } from "@/types/landlord";
import { OccupancyBadge } from "../StatusBadges";

interface PropertyTenancyHeroProps {
  property: LandlordPropertyItem;
  group?: PropertyGroup;
  totalUnits: number;
  occupiedUnits: number;
  canAddRenter: boolean;
  onAddUnit?: () => void;
}

export function PropertyTenancyHero({
  property,
  group,
  totalUnits,
  occupiedUnits,
  canAddRenter,
  onAddUnit,
}: PropertyTenancyHeroProps) {
  const occupancyStatus =
    occupiedUnits === 0
      ? "Vacant"
      : occupiedUnits >= totalUnits && totalUnits > 0
        ? "Occupied"
        : "Partial";

  return (
    <section
      aria-labelledby="property-tenancy-heading"
      className="overflow-hidden border border-line bg-white shadow-2xs"
    >
      <div className="relative h-44 w-full overflow-hidden border-b border-line bg-surface sm:h-52 md:h-60">
        <PropertyCover
          key={property.image ?? property.id}
          src={property.image}
          className="h-full w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent"
        />
      </div>

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-0.5 text-[12.5px] font-semibold uppercase tracking-wider text-body">
              <Building2 aria-hidden="true" className="size-3.5 text-faint" />
              {property.type}
              {property.hasUnits && totalUnits > 0 ? ` · ${totalUnits} Units` : ""}
            </span>
            <OccupancyBadge status={occupancyStatus} />
          </div>

          <h1
            id="property-tenancy-heading"
            className="break-words text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            {property.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-body">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-faint" />
              <span>{property.location}</span>
            </span>

            {group && (
              <Link
                href={`/landlord/properties/groups/${encodeURIComponent(group.id)}`}
                className="inline-flex items-center gap-1.5 text-body hover:text-brand hover:underline"
              >
                <Folder aria-hidden="true" className="size-4 shrink-0 text-faint" />
                <span>{group.name}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {property.hasUnits && onAddUnit && (
            <Button
              type="button"
              variant="outline"
              onClick={onAddUnit}
              className="cursor-pointer rounded-none"
            >
              <Plus aria-hidden="true" className="size-4" />
              Add Unit
            </Button>
          )}
          {canAddRenter && (
            <Link
              href="/landlord/renters/add"
              className={cn(buttonVariants({ variant: "default" }), "rounded-none")}
            >
              <UserPlus aria-hidden="true" className="size-4" />
              Add Renter
            </Link>
          )}
          <Link
            href={`/landlord/properties/${encodeURIComponent(property.id)}/edit`}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
          >
            <Pencil aria-hidden="true" className="size-4" />
            Edit Property
          </Link>
        </div>
      </div>
    </section>
  );
}
