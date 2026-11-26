"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  getAdminNavItems,
  getLandlordNavItems,
  getRenterNavItems,
  isNavItemActive,
  roleNavItems,
  type NavItemConfig,
} from "@/data/dashboard-data";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RoleType } from "@/types";
import { isIssueActionable } from "@/utils/rental-debt";
import { getInitials } from "@/utils/renter-helpers";

export function useDashboardNavigation(
  pathname: string,
  fallbackRole: RoleType = "home_seeker",
) {
  const tNav = useTranslations("common.navigation");
  const tWorkspace = useTranslations("common.workspace");
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

  const currentAdminName = useAdminWorkspace((s) => s.currentAdminName);
  const adminApprovals = useAdminWorkspace((s) => s.approvals);
  const adminProperties = useAdminWorkspace((s) => s.properties);
  const adminCases = useAdminWorkspace((s) => s.cases);
  const adminNotifications = useAdminWorkspace((s) => s.notifications);

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

  const rawNavList: NavItemConfig[] = useMemo(() => {
    if (isAdmin) {
      return getAdminNavItems({
        approvals: adminApprovals.filter(
          (a) => a.status === "Pending Consent" || a.status === "Approved",
        ).length,
        verification: adminProperties.filter(
          (p) =>
            p.verification === "Pending" ||
            p.verification === "Needs Information",
        ).length,
        complaints: adminCases.filter(
          (c) =>
            c.kind === "complaint" &&
            c.status !== "Resolved" &&
            c.status !== "Rejected",
        ).length,
        notifications: adminNotifications.filter((n) => n.isUnread).length,
      });
    }

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
    adminApprovals,
    adminCases,
    adminNotifications,
    adminProperties,
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

  const navList: NavItemConfig[] = useMemo(
    () =>
      rawNavList.map((item) => ({
        ...item,
        label: item.labelKey ? tNav(item.labelKey) : item.label,
      })),
    [rawNavList, tNav],
  );

  const persona = isAdmin
    ? {
        initials: getInitials(currentAdminName),
        name: currentAdminName,
        subtitle: tWorkspace("adminSubtitle"),
      }
    : isLandlord
      ? {
          initials: getInitials(landlordProfile.fullName),
          name: landlordProfile.fullName,
          subtitle:
            serviceMode === "listing_only"
              ? tWorkspace("listingOnlyLandlord")
              : tWorkspace("managedLandlord"),
        }
      : isRenter
        ? {
            initials: getInitials(renterProfile.name),
            name: renterProfile.name,
            subtitle: tWorkspace("renterUnitSubtitle", {
              unit: renterProfile.unitNumber,
              property: renterProfile.propertyName,
            }),
          }
        : {
            initials: "YK",
            name: "Yves Kamanzi",
            subtitle: tWorkspace("visitorSubtitle"),
          };

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
