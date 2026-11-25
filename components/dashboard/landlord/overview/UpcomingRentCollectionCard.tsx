"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { LandlordRenter } from "@/types/landlord";
import { formatRwf } from "@/utils/format";

const PAGE_SIZE = 4;

interface UpcomingRentCollectionCardProps {
  renters: LandlordRenter[];
}

export function UpcomingRentCollectionCard({
  renters,
}: UpcomingRentCollectionCardProps) {
  const openRenters = renters.filter((r) => r.tenancyStatus !== "Closed");
  const totalPages = Math.max(1, Math.ceil(openRenters.length / PAGE_SIZE));
  const [page, setPage] = useState(1);
  const safePage = Math.min(page, totalPages);
  const visible = openRenters.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="flex h-full flex-col justify-between space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Rent Collection Status
            </h3>
            <p className="mt-1 text-xs text-body">
              September 2026 · {openRenters.length} active tenancies
            </p>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous renters"
                disabled={safePage === 1}
                onClick={() => setPage(safePage - 1)}
                className="flex size-8 cursor-pointer items-center justify-center border border-line bg-white text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next renters"
                disabled={safePage === totalPages}
                onClick={() => setPage(safePage + 1)}
                className="flex size-8 cursor-pointer items-center justify-center border border-line bg-white text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          )}
        </div>

        {visible.length === 0 ? (
          <p className="py-10 text-center text-xs text-body">
            No active rent obligations for this cycle.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-line">
            {visible.map((renter) => (
              <Link
                key={renter.id}
                href={`/landlord/tenancies/${renter.id}`}
                className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-surface/40 first:pt-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {renter.name}
                  </p>
                  <p className="truncate text-xs text-faint">
                    {renter.propertyName} · {renter.unitNumber}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-ibm text-xs font-bold text-ink">
                    {formatRwf(renter.monthlyRentRwf)}
                  </span>
                  <StatusBadge
                    label={renter.paymentStatus}
                    tone={
                      renter.paymentStatus === "Paid"
                        ? "success"
                        : renter.paymentStatus === "Pending"
                          ? "warning"
                          : "danger"
                    }
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-line pt-3.5">
        <Link
          href="/landlord/payments"
          className="inline-flex w-full items-center justify-between gap-1.5 text-xs font-semibold text-ink hover:underline"
        >
          <span>Open Payments Ledger</span>
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
