"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  mockMonthlyCollectionHistory,
  mockRecentActivities,
} from "@/data/landlord-data";
import type { AppLocale } from "@/i18n/config";
import { formatNumberLocalized, formatRwfLocalized } from "@/i18n/formatting";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { AttentionItem } from "@/types/landlord";
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
  const t = useTranslations("landlord.overview");
  const locale = useLocale() as AppLocale;
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
        const count = managedStats.pendingPaymentsCount;
        items.push({
          id: "att-payments",
          title: t(
            count === 1
              ? "attention.pendingPaymentsSingle"
              : "attention.pendingPaymentsPlural",
            { count },
          ),
          count,
          actionText: t("attention.reviewPayments"),
          href: "/landlord/payments",
          type: "pending_payment",
        });
      }
      const ending = renters.find((r) => r.tenancyStatus === "Ending");
      if (managedStats.endingSoonTenancies > 0 && ending) {
        const count = managedStats.endingSoonTenancies;
        items.push({
          id: "att-ending",
          title: t(
            count === 1
              ? "attention.endingTenanciesSingle"
              : "attention.endingTenanciesPlural",
            { count },
          ),
          count,
          actionText: t("attention.reviewTenancy"),
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
        const count = managedStats.openIssuesCount;
        items.push({
          id: "att-issue",
          title: t(
            count === 1
              ? "attention.openIssuesSingle"
              : "attention.openIssuesPlural",
            { count },
          ),
          count,
          actionText: t("attention.reviewCase"),
          href: `/landlord/renter-history/${openIssue.id}`,
          type: "disputed_issue",
        });
      }
    }
    if (listingStats.pendingInquiries > 0) {
      const count = listingStats.pendingInquiries;
      items.push({
        id: "att-inquiries",
        title: t(
          count === 1
            ? "attention.newInquiriesSingle"
            : "attention.newInquiriesPlural",
          { count },
        ),
        count,
        actionText: t("attention.openInquiries"),
        href: "/landlord/inquiries",
        type: "pending_inquiry",
      });
    }
    if (listingStats.pendingViewings > 0) {
      const count = listingStats.pendingViewings;
      items.push({
        id: "att-viewings",
        title: t(
          count === 1
            ? "attention.pendingViewingsSingle"
            : "attention.pendingViewingsPlural",
          { count },
        ),
        count,
        actionText: t("attention.manageViewings"),
        href: "/landlord/viewings",
        type: "pending_viewing",
      });
    }
    return items;
  }, [issues, listingStats, managedStats, renters, serviceMode, t]);

  const kpiCards: OverviewStatCardItem[] =
    serviceMode === "listing_only"
      ? [
          {
            label: t("kpis.activeListings"),
            value: String(listingStats.publishedListings),
            helper: t("kpis.activeListingsHelper", {
              total: listingStats.totalListings,
              draft: listingStats.draftListings,
              rented: listingStats.rentedListings,
            }),
            href: "/landlord/properties",
          },
          {
            label: t("kpis.listingViews"),
            value: formatNumberLocalized(listingStats.totalViews, locale),
            helper: t("kpis.listingViewsHelper"),
            href: "/landlord/properties",
          },
          {
            label: t("kpis.pendingInquiries"),
            value: String(listingStats.pendingInquiries),
            helper: t("kpis.pendingInquiriesHelper", {
              total: listingStats.totalInquiries,
            }),
            href: "/landlord/inquiries",
            accent: listingStats.pendingInquiries > 0 ? "warning" : "default",
          },
          {
            label: t("kpis.pendingViewings"),
            value: String(listingStats.pendingViewings),
            helper: t("kpis.pendingViewingsHelper", {
              confirmed: listingStats.confirmedViewings,
            }),
            href: "/landlord/viewings",
            accent: listingStats.pendingViewings > 0 ? "warning" : "default",
          },
        ]
      : [
          {
            label: t("kpis.portfolioOccupancy"),
            value: `${managedStats.occupiedSpaces} / ${managedStats.totalSpaces}`,
            helper: t("kpis.portfolioOccupancyHelper", {
              rate: managedStats.occupancyRate,
              properties: managedStats.totalProperties,
              vacant: managedStats.vacantSpaces,
            }),
            href: "/landlord/properties",
          },
          {
            label: t("kpis.rentCollectedMonth"),
            value: formatRwfLocalized(
              managedStats.currentMonthCollectedRwf,
              locale,
            ),
            helper: t("kpis.rentCollectedMonthHelper", {
              rate: managedStats.collectionRate,
              expected: formatRwfLocalized(
                managedStats.currentMonthExpectedRwf,
                locale,
              ),
            }),
            progressPercent: managedStats.collectionRate,
            href: "/landlord/payments",
            accent: "success",
          },
          {
            label: t("kpis.rentCollectedYtd"),
            value: formatRwfLocalized(
              managedStats.ytdRentCollectedRwf,
              locale,
            ),
            helper: t("kpis.rentCollectedYtdHelper"),
            href: "/landlord/payments",
          },
          {
            label: t("kpis.overduePendingRent"),
            value: formatRwfLocalized(
              managedStats.confirmedOverdueRwf,
              locale,
            ),
            helper: t("kpis.overduePendingRentHelper", {
              overdueCount: managedStats.overdueRentersCount,
              pendingAmount: formatRwfLocalized(
                managedStats.pendingVerificationRwf,
                locale,
              ),
            }),
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
    <div className="min-h-0 flex-1 space-y-7 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
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
