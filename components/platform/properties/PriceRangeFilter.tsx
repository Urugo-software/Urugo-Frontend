"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const MIN_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: "Any min", value: null },
  { label: "50,000 RWF", value: 50000 },
  { label: "100,000 RWF", value: 100000 },
  { label: "150,000 RWF", value: 150000 },
  { label: "250,000 RWF", value: 250000 },
];

const MAX_OPTIONS: Array<{ label: string; value: number | null }> = [
  { label: "Any max", value: null },
  { label: "150,000 RWF", value: 150000 },
  { label: "250,000 RWF", value: 250000 },
  { label: "400,000 RWF", value: 400000 },
  { label: "600,000 RWF", value: 600000 },
];

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
  const minLabel =
    MIN_OPTIONS.find((opt) => opt.value === minPrice)?.label ?? "Any min";
  const maxLabel =
    MAX_OPTIONS.find((opt) => opt.value === maxPrice)?.label ?? "Any max";

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Minimum monthly rent"
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
          {MIN_OPTIONS.map((opt) => (
            <DropdownMenuItem
              key={opt.label}
              onClick={() => onMinChange(opt.value)}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Maximum monthly rent"
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
          {MAX_OPTIONS.map((opt) => (
            <DropdownMenuItem
              key={opt.label}
              onClick={() => onMaxChange(opt.value)}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PriceRangeFilter;
