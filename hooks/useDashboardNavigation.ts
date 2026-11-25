"use client";

import { useMemo } from "react";
import {
  adminNavItems,
  getLandlordNavItems,
  getRenterNavItems,
  isNavItemActive,
  roleNavItems,
  type NavItemConfig,
} from "@/data/dashboard-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RoleType } from "@/types";
import { isIssueActionable } from "@/utils/rental-debt";
import { getInitials } from "@/utils/renter-helpers";

export function useDashboardNavigation(
  pathname: string,
  fallbackRole: RoleType = "home_seeker",
) {
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const landlordProfile = useLandlordWorkspace((s) => s.profile);
  const inquiries = useLandlordWorkspace((s) => s.inquiries);
  const viewings = useLandlordWorkspace((s) => s.viewings);
  const landlordPayments = useLandlordWorkspace((s) => s.payments);
  const issues = useLandlordWorkspace((s) => s.issues);
  const landlordNotifications = useLandlordWorkspace((s) => s.notifications);

  const renterProfile = useRenterWorkspace((s) => s.profile);
  const renterPayments = useRenterWorkspace((s) => s.payments);
  const renterMaintenance = useRenterWorkspace((s) => s.maintenance);
  const renterNotifications = useRenterWorkspace((s) => s.notifications);

  const isAdmin = pathname.startsWith("/admin");
  const isLandlord = pathname.startsWith("/landlord");
  const isRenter = pathname.startsWith("/renter");
  const derivedRole: RoleType = isRenter
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
      const relevantNotifications = landlordNotifications.filter(
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
        payments: landlordPayments.filter((p) => p.status === "Pending").length,
        issues: issues.filter((i) => isIssueActionable(i.status)).length,
        notifications: relevantNotifications.length,
      });
    }

    if (isRenter) {
      const renterNameLower = renterProfile.name.trim().toLowerCase();
      const myIssues = issues.filter(
        (i) =>
          i.renterName.trim().toLowerCase() === renterNameLower ||
          i.id === "iss-501",
      );
      const myActiveLeads =
        inquiries.filter(
          (i) =>
            i.senderName.trim().toLowerCase() === renterNameLower &&
            i.status !== "Archived",
        ).length +
        viewings.filter(
          (v) =>
            v.requesterName.trim().toLowerCase() === renterNameLower &&
            v.status !== "Rejected",
        ).length;

      return getRenterNavItems({
        activeInquiries: myActiveLeads,
        pendingPayments: renterPayments.filter((p) => p.status !== "Paid").length,
        activeMaintenance: renterMaintenance.filter(
          (m) => m.status === "Pending" || m.status === "In Progress",
        ).length,
        actionableIssues: myIssues.filter((i) => isIssueActionable(i.status))
          .length,
        unreadNotifications: renterNotifications.filter((n) => !n.read).length,
      });
    }

    return roleNavItems[derivedRole] || roleNavItems.home_seeker;
  }, [
    derivedRole,
    inquiries,
    isAdmin,
    isLandlord,
    isRenter,
    issues,
    landlordNotifications,
    landlordPayments,
    renterMaintenance,
    renterNotifications,
    renterPayments,
    renterProfile.name,
    serviceMode,
    viewings,
  ]);

  const persona = isAdmin
    ? { initials: "AD", name: "Urugo Admin", subtitle: "Platform administrator" }
    : isLandlord
      ? {
          initials: getInitials(landlordProfile.fullName),
          name: landlordProfile.fullName,
          subtitle:
            serviceMode === "listing_only"
              ? "Listing-only landlord"
              : "Managed landlord",
        }
      : isRenter
        ? {
            initials: getInitials(renterProfile.name),
            name: renterProfile.name,
            subtitle: `Unit ${renterProfile.unitNumber} · ${renterProfile.propertyName}`,
          }
        : { initials: "YK", name: "Yves Kamanzi", subtitle: "Home seeker" };

  const activeWorkspaceRole: "renter" | "landlord" | "home_seeker" | "admin" =
    isAdmin ? "admin" : derivedRole;

  return {
    isAdmin,
    isLandlord,
    isRenter,
    activeWorkspaceRole,
    serviceMode,
    rootHref,
    navList,
    persona,
    isActive: (href: string) => isNavItemActive(pathname, href, rootHref),
  };
}
