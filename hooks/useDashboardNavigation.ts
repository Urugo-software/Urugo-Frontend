"use client";

import { useMemo } from "react";
import {
  adminNavItems,
  getLandlordNavItems,
  isNavItemActive,
  roleNavItems,
  type NavItemConfig,
} from "@/data/dashboard-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { RoleType } from "@/types";
import { isIssueActionable } from "@/utils/rental-debt";

function getInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function useDashboardNavigation(
  pathname: string,
  fallbackRole: RoleType = "home_seeker",
) {
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const profile = useLandlordWorkspace((s) => s.profile);
  const inquiries = useLandlordWorkspace((s) => s.inquiries);
  const viewings = useLandlordWorkspace((s) => s.viewings);
  const payments = useLandlordWorkspace((s) => s.payments);
  const issues = useLandlordWorkspace((s) => s.issues);
  const notifications = useLandlordWorkspace((s) => s.notifications);

  const isAdmin = pathname.startsWith("/admin");
  const isLandlord = pathname.startsWith("/landlord");
  const derivedRole: RoleType = pathname.startsWith("/renter")
    ? "renter"
    : isLandlord
      ? "landlord"
      : fallbackRole;

  const rootHref = isAdmin
    ? "/admin"
    : `/${derivedRole === "home_seeker" ? "home-seeker" : derivedRole}`;

  const navList: NavItemConfig[] = useMemo(() => {
    if (isAdmin) return adminNavItems;
    if (isLandlord) {
      const relevantNotifications = notifications.filter(
        (n) =>
          n.isUnread &&
          (serviceMode === "managed" ||
            n.category === "inquiry" ||
            n.category === "viewing" ||
            n.category === "system"),
      );
      return getLandlordNavItems(serviceMode, {
        inquiries: inquiries.filter((i) => i.status === "New").length,
        viewings: viewings.filter((v) => v.status === "Pending").length,
        payments: payments.filter((p) => p.status === "Pending").length,
        issues: issues.filter((i) => isIssueActionable(i.status)).length,
        notifications: relevantNotifications.length,
      });
    }
    return roleNavItems[derivedRole] || roleNavItems.home_seeker;
  }, [
    derivedRole,
    inquiries,
    isAdmin,
    isLandlord,
    issues,
    notifications,
    payments,
    serviceMode,
    viewings,
  ]);

  const persona = isAdmin
    ? { initials: "AD", name: "Urugo Admin", subtitle: "Platform administrator" }
    : isLandlord
      ? {
          initials: getInitials(profile.fullName) || "LD",
          name: profile.fullName,
          subtitle:
            serviceMode === "listing_only"
              ? "Listing-only landlord"
              : "Managed landlord",
        }
      : { initials: "YK", name: "Yves Kamanzi", subtitle: "Guest account" };

  return {
    isAdmin,
    isLandlord,
    serviceMode,
    rootHref,
    navList,
    persona,
    isActive: (href: string) => isNavItemActive(pathname, href, rootHref),
  };
}
