"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";

export interface AdminFilterConfig {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

interface AdminFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  searchLabel: string;
  filters?: AdminFilterConfig[];
  selectedFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onReset?: () => void;
}

export function AdminFilterBar({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  searchLabel,
  filters = [],
  selectedFilters = {},
  onFilterChange,
  onReset,
}: AdminFilterBarProps) {
  const tActions = useTranslations("common.actions");
  const hasActive =
    Boolean(searchQuery) ||
    Object.values(selectedFilters).some((v) => Boolean(v));

  return (
    <div className="flex flex-col gap-3 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center">
      <div className="w-full lg:flex-1">
        <DashboardSearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          label={searchLabel}
          preventFormEnter
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <select
            key={filter.key}
            aria-label={filter.label}
            value={selectedFilters[filter.key] ?? ""}
            onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
            className="h-10 rounded-none border border-line bg-white px-3 text-xs font-semibold text-ink max-sm:flex-1"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {hasActive && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 cursor-pointer items-center gap-1.5 border border-line bg-surface px-3 text-xs font-semibold text-ink hover:bg-line/50"
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
            <span>{tActions("reset")}</span>
          </button>
        )}
      </div>
    </div>
  );
}
