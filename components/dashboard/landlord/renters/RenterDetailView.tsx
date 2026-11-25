"use client";

import Link from "next/link";
import { ArrowLeft, FileText, ScrollText, UserX } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { RenterDetailHeader } from "./RenterDetailHeader";
import { RenterHistorySummary } from "./RenterHistorySummary";

export function RenterDetailView({ renterId }: { renterId: string }) {
  const { renters, issues } = useLandlordWorkspace();
  const renter = renters.find((r) => r.id === renterId);

  if (!renter) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
        <EmptyStateBox
          icon={UserX}
          title="Renter not found"
          description="We could not find a renter with this ID in your portfolio."
          action={
            <Link
              href="/landlord/renters"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
            >
              Back to Renters
            </Link>
          }
        />
      </main>
    );
  }

  const renterIssues = issues.filter(
    (i) => i.renterId === renter.id || i.renterName === renter.name,
  );

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/landlord/renters"
          className="inline-flex items-center gap-2 text-sm font-semibold text-body transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>Back to Renters</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/landlord/tenancies/${renter.id}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-9 rounded-none text-xs font-semibold",
            )}
          >
            <ScrollText aria-hidden="true" className="size-3.5" />
            <span>View Tenancy</span>
          </Link>
          {renter.agreementId && (
            <Link
              href={`/landlord/agreements/${renter.agreementId}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-9 rounded-none text-xs font-semibold",
              )}
            >
              <FileText aria-hidden="true" className="size-3.5" />
              <span>Lease Agreement</span>
            </Link>
          )}
        </div>
      </div>

      <RenterDetailHeader renter={renter} />
      <RenterHistorySummary issues={renterIssues} />
    </main>
  );
}
