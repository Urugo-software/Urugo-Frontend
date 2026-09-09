"use client";

import { useState } from "react";
import { mockLandlordRenters } from "@/data/landlord-data";
import { RenterSearchFilter } from "./RenterSearchFilter";
import { RentersTable } from "./RentersTable";

export function RentersListContainer() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRenters = mockLandlordRenters.filter(
    (renter) =>
      renter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      renter.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      renter.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Managed Renters</h1>
          <p className="mt-1.5 text-sm sm:text-[15px] text-body">
            View active tenants connected to your properties and inspect their rental status.
          </p>
        </div>
        <RenterSearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      <RentersTable renters={filteredRenters} />
    </div>
  );
}
