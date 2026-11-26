import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  initialAdminApprovals,
  initialAdminAuditLogs,
  initialAdminCases,
  initialAdminLeases,
  initialAdminNotifications,
  initialAdminPayments,
  initialAdminProperties,
  initialAdminRenterHistory,
  initialAdminSettings,
  initialAdminUsers,
  initialPublicContentConfig,
} from "@/data/admin-seed-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type {
  AdminApprovalPayload,
  AdminApprovalRequest,
  AdminAuditLogEntry,
  AdminCaseRecord,
  AdminCaseStatus,
  AdminFinancialRequest,
  AdminLeaseRecord,
  AdminNotificationItem,
  AdminPaymentRecord,
  AdminPlatformSettings,
  AdminPropertyRecord,
  AdminPublicContentConfig,
  AdminRenterHistoryRecord,
  AdminUserRecord,
  ApprovalActionType,
  SystemRole,
  UserAccountStatus,
  VerificationStatus,
} from "@/types/admin";
import type { IssueStatus, ListingStatus } from "@/types/landlord";
import type { RenterNotificationCategory } from "@/types/renter";
import {
  applyPartyConsentDecision,
  buildExpiryIso,
  canExecuteApproval,
  computeApprovalStatus,
  getApprovingPartyNames,
} from "@/utils/admin-approvals";
import {
  assertAdminPermission,
  validatePolicyInput,
} from "@/utils/admin-permissions";
import { createSafeId } from "@/utils/format";

