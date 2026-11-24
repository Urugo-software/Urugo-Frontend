"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, Plus, Search, SearchX } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockLandlordRenters } from "@/data/landlord-data";
import { cn } from "@/lib/utils";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { PropertyUnit } from "@/types/landlord";
import {
  getRentersForProperty,
  resolvePropertyDoors,
  summarizePropertyTenancies,
} from "@/utils/property-tenancies";
import { EmptyStateBox } from "../EmptyStateBox";
import { PropertyTenancyBreadcrumb } from "./PropertyTenancyBreadcrumb";
import { PropertyTenancyHero } from "./PropertyTenancyHero";
import { PropertyTenancyStats } from "./PropertyTenancyStats";
import { PropertyUnitCard } from "./PropertyUnitCard";
import { SinglePropertyLeaseCard } from "./SinglePropertyLeaseCard";
import { UnitDetailsDialog } from "./UnitDetailsDialog";

type UnitFilter = "all" | "occupied" | "vacant" | "ending";

const filterOptions: { key: UnitFilter; label: string }[] = [
  { key: "all", label: "All Units" },
  { key: "occupied", label: "Occupied" },
  { key: "vacant", label: "Vacant" },
  { key: "ending", label: "Ending Soon" },
];

export function PropertyTenanciesView({ propertyId }: { propertyId: string }) {
  const { properties, groups, units } = useLandlordProperties();
  const [unitFilter, setUnitFilter] = useState<UnitFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [unitModal, setUnitModal] = useState<{ open: boolean; unit?: PropertyUnit }>({
    open: false,
  });

  const property = useMemo(
    () => properties.find((item) => item.id === propertyId),
    [properties, propertyId],
  );

  const group = useMemo(
    () => (property?.groupId ? groups.find((item) => item.id === property.groupId) : undefined),
    [groups, property],
  );

  const propertyRenters = useMemo(
    () => (property ? getRentersForProperty(property, mockLandlordRenters) : []),
    [property],
  );

  const doors = useMemo(
    () =>
      property && property.hasUnits
        ? resolvePropertyDoors(property, units, mockLandlordRenters)
        : [],
    [property, units],
  );

  const summary = useMemo(
    () =>
      property ? summarizePropertyTenancies(property, doors, propertyRenters) : null,
    [property, doors, propertyRenters],
  );

  const query = searchTerm.trim().toLowerCase();

  const filteredDoors = useMemo(
    () =>
      doors.filter(({ unit, renter }) => {
        const matchesStatus =
          unitFilter === "all" ||
          (unitFilter === "occupied" && renter !== null) ||
          (unitFilter === "vacant" && renter === null && unit.status === "Vacant") ||
          (unitFilter === "ending" && renter?.tenancyStatus === "Ending");

        const matchesSearch =
          !query ||
          unit.unitNumber.toLowerCase().includes(query) ||
          (unit.floor?.toLowerCase().includes(query) ?? false) ||
          (renter?.name.toLowerCase().includes(query) ?? false);

        return matchesStatus && matchesSearch;
      }),
    [doors, unitFilter, query],
  );

  if (!property || !summary) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
        <PropertyTenancyBreadcrumb currentLabel="Property not found" />
        <EmptyStateBox
          icon={Building2}
          title="Property not found"
          description="We couldn't find this property in your portfolio. It may have been removed or the link may be outdated."
          action={
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/landlord/properties"
                className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
              >
                Return to My Properties
              </Link>
              <Link
                href="/landlord/tenancies"
                className={cn(buttonVariants({ variant: "default" }), "rounded-none")}
              >
                View All Tenancies
              </Link>
            </div>
          }
        />
      </main>
    );
  }

  const canAddRenter = property.hasUnits && summary.vacantUnits > 0;
  const hasActiveFilters = unitFilter !== "all" || Boolean(query);

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
      <PropertyTenancyBreadcrumb currentLabel={property.name} group={group} />

      <PropertyTenancyHero
        property={property}
        group={group}
        totalUnits={summary.totalUnits}
        occupiedUnits={summary.occupiedUnits}
        canAddRenter={canAddRenter}
        onAddUnit={property.hasUnits ? () => setUnitModal({ open: true }) : undefined}
      />

      {property.hasUnits && <PropertyTenancyStats summary={summary} />}

      {property.hasUnits ? (
        <section aria-labelledby="property-units-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <h2 id="property-units-heading" className="text-xl font-semibold text-ink">
                Units &amp; Leases
              </h2>
              <span className="border border-line bg-white px-2.5 py-0.5 font-ibm text-[12.5px] font-semibold text-body">
                {hasActiveFilters
                  ? `${filteredDoors.length} / ${doors.length}`
                  : doors.length}
              </span>
            </div>
          </div>

          {doors.length > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-white p-3 shadow-2xs">
              <label className="relative min-w-0 flex-1 basis-full sm:basis-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
                <span className="sr-only">Search units or tenants</span>
                <Input
                  type="search"
                  placeholder="Search by unit number, floor, or tenant"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="rounded-none py-5 pl-9 text-sm"
                />
              </label>

              <div
                role="group"
                aria-label="Filter units by status"
                className="flex flex-wrap items-center gap-1.5"
              >
                {filterOptions.map(({ key, label }) => (
                  <Button
                    key={key}
                    type="button"
                    variant={unitFilter === key ? "default" : "outline"}
                    onClick={() => setUnitFilter(key)}
                    className="h-9 cursor-pointer rounded-none px-3 text-sm"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {doors.length === 0 ? (
            <EmptyStateBox
              icon={Building2}
              title="No units added yet"
              description="Add the individually rentable doors in this building along with their photos and monthly rent."
              action={
                <Button
                  type="button"
                  onClick={() => setUnitModal({ open: true })}
                  className="cursor-pointer rounded-none"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  Add First Unit
                </Button>
              }
            />
          ) : filteredDoors.length === 0 ? (
            <EmptyStateBox
              icon={SearchX}
              title="No matching units"
              description="Try clearing your search or switching back to all units."
              action={
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer rounded-none"
                  onClick={() => {
                    setSearchTerm("");
                    setUnitFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredDoors.map((door) => (
                <PropertyUnitCard
                  key={door.unit.id}
                  door={door}
                  propertyId={property.id}
                  onManageUnit={(unit) => setUnitModal({ open: true, unit })}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section aria-labelledby="single-property-lease-heading" className="space-y-4">
          <h2 id="single-property-lease-heading" className="text-xl font-semibold text-ink">
            Current Lease
          </h2>
          <SinglePropertyLeaseCard
            propertyId={property.id}
            renter={propertyRenters[0] ?? null}
          />
        </section>
      )}

      {unitModal.open && (
        <UnitDetailsDialog
          key={unitModal.unit?.id ?? "new-unit"}
          propertyId={property.id}
          unit={unitModal.unit}
          onClose={() => setUnitModal({ open: false })}
        />
      )}
    </main>
  );
}
