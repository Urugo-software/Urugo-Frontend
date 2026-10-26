"use client";

import { useState } from "react";
import { mockLandlordNotifications } from "@/data/landlord-data";
import { LandlordNotificationItem } from "@/types/landlord";
import { NotificationsHeader } from "./NotificationsHeader";
import { NotificationTabs } from "./NotificationTabs";
import { NotificationList } from "./NotificationList";

export function LandlordNotificationsView() {
  const [notifications, setNotifications] = useState<
    LandlordNotificationItem[]
  >(mockLandlordNotifications);
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const filteredNotifications = notifications.filter(
    (n) => activeTab === "all" || n.category === activeTab,
  );

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const getTabCount = (tabId: string) =>
    tabId === "all"
      ? notifications.length
      : notifications.filter((n) => n.category === tabId).length;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="space-y-6">
        <NotificationsHeader
          unreadCount={unreadCount}
          onMarkAllRead={handleMarkAllRead}
        />

        <NotificationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          getCount={getTabCount}
        />

        <NotificationList items={filteredNotifications} />
      </div>
    </div>
  );
}
