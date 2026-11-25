"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ViewMode } from "@/components/dashboard/landlord/properties/PortfolioCard";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { ViewModeToggle } from "@/components/shared/ViewModeToggle";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";

export type DiscoverySort = "default" | "price_asc" | "price_desc";

interface DiscoveryFiltersBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  location: string;
  onLocationChange: (val: string) => void;
  locations: string[];
  beds: string;
  onBedsChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
  sort: DiscoverySort;
  onSortChange: (val: DiscoverySort) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const SELECT_CLS =
  "h-10 rounded-none border border-line bg-white px-3 text-xs font-medium text-ink focus:border-ink focus:outline-none";

export function DiscoveryFiltersBar({
  search,
  onSearchChange,
  location,
  onLocationChange,
  locations,
  beds,
  onBedsChange,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: DiscoveryFiltersBarProps) {
  const t = useTranslations("renter.discovery.filters");
  const locale = useLocale() as AppLocale;

  return (
    <div className="space-y-3 border border-line bg-white p-4 shadow-2xs">
      <div className="flex flex-wrap items-center gap-3">
        <DashboardSearchInput
          value={search}
          onChange={onSearchChange}
          placeholder={t("searchPlaceholder")}
          label={t("searchLabel")}
          showSubmitButton
          className="min-w-0 flex-1"
        />
        <ViewModeToggle
          value={viewMode}
          onChange={onViewModeChange}
          label={t("switchLayoutAria")}
        />
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <select
          aria-label={t("locationAria")}
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className={SELECT_CLS}
        >
          <option value="all">{t("allLocations")}</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          aria-label={t("bedsAria")}
          value={beds}
          onChange={(e) => onBedsChange(e.target.value)}
          className={SELECT_CLS}
        >
          <option value="all">{t("anyBedrooms")}</option>
          <option value="1">{t("beds1")}</option>
          <option value="2">{t("beds2")}</option>
          <option value="3">{t("beds3")}</option>
        </select>

        <select
          aria-label={t("budgetAria")}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className={SELECT_CLS}
        >
          <option value="all">{t("anyBudget")}</option>
          <option value="150000">
            {t("upTo", { amount: formatRwfLocalized(150000, locale) })}
          </option>
          <option value="250000">
            {t("upTo", { amount: formatRwfLocalized(250000, locale) })}
          </option>
          <option value="400000">
            {t("upTo", { amount: formatRwfLocalized(400000, locale) })}
          </option>
        </select>

        <select
          aria-label={t("sortAria")}
          value={sort}
          onChange={(e) => onSortChange(e.target.value as DiscoverySort)}
          className={SELECT_CLS}
        >
          <option value="default">{t("sortDefault")}</option>
          <option value="price_asc">{t("sortAsc")}</option>
          <option value="price_desc">{t("sortDesc")}</option>
        </select>
      </div>
    </div>
  );
}
