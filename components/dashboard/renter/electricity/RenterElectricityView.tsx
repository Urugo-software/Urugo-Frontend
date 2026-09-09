"use client";

import { useRenterElectricity } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { ElectricityNotConfiguredCard } from "./ElectricityNotConfiguredCard";
import { ElectricityMetricSummary } from "./ElectricityMetricSummary";
import { ElectricityUsageChart } from "./ElectricityUsageChart";
import { ElectricityBillsTable } from "./ElectricityBillsTable";

export function RenterElectricityView() {
  const { data, isLoading, isError } = useRenterElectricity();

  if (isLoading)
    return <SectionLoading message="Loading electricity metrics..." />;
  if (isError || !data)
    return <SectionError message="Unable to load electricity data." />;

  if (!data.isConfigured) {
    return (
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
        <ElectricityNotConfiguredCard />
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">
          Electricity Monitoring
        </h2>
        <p className="text-[15px] text-body mt-1">
          Track sub-meter consumption and monthly limits.
        </p>
      </div>

      <ElectricityMetricSummary data={data} />
      <ElectricityUsageChart data={data.usageHistory} />
      <ElectricityBillsTable bills={data.monthlyBills} />
    </div>
  );
}
