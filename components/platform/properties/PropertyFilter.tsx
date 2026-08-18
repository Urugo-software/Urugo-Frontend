"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { PropertyFilterProps } from "@/types";

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

function PropertyFilter({ isMobile, onClose }: PropertyFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? -6 : 0, x: isMobile ? 0 : 15 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={` border border-line/80 bg-white p-5 sm:p-6 shadow-xs ${
        isMobile ? "w-full border-none shadow-none p-0" : "sticky top-24 w-full"
      }`}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between pb-3.5 border-b border-line/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-brand-tint text-brand">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-[15px] sm:text-base font-bold tracking-tight text-ink">
              Filter Properties
            </h2>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-body hover:bg-surface hover:text-ink transition-colors cursor-pointer"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div
        className={
          isMobile
            ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6"
            : "flex flex-col gap-1"
        }
      >
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
      </div>

      <FilterActions />
    </motion.div>
  );
}

export default PropertyFilter;
