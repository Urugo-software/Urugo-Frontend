"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Calendar, Compass } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { RenterInquiryCard, RenterViewingCard } from "./RenterLeadCards";

type LeadTab = "all" | "viewings" | "inquiries";

export function RenterInquiriesView() {
  const [tab, setTab] = useState<LeadTab>("all");
  const profile = useRenterWorkspace((s) => s.profile);
  const allInquiries = useLandlordWorkspace((s) => s.inquiries);
  const allViewings = useLandlordWorkspace((s) => s.viewings);

  const renterNameLower = profile.name.trim().toLowerCase();

  const myViewings = useMemo(
    () =>
      allViewings.filter(
        (v) =>
          v.requesterName.trim().toLowerCase() === renterNameLower ||
          v.requesterEmail.toLowerCase() === profile.email.toLowerCase(),
      ),
    [allViewings, profile.email, renterNameLower],
  );

  const myInquiries = useMemo(
    () =>
      allInquiries.filter(
        (i) =>
          i.senderName.trim().toLowerCase() === renterNameLower ||
          i.senderEmail.toLowerCase() === profile.email.toLowerCase(),
      ),
    [allInquiries, profile.email, renterNameLower],
  );

  const showViewings = tab === "all" || tab === "viewings";
  const showInquiries = tab === "all" || tab === "inquiries";
  const hasVisibleItems =
    (showViewings && myViewings.length > 0) ||
    (showInquiries && myInquiries.length > 0);

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Inquiries &amp; Viewing Requests
          </h2>
          <p className="mt-1 text-sm text-body">
            Track property visit schedules and landlord responses in one place.
          </p>
        </div>

        <Link
          href="/renter/explore"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-9 rounded-none px-4 text-xs font-semibold",
          )}
        >
          <Compass aria-hidden="true" className="size-4" />
          Browse Listings
        </Link>
      </div>

      <div
        role="tablist"
        aria-label="Filter inquiries and visits"
        className="flex items-center gap-6 border-b border-line"
      >
        {(
          [
            { id: "all", label: "All", count: myViewings.length + myInquiries.length },
            { id: "viewings", label: "Viewing Requests", count: myViewings.length },
            { id: "inquiries", label: "Inquiries", count: myInquiries.length },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "-mb-px flex cursor-pointer items-center gap-2 border-b-2 pb-3 pt-1 text-sm transition-colors",
              tab === item.id
                ? "border-ink font-semibold text-ink"
                : "border-transparent font-medium text-body hover:text-ink",
            )}
          >
            <span>{item.label}</span>
            <span className="font-ibm text-xs text-faint">{item.count}</span>
          </button>
        ))}
      </div>

      {!hasVisibleItems ? (
        <EmptyStateBox
          icon={Calendar}
          title="No inquiries or viewing requests yet"
          description="Explore available homes to send an inquiry or schedule an in-person property visit."
          action={
            <Link
              href="/renter/explore"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
            >
              Explore Homes
            </Link>
          }
        />
      ) : (
        <div className="space-y-6">
          {showViewings && myViewings.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Viewing Requests ({myViewings.length})
              </h3>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {myViewings.map((viewing) => (
                  <RenterViewingCard key={viewing.id} viewing={viewing} />
                ))}
              </div>
            </section>
          )}

          {showInquiries && myInquiries.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Property Inquiries ({myInquiries.length})
              </h3>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {myInquiries.map((inquiry) => (
                  <RenterInquiryCard key={inquiry.id} inquiry={inquiry} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
