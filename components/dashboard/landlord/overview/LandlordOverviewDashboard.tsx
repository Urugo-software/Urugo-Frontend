import {
  mockLandlordMetrics,
  mockLandlordAttentionItems,
  mockRecentActivities,
  mockTenancyOverview,
  mockLandlordRenters,
} from "@/data/landlord-data";
import { LandlordGreetingHeader } from "./LandlordGreetingHeader";
import { LandlordKpiCards } from "./LandlordKpiCards";
import { TenancyStatusDonutChart } from "./TenancyStatusDonutChart";
import { UpcomingRentCollectionCard } from "./UpcomingRentCollectionCard";
import { LandlordAttentionCard } from "./LandlordAttentionCard";
import { RecentRentalActivityCard } from "./RecentRentalActivityCard";

export function LandlordOverviewDashboard() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-7">
      {/* 1. Header Greeting & Date Selector */}
      <LandlordGreetingHeader name="Emmanuel" />

      {/* 2. Top Section Grid (3 Columns) with spacious cards & legibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Column: Stacked KPIs */}
        <LandlordKpiCards metrics={mockLandlordMetrics} />

        {/* Middle Column: Tenancy Status Donut Chart */}
        <TenancyStatusDonutChart overview={mockTenancyOverview} />

        {/* Right Column: Upcoming Rent Collection Status */}
        <UpcomingRentCollectionCard renters={mockLandlordRenters} />
      </div>

      {/* 3. Action-First Attention Section */}
      <LandlordAttentionCard items={mockLandlordAttentionItems} />

      {/* 4. Recent Rental Activity History Table */}
      <RecentRentalActivityCard activities={mockRecentActivities} />
    </div>
  );
}
