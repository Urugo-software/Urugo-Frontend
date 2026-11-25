"use client";

import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";

const MIN_VALUES: Array<number | null> = [null, 50000, 100000, 150000, 250000];
const MAX_VALUES: Array<number | null> = [null, 150000, 250000, 400000, 600000];

interface PriceRangeFilterProps {
  minPrice: number | null;
  maxPrice: number | null;
  onMinChange: (value: number | null) => void;
  onMaxChange: (value: number | null) => void;
}

function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  const t = useTranslations("properties.filters");
  const locale = useLocale() as AppLocale;

  const formatOption = (value: number | null, fallback: string) =>
    value === null ? fallback : formatRwfLocalized(value, locale);

  const minLabel = formatOption(minPrice, t("anyMin"));
  const maxLabel = formatOption(maxPrice, t("anyMax"));

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("minRentAria")}
          className="group flex flex-1 cursor-pointer items-center justify-between border border-line bg-white px-3 py-2.5 text-[13px] text-ink hover:bg-surface"
        >
          <span className="truncate">{minLabel}</span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-data-open:rotate-180 group-data-popup-open:rotate-180"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-(--anchor-width) bg-white"
        >
          {MIN_VALUES.map((value) => {
            const label = formatOption(value, t("anyMin"));
            return (
              <DropdownMenuItem
                key={String(value)}
                onClick={() => onMinChange(value)}
              >
                {label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("maxRentAria")}
          className="group flex flex-1 cursor-pointer items-center justify-between border border-line bg-white px-3 py-2.5 text-[13px] text-ink hover:bg-surface"
        >
          <span className="truncate">{maxLabel}</span>
          <ChevronDown
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-data-open:rotate-180 group-data-popup-open:rotate-180"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-(--anchor-width) bg-white"
        >
          {MAX_VALUES.map((value) => {
            const label = formatOption(value, t("anyMax"));
            return (
              <DropdownMenuItem
                key={String(value)}
                onClick={() => onMaxChange(value)}
              >
                {label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PriceRangeFilter;
