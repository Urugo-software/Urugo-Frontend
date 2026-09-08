"use client";

import React from "react";
import { useRenterProperty } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { PropertyDetailHeader } from "./PropertyDetailHeader";
import { PropertyLeaseCard } from "./PropertyLeaseCard";
import { LandlordContactCard } from "./LandlordContactCard";
import { PropertySpecsCard } from "./PropertySpecsCard";

export function RenterPropertyView() {
  const { data: property, isLoading, isError } = useRenterProperty();

  if (isLoading)
    return <SectionLoading message="Loading property details..." />;
  if (isError || !property)
    return <SectionError message="Unable to load property info." />;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <PropertyDetailHeader
        name={property.name}
        unitNumber={property.unitNumber}
        address={property.address}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <PropertyLeaseCard property={property} />
        <LandlordContactCard
          name={property.landlordName}
          phone={property.landlordPhone}
          email={property.email}
        />
        <PropertySpecsCard property={property} />
      </div>
    </div>
  );
}
