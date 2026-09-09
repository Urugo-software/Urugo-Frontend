"use client";

import { useRenterOverview } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { RenterGreetingHeader } from "./RenterGreetingHeader";
import { RenterRentSummaryCard } from "./RenterRentSummaryCard";
import { RenterElectricitySummaryCard } from "./RenterElectricitySummaryCard";
import { RenterMaintenanceSummaryCard } from "./RenterMaintenanceSummaryCard";
import { RenterQuickActionsCard } from "./RenterQuickActionsCard";

export function RenterOverviewDashboard() {
  const { data, isLoading, isError } = useRenterOverview();

  if (isLoading) return <SectionLoading message="Loading dashboard..." />;
  if (isError || !data)
    return <SectionError message="Unable to load renter overview." />;

  const { profile, property, nextPayment, electricity, maintenanceCount } =
    data;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <RenterGreetingHeader
        name={profile.name}
        unitNumber={property.unitNumber}
        propertyName={property.name}
      />

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <RenterRentSummaryCard payment={nextPayment} />
        <RenterElectricitySummaryCard electricity={electricity} />
        <RenterMaintenanceSummaryCard count={maintenanceCount} />
      </div>

      <RenterQuickActionsCard />
    </div>
  );
}
