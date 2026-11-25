"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { Pagination } from "@/components/shared/Pagination";
import { ViewModeToggle } from "@/components/shared/ViewModeToggle";
import type { LandlordPropertyItem, LandlordRenter } from "@/types/landlord";
import { paginateItems } from "@/utils/pagination";
import { findPropertyForRenter } from "@/utils/property-tenancies";
import { TenancyListCard } from "./TenancyListCard";

const ITEMS_PER_PAGE = 6;

interface TenanciesPortfolioViewProps {
  renters: LandlordRenter[];
  properties: LandlordPropertyItem[];
}

export function TenanciesPortfolioView({
  renters,
  properties,
}: TenanciesPortfolioViewProps) {
  const mainRef = useRef<HTMLElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    items: paginatedRenters,
    page,
    totalPages,
    totalItems,
  } = paginateItems(renters, currentPage, ITEMS_PER_PAGE);

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
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Tenancy Management
          </h1>
          <p className="mt-1.5 text-[15px] text-body">
            Manage active lease contracts, review monthly rent payments, and close
            tenancies cleanly.
          </p>
        </div>

        <ViewModeToggle
          value={viewMode}
          onChange={setViewMode}
          label="Tenancies layout"
        />
      </div>

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
    </main>
  );
}
