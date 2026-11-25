"use client";

import { useMemo } from "react";
import {
  mockMonthlyCollectionHistory,
  mockRecentActivities,
} from "@/data/landlord-data";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { AttentionItem } from "@/types/landlord";
import { formatRwf } from "@/utils/format";
import {
  computeListingOnlyStats,
  computeManagedStats,
} from "@/utils/landlord-metrics";
import { LandlordAttentionCard } from "./LandlordAttentionCard";
import { LandlordGreetingHeader } from "./LandlordGreetingHeader";
import { ListingOverviewPanels } from "./ListingOverviewPanels";
import { OverviewStatGrid, type OverviewStatCardItem } from "./OverviewStatGrid";
import { RecentRentalActivityCard } from "./RecentRentalActivityCard";
import { RentCollectionChart } from "./RentCollectionChart";
import { TenancyStatusDonutChart } from "./TenancyStatusDonutChart";
import { UpcomingRentCollectionCard } from "./UpcomingRentCollectionCard";

export function LandlordOverviewDashboard() {
  const { properties, units } = useLandlordProperties();
  const {
    serviceMode,
    profile,
    renters,
    payments,
    issues,
    inquiries,
    viewings,
  } = useLandlordWorkspace();

  const managedStats = useMemo(
    () =>
      computeManagedStats({
        properties,
        units,
        renters,
        payments,
        monthlyHistory: mockMonthlyCollectionHistory,
        issues,
        inquiries,
        viewings,
      }),
    [inquiries, issues, payments, properties, renters, units, viewings],
  );

  const listingStats = useMemo(
    () => computeListingOnlyStats({ properties, inquiries, viewings }),
    [inquiries, properties, viewings],
  );

  const chartData = useMemo(() => {
    const history = [...mockMonthlyCollectionHistory];
    if (history.length > 0) {
      history[history.length - 1] = {
        ...history[history.length - 1],
        expectedRwf: managedStats.currentMonthExpectedRwf,
        collectedRwf: managedStats.currentMonthCollectedRwf,
      };
    }
    return history;
  }, [managedStats.currentMonthCollectedRwf, managedStats.currentMonthExpectedRwf]);

  const attentionItems = useMemo<AttentionItem[]>(() => {
    const items: AttentionItem[] = [];
    if (serviceMode === "managed") {
      if (managedStats.pendingPaymentsCount > 0) {
        items.push({
          id: "att-payments",
          title: `${managedStats.pendingPaymentsCount} rent payment${managedStats.pendingPaymentsCount === 1 ? "" : "s"} awaiting verification`,
          count: managedStats.pendingPaymentsCount,
          actionText: "Review Payments",
          href: "/landlord/payments",
          type: "pending_payment",
        });
      }
      const ending = renters.find((r) => r.tenancyStatus === "Ending");
      if (managedStats.endingSoonTenancies > 0 && ending) {
        items.push({
          id: "att-ending",
          title: `${managedStats.endingSoonTenancies} tenanc${managedStats.endingSoonTenancies === 1 ? "y" : "ies"} ending soon`,
          count: managedStats.endingSoonTenancies,
          actionText: "Review Tenancy",
          href: `/landlord/tenancies/${ending.id}`,
          type: "ending_tenancy",
        });
      }
      const openIssue = issues.find(
        (i) =>
          i.status === "Disputed" ||
          i.status === "Reported" ||
          i.status === "Unresolved",
      );
      if (managedStats.openIssuesCount > 0 && openIssue) {
        items.push({
          id: "att-issue",
          title: `${managedStats.openIssuesCount} rental history item${managedStats.openIssuesCount === 1 ? "" : "s"} awaiting review`,
          count: managedStats.openIssuesCount,
          actionText: "Review Case",
          href: `/landlord/renter-history/${openIssue.id}`,
          type: "disputed_issue",
        });
      }
    }
    if (listingStats.pendingInquiries > 0) {
      items.push({
        id: "att-inquiries",
        title: `${listingStats.pendingInquiries} new tenant inquir${listingStats.pendingInquiries === 1 ? "y" : "ies"}`,
        count: listingStats.pendingInquiries,
        actionText: "Open Inquiries",
        href: "/landlord/inquiries",
        type: "pending_inquiry",
      });
    }
    if (listingStats.pendingViewings > 0) {
      items.push({
        id: "att-viewings",
        title: `${listingStats.pendingViewings} viewing request${listingStats.pendingViewings === 1 ? "" : "s"} to confirm`,
        count: listingStats.pendingViewings,
        actionText: "Manage Viewings",
        href: "/landlord/viewings",
        type: "pending_viewing",
      });
    }
    return items;
  }, [issues, listingStats, managedStats, renters, serviceMode]);

  const kpiCards: OverviewStatCardItem[] =
    serviceMode === "listing_only"
      ? [
          {
            label: "Active Listings",
            value: String(listingStats.publishedListings),
            helper: `${listingStats.totalListings} total · ${listingStats.draftListings} draft · ${listingStats.rentedListings} rented`,
            href: "/landlord/properties",
          },
          {
            label: "Listing Views (30d)",
            value: listingStats.totalViews.toLocaleString("en-US"),
            helper: "Across published Urugo property listings",
            href: "/landlord/properties",
          },
          {
            label: "Pending Inquiries",
            value: String(listingStats.pendingInquiries),
            helper: `${listingStats.totalInquiries} total conversations received`,
            href: "/landlord/inquiries",
            accent: listingStats.pendingInquiries > 0 ? "warning" : "default",
          },
          {
            label: "Pending Viewings",
            value: String(listingStats.pendingViewings),
            helper: `${listingStats.confirmedViewings} upcoming confirmed visits`,
            href: "/landlord/viewings",
            accent: listingStats.pendingViewings > 0 ? "warning" : "default",
          },
        ]
      : [
          {
            label: "Portfolio Occupancy",
            value: `${managedStats.occupiedSpaces} / ${managedStats.totalSpaces}`,
            helper: `${managedStats.occupancyRate}% occupied · ${managedStats.totalProperties} properties · ${managedStats.vacantSpaces} vacant`,
            href: "/landlord/properties",
          },
          {
            label: "Rent Collected (Sep 2026)",
            value: formatRwf(managedStats.currentMonthCollectedRwf),
            helper: `${managedStats.collectionRate}% of ${formatRwf(managedStats.currentMonthExpectedRwf)} expected`,
            progressPercent: managedStats.collectionRate,
            href: "/landlord/payments",
            accent: "success",
          },
          {
            label: "Rent Collected (YTD)",
            value: formatRwf(managedStats.ytdRentCollectedRwf),
            helper: "Verified landlord rent collected Jan – Sep 2026",
            href: "/landlord/payments",
          },
          {
            label: "Overdue & Pending Rent",
            value: formatRwf(managedStats.confirmedOverdueRwf),
            helper: `Confirmed overdue (${managedStats.overdueRentersCount}) · ${formatRwf(managedStats.pendingVerificationRwf)} pending proof review`,
            href: "/landlord/payments",
            accent:
              managedStats.confirmedOverdueRwf > 0
                ? "danger"
                : managedStats.pendingVerificationRwf > 0
                  ? "warning"
                  : "default",
          },
        ];

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <LandlordGreetingHeader name={profile.fullName} serviceMode={serviceMode} />

      <OverviewStatGrid items={kpiCards} />

      {serviceMode === "listing_only" ? (
        <ListingOverviewPanels
          stats={listingStats}
          inquiries={inquiries}
          viewings={viewings}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RentCollectionChart data={chartData} />
            </div>
            <LandlordAttentionCard items={attentionItems} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <TenancyStatusDonutChart
              overview={{
                active: managedStats.activeTenancies,
                endingSoon: managedStats.endingSoonTenancies,
                pendingClosure: managedStats.closedTenancies,
                total: renters.length,
              }}
            />
            <UpcomingRentCollectionCard renters={renters} />
          </div>

          <RecentRentalActivityCard activities={mockRecentActivities} />
        </>
      )}
    </div>
  );
}
