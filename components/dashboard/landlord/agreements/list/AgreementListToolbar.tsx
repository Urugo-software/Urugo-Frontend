"use client";

import Link from "next/link";
import { Plus, Search, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AgreementFilterTab } from "@/types/agreement.types";
import { AGREEMENT_TABS } from "./agreement-list.config";

interface AgreementListToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTab: AgreementFilterTab;
  onTabChange: (tab: AgreementFilterTab) => void;
  newAgreementHref: string;
}

export function AgreementListToolbar({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  newAgreementHref,
}: AgreementListToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint"
          />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by renter, reference, or property..."
            className="h-11 rounded-none border-line bg-white pl-10 pr-9 text-[15px] text-ink placeholder:text-faint"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-faint hover:text-ink"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <Link
          href={newAgreementHref}
          aria-label="New Agreement"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 shrink-0 rounded-none border-line bg-white px-3.5 text-ink md:hidden",
          )}
        >
          <Plus className="size-4" />
          <span className="text-sm font-semibold">New</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto border-b border-line sm:gap-6">
        {AGREEMENT_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "-mb-px cursor-pointer whitespace-nowrap border-b-2 px-2 pb-3 pt-1 text-sm sm:text-[15px] transition-colors sm:px-0",
                isActive
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent font-medium text-body hover:border-line hover:text-ink",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
