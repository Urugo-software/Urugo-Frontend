import type { ReactNode } from "react";

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
        className="mb-2 block text-[13px] tracking-wide font-bold"
      >
        {title}
      </label>
      {children}
    </div>
  );
}

function PropertyFilter() {
  return (
    <div>
      <h2 className="mb-5 text-[18px] tracking-wide font-bold text-ink">
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
    </div>
  );
}

export default PropertyFilter;
