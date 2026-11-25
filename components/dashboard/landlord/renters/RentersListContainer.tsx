"use client";

import { useMemo, useRef, useState } from "react";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { TenancyStatus } from "@/types/landlord";
import { paginateItems } from "@/utils/pagination";
import { AddRenterAction } from "./AddRenterAction";
import { RenterSearchFilter } from "./RenterSearchFilter";
import { RentersTable } from "./RentersTable";

const ITEMS_PER_PAGE = 6;

export function RentersListContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const renters = useLandlordWorkspace((s) => s.renters);
  const [searchQuery, setSearchQuery] = useState("");
  const [tenancyFilter, setTenancyFilter] = useState<"all" | TenancyStatus>(
    "all",
  );
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | "Paid" | "Pending" | "Overdue"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRenters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const digits = q.replace(/\D/g, "");
    return renters.filter((renter) => {
      const matchesTenancy =
        tenancyFilter === "all" || renter.tenancyStatus === tenancyFilter;
      const matchesPayment =
        paymentFilter === "all" || renter.paymentStatus === paymentFilter;
      const matchesSearch =
        !q ||
        renter.name.toLowerCase().includes(q) ||
        renter.propertyName.toLowerCase().includes(q) ||
        renter.unitNumber.toLowerCase().includes(q) ||
        renter.phone.toLowerCase().includes(q) ||
        (digits.length > 0 && renter.phone.replace(/\D/g, "").includes(digits));
      return matchesTenancy && matchesPayment && matchesSearch;
    });
  }, [paymentFilter, renters, searchQuery, tenancyFilter]);

  const {
    items: paginated,
    page,
    totalPages,
    totalItems,
  } = paginateItems(filteredRenters, currentPage, ITEMS_PER_PAGE);

  const hasFilters =
    Boolean(searchQuery) || tenancyFilter !== "all" || paymentFilter !== "all";

  return (
    <div
      ref={containerRef}
      className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Managed Renters
          </h2>
          <p className="mt-1 text-sm text-body">
            View active tenants connected to your properties and inspect their
            tenancy and payment status.
          </p>
        </div>
        <AddRenterAction />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center">
        <div className="w-full lg:flex-1">
          <RenterSearchFilter
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Filter by tenancy status"
            value={tenancyFilter}
            onChange={(e) => {
              setTenancyFilter(e.target.value as "all" | TenancyStatus);
              setCurrentPage(1);
            }}
            className="h-10 rounded-none border border-line bg-white px-3 text-xs font-semibold text-ink max-sm:flex-1"
          >
            <option value="all">All tenancies</option>
            <option value="Active">Active</option>
            <option value="Ending">Ending</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            aria-label="Filter by payment status"
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(
                e.target.value as "all" | "Paid" | "Pending" | "Overdue",
              );
              setCurrentPage(1);
            }}
            className="h-10 rounded-none border border-line bg-white px-3 text-xs font-semibold text-ink max-sm:flex-1"
          >
            <option value="all">All payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      <RentersTable
        renters={paginated}
        emptyAction={
          hasFilters ? (
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer rounded-none"
              onClick={() => {
                setSearchQuery("");
                setTenancyFilter("all");
                setPaymentFilter("all");
                setCurrentPage(1);
              }}
            >
              Clear filters
            </Button>
          ) : undefined
        }
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        itemLabel="renters"
        onPageChange={(nextPage) => {
          setCurrentPage(nextPage);
          containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
