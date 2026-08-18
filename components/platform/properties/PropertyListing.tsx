"use client";

import { listed_properties } from "@/data/properties";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import PropertyFilter from "./PropertyFilter";
import PropertyListingCard from "./PropertyListingCard";
import PropertyPagination from "./PropertyPagination";
import SearchInput from "./SearchInput";
import TotalAvailableProperties from "./TotalAvailableProperties";

const ITEMS_PER_PAGE = 3;

import { PropertyListingProps } from "@/types";

function PropertyListing({ showFilter, onToggleFilter }: PropertyListingProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = listed_properties.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedProperties = listed_properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="max-md:my-8 max-md:mb-12">
        {/* search field */}
        <SearchInput className="p-3 w-full outline-none border-none focus:outline-none focus:border-none focus:ring-0" />

        {/* stats & filter toggle */}
        <div className="my-4 flex items-center justify-between gap-4 flex-wrap">
          <TotalAvailableProperties total={totalItems} />

          {onToggleFilter && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onToggleFilter}
              type="button"
              className={`flex items-center gap-2  border px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
                showFilter
                  ? "border-brand bg-brand text-white shadow-md shadow-brand/20"
                  : "border-line bg-white text-ink hover:border-brand/40 hover:bg-surface hover:text-brand"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 transition-transform duration-300" />
              <span>{showFilter ? "Hide Filters" : "Filters"}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  showFilter ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          )}
        </div>

        {/* Mobile Dropdown Filter (Visible only on screens < xl) */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              key="mobile-filter-dropdown"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="xl:hidden overflow-hidden rounded-2xl border border-brand/20 bg-white p-5 sm:p-6 shadow-xl"
            >
              <PropertyFilter isMobile onClose={onToggleFilter} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* list properties with page transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="mt-8 flex flex-col gap-4"
        >
          {paginatedProperties.map((prop, idx) => (
            <PropertyListingCard
              key={prop.id}
              index={idx}
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
        </motion.div>
      </AnimatePresence>

      {/* Property Pagination Controls */}
      <PropertyPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
}

export default PropertyListing;
