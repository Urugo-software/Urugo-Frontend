"use client";

import { cn } from "@/lib/utils";

export const NOTIFICATION_TABS = [
  { id: "all", label: "All" },
  { id: "payment", label: "Payments" },
  { id: "tenancy", label: "Tenancies" },
  { id: "dispute", label: "Disputes" },
  { id: "system", label: "System" },
] as const;

interface NotificationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  getCount: (tabId: string) => number;
}

export function NotificationTabs({
  activeTab,
  onTabChange,
  getCount,
}: NotificationTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Notification categories"
      className="flex items-center gap-2 overflow-x-auto border-b border-line sm:gap-6"
    >
      {NOTIFICATION_TABS.map((tab) => {
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