function nowDisplay(): string {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function pushCrossWorkspaceNotice(
  target: "landlord" | "renter" | "both",
  title: string,
  message: string,
  hrefLandlord = "/landlord/notifications",
  hrefRenter = "/renter/notifications",
  renterCategory: RenterNotificationCategory = "lease",
) {
  if (target === "landlord" || target === "both") {
    useLandlordWorkspace.setState((s) => ({
      notifications: [
        {
          id: createSafeId("l-adm"),
          title,
          message,
          timestamp: "Just now",
          category: "system",
          isUnread: true,
          actionHref: hrefLandlord,
          actionLabel: "Review",
        },
        ...s.notifications,
      ],
    }));
  }
  if (target === "renter" || target === "both") {
    useRenterWorkspace.getState().addNotification({
      title,
      message,
      date: "Just now",
      category: renterCategory,
      read: false,
      href: hrefRenter,
    });
  }
}

interface AdminWorkspaceStore {
  activeRole: SystemRole;
  currentAdminName: string;
  users: AdminUserRecord[];
  properties: AdminPropertyRecord[];
  leases: AdminLeaseRecord[];
  payments: AdminPaymentRecord[];
  financialRequests: AdminFinancialRequest[];
  cases: AdminCaseRecord[];
  renterHistory: AdminRenterHistoryRecord[];
  approvals: AdminApprovalRequest[];
  publicContent: AdminPublicContentConfig;
  settings: AdminPlatformSettings;
  notifications: AdminNotificationItem[];
  /** Append-only immutable audit records; never expose delete/edit actions. */
  auditLogs: AdminAuditLogEntry[];

  setActiveRole: (role: SystemRole) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
  sendPlatformNotice: (input: {
    title: string;
    message: string;
    audience: AdminNotificationItem["audience"];
    channel: string;
  }) => void;

  createAdminAccount: (input: {
    name: string;
    email: string;
    phone: string;
    reason: string;
  }) => void;
  toggleAdminAccountStatus: (userId: string, reason: string) => void;
  verifyUserIdentity: (
    userId: string,
    status: "Verified" | "Rejected" | "Needs Information",
    reason: string,
  ) => void;
  updateUserAccountStatus: (input: {
    userId: string;
    status: UserAccountStatus;
    reason: string;
    evidenceRef?: string;
    emergencyLockout?: boolean;
  }) => void;

  reviewPropertyVerification: (input: {
    propertyId: string;
    decision: VerificationStatus;
    reason: string;
  }) => void;
  updatePropertyListingControl: (input: {
    propertyId: string;
    listingStatus: ListingStatus;
    isSuspended: boolean;
    reason: string;
  }) => void;

  initiateApprovalRequest: (input: {
    actionType: ApprovalActionType;
    title: string;
    targetType: AdminApprovalRequest["targetType"];
    targetId: string;
    reason: string;
    evidenceRef: string;
    requiresLandlord: boolean;
    requiresRenter: boolean;
    payload: AdminApprovalPayload;
  }) => AdminApprovalRequest;
  respondToApprovalRequest: (input: {
    requestId: string;
    party: "landlord" | "renter";
    decision: "Approved" | "Rejected";
    note?: string;
  }) => void;
  cancelApprovalRequest: (requestId: string, reason: string) => void;

  correctLeaseNonMaterialNote: (
    leaseId: string,
    notes: string,
    reason: string,
  ) => void;
  mediateRenterHistory: (input: {
    recordId: string;
    status: Extract<IssueStatus, "Confirmed" | "Resolved" | "Rejected">;
    reason: string;
    evidenceRef: string;
  }) => void;

  updateCaseRecord: (input: {
    caseId: string;
    status?: AdminCaseStatus;
    assignee?: string;
    note?: string;
    reason?: string;
  }) => void;

  requestFinancialAdjustment: (input: {
    transactionId: string;
    requestType: AdminFinancialRequest["requestType"];
    amountRwf: number;
    reason: string;
    evidenceRef: string;
  }) => void;
  cancelFinancialRequest: (requestId: string, reason: string) => void;

  updatePublicContent: (
    next: AdminPublicContentConfig,
    reason: string,
  ) => void;
  updatePlatformSettings: (
    next: AdminPlatformSettings,
    reason: string,
  ) => void;
}

function makeAuditEntry(
  actorName: string,
  actorRole: SystemRole,
  entry: Omit<
    AdminAuditLogEntry,
    "id" | "timestamp" | "actorName" | "actorRole"
  >,
): AdminAuditLogEntry {
  return {
    id: createSafeId("AUD").toUpperCase(),
    timestamp: nowDisplay(),
    actorName,
    actorRole,
    ...entry,
  };
}

export const useAdminWorkspace = create<AdminWorkspaceStore>()(
  persist(
    (set, get) => ({
      activeRole: "ADMIN",
      currentAdminName: "Nadia Kamanzi",
      users: initialAdminUsers,
      properties: initialAdminProperties,
      leases: initialAdminLeases,
      payments: initialAdminPayments,
      financialRequests: [],
      cases: initialAdminCases,
      renterHistory: initialAdminRenterHistory,
      approvals: initialAdminApprovals,
      publicContent: initialPublicContentConfig,
      settings: initialAdminSettings,
      notifications: initialAdminNotifications,
      auditLogs: initialAdminAuditLogs,

      setActiveRole: (activeRole) => set({ activeRole }),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, isUnread: false } : n,
          ),
        })),

      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({
            ...n,
            isUnread: false,
          })),
        })),

      dismissNotification: (id) =>
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        })),

      sendPlatformNotice: ({ title, message, audience, channel }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "admin:access");
        const notice: AdminNotificationItem = {
          id: createSafeId("adm-notif"),
          title,
          message,
          audience,
          channel,
          category: "system",
          createdAt: "Just now",
          isUnread: false,
          href: "/admin/notifications",
          deliveryStatus: "Simulated (In-app only)",
        };
        if (audience === "Landlords" || audience === "All users") {
          pushCrossWorkspaceNotice("landlord", title, message);
        }
        if (audience === "Renters" || audience === "All users") {
          pushCrossWorkspaceNotice("renter", title, message);
        }
        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "config",
          action: "PLATFORM_NOTICE_SENT",
          targetType: "notification",
          targetId: notice.id,
          targetLabel: title,
          reason: `Audience: ${audience} (${channel})`,
          afterValue: notice.deliveryStatus,
          executionStatus: "Executed",
        });
        set((curr) => ({
          notifications: [notice, ...curr.notifications],
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      createAdminAccount: ({ name, email, phone, reason }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "users:manage");
        const check = validatePolicyInput("manage_admin_account", { reason });
        if (!check.valid) throw new Error(check.error);

        const normalizedEmail = email.trim().toLowerCase();
        if (s.users.some((u) => u.email.trim().toLowerCase() === normalizedEmail)) {
          throw new Error("An account with this email address already exists.");
        }

        const nextAdmin: AdminUserRecord = {
          id: createSafeId("usr-adm"),
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
          role: "ADMIN",
          verification: "Verified",
          status: "Active",
          propertiesCount: 0,
          activeLeasesCount: 0,
          registeredAt: "Today",
          lastActivity: "Pending first login",
        };
        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "admin_access",
          action: "ADMIN_ACCOUNT_CREATED",
          targetType: "user",
          targetId: nextAdmin.id,
          targetLabel: name,
          reason,
          afterValue: "ADMIN · Active",
          executionStatus: "Executed",
        });
        set((curr) => ({
          users: [nextAdmin, ...curr.users],
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      toggleAdminAccountStatus: (userId, reason) => {
        const s = get();
        assertAdminPermission(s.activeRole, "users:manage");
        const check = validatePolicyInput("manage_admin_account", { reason });
        if (!check.valid) throw new Error(check.error);

        const target = s.users.find((u) => u.id === userId);
        if (!target || target.role !== "ADMIN") {
          throw new Error("Admin account not found.");
        }
        const activeAdmins = s.users.filter(
          (u) => u.role === "ADMIN" && u.status === "Active",
        );
        const nextStatus: UserAccountStatus =
          target.status === "Active" ? "Disabled" : "Active";
        if (
          nextStatus === "Disabled" &&
          activeAdmins.length <= 1 &&
          target.status === "Active"
        ) {
          throw new Error("Cannot disable the last active ADMIN account.");
        }

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "admin_access",
          action: "ADMIN_ACCESS_UPDATED",
          targetType: "user",
          targetId: target.id,
          targetLabel: target.name,
          reason,
          beforeValue: target.status,
          afterValue: nextStatus,
          executionStatus: "Executed",
        });
        set((curr) => ({
          users: curr.users.map((u) =>
            u.id === userId ? { ...u, status: nextStatus } : u,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      verifyUserIdentity: (userId, status, reason) => {
        const s = get();
        assertAdminPermission(s.activeRole, "users:manage");
        const check = validatePolicyInput("restrict_user", { reason });
        if (!check.valid) throw new Error(check.error);

        const target = s.users.find((u) => u.id === userId);
        if (!target) throw new Error("User not found.");

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "user",
          action: "USER_VERIFICATION_UPDATED",
          targetType: "user",
          targetId: target.id,
          targetLabel: target.name,
          reason,
          beforeValue: target.verification,
          afterValue: status,
          executionStatus: "Executed",
        });
        if (target.role === "LANDLORD" || target.role === "RENTER") {
          pushCrossWorkspaceNotice(
            target.role === "LANDLORD" ? "landlord" : "renter",
            `Identity review: ${status}`,
            `Admin updated your account verification to ${status}. Reason: ${reason}`,
          );
        }
        set((curr) => ({
          users: curr.users.map((u) =>
            u.id === userId ? { ...u, verification: status } : u,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      updateUserAccountStatus: ({
        userId,
        status,
        reason,
        evidenceRef,
        emergencyLockout,
      }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "users:manage");
        const target = s.users.find((u) => u.id === userId);
        if (!target) throw new Error("User not found.");

        const policyKey = emergencyLockout
          ? "emergency_lockout"
          : target.activeLeasesCount > 0 && status === "Suspended"
            ? "suspend_active_user"
            : "restrict_user";
        const check = validatePolicyInput(policyKey, { reason, evidenceRef });
        if (!check.valid) throw new Error(check.error);

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "user",
          action: emergencyLockout
            ? "EMERGENCY_ACCOUNT_LOCKOUT"
            : `ACCOUNT_${status.toUpperCase()}`,
          targetType: "user",
          targetId: target.id,
          targetLabel: target.name,
          reason,
          beforeValue: target.status,
          afterValue: status,
          executionStatus: "Executed",
        });
        if (target.role === "LANDLORD" || target.role === "RENTER") {
          pushCrossWorkspaceNotice(
            target.role === "LANDLORD" ? "landlord" : "renter",
            `Account status updated: ${status}`,
            `Reason: ${reason}. Contact support if you need to submit an appeal.`,
          );
        }
        set((curr) => ({
          users: curr.users.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  status,
                  restrictionReason: status === "Active" ? undefined : reason,
                  emergencyLockout: Boolean(emergencyLockout),
                  pendingPostReview: Boolean(emergencyLockout),
                }
              : u,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      reviewPropertyVerification: ({ propertyId, decision, reason }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "properties:verify");
        const check = validatePolicyInput("verify_property", { reason });
        if (!check.valid) throw new Error(check.error);

        const prop = s.properties.find((p) => p.id === propertyId);
        if (!prop) throw new Error("Property not found.");

        const nextListing: ListingStatus =
          decision === "Verified"
            ? "Published"
            : decision === "Rejected"
              ? "Paused"
              : prop.listingStatus;

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "property",
          action: `PROPERTY_${decision.toUpperCase().replace(/\s+/g, "_")}`,
          targetType: "property",
          targetId: prop.id,
          targetLabel: prop.title,
          reason,
          beforeValue: prop.verification,
          afterValue: decision,
          executionStatus: "Executed",
        });
        pushCrossWorkspaceNotice(
          "landlord",
          `Property verification: ${decision}`,
          `${prop.title} (${prop.id}) marked ${decision}. Note: ${reason}`,
          "/landlord/properties",
        );
        set((curr) => ({
          properties: curr.properties.map((p) =>
            p.id === propertyId
              ? {
                  ...p,
                  verification: decision,
                  listingStatus: nextListing,
                  reviewNotes: reason,
                  updatedAt: "Today",
                }
              : p,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      updatePropertyListingControl: ({
        propertyId,
        listingStatus,
        isSuspended,
        reason,
      }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "properties:moderate");
        const check = validatePolicyInput("moderate_listing", { reason });
        if (!check.valid) throw new Error(check.error);

        const prop = s.properties.find((p) => p.id === propertyId);
        if (!prop) throw new Error("Property not found.");

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "moderation",
          action: isSuspended
            ? "PROPERTY_SUSPENDED"
            : "PROPERTY_VISIBILITY_UPDATED",
          targetType: "property",
          targetId: prop.id,
          targetLabel: prop.title,
          reason,
          beforeValue: `${prop.listingStatus} (suspended=${prop.isSuspended})`,
          afterValue: `${listingStatus} (suspended=${isSuspended})`,
          executionStatus: "Executed",
        });
        pushCrossWorkspaceNotice(
          "landlord",
          `Listing status update for ${prop.title}`,
          `Listing is now ${listingStatus}${isSuspended ? " (Suspended)" : ""}. Reason: ${reason}`,
          "/landlord/properties",
        );
        set((curr) => ({
          properties: curr.properties.map((p) =>
            p.id === propertyId
              ? {
                  ...p,
                  listingStatus,
                  isSuspended,
                  reviewNotes: reason,
                  updatedAt: "Today",
                }
              : p,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      initiateApprovalRequest: ({
        actionType,
        title,
        targetType,
        targetId,
        reason,
        evidenceRef,
        requiresLandlord,
        requiresRenter,
        payload,
      }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "approvals:initiate");
        const policyMap = {
          renter_landlord_association: "initiate_association_consent",
          property_landlord_association: "initiate_property_consent",
          landlord_service_mode_change: "initiate_service_mode_consent",
          lease_material_edit: "initiate_lease_edit_consent",
        } as const;
        const check = validatePolicyInput(policyMap[actionType], {
          reason,
          evidenceRef,
        });
        if (!check.valid) throw new Error(check.error);

        if (
          actionType === "property_landlord_association" &&
          payload.propertyId &&
          payload.landlordId
        ) {
          const prop = s.properties.find((p) => p.id === payload.propertyId);
          if (!prop) throw new Error("Property not found.");
          if (prop.landlordId === payload.landlordId) {
            throw new Error(
              "Selected landlord is already associated with this property.",
            );
          }
        }

        if (
          actionType === "renter_landlord_association" &&
          payload.propertyId &&
          payload.unitLabel
        ) {
          const conflict = s.leases.find(
            (l) =>
              l.propertyId === payload.propertyId &&
              l.unitLabel.trim().toLowerCase() ===
                payload.unitLabel!.trim().toLowerCase() &&
              (l.status === "Active" || l.status === "Ending Soon"),
          );
          if (conflict) {
            throw new Error(
              `Unit ${payload.unitLabel} already has an active lease (${conflict.id}).`,
            );
          }
        }

        const request: AdminApprovalRequest = {
          id: createSafeId("APR").toUpperCase(),
          actionType,
          title,
          targetType,
          targetId,
          initiatedBy: s.currentAdminName,
          reason,
          evidenceRef,
          createdAt: new Date().toISOString(),
          expiresAt: buildExpiryIso(),
          status: "Pending Consent",
          landlordConsent: {
            required: requiresLandlord,
            partyId: payload.landlordId || "",
            partyName: payload.landlordName || "Landlord",
            status: requiresLandlord ? "Pending" : "Approved",
          },
          renterConsent: {
            required: requiresRenter,
            partyId: payload.renterId || "",
            partyName: payload.renterName || "Renter",
            status: requiresRenter ? "Pending" : "Approved",
          },
          payload,
        };

        if (requiresLandlord) {
          pushCrossWorkspaceNotice(
            "landlord",
            `Approval requested: ${title}`,
            `${payload.summary} Reason: ${reason}. Review and approve or reject in your dashboard.`,
          );
        }
        if (requiresRenter) {
          pushCrossWorkspaceNotice(
            "renter",
            `Consent requested: ${title}`,
            `${payload.summary} Reason: ${reason}. Explicit approval is required before any change takes effect.`,
          );
        }

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "approval",
          action: "CONSENT_REQUEST_INITIATED",
          targetType,
          targetId,
          targetLabel: title,
          reason,
          afterValue: payload.summary,
          approvalRequestId: request.id,
          executionStatus: "Pending Consent",
        });

        set((curr) => ({
          approvals: [request, ...curr.approvals],
          auditLogs: [audit, ...curr.auditLogs],
        }));

        return request;
      },

      respondToApprovalRequest: ({ requestId, party, decision, note }) => {
        const s = get();
        const existing = s.approvals.find((a) => a.id === requestId);
        if (!existing) throw new Error("Approval request not found.");

        const liveStatus = computeApprovalStatus(existing);
        if (liveStatus === "Expired") {
          set((curr) => ({
            approvals: curr.approvals.map((a) =>
              a.id === requestId ? { ...a, status: "Expired" } : a,
            ),
          }));
          throw new Error("This approval request has expired and can no longer be executed.");
        }
        if (
          liveStatus === "Executed" ||
          liveStatus === "Cancelled" ||
          liveStatus === "Rejected"
        ) {
          throw new Error(`Approval request is already ${liveStatus.toLowerCase()}.`);
        }

        let updated = applyPartyConsentDecision(
          existing,
          party,
          decision,
          note,
        );
        const logs: AdminAuditLogEntry[] = [
          makeAuditEntry(
            party === "landlord"
              ? existing.landlordConsent.partyName
              : existing.renterConsent.partyName,
            party === "landlord" ? "LANDLORD" : "RENTER",
            {
              category: "approval",
              action: `PARTY_CONSENT_${decision.toUpperCase()}`,
              targetType: existing.targetType,
              targetId: existing.targetId,
              targetLabel: existing.title,
              reason: note?.trim() || `${party} ${decision.toLowerCase()} request`,
              approvalRequestId: existing.id,
              approvingParties: getApprovingPartyNames(updated),
              executionStatus:
                updated.status === "Rejected" ? "Rejected" : "Pending Consent",
            },
          ),
        ];

        const execCheck = canExecuteApproval(updated);
        let nextUsers = s.users;
        let nextProperties = s.properties;
        let nextLeases = s.leases;

        if (execCheck.allowed) {
          updated = {
            ...updated,
            status: "Executed",
            executedAt: new Date().toISOString(),
          };
          const p = updated.payload;

          if (
            updated.actionType === "landlord_service_mode_change" &&
            p.landlordId &&
            p.newServiceMode
          ) {
            nextUsers = nextUsers.map((u) =>
              u.id === p.landlordId ? { ...u, serviceMode: p.newServiceMode } : u,
            );
            useLandlordWorkspace.getState().setServiceMode(p.newServiceMode);
          }

          if (
            updated.actionType === "property_landlord_association" &&
            p.propertyId &&
            p.landlordId &&
            p.landlordName
          ) {
            nextProperties = nextProperties.map((prop) =>
              prop.id === p.propertyId
                ? {
                    ...prop,
                    landlordId: p.landlordId!,
                    landlordName: p.landlordName!,
                    updatedAt: "Today",
                  }
                : prop,
            );
          }

          if (
            updated.actionType === "lease_material_edit" &&
            p.leaseId
          ) {
            nextLeases = nextLeases.map((lease) =>
              lease.id === p.leaseId
                ? {
                    ...lease,
                    rentRwf: p.rentRwf ?? lease.rentRwf,
                    endDate: p.endDate ?? lease.endDate,
                    startDate: p.startDate ?? lease.startDate,
                  }
                : lease,
            );
          }

          if (
            updated.actionType === "renter_landlord_association" &&
            p.renterId &&
            p.landlordId
          ) {
            const newLease: AdminLeaseRecord = {
              id: createSafeId("LS").toUpperCase(),
              renterId: p.renterId,
              renterName: p.renterName || "Renter",
              landlordId: p.landlordId,
              landlordName: p.landlordName || "Landlord",
              propertyId: p.propertyId || "UR-10231",
              propertyTitle: p.propertyTitle || "Assigned Property",
              unitLabel: p.unitLabel || "Unit 1",
              rentRwf: p.rentRwf || 180000,
              depositRwf: p.depositRwf || 180000,
              startDate: p.startDate || new Date().toISOString().slice(0, 10),
              endDate: p.endDate || "2027-11-25",
              status: "Active",
              dueDay: 5,
            };
            nextLeases = [newLease, ...nextLeases];
          }

          pushCrossWorkspaceNotice(
            updated.renterConsent.required ? "both" : "landlord",
            `Approved & executed: ${updated.title}`,
            `All required approvals were received for ${updated.id}.`,
          );

          logs.unshift(
            makeAuditEntry(s.currentAdminName, "ADMIN", {
              category: "approval",
              action: "APPROVED_REQUEST_EXECUTED",
              targetType: updated.targetType,
              targetId: updated.targetId,
              targetLabel: updated.title,
              reason: updated.reason,
              afterValue: updated.payload.summary,
              approvalRequestId: updated.id,
              approvingParties: getApprovingPartyNames(updated),
              executionStatus: "Executed",
            }),
          );
        } else if (updated.status === "Rejected") {
          pushCrossWorkspaceNotice(
            updated.renterConsent.required ? "both" : "landlord",
            `Request declined: ${updated.title}`,
            `No changes were applied for ${updated.id}.`,
          );
        }

        set((curr) => ({
          approvals: curr.approvals.map((a) =>
            a.id === requestId ? updated : a,
          ),
          users: nextUsers,
          properties: nextProperties,
          leases: nextLeases,
          auditLogs: [...logs, ...curr.auditLogs],
        }));
      },

      cancelApprovalRequest: (requestId, reason) => {
        const s = get();
        assertAdminPermission(s.activeRole, "approvals:initiate");
        const check = validatePolicyInput("routine_case_update", { reason });
        if (!check.valid && reason.trim().length < 3) {
          throw new Error("Please enter a cancellation reason.");
        }
        const existing = s.approvals.find((a) => a.id === requestId);
        if (!existing || existing.status === "Executed") {
          throw new Error("Only non-executed requests can be cancelled.");
        }
        pushCrossWorkspaceNotice(
          existing.renterConsent.required ? "both" : "landlord",
          `Request cancelled: ${existing.title}`,
          `Administrator cancelled ${existing.id}. Reason: ${reason}`,
        );
        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "approval",
          action: "CONSENT_REQUEST_CANCELLED",
          targetType: existing.targetType,
          targetId: existing.targetId,
          targetLabel: existing.title,
          reason,
          approvalRequestId: existing.id,
          executionStatus: "Cancelled",
        });
        set((curr) => ({
          approvals: curr.approvals.map((a) =>
            a.id === requestId ? { ...a, status: "Cancelled" } : a,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      correctLeaseNonMaterialNote: (leaseId, notes, reason) => {
        const s = get();
        assertAdminPermission(s.activeRole, "leases:intervene");
        if (reason.trim().length < 5) {
          throw new Error("Reason is required for administrative lease notes.");
        }
        const lease = s.leases.find((l) => l.id === leaseId);
        if (!lease) throw new Error("Lease not found.");
        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "lease",
          action: "LEASE_NON_MATERIAL_NOTE_UPDATED",
          targetType: "lease",
          targetId: lease.id,
          targetLabel: `${lease.propertyTitle} · ${lease.unitLabel}`,
          reason,
          beforeValue: lease.notes || "-",
          afterValue: notes,
          executionStatus: "Executed",
        });
        pushCrossWorkspaceNotice(
          "both",
          `Administrative note added to lease ${lease.id}`,
          `Non-material note updated. Reason: ${reason}`,
        );
        set((curr) => ({
          leases: curr.leases.map((l) =>
            l.id === leaseId ? { ...l, notes } : l,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      mediateRenterHistory: ({ recordId, status, reason, evidenceRef }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "renter_history:mediate");
        const check = validatePolicyInput("mediate_renter_history", {
          reason,
          evidenceRef,
        });
        if (!check.valid) throw new Error(check.error);

        const rec = s.renterHistory.find((r) => r.id === recordId);
        if (!rec) throw new Error("Rental history record not found.");

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "tenancy",
          action: `RENTER_HISTORY_${status.toUpperCase()}`,
          targetType: "renter_history",
          targetId: rec.id,
          targetLabel: `${rec.renterName} — ${rec.recordTitle}`,
          reason: `${reason} (Evidence: ${evidenceRef})`,
          beforeValue: rec.status,
          afterValue: status,
          executionStatus: "Executed",
        });
        pushCrossWorkspaceNotice(
          "both",
          `Rental history review: ${status}`,
          `${rec.recordTitle} (${rec.propertyTitle}) updated to ${status}. Reason: ${reason}`,
          "/landlord/renter-history",
          "/renter/rental-history",
          "history",
        );
        set((curr) => ({
          renterHistory: curr.renterHistory.map((r) =>
            r.id === recordId ? { ...r, status, reviewNote: reason } : r,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      updateCaseRecord: ({ caseId, status, assignee, note, reason }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "cases:resolve");
        const item = s.cases.find((c) => c.id === caseId);
        if (!item) throw new Error("Case not found.");

        if (
          (status === "Resolved" ||
            status === "Rejected" ||
            status === "Escalated") &&
          (!reason || reason.trim().length < 5)
        ) {
          throw new Error("A decision reason is required.");
        }

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: item.kind === "moderation" ? "moderation" : "dispute",
          action: status
            ? `CASE_${status.toUpperCase().replace(/\s+/g, "_")}`
            : "CASE_UPDATED",
          targetType: "case",
          targetId: item.id,
          targetLabel: item.subject,
          reason: reason?.trim() || "Case assignment / investigation note updated.",
          beforeValue: item.status,
          afterValue: status || item.status,
          executionStatus: "Executed",
        });

        set((curr) => ({
          cases: curr.cases.map((c) =>
            c.id === caseId
              ? {
                  ...c,
                  status: status ?? c.status,
                  assignee: assignee ?? c.assignee,
                  notes: note ? [...c.notes, note] : c.notes,
                  resolutionSummary: reason ?? c.resolutionSummary,
                }
              : c,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      requestFinancialAdjustment: ({
        transactionId,
        requestType,
        amountRwf,
        reason,
        evidenceRef,
      }) => {
        const s = get();
        assertAdminPermission(s.activeRole, "payments:request_adjustment");
        const check = validatePolicyInput("request_financial_adjustment", {
          reason,
          evidenceRef,
        });
        if (!check.valid) throw new Error(check.error);

        const req: AdminFinancialRequest = {
          id: createSafeId("FIN").toUpperCase(),
          transactionId,
          requestType,
          amountRwf,
          reason,
          evidenceRef,
          requestedBy: s.currentAdminName,
          createdAt: nowDisplay(),
          status: "Pending Backend Execution",
        };
        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "financial",
          action: "FINANCIAL_ADJUSTMENT_REQUESTED",
          targetType: "payment",
          targetId: transactionId,
          targetLabel: `${requestType} (${amountRwf.toLocaleString()} RWF)`,
          reason: `${reason} (Evidence: ${evidenceRef})`,
          afterValue: "Pending Backend Execution",
          executionStatus: "Pending Backend Execution",
        });
        pushCrossWorkspaceNotice(
          "both",
          `${requestType} request logged for ${transactionId}`,
          `Awaiting payment-provider reconciliation. Reason: ${reason}`,
          "/landlord/payments",
          "/renter/payments",
          "rent",
        );
        set((curr) => ({
          financialRequests: [req, ...curr.financialRequests],
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      cancelFinancialRequest: (requestId, reason) => {
        const s = get();
        assertAdminPermission(s.activeRole, "payments:request_adjustment");
        const req = s.financialRequests.find((f) => f.id === requestId);
        if (!req) throw new Error("Financial request not found.");
        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "financial",
          action: "FINANCIAL_REQUEST_CANCELLED",
          targetType: "payment",
          targetId: req.transactionId,
          targetLabel: req.id,
          reason: reason || "Cancelled by administrator.",
          beforeValue: req.status,
          afterValue: "Cancelled",
          executionStatus: "Cancelled",
        });
        set((curr) => ({
          financialRequests: curr.financialRequests.map((f) =>
            f.id === requestId ? { ...f, status: "Cancelled" } : f,
          ),
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      updatePublicContent: (next, reason) => {
        const s = get();
        assertAdminPermission(s.activeRole, "public_content:manage");
        const check = validatePolicyInput("update_public_content", { reason });
        if (!check.valid) throw new Error(check.error);

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "public_content",
          action: "PUBLIC_CONTENT_UPDATED",
          targetType: "public_content",
          targetId: "platform-public",
          targetLabel: "Public content & featured settings",
          reason,
          beforeValue: `${s.publicContent.featuredPropertyIds.length} featured · ${s.publicContent.faqs.length} FAQs`,
          afterValue: `${next.featuredPropertyIds.length} featured · ${next.faqs.length} FAQs`,
          executionStatus: "Executed",
        });
        set((curr) => ({
          publicContent: next,
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },

      updatePlatformSettings: (next, reason) => {
        const s = get();
        assertAdminPermission(s.activeRole, "settings:manage");
        const check = validatePolicyInput("toggle_maintenance_mode", { reason });
        if (!check.valid) throw new Error(check.error);

        const audit = makeAuditEntry(s.currentAdminName, s.activeRole, {
          category: "config",
          action: "PLATFORM_SETTINGS_UPDATED",
          targetType: "settings",
          targetId: "global-settings",
          targetLabel: "Platform configuration",
          reason,
          beforeValue: `maintenance=${s.settings.maintenanceMode}, verifyBeforePublic=${s.settings.requirePropertyVerificationBeforePublic}`,
          afterValue: `maintenance=${next.maintenanceMode}, verifyBeforePublic=${next.requirePropertyVerificationBeforePublic}`,
          executionStatus: "Executed",
        });
        set((curr) => ({
          settings: next,
          auditLogs: [audit, ...curr.auditLogs],
        }));
      },
    }),
    { name: "urugo-admin-workspace" },
  ),
);
