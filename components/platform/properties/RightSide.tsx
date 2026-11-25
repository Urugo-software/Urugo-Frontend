"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  DEFAULT_PUBLIC_FILTERS,
  type PublicPropertyFilters,
} from "@/utils/public-properties";
import PropertyFilter from "./PropertyFilter";
import PropertyListing from "./PropertyListing";

function RightSide() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search")?.trim() ?? "";
  const initialDistrict = searchParams.get("district")?.trim() ?? "";

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<PublicPropertyFilters>({
    ...DEFAULT_PUBLIC_FILTERS,
    search: initialSearch,
    district: initialDistrict || DEFAULT_PUBLIC_FILTERS.district,
  });

  const handleApplyFilters = (next: PublicPropertyFilters) => {
    setFilters(next);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_PUBLIC_FILTERS);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 transition-all duration-300 md:gap-6 xl:flex-row">
      <div
        className={`min-w-0 transition-all duration-300 ${
          showFilter ? "w-full xl:basis-2/3" : "w-full flex-1"
        }`}
      >
        <PropertyListing
          filters={filters}
          onFiltersChange={setFilters}
          onResetFilters={handleResetFilters}
          showFilter={showFilter}
          onToggleFilter={() => setShowFilter((prev) => !prev)}
        />
      </div>

      <AnimatePresence mode="wait">
        {showFilter && (
          <motion.div
            key="property-filter"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden shrink-0 xl:block xl:basis-1/3"
          >
            <PropertyFilter
              key={JSON.stringify(filters)}
              filters={filters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              onClose={() => setShowFilter(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RightSide;
