"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import LocationSelect from "./LocationSelect";
import PriceRangeFilter from "./PriceRangeFilter";
import FilterPills from "./FilterPills";
import FilterActions from "./FilterActions";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  htmlFor?: string;
};

function FilterSection({ title, children, htmlFor }: FilterSectionProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[13px] md:text-sm text-ink tracking-wide font-bold"
      >
        {title}
      </label>
      {children}
    </div>
  );
}

function PropertyFilter() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="sticky top-24"
    >
      <h2 className="uppercase mb-5 text-[18px] tracking-wide font-bold text-ink">
        Filters
      </h2>

      <FilterSection title="Location" htmlFor="location">
        <LocationSelect />
      </FilterSection>

      <FilterSection title="Price range (RWF/month)">
        <PriceRangeFilter />
      </FilterSection>

      <FilterSection title="Bedrooms">
        <FilterPills
          options={["Any", "Studio", "1", "2", "3+"]}
          defaultSelected="Any"
        />
      </FilterSection>

      <FilterSection title="Amenities">
        <FilterPills
          options={["WiFi", "Parking", "Water incl.", "Security"]}
          defaultSelected="WiFi"
        />
      </FilterSection>

      <FilterActions />
    </motion.div>
  );
}

export default PropertyFilter;
