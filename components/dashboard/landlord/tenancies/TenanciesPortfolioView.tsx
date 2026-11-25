"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ScrollText } from "lucide-react";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Pagination } from "@/components/shared/Pagination";
import { ViewModeToggle } from "@/components/shared/ViewModeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type {
  LandlordPropertyItem,
  LandlordRenter,
  TenancyStatus,
} from "@/types/landlord";
import { paginateItems } from "@/utils/pagination";
import { findPropertyForRenter } from "@/utils/property-tenancies";
import { TenancyListCard } from "./TenancyListCard";

const ITEMS_PER_PAGE = 6;

interface TenanciesPortfolioViewProps {
  renters?: LandlordRenter[];
  properties?: LandlordPropertyItem[];
}

export function TenanciesPortfolioView({
  renters: fallbackRenters,
  properties: fallbackProperties,
}: TenanciesPortfolioViewProps) {
  const mainRef = useRef<HTMLElement>(null);
  const storeRenters = useLandlordWorkspace((s) => s.renters);
  const storeProperties = useLandlordProperties((s) => s.properties);
  const renters = useMemo(
    () => (storeRenters.length ? storeRenters : (fallbackRenters ?? [])),
    [storeRenters, fallbackRenters],
  );
  const properties = storeProperties.length
    ? storeProperties
    : (fallbackProperties ?? []);

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TenancyStatus>("all");
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | "Paid" | "Pending" | "Overdue"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return renters.filter((renter) => {
      const matchesStatus =
        statusFilter === "all" || renter.tenancyStatus === statusFilter;
      const matchesPayment =
        paymentFilter === "all" || renter.paymentStatus === paymentFilter;
      const matchesQuery =
        !q ||
        renter.name.toLowerCase().includes(q) ||
        renter.propertyName.toLowerCase().includes(q) ||
        renter.unitNumber.toLowerCase().includes(q);
      return matchesStatus && matchesPayment && matchesQuery;
    });
  }, [paymentFilter, renters, search, statusFilter]);

  const {
    items: paginatedRenters,
    page,
    totalPages,
    totalItems,
  } = paginateItems(filtered, currentPage, ITEMS_PER_PAGE);

  const hasFilters =
    Boolean(search) || statusFilter !== "all" || paymentFilter !== "all";

  const handlePageChange = (nextPage: number) => {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
      mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main
      ref={mainRef}
      className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Tenancy Management
          </h2>
          <p className="mt-1 text-sm text-body">
            Manage active lease contracts, renew tenancies, verify monthly rent,
            and close tenancies cleanly.
          </p>
        </div>

        <Link
          href="/landlord/renters/add"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-10 rounded-none text-xs font-semibold",
          )}
        >
          <Plus aria-hidden="true" className="size-4" />
          <span>New Tenancy / Add Renter</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center">
        <DashboardSearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder="Search tenant, property, or unit"
          label="Search tenancies"
          className="w-full lg:flex-1"
        />

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Filter by tenancy status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "all" | TenancyStatus);
              setCurrentPage(1);
            }}
            className="h-10 rounded-none border border-line bg-white px-3 text-xs font-semibold text-ink max-sm:flex-1"
          >
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Ending">Ending soon</option>
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

          <ViewModeToggle
            value={viewMode}
            onChange={setViewMode}
            label="Tenancies layout"
          />
        </div>
      </div>

      {paginatedRenters.length === 0 ? (
        <EmptyStateBox
          icon={ScrollText}
          title={hasFilters ? "No matching tenancies" : "No tenancies yet"}
          description={
            hasFilters
              ? "Try clearing your search or filters to view all tenancies."
              : "Register a renter and assign them to a property to start managing leases."
          }
          action={
            hasFilters ? (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer rounded-none"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setPaymentFilter("all");
                  setCurrentPage(1);
                }}
              >
                Clear filters
              </Button>
            ) : (
              <Link
                href="/landlord/renters/add"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "rounded-none",
                )}
              >
                Add Renter
              </Link>
            )
          }
        />
      ) : (
        <>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                  : "grid grid-cols-1 gap-4"
              }
            >
              {paginatedRenters.map((renter) => (
                <TenancyListCard
                  key={renter.id}
                  renter={renter}
                  property={findPropertyForRenter(renter, properties)}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            itemLabel="tenancies"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}
