"use client";

import { useState, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { propertyLocations } from "@/data/properties";
import Dropdown from "@/components/shared/Dropdown";
import {
  DEFAULT_PUBLIC_FILTERS,
  type PublicPropertyFilters,
} from "@/utils/public-properties";
import PriceRangeFilter from "./PriceRangeFilter";
import FilterPills from "./FilterPills";
import FilterActions from "./FilterActions";

const BEDROOM_OPTIONS = ["Any", "Studio", "1", "2", "3+"] as const;
const AMENITY_OPTIONS = ["WiFi", "Parking", "Water", "Security"] as const;

interface PropertyFilterProps {
  filters: PublicPropertyFilters;
  onApply: (next: PublicPropertyFilters) => void;
  onReset: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="mb-2 block text-[13px] font-bold tracking-wide text-ink md:text-sm">
        {title}
      </div>
      {children}
    </div>
  );
}

function PropertyFilter({
  filters,
  onApply,
  onReset,
  isMobile = false,
  onClose,
}: PropertyFilterProps) {
  const [draft, setDraft] = useState<PublicPropertyFilters>(filters);

  const toggleAmenity = (amenity: string) => {
    setDraft((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleApply = () => {
    onApply(draft);
    if (isMobile) onClose?.();
  };

  const handleReset = () => {
    setDraft({ ...DEFAULT_PUBLIC_FILTERS, search: filters.search, sort: filters.sort });
    onReset();
    if (isMobile) onClose?.();
  };

  return (
    <div
      className={`border border-line/80 bg-white p-5 shadow-xs sm:p-6 ${
        isMobile ? "w-full border-none p-0 shadow-none" : "sticky top-24 w-full"
      }`}
    >
      <div className="mb-5 flex items-center justify-between border-b border-line/60 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-brand-tint text-brand">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
          </div>
          <h2 className="text-[15px] font-bold tracking-tight text-ink sm:text-base">
            Filter Properties
          </h2>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-body transition-colors hover:bg-surface hover:text-ink"
            aria-label="Close filters"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>

      <div
        className={
          isMobile
            ? "grid grid-cols-1 gap-x-6 sm:grid-cols-2"
            : "flex flex-col gap-1"
        }
      >
        <FilterSection title="District">
          <Dropdown
            menuList={propertyLocations}
            defaultMenu="All districts"
            selectedValue={draft.district}
            onSelectValue={(district) =>
              setDraft((prev) => ({ ...prev, district }))
            }
            className="w-full"
          />
        </FilterSection>

        <FilterSection title="Price range (RWF / month)">
          <PriceRangeFilter
            minPrice={draft.minPrice}
            maxPrice={draft.maxPrice}
            onMinChange={(minPrice) =>
              setDraft((prev) => ({ ...prev, minPrice }))
            }
            onMaxChange={(maxPrice) =>
              setDraft((prev) => ({ ...prev, maxPrice }))
            }
          />
        </FilterSection>

        <FilterSection title="Bedrooms">
          <FilterPills
            options={BEDROOM_OPTIONS}
            selected={draft.bedrooms}
            onSelect={(bedrooms) => setDraft((prev) => ({ ...prev, bedrooms }))}
          />
        </FilterSection>

        <FilterSection title="Amenities">
          <FilterPills
            options={AMENITY_OPTIONS}
            selected={draft.amenities}
            multiSelect
            onSelect={toggleAmenity}
          />
        </FilterSection>
      </div>

      <FilterActions onApply={handleApply} onReset={handleReset} />
    </div>
  );
}

export default PropertyFilter;
