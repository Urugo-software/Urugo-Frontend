"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { ViewModeToggle } from "@/components/shared/ViewModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ViewMode } from "./PortfolioCard";

export type PropertySortOrder = "default" | "name" | "rent-desc" | "rent-asc";

interface ToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchLabel?: string;
  filterStatus: string;
  onFilterChange: (value: string) => void;
  filterOptions?: Record<string, string>;
  sortBy?: PropertySortOrder;
  onSortChange?: (value: PropertySortOrder) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  groupOrder: string;
  onOrderChange: (value: string) => void;
  showGroupOrder: boolean;
}

function FilterMenu({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-10 min-w-0 cursor-pointer rounded-none px-3 text-xs font-semibold max-sm:flex-1"
            aria-label={`${label}: ${options[value] ?? value}`}
          >
            <span className="truncate">{options[value] ?? value}</span>
            <ChevronDown aria-hidden="true" className="size-3.5 shrink-0" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-auto min-w-44 rounded-none">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {Object.entries(options).map(([key, text]) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {text}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PropertiesToolbar(props: ToolbarProps) {
  const t = useTranslations("landlord.properties.toolbar");
  const tStatuses = useTranslations("landlord.properties.statuses");

  const defaultFilterOptions: Record<string, string> = {
    all: tStatuses("all"),
    Published: tStatuses("Published"),
    Draft: tStatuses("Draft"),
    Paused: tStatuses("Paused"),
    Rented: tStatuses("Rented"),
    Archived: tStatuses("Archived"),
    Occupied: tStatuses("Occupied"),
    Partial: tStatuses("Partial"),
    Vacant: tStatuses("Vacant"),
  };

  const sortOptions: Record<PropertySortOrder, string> = {
    default: t("sortDefault"),
    name: t("sortName"),
    "rent-desc": t("sortRentDesc"),
    "rent-asc": t("sortRentAsc"),
  };

  return (
    <div className="flex flex-col gap-2.5 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center">
      <DashboardSearchInput
        value={props.searchTerm}
        onChange={props.onSearchChange}
        placeholder={t("searchPlaceholder")}
        label={props.searchLabel ?? t("defaultSearchLabel")}
        className="w-full lg:flex-1"
      />

      <div className="flex flex-wrap items-center gap-2">
        <FilterMenu
          label={t("propertyStatusLabel")}
          value={props.filterStatus}
          onChange={props.onFilterChange}
          options={props.filterOptions ?? defaultFilterOptions}
        />

        {props.sortBy && props.onSortChange && (
          <FilterMenu
            label={t("sortLabel")}
            value={props.sortBy}
            onChange={(val) => props.onSortChange?.(val as PropertySortOrder)}
            options={sortOptions}
          />
        )}

        {props.showGroupOrder && (
          <FilterMenu
            label={t("groupOrderLabel")}
            value={props.groupOrder}
            onChange={props.onOrderChange}
            options={{
              custom: t("groupOrderCustom"),
              name: t("groupOrderName"),
            }}
          />
        )}

        <ViewModeToggle
          value={props.viewMode}
          onChange={props.onViewModeChange}
          label={t("displayLabel")}
        />
      </div>
    </div>
  );
}
