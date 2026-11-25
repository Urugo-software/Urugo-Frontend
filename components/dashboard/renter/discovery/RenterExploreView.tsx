"use client";

import { useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Pagination } from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { listed_properties } from "@/data/properties";
import { paginateItems } from "@/utils/pagination";
import { parseListingPrice } from "@/utils/renter-helpers";
import {
  DiscoveryFiltersBar,
  type DiscoverySort,
} from "./DiscoveryFiltersBar";
import {
  RenterDiscoveryCard,
  type DiscoveryListingItem,
} from "./RenterDiscoveryCard";
import { RenterInquiryModal } from "./RenterInquiryModal";
import { RenterViewingModal } from "./RenterViewingModal";

const ITEMS_PER_PAGE = 6;

export function RenterExploreView() {
  const t = useTranslations("renter.discovery.explore");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [beds, setBeds] = useState("all");
  const [maxPrice, setMaxPrice] = useState("all");
  const [sort, setSort] = useState<DiscoverySort>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const [inquiryTarget, setInquiryTarget] =
    useState<DiscoveryListingItem | null>(null);
  const [viewingTarget, setViewingTarget] =
    useState<DiscoveryListingItem | null>(null);

  const locations = useMemo(
    () => Array.from(new Set(listed_properties.map((p) => p.location))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const minBeds = beds === "all" ? 0 : Number(beds);
    const budgetCap = maxPrice === "all" ? Infinity : Number(maxPrice);

    const list = listed_properties.filter((item) => {
      if (location !== "all" && item.location !== location) return false;
      if (item.beds < minBeds) return false;
      if (parseListingPrice(item.price) > budgetCap) return false;
      if (!q) return true;
      return `${item.headline} ${item.location} ${item.ownerName}`
        .toLowerCase()
        .includes(q);
    });

    if (sort === "price_asc") {
      return [...list].sort(
        (a, b) => parseListingPrice(a.price) - parseListingPrice(b.price),
      );
    }
    if (sort === "price_desc") {
      return [...list].sort(
        (a, b) => parseListingPrice(b.price) - parseListingPrice(a.price),
      );
    }
    return list;
  }, [beds, location, maxPrice, search, sort]);

  const paginated = paginateItems(filtered, page, ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearch("");
    setLocation("all");
    setBeds("all");
    setMaxPrice("all");
    setSort("default");
    setPage(1);
  };

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
      </div>

      <DiscoveryFiltersBar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        location={location}
        onLocationChange={(v) => {
          setLocation(v);
          setPage(1);
        }}
        locations={locations}
        beds={beds}
        onBedsChange={(v) => {
          setBeds(v);
          setPage(1);
        }}
        maxPrice={maxPrice}
        onMaxPriceChange={(v) => {
          setMaxPrice(v);
          setPage(1);
        }}
        sort={sort}
        onSortChange={setSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {paginated.items.length === 0 ? (
        <EmptyStateBox
          icon={Compass}
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          action={
            <Button
              type="button"
              variant="outline"
              onClick={resetFilters}
              className="cursor-pointer rounded-none"
            >
              {t("resetFilters")}
            </Button>
          }
        />
      ) : (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                : "grid grid-cols-1 gap-4"
            }
          >
            {paginated.items.map((item) => (
              <RenterDiscoveryCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                onInquire={setInquiryTarget}
                onRequestViewing={setViewingTarget}
              />
            ))}
          </div>

          <Pagination
            currentPage={paginated.page}
            totalPages={paginated.totalPages}
            onPageChange={setPage}
            totalItems={paginated.totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            itemLabel={t("paginationLabel")}
          />
        </>
      )}

      {inquiryTarget && (
        <RenterInquiryModal
          open
          onClose={() => setInquiryTarget(null)}
          propertyId={inquiryTarget.id}
          propertyTitle={inquiryTarget.headline}
        />
      )}

      {viewingTarget && (
        <RenterViewingModal
          open
          onClose={() => setViewingTarget(null)}
          propertyId={viewingTarget.id}
          propertyTitle={viewingTarget.headline}
        />
      )}
    </div>
  );
}
