"use client";

import { ChevronDown } from "lucide-react";
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

const DEFAULT_FILTER_OPTIONS: Record<string, string> = {
  all: "All statuses",
  Published: "Published",
  Draft: "Draft",
  Paused: "Paused",
  Rented: "Rented",
  Archived: "Archived",
  Occupied: "Fully occupied",
  Partial: "Partially occupied",
  Vacant: "Vacant",
};

const SORT_OPTIONS: Record<PropertySortOrder, string> = {
  default: "Sort: Default",
  name: "Name: A–Z",
  "rent-desc": "Rent: High to Low",
  "rent-asc": "Rent: Low to High",
};

export function PropertiesToolbar(props: ToolbarProps) {
  return (
    <div className="flex flex-col gap-2.5 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center">
      <DashboardSearchInput
        value={props.searchTerm}
        onChange={props.onSearchChange}
        placeholder="Search by name or location"
        label={props.searchLabel ?? "Search properties"}
        className="w-full lg:flex-1"
      />

      <div className="flex flex-wrap items-center gap-2">
        <FilterMenu
          label="Property status"
          value={props.filterStatus}
          onChange={props.onFilterChange}
          options={props.filterOptions ?? DEFAULT_FILTER_OPTIONS}
        />

        {props.sortBy && props.onSortChange && (
          <FilterMenu
            label="Sort properties"
            value={props.sortBy}
            onChange={(val) => props.onSortChange?.(val as PropertySortOrder)}
            options={SORT_OPTIONS}
          />
        )}

        {props.showGroupOrder && (
          <FilterMenu
            label="Group order"
            value={props.groupOrder}
            onChange={props.onOrderChange}
            options={{ custom: "Group order", name: "Group name A–Z" }}
          />
        )}

        <ViewModeToggle
          value={props.viewMode}
          onChange={props.onViewModeChange}
          label="Property display"
        />
      </div>
    </div>
  );
}
