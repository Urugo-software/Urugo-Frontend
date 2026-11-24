"use client";

import { useState } from "react";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { ViewModeToggle } from "@/components/shared/ViewModeToggle";
import type { LandlordPropertyItem, LandlordRenter } from "@/types/landlord";
import { findPropertyForRenter } from "@/utils/property-tenancies";
import { TenancyListCard } from "./TenancyListCard";

interface TenanciesPortfolioViewProps {
  renters: LandlordRenter[];
  properties: LandlordPropertyItem[];
}

export function TenanciesPortfolioView({
  renters,
  properties,
}: TenanciesPortfolioViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Tenancy Management
          </h1>
          <p className="mt-1.5 text-[15px] text-body">
            Manage active lease contracts, review monthly rent payments, and close
            tenancies cleanly.
          </p>
        </div>

        <ViewModeToggle
          value={viewMode}
          onChange={setViewMode}
          label="Tenancies layout"
        />
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            : "grid grid-cols-1 gap-4"
        }
      >
        {renters.map((renter) => (
          <TenancyListCard
            key={renter.id}
            renter={renter}
            property={findPropertyForRenter(renter, properties)}
            viewMode={viewMode}
          />
        ))}
      </div>
    </main>
  );
}
