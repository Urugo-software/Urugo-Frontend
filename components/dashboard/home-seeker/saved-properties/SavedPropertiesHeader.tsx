"use client";

import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";
import Dropdown from "@/components/shared/Dropdown";
import { sortOptions } from "@/data/properties";

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
      <p className="text-[15px] text-body mb-6">
        View properties you&apos;ve bookmarked while browsing.
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <span className="text-[14.5px] text-body capitalize">
          <strong className="text-ink text-md">{totalCount}</strong> saved
          properties
        </span>
        <Dropdown
          className="text-ink! hover:bg-brand! hover:text-white! duration-300 px-5! cursor-pointer font-semibold flex gap-2"
          menuList={sortOptions}
          defaultMenu={sortOptions[0].name}
          onSelectValue={onSortChange}
          selectedValue={sortBy}
        />
      </div>
    </div>
  );
}
