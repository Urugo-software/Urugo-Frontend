"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown, SearchX, SlidersHorizontal } from "lucide-react";

import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ViewModeToggle } from "@/components/shared/ViewModeToggle";
import { listed_properties, sortOptions } from "@/data/properties";
import { paginateItems } from "@/utils/pagination";
import {
  filterPublicProperties,
  type PublicPropertyFilters,
  type PublicPropertySort,
} from "@/utils/public-properties";
import PropertyFilter from "./PropertyFilter";
import PropertyListingCard from "./PropertyListingCard";
import PropertyPagination from "./PropertyPagination";
import SearchInput from "./SearchInput";
import TotalAvailableProperties from "./TotalAvailableProperties";

const ITEMS_PER_PAGE = 6;

const SORT_KEY_MAP = {
  default: "default",
  price_asc: "priceAsc",
  price_desc: "priceDesc",
} as const;

interface PropertyListingProps {
  filters: PublicPropertyFilters;
  onFiltersChange: (next: PublicPropertyFilters) => void;
  onResetFilters: () => void;
  showFilter?: boolean;
  onToggleFilter?: () => void;
}

function PropertyListing({
  filters,
  onFiltersChange,
  onResetFilters,
  showFilter = false,
  onToggleFilter,
}: PropertyListingProps) {
  const t = useTranslations("properties");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    filters.district !== "All districts" ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.bedrooms !== "Any" ||
    filters.amenities.length > 0;

  const filteredProperties = useMemo(
    () => filterPublicProperties(listed_properties, filters),
    [filters],
  );

  const paginated = paginateItems(
    filteredProperties,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const activeFilterCount = [
    filters.district !== "All districts",
    filters.minPrice !== null || filters.maxPrice !== null,
    filters.bedrooms !== "Any",
    filters.amenities.length > 0,
  ].filter(Boolean).length;

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
    setCurrentPage(1);
  };

  const handleSortChange = (sort: PublicPropertySort) => {
    onFiltersChange({ ...filters, sort });
    setCurrentPage(1);
  };

  const handleReset = () => {
    onResetFilters();
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <SearchInput
          value={filters.search}
          onChange={handleSearchChange}
          onSubmit={() => setCurrentPage(1)}
          className="w-full p-3"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <TotalAvailableProperties
              total={paginated.totalItems}
              hasActiveFilters={hasActiveFilters}
            />
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer text-xs font-semibold text-brand hover:underline"
              >
                {t("filters.clearFilters")}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <label htmlFor="public-properties-sort" className="sr-only">
              {t("sort.label")}
            </label>
            <select
              id="public-properties-sort"
              value={filters.sort}
              onChange={(e) =>
                handleSortChange(e.target.value as PublicPropertySort)
              }
              className="h-10 cursor-pointer border border-line bg-white px-3 text-xs font-medium text-ink focus:border-brand focus:outline-none sm:text-sm"
            >
              {sortOptions.map((option) => {
                const key =
                  SORT_KEY_MAP[option.id as keyof typeof SORT_KEY_MAP];
                return (
                  <option key={option.id} value={option.id}>
                    {key ? t(`sort.${key}`) : option.name}
                  </option>
                );
              })}
            </select>

            <ViewModeToggle
              value={viewMode}
              onChange={setViewMode}
              label={t("viewLayoutLabel")}
            />

            {onToggleFilter && (
              <button
                onClick={onToggleFilter}
                type="button"
                aria-expanded={showFilter}
                className={`flex h-10 cursor-pointer items-center gap-2 border px-4 text-sm font-semibold shadow-2xs transition-colors ${
                  showFilter
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-ink hover:border-brand/40 hover:bg-surface hover:text-brand"
                }`}
              >
                <SlidersHorizontal
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />
                <span>
                  {showFilter
                    ? t("filters.toggleHide")
                    : t("filters.toggleShow")}
                  {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    showFilter ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Dropdown Filter */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              key="mobile-filter-dropdown"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden rounded-2xl border border-brand/20 bg-white p-5 shadow-lg sm:p-6 xl:hidden"
            >
              <PropertyFilter
                key={JSON.stringify(filters)}
                isMobile
                filters={filters}
                onApply={(next) => {
                  onFiltersChange(next);
                  setCurrentPage(1);
                }}
                onReset={handleReset}
                onClose={onToggleFilter}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {paginated.items.length === 0 ? (
        <div className="mt-6">
          <EmptyStateBox
            icon={SearchX}
            title={t("empty.title")}
            description={t("empty.description")}
            action={
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer border border-brand bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                {t("empty.resetAll")}
              </button>
            }
          />
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
                : "mt-6 flex flex-col gap-4"
            }
          >
            {paginated.items.map((prop, idx) => (
              <PropertyListingCard
                key={prop.id}
                index={idx}
                viewMode={viewMode}
                id={prop.id}
                image={prop.image}
                headline={prop.headline}
                ownerName={prop.ownerName}
                price={prop.price}
                currency={prop.currency}
                period={prop.period}
                location={prop.location}
                beds={prop.beds}
                baths={prop.baths}
                parking={prop.parking}
                isVerified={prop.isVerified}
                availabilityStatus={prop.availabilityStatus}
              />
            ))}
          </div>

          <PropertyPagination
            currentPage={paginated.page}
            totalPages={paginated.totalPages}
            totalItems={paginated.totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={(nextPage) => setCurrentPage(nextPage)}
          />
        </>
      )}
    </div>
  );
}

export default PropertyListing;
