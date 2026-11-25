"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { cn } from "@/lib/utils";
import type { AgreementFilterTab } from "@/types/agreement.types";
import { AGREEMENT_TABS } from "./agreement-list.config";

interface AgreementListToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTab: AgreementFilterTab;
  onTabChange: (tab: AgreementFilterTab) => void;
  onNewAgreement: () => void;
}

export function AgreementListToolbar({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  onNewAgreement,
}: AgreementListToolbarProps) {
  const t = useTranslations("landlord.agreements");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 sm:justify-between">
        <DashboardSearchInput
          value={searchQuery}
          onChange={onSearchChange}
          label={t("list.searchLabel")}
          placeholder={t("list.searchPlaceholder")}
          className="flex-1 sm:max-w-md"
        />

        <button
          type="button"
          onClick={onNewAgreement}
          aria-label={t("header.newAgreement")}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 shrink-0 cursor-pointer rounded-none border-line bg-white px-3.5 text-ink md:hidden",
          )}
        >
          <Plus className="size-4" />
          <span className="text-sm font-semibold">{t("list.newShort")}</span>
        </button>
      </div>

      <div
        role="tablist"
        aria-label={t("list.tabsAriaLabel")}
        className="flex items-center gap-2 overflow-x-auto border-b border-line sm:gap-6"
      >
        {AGREEMENT_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "-mb-px cursor-pointer whitespace-nowrap border-b-2 px-2 pb-3 pt-1 text-sm transition-colors sm:px-0 sm:text-[15px]",
                isActive
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent font-medium text-body hover:border-line hover:text-ink",
              )}
            >
              {t(`list.tabs.${tab.id}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
