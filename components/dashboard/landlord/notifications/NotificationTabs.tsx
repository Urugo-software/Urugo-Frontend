"use client";

export const NOTIFICATION_TABS = [
  { id: "all", label: "All Notifications" },
  { id: "payment", label: "Payments" },
  { id: "tenancy", label: "Tenancies" },
  { id: "dispute", label: "Disputes" },
  { id: "system", label: "System" },
] as const;

export function NotificationTabs({
  activeTab,
  onTabChange,
  getCount,
}: {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  getCount: (tabId: string) => number;
}) {
  return (
    <div
      role="tablist"
      aria-label="Notification categories"
      className="flex items-center gap-1 overflow-x-auto border border-line bg-white p-1"
    >
      {NOTIFICATION_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2 text-[13.5px] font-medium transition-colors ${
              isActive
                ? "bg-brand text-white"
                : "text-body hover:bg-surface hover:text-ink"
            }`}
          >
            {tab.label}
            <span
              className={`text-[11px] font-semibold ${
                isActive ? "text-white/80" : "text-faint"
              }`}
            >
              {getCount(tab.id)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
