"use client";

import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";

interface SavedPropertiesHeaderProps {
  totalCount: number;
  sortBy: string;
  onSortChange: (val: string) => void;
}

export function SavedPropertiesHeader({
  totalCount,
  sortBy,
  onSortChange,
}: SavedPropertiesHeaderProps) {
  return (
    <div className="mb-7">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h1 className="text-[26px] sm:text-[28px] font-extrabold text-ink">
          Saved Properties
        </h1>
        <Link href="/properties">
          <CustomButton
            variant="light"
            title="Browse more"
            className="text-[13.5px] px-3 rounded-none"
          />
        </Link>
      </div>
      <p className="text-[14px] text-body mb-6">
        {totalCount} properties you&apos;ve bookmarked while browsing.
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <span className="text-[13.5px] text-body">
          <strong className="text-ink">{totalCount}</strong> saved properties
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-1.5 text-[13px] text-ink outline-none focus:border-brand"
        >
          <option value="recent">Sort: Recently saved</option>
          <option value="price_low">Sort: Price — low to high</option>
          <option value="rated">Sort: Highest rated</option>
        </select>
      </div>
    </div>
  );
}
