"use client";

import { useMemo, useState } from "react";
import { CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { AdminConsentBanner } from "@/components/dashboard/admin/shared/AdminConsentBanner";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { Button } from "@/components/ui/button";
import { useRenterNotifications } from "@/hooks/query/renter.hooks";
import { cn } from "@/lib/utils";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { NotificationList } from "./NotificationList";

const TABS = [
  "all",
  "rent",
  "maintenance",
  "lease",
  "history",
  "inquiry",
] as const;

export function RenterNotificationsView() {
  const t = useTranslations("renter.notifications");
  const { isLoading, isError, refetch } = useRenterNotifications();
  const notifications = useRenterWorkspace((s) => s.notifications);
  const markRead = useRenterWorkspace((s) => s.markNotificationRead);
  const toggleRead = useRenterWorkspace((s) => s.toggleNotificationRead);
  const markAllRead = useRenterWorkspace((s) => s.markAllNotificationsRead);
  const dismiss = useRenterWorkspace((s) => s.dismissNotification);

  const [activeTab, setActiveTab] = useState("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notifications.filter((n) => {
      if (activeTab !== "all" && n.category !== activeTab) return false;
      if (unreadOnly && n.read) return false;
      if (!q) return true;
      return `${n.title} ${n.message}`.toLowerCase().includes(q);
    });
  }, [activeTab, notifications, search, unreadOnly]);

  if (isLoading) return <SectionLoading message={t("loading")} />;
  if (isError) {
    return (
      <SectionError
        message={t("loadError")}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className=" max-w-7xl space-y-6">
        <AdminConsentBanner party="renter" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {t("title")}
              </h2>
              {unreadCount > 0 && (
                <span className="text-sm font-semibold text-brand-blue">
                  {t("unreadCount", { count: unreadCount })}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={unreadOnly ? "default" : "outline"}
              aria-pressed={unreadOnly}
              onClick={() => setUnreadOnly((prev) => !prev)}
              className="h-9 cursor-pointer rounded-none px-3.5 text-xs font-semibold"
            >
              {t("unreadOnly")}
            </Button>
            {unreadCount > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={markAllRead}
                className="h-9 cursor-pointer rounded-none px-3.5 text-xs font-semibold"
              >
                <CheckCheck aria-hidden="true" className="size-4" />
                {t("markAllRead")}
              </Button>
            )}
          </div>
        </div>

        <DashboardSearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("searchPlaceholder")}
          label={t("searchLabel")}
          className="max-w-md"
        />

        <div
          role="tablist"
          aria-label={t("categoriesAria")}
          className="flex items-center gap-4 overflow-x-auto border-b border-line sm:gap-6"
        >
          {TABS.map((tabId) => {
            const count = notifications.filter((n) => {
              if (unreadOnly && n.read) return false;
              return tabId === "all" || n.category === tabId;
            }).length;
            return (
              <button
                key={tabId}
                type="button"
                role="tab"
                aria-selected={activeTab === tabId}
                onClick={() => setActiveTab(tabId)}
                className={cn(
                  "-mb-px flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap border-b-2 pb-3 pt-1 text-sm transition-colors",
                  activeTab === tabId
                    ? "border-ink font-semibold text-ink"
                    : "border-transparent font-medium text-body hover:text-ink",
                )}
              >
                <span>{t(`categories.${tabId}`)}</span>
                {count > 0 && (
                  <span className="font-ibm text-xs text-faint">{count}</span>
                )}
              </button>
            );
          })}
        </div>

        <NotificationList
          items={filtered}
          hasFilters={
            activeTab !== "all" || unreadOnly || Boolean(search.trim())
          }
          onResetFilters={() => {
            setActiveTab("all");
            setUnreadOnly(false);
            setSearch("");
          }}
          onMarkRead={markRead}
          onToggleRead={toggleRead}
          onDismiss={dismiss}
        />
      </div>
    </div>
  );
}
