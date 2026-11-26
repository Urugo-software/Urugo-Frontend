"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AdminConsentBanner } from "@/components/dashboard/admin/shared/AdminConsentBanner";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { NotificationList } from "./NotificationList";
import { NotificationsHeader } from "./NotificationsHeader";
import { NotificationTabs } from "./NotificationTabs";

export function LandlordNotificationsView() {
  const t = useTranslations("landlord.notifications");
  const {
    serviceMode,
    notifications: allNotifications,
    markAllNotificationsRead,
    markNotificationRead,
    toggleNotificationRead,
    dismissNotification,
  } = useLandlordWorkspace();

  const [activeTab, setActiveTab] = useState("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [search, setSearch] = useState("");

  const scopedNotifications = useMemo(
    () =>
      serviceMode === "listing_only"
        ? allNotifications.filter(
            (item) =>
              item.category === "inquiry" ||
              item.category === "viewing" ||
              item.category === "system",
          )
        : allNotifications,
    [allNotifications, serviceMode],
  );

  const unreadCount = useMemo(
    () => scopedNotifications.filter((item) => item.isUnread).length,
    [scopedNotifications],
  );

  const filteredNotifications = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scopedNotifications.filter((item) => {
      if (activeTab !== "all" && item.category !== activeTab) return false;
      if (unreadOnly && !item.isUnread) return false;
      if (
        q &&
        !item.title.toLowerCase().includes(q) &&
        !item.message.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [activeTab, scopedNotifications, search, unreadOnly]);

  const getTabCount = (tabId: string) =>
    scopedNotifications.filter((item) => {
      if (unreadOnly && !item.isUnread) return false;
      return tabId === "all" || item.category === tabId;
    }).length;

  const resetFilters = () => {
    setActiveTab("all");
    setUnreadOnly(false);
    setSearch("");
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="max-w-7xl space-y-6">
        <AdminConsentBanner party="landlord" />

        <NotificationsHeader
          unreadCount={unreadCount}
          unreadOnly={unreadOnly}
          onToggleUnreadOnly={() => setUnreadOnly((prev) => !prev)}
          onMarkAllRead={markAllNotificationsRead}
        />

        <DashboardSearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("searchPlaceholder")}
          label={t("searchAria")}
          className="max-w-md"
        />

        <NotificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          getCount={getTabCount}
          serviceMode={serviceMode}
        />

        <NotificationList
          items={filteredNotifications}
          hasFilters={activeTab !== "all" || unreadOnly || Boolean(search)}
          onResetFilters={resetFilters}
          onMarkRead={markNotificationRead}
          onToggleRead={toggleNotificationRead}
          onDismiss={dismissNotification}
        />
      </div>
    </div>
  );
}
