"use client";

import { useMemo, useState } from "react";
import { mockLandlordNotifications } from "@/data/landlord-data";
import type { LandlordNotificationItem } from "@/types/landlord";
import { NotificationsHeader } from "./NotificationsHeader";
import { NotificationTabs } from "./NotificationTabs";
import { NotificationList } from "./NotificationList";

export function LandlordNotificationsView() {
  const [notifications, setNotifications] = useState<
    LandlordNotificationItem[]
  >(mockLandlordNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.isUnread).length,
    [notifications],
  );

  const filteredNotifications = useMemo(
    () =>
      notifications.filter((item) => {
        if (activeTab !== "all" && item.category !== activeTab) return false;
        if (unreadOnly && !item.isUnread) return false;
        return true;
      }),
    [notifications, activeTab, unreadOnly],
  );

  const getTabCount = (tabId: string) =>
    notifications.filter((item) => {
      if (unreadOnly && !item.isUnread) return false;
      return tabId === "all" || item.category === tabId;
    }).length;

  const markAllRead = () =>
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isUnread: false })),
    );

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isUnread: false } : item,
      ),
    );

  const toggleRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isUnread: !item.isUnread } : item,
      ),
    );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((item) => item.id !== id));

  const resetFilters = () => {
    setActiveTab("all");
    setUnreadOnly(false);
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="max-w-7xl space-y-6">
        <NotificationsHeader
          unreadCount={unreadCount}
          unreadOnly={unreadOnly}
          onToggleUnreadOnly={() => setUnreadOnly((prev) => !prev)}
          onMarkAllRead={markAllRead}
        />

        <NotificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          getCount={getTabCount}
        />

        <NotificationList
          items={filteredNotifications}
          hasFilters={activeTab !== "all" || unreadOnly}
          onResetFilters={resetFilters}
          onMarkRead={markRead}
          onToggleRead={toggleRead}
          onDismiss={dismiss}
        />
      </div>
    </div>
  );
}
