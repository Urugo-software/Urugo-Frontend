"use client";

import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { ViewModeToggle } from "@/components/shared/ViewModeToggle";

export type DiscoverySort = "default" | "price_asc" | "price_desc";

interface DiscoveryFiltersBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  location: string;
  onLocationChange: (val: string) => void;
  locations: string[];
  beds: string;
  onBedsChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
  sort: DiscoverySort;
  onSortChange: (val: DiscoverySort) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const SELECT_CLS =
  "h-10 rounded-none border border-line bg-white px-3 text-xs font-medium text-ink focus:border-ink focus:outline-none";

export function DiscoveryFiltersBar({
  search,
  onSearchChange,
  location,
  onLocationChange,
  locations,
  beds,
  onBedsChange,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: DiscoveryFiltersBarProps) {
  return (
    <div className="space-y-3 border border-line bg-white p-4 shadow-2xs">
      <div className="flex flex-wrap items-center gap-3">
        <DashboardSearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by neighborhood, apartment name, or landlord..."
          label="Search available properties"
          showSubmitButton
          className="min-w-0 flex-1"
        />
        <ViewModeToggle
          value={viewMode}
          onChange={onViewModeChange}
          label="Switch property listing layout"
        />
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <select
          aria-label="Filter by location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className={SELECT_CLS}
        >
          <option value="all">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by bedrooms"
          value={beds}
          onChange={(e) => onBedsChange(e.target.value)}
          className={SELECT_CLS}
        >
          <option value="all">Any bedrooms</option>
          <option value="1">1+ Bedroom</option>
          <option value="2">2+ Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
        </select>

        <select
          aria-label="Filter by max monthly rent"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className={SELECT_CLS}
        >
          <option value="all">Any budget</option>
          <option value="150000">Up to 150,000 RWF</option>
          <option value="250000">Up to 250,000 RWF</option>
          <option value="400000">Up to 400,000 RWF</option>
        </select>

        <select
          aria-label="Sort listings"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as DiscoverySort)}
          className={SELECT_CLS}
        >
          <option value="default">Recommended</option>
          <option value="price_asc">Rent: Low to High</option>
          <option value="price_desc">Rent: High to Low</option>
        </select>
      </div>
    </div>
  );
}
