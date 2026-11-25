"use client";

import { cn } from "@/lib/utils";
import type { LandlordServiceMode } from "@/types/landlord";

export const NOTIFICATION_TABS = [
  { id: "all", label: "All", managedOnly: false },
  { id: "inquiry", label: "Inquiries", managedOnly: false },
  { id: "viewing", label: "Viewings", managedOnly: false },
  { id: "payment", label: "Payments", managedOnly: true },
  { id: "tenancy", label: "Tenancies", managedOnly: true },
  { id: "dispute", label: "Disputes", managedOnly: true },
  { id: "system", label: "System", managedOnly: false },
] as const;

interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  getCount: (tabId: string) => number;
  serviceMode?: LandlordServiceMode;
}

export function NotificationTabs({
  activeTab,
  onTabChange,
  getCount,
  serviceMode = "managed",
}: NotificationTabsProps) {
  const tabs =
    serviceMode === "listing_only"
      ? NOTIFICATION_TABS.filter((tab) => !tab.managedOnly)
      : NOTIFICATION_TABS;

  return (
    <div
      role="tablist"
      aria-label="Notification categories"
      className="flex items-center gap-2 overflow-x-auto border-b border-line sm:gap-6"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = getCount(tab.id);
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "-mb-px flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap border-b-2 px-2 pb-3 pt-1 text-sm transition-colors sm:px-0 sm:text-[15px]",
              isActive
                ? "border-ink font-semibold text-ink"
                : "border-transparent font-medium text-body hover:border-line hover:text-ink",
            )}
          >
            <span>{tab.label}</span>
            {count > 0 && (
              <span className="font-ibm text-[13px] text-faint">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
