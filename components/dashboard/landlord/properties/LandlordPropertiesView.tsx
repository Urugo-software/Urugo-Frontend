"use client";

import { useState } from "react";
import { mockLandlordProperties } from "@/data/landlord-data";
import { LandlordPropertyItem } from "@/types/landlord";
import { PropertiesHeader } from "./PropertiesHeader";
import { PropertiesToolbar } from "./PropertiesToolbar";
import { PropertyCard } from "./PropertyCard";

export function LandlordPropertiesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All Statuses");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProperties = mockLandlordProperties.filter(
    (prop: LandlordPropertyItem) => {
      const matchesSearch =
        prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "All Statuses" || prop.status === filterStatus;
      return matchesSearch && matchesFilter;
    },
  );

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-7 bg-surface/30">
      <PropertiesHeader />

      <PropertiesToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {filteredProperties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}
