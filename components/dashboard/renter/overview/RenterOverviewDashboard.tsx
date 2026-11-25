"use client";

import { useRenterOverview } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { isIssueActionable } from "@/utils/rental-debt";
import { summarizeRenterPayments } from "@/utils/renter-helpers";
import { RenterGreetingHeader } from "./RenterGreetingHeader";
import { RenterRentSummaryCard } from "./RenterRentSummaryCard";
import { RenterMaintenanceSummaryCard } from "./RenterMaintenanceSummaryCard";
import { RenterRecentUpdatesCard } from "./RenterRecentUpdatesCard";
import { RenterQuickActionsCard } from "./RenterQuickActionsCard";

export function RenterOverviewDashboard() {
  const { isLoading, isError, refetch } = useRenterOverview();
  const profile = useRenterWorkspace((s) => s.profile);
  const property = useRenterWorkspace((s) => s.property);
  const payments = useRenterWorkspace((s) => s.payments);
  const maintenance = useRenterWorkspace((s) => s.maintenance);
  const notifications = useRenterWorkspace((s) => s.notifications);
  const issues = useLandlordWorkspace((s) => s.issues);

  if (isLoading) return <SectionLoading message="Loading dashboard..." />;
  if (isError) {
    return (
      <SectionError
        message="Unable to load renter overview."
        onRetry={() => void refetch()}
      />
    );
  }

  const { pendingPayment } = summarizeRenterPayments(payments);
  const activeMaintenance = maintenance.filter(
    (m) => m.status === "Pending" || m.status === "In Progress",
  ).length;
  const myActionableIssues = issues.filter(
    (i) =>
      (i.renterName.toLowerCase() === profile.name.toLowerCase() ||
        i.id === "iss-501") &&
      isIssueActionable(i.status),
  ).length;

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <RenterGreetingHeader
        name={profile.name}
        avatar={profile.avatar}
        unitNumber={property.unitNumber}
        propertyName={profile.propertyName}
        hasPendingRent={Boolean(pendingPayment)}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <RenterRentSummaryCard payment={pendingPayment ?? payments[0]} />
        <RenterMaintenanceSummaryCard count={activeMaintenance} />
      </div>

      <RenterRecentUpdatesCard
        notifications={notifications}
        actionableIssuesCount={myActionableIssues}
      />

      <RenterQuickActionsCard />
    </div>
  );
}
