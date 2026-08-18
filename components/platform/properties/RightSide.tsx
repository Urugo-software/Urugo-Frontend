"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropertyFilter from "./PropertyFilter";
import PropertyListing from "./PropertyListing";

function RightSide() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex-1 flex flex-col xl:flex-row gap-4 md:gap-6 transition-all duration-300">
      {/* Property Listing Section - dynamic width */}
      <div
        className={`transition-all duration-300 ${
          showFilter ? "w-full xl:basis-2/3" : "w-full flex-1"
        }`}
      >
        <PropertyListing
          showFilter={showFilter}
          onToggleFilter={() => setShowFilter((prev) => !prev)}
        />
      </div>

      {/* Property Filter Section - conditionally rendered with slide/fade animation for desktop */}
      <AnimatePresence mode="wait">
        {showFilter && (
          <motion.div
            key="property-filter"
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "auto" }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden xl:block xl:basis-1/3 shrink-0"
          >
            <PropertyFilter onClose={() => setShowFilter(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RightSide;
