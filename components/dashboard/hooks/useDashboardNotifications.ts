"use client";

import { useMemo } from "react";
import { adminDirectories } from "@/data/admin-dashboard-data";
import { notificationsData } from "@/data/home-seeker-data";
import { mockLandlordNotifications } from "@/data/landlord-data";
import { mockRenterNotifications } from "@/data/renter-extra-data";
import { HeaderNotificationPreviewItem } from "../types/dashboard-notifications.types";

export function useDashboardNotifications(pathname: string) {
  return useMemo(() => {
    let viewAllHref = "/home-seeker/notifications";
    let items: HeaderNotificationPreviewItem[] = [];

    if (pathname.startsWith("/landlord")) {
      viewAllHref = "/landlord/notifications";
      items = mockLandlordNotifications.slice(0, 4).map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        timestamp: n.timestamp,
        isUnread: n.isUnread,
        categoryLabel: n.category,
        href: n.actionHref || "/landlord/notifications",
      }));
    } else if (pathname.startsWith("/renter")) {
      viewAllHref = "/renter/notifications";
      items = mockRenterNotifications.slice(0, 4).map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        timestamp: n.date,
        isUnread: !n.read,
        categoryLabel: n.category,
        href: "/renter/notifications",
      }));
    } else if (pathname.startsWith("/admin")) {
      viewAllHref = "/admin/notifications";
      const adminRows = adminDirectories.notifications?.rows || [];
      items = adminRows.slice(0, 4).map((row, idx) => ({
        id: `admin-notif-${idx}`,
        title: row.title || "Admin Notification",
        message: `${row.audience || "All users"} · ${row.channel || "Platform"}`,
        timestamp: row.created || "Recently",
        isUnread: row.delivery !== "Delivered",
        categoryLabel: row.audience,
        href: "/admin/notifications",
      }));
    } else {
      viewAllHref = "/home-seeker/notifications";
      items = notificationsData.slice(0, 4).map((n, idx) => ({
        id: `seeker-notif-${idx}`,
        title: n.title,
        message: n.detail,
        timestamp: n.time,
        isUnread: !!n.unread,
        categoryLabel: "Visit",
        href: "/home-seeker/notifications",
      }));
    }

    const unreadCount = items.filter((item) => item.isUnread).length;
    const hasUnread = unreadCount > 0;

    return {
      items,
      unreadCount,
      hasUnread,
      viewAllHref,
    };
  }, [pathname]);
}
