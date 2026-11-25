"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandlordInquiry, ViewingRequest } from "@/types/landlord";
import type { ListingOnlyDashboardStats } from "@/utils/landlord-metrics";

interface ListingOverviewPanelsProps {
  stats: ListingOnlyDashboardStats;
  inquiries: LandlordInquiry[];
  viewings: ViewingRequest[];
}

export function ListingOverviewPanels({
  stats,
  inquiries,
  viewings,
}: ListingOverviewPanelsProps) {
  const breakdown = [
    { label: "Published", count: stats.publishedListings, tone: "success" as const },
    { label: "Draft", count: stats.draftListings, tone: "neutral" as const },
    { label: "Paused", count: stats.pausedListings, tone: "warning" as const },
    { label: "Rented", count: stats.rentedListings, tone: "info" as const },
    { label: "Archived", count: stats.archivedListings, tone: "neutral" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Inquiries */}
        <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs sm:p-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Recent Inquiries
              </h3>
              <MessageSquare aria-hidden="true" className="size-4 text-faint" />
            </div>
            <div className="mt-4 divide-y divide-line">
              {inquiries.length === 0 ? (
                <p className="py-6 text-center text-xs text-body">
                  No tenant inquiries yet.
                </p>
              ) : (
                inquiries.slice(0, 3).map((inq) => (
                  <div key={inq.id} className="space-y-1 py-3 first:pt-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-ink">
                        {inq.senderName}
                      </span>
                      <StatusBadge
                        label={inq.status}
                        tone={inq.status === "New" ? "info" : "neutral"}
                      />
                    </div>
                    <p className="truncate text-xs text-faint">
                      {inq.propertyName}
                    </p>
                    <p className="line-clamp-2 text-xs text-body">
                      {inq.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <Link
            href="/landlord/inquiries"
            className="mt-4 inline-flex items-center justify-between border-t border-line pt-3.5 text-xs font-semibold text-ink hover:underline"
          >
            <span>Manage All Inquiries</span>
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        {/* Upcoming Viewings */}
        <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs sm:p-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Viewing Requests
              </h3>
              <Calendar aria-hidden="true" className="size-4 text-faint" />
            </div>
            <div className="mt-4 divide-y divide-line">
              {viewings.length === 0 ? (
                <p className="py-6 text-center text-xs text-body">
                  No viewing requests yet.
                </p>
              ) : (
                viewings.slice(0, 3).map((req) => (
                  <div key={req.id} className="space-y-1 py-3 first:pt-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-ink">
                        {req.requesterName}
                      </span>
                      <StatusBadge
                        label={req.status}
                        tone={
                          req.status === "Confirmed"
                            ? "success"
                            : req.status === "Pending"
                              ? "warning"
                              : req.status === "Rejected"
                                ? "danger"
                                : "info"
                        }
                      />
                    </div>
                    <p className="truncate text-xs text-body">
                      {req.propertyName}
                    </p>
                    <p className="font-ibm text-xs text-faint">
                      {req.preferredDate} · {req.preferredTime}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <Link
            href="/landlord/viewings"
            className="mt-4 inline-flex items-center justify-between border-t border-line pt-3.5 text-xs font-semibold text-ink hover:underline"
          >
            <span>Manage Viewing Requests</span>
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>

        {/* Listing Status Breakdown */}
        <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs sm:p-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Listing Visibility Snapshot
            </h3>
            <div className="mt-4 space-y-2.5">
              {breakdown.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border border-line/70 px-3 py-2"
                >
                  <StatusBadge label={row.label} tone={row.tone} />
                  <span className="font-ibm text-sm font-bold text-ink">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/landlord/properties"
            className="mt-4 inline-flex items-center justify-between border-t border-line pt-3.5 text-xs font-semibold text-ink hover:underline"
          >
            <span>Manage My Properties</span>
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Optional Upgrade Path */}
      <div className="flex flex-col gap-4 border border-blue-200 bg-brand-tint/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Sparkles
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-brand-blue"
          />
          <div>
            <h3 className="text-sm font-bold text-ink">
              Need digital leases, rent tracking, and verified rental history?
            </h3>
            <p className="mt-0.5 text-xs leading-relaxed text-body">
              Upgrade this same landlord account to Urugo Full Rental Management
              whenever you are ready—all existing properties stay intact.
            </p>
          </div>
        </div>
        <Link
          href="/landlord/settings?tab=service"
          className={cn(
            buttonVariants({ variant: "default" }),
            "shrink-0 rounded-none text-xs font-semibold",
          )}
        >
          Explore Managed Tools
        </Link>
      </div>
    </div>
  );
}
