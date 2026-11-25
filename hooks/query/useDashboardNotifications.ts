"use client";

import { useMemo } from "react";
import { adminDirectories } from "@/data/admin-dashboard-data";
import { notificationsData } from "@/data/home-seeker-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { HeaderNotificationPreviewItem } from "@/types/dashboard-notifications.types";

export function useDashboardNotifications(pathname: string) {
  const landlordNotifications = useLandlordWorkspace((s) => s.notifications);
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const markLandlordRead = useLandlordWorkspace((s) => s.markNotificationRead);
  const markAllLandlordRead = useLandlordWorkspace(
    (s) => s.markAllNotificationsRead,
  );

  const renterNotifications = useRenterWorkspace((s) => s.notifications);
  const markRenterRead = useRenterWorkspace((s) => s.markNotificationRead);
  const markAllRenterRead = useRenterWorkspace(
    (s) => s.markAllNotificationsRead,
  );

  const isLandlord = pathname.startsWith("/landlord");
  const isRenter = pathname.startsWith("/renter");

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
    } else if (isRenter) {
      viewAllHref = "/renter/notifications";
      unreadCount = renterNotifications.filter((n) => !n.read).length;
      items = renterNotifications.slice(0, 5).map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        timestamp: n.date,
        isUnread: !n.read,
        categoryLabel: n.category,
        href: n.href || "/renter/notifications",
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
      onMarkRead: isLandlord
        ? markLandlordRead
        : isRenter
          ? markRenterRead
          : undefined,
      onMarkAllRead: isLandlord
        ? markAllLandlordRead
        : isRenter
          ? markAllRenterRead
          : undefined,
    };
  }, [
    isLandlord,
    isRenter,
    landlordNotifications,
    markAllLandlordRead,
    markAllRenterRead,
    markLandlordRead,
    markRenterRead,
    pathname,
    renterNotifications,
    serviceMode,
  ]);
}
