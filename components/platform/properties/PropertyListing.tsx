"use client";

import { listed_properties } from "@/data/properties";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PropertyListingCard from "./PropertyListingCard";
import PropertyPagination from "./PropertyPagination";
import SearchInput from "./SearchInput";
import TotalAvailableProperties from "./TotalAvailableProperties";

const ITEMS_PER_PAGE = 3;

function PropertyListing() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = listed_properties.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedProperties = listed_properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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

        {/* stats & filter */}
        <div className="my-4">
          <TotalAvailableProperties total={totalItems} />
        </div>
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
