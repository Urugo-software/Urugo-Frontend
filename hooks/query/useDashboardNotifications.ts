"use client";

import { useMemo } from "react";
import { adminDirectories } from "@/data/admin-dashboard-data";
import { notificationsData } from "@/data/home-seeker-data";
import { mockRenterNotifications } from "@/data/renter-extra-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { HeaderNotificationPreviewItem } from "@/types/dashboard-notifications.types";

export function useDashboardNotifications(pathname: string) {
  const landlordNotifications = useLandlordWorkspace((s) => s.notifications);
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const markLandlordRead = useLandlordWorkspace((s) => s.markNotificationRead);
  const markAllLandlordRead = useLandlordWorkspace(
    (s) => s.markAllNotificationsRead,
  );

  const isLandlord = pathname.startsWith("/landlord");

  return useMemo(() => {
    let viewAllHref = "/home-seeker/notifications";
    let items: HeaderNotificationPreviewItem[] = [];
    let unreadCount = 0;

    if (isLandlord) {
      viewAllHref = "/landlord/notifications";
      const scoped =
        serviceMode === "listing_only"
          ? landlordNotifications.filter(
              (n) =>
                n.category === "inquiry" ||
                n.category === "viewing" ||
                n.category === "system",
            )
          : landlordNotifications;

      unreadCount = scoped.filter((n) => n.isUnread).length;
      items = scoped.slice(0, 5).map((n) => ({
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
      unreadCount = mockRenterNotifications.filter((n) => !n.read).length;
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
      unreadCount = adminRows.filter((r) => r.delivery !== "Delivered").length;
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
      unreadCount = notificationsData.filter((n) => n.unread).length;
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

    return {
      items,
      unreadCount,
      hasUnread: unreadCount > 0,
      viewAllHref,
      onMarkRead: isLandlord ? markLandlordRead : undefined,
      onMarkAllRead: isLandlord ? markAllLandlordRead : undefined,
    };
  }, [
    isLandlord,
    landlordNotifications,
    markAllLandlordRead,
    markLandlordRead,
    pathname,
    serviceMode,
  ]);
}
