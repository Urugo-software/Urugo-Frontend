"use client";

import { mockLandlordProperties } from "@/data/landlord-data";
import { AddRenterPageHeader } from "./AddRenterPageHeader";
import { RenterRegistrationWizard } from "./RenterRegistrationWizard";
import { AddRenterPageViewProps } from "./types/renter-registration.types";

export function AddRenterPageView({
  initialMode = "manual",
}: AddRenterPageViewProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="max-w-7xl space-y-8">
        <AddRenterPageHeader />
        <RenterRegistrationWizard
          properties={mockLandlordProperties}
          initialMode={initialMode}
        />
      </div>
    </div>
  );
}
