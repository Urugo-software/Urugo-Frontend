import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockAgreements } from "@/data/mock-agreements";
import {
  mockLandlordNotifications,
  mockLandlordRenters,
  mockLandlordSettings,
  mockNotificationPreferences,
  mockRentalIssues,
  mockTenancyPayments,
} from "@/data/landlord-data";
import {
  mockContactVisibility,
  mockLandlordInquiries,
  mockViewingRequests,
} from "@/data/landlord-leads-data";
import type { Agreement, AgreementStatus } from "@/types/agreement.types";
import type {
  ContactVisibilitySettings,
  InquiryStatus,
  IssueStatus,
  LandlordInquiry,
  LandlordNotificationItem,
  LandlordProfileSettings,
  LandlordRenter,
  LandlordServiceMode,
  PaymentRejectionCategory,
  RentalIssue,
  TenancyPayment,
  ViewingRequest,
} from "@/types/landlord";
import { createSafeId } from "@/utils/format";
import { doesRejectionCreateUnpaidBalance } from "@/utils/rental-debt";

const initialNotifPrefs: Record<string, boolean> = Object.fromEntries(
  mockNotificationPreferences.map((pref) => [pref.id, pref.defaultChecked]),
);

interface LandlordWorkspaceStore {
  serviceMode: LandlordServiceMode;
  profile: LandlordProfileSettings;
  contactVisibility: ContactVisibilitySettings;
  notificationPrefs: Record<string, boolean>;
  renters: LandlordRenter[];
  agreements: Agreement[];
  payments: TenancyPayment[];
  issues: RentalIssue[];
  inquiries: LandlordInquiry[];
  viewings: ViewingRequest[];
  notifications: LandlordNotificationItem[];

  setServiceMode: (mode: LandlordServiceMode) => void;
  updateProfile: (changes: Partial<LandlordProfileSettings>) => void;
  updateContactVisibility: (changes: Partial<ContactVisibilitySettings>) => void;
  updateNotificationPrefs: (prefs: Record<string, boolean>) => void;

  addRenter: (renter: LandlordRenter) => void;
  renewTenancy: (
    renterId: string,
    updates: { endDate: string; monthlyRentRwf?: number },
  ) => void;
  closeTenancy: (renterId: string) => void;

  upsertAgreement: (agreement: Agreement) => void;
  updateAgreementStatus: (id: string, status: AgreementStatus) => void;

  approvePayment: (paymentId: string) => void;
  rejectPayment: (
    paymentId: string,
    category: PaymentRejectionCategory,
    reason: string,
  ) => void;

  createIssue: (issue: Omit<RentalIssue, "id">) => RentalIssue;
  updateIssueStatus: (issueId: string, status: IssueStatus) => void;
  submitIssueDispute: (
    issueId: string,
    renterResponse: string,
    evidenceTitle?: string,
  ) => void;

  addInquiry: (
    inquiry: Omit<LandlordInquiry, "id" | "createdAt" | "status" | "replies">,
  ) => LandlordInquiry;
  replyToInquiry: (
    inquiryId: string,
    text: string,
    sender?: "landlord" | "seeker",
  ) => void;
  updateInquiryStatus: (inquiryId: string, status: InquiryStatus) => void;

  addViewingRequest: (
    request: Omit<ViewingRequest, "id" | "createdAt" | "status">,
  ) => ViewingRequest;
  confirmViewing: (viewingId: string) => void;
  rescheduleViewing: (
    viewingId: string,
    preferredDate: string,
    preferredTime: string,
  ) => void;
  rejectViewing: (viewingId: string, rejectionReason: string) => void;
  cancelViewingRequest: (viewingId: string) => void;

  markNotificationRead: (id: string) => void;
  toggleNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
}

export const useLandlordWorkspace = create<LandlordWorkspaceStore>()(
  persist(
    (set) => ({
      serviceMode: "managed",
      profile: mockLandlordSettings,
      contactVisibility: mockContactVisibility,
      notificationPrefs: initialNotifPrefs,
      renters: mockLandlordRenters,
      agreements: mockAgreements,
      payments: mockTenancyPayments,
      issues: mockRentalIssues,
      inquiries: mockLandlordInquiries,
      viewings: mockViewingRequests,
      notifications: mockLandlordNotifications,

      setServiceMode: (serviceMode) => set({ serviceMode }),

      updateProfile: (changes) =>
        set((s) => ({ profile: { ...s.profile, ...changes } })),

      updateContactVisibility: (changes) =>
        set((s) => ({
          contactVisibility: { ...s.contactVisibility, ...changes },
        })),

      updateNotificationPrefs: (notificationPrefs) =>
        set({ notificationPrefs }),

      addRenter: (renter) =>
        set((s) => ({
          renters: [renter, ...s.renters],
          notifications: [
            {
              id: createSafeId("notif"),
              title: "New Renter Registered",
              message: `${renter.name} was assigned to ${renter.propertyName} (${renter.unitNumber}).`,
              timestamp: "Just now",
              category: "tenancy",
              isUnread: true,
              actionHref: `/landlord/renters/${renter.id}`,
              actionLabel: "View Renter",
            },
            ...s.notifications,
          ],
        })),

      renewTenancy: (renterId, { endDate, monthlyRentRwf }) =>
        set((s) => ({
          renters: s.renters.map((r) =>
            r.id === renterId
              ? {
                  ...r,
                  tenancyStatus: "Active",
                  endDate,
                  monthlyRentRwf: monthlyRentRwf ?? r.monthlyRentRwf,
                }
              : r,
          ),
        })),

      closeTenancy: (renterId) =>
        set((s) => ({
          renters: s.renters.map((r) =>
            r.id === renterId ? { ...r, tenancyStatus: "Closed" } : r,
          ),
        })),

      upsertAgreement: (agreement) =>
        set((s) => {
          const exists = s.agreements.some((a) => a.id === agreement.id);
          return {
            agreements: exists
              ? s.agreements.map((a) => (a.id === agreement.id ? agreement : a))
              : [agreement, ...s.agreements],
          };
        }),

      updateAgreementStatus: (id, status) =>
        set((s) => ({
          agreements: s.agreements.map((a) =>
            a.id === id
              ? { ...a, status, updatedAt: new Date().toISOString() }
              : a,
          ),
        })),

      approvePayment: (paymentId) =>
        set((s) => {
          const target = s.payments.find((p) => p.id === paymentId);
          const today = new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const payments = s.payments.map((p) =>
            p.id === paymentId
              ? {
                  ...p,
                  status: "Approved" as const,
                  paidAt: today,
                  createsUnpaidBalance: false,
                }
              : p,
          );
          const renters = target?.renterId
            ? s.renters.map((r) =>
                r.id === target.renterId
                  ? { ...r, paymentStatus: "Paid" as const }
                  : r,
              )
            : s.renters;
          return { payments, renters };
        }),

      rejectPayment: (paymentId, rejectionCategory, rejectionReason) =>
        set((s) => {
          const createsUnpaidBalance =
            doesRejectionCreateUnpaidBalance(rejectionCategory);
          const target = s.payments.find((p) => p.id === paymentId);
          const payments = s.payments.map((p) =>
            p.id === paymentId
              ? {
                  ...p,
                  status: "Rejected" as const,
                  rejectionCategory,
                  rejectionReason,
                  createsUnpaidBalance,
                }
              : p,
          );
          const renters =
            target?.renterId && createsUnpaidBalance
              ? s.renters.map((r) =>
                  r.id === target.renterId
                    ? { ...r, paymentStatus: "Overdue" as const }
                    : r,
                )
              : s.renters;
          return { payments, renters };
        }),

      createIssue: (input) => {
        const issue: RentalIssue = { ...input, id: createSafeId("iss") };
        set((s) => ({ issues: [issue, ...s.issues] }));
        return issue;
      },

      updateIssueStatus: (issueId, status) =>
        set((s) => ({
          issues: s.issues.map((i) =>
            i.id === issueId
              ? {
                  ...i,
                  status,
                  daysRemaining:
                    status === "Resolved" ||
                    status === "Confirmed" ||
                    status === "Rejected"
                      ? 0
                      : i.daysRemaining,
                }
              : i,
          ),
        })),

      submitIssueDispute: (issueId, renterResponse, evidenceTitle) =>
        set((s) => ({
          issues: s.issues.map((i) =>
            i.id === issueId
              ? {
                  ...i,
                  status: "Disputed" as const,
                  renterResponse: renterResponse.trim(),
                  evidence: evidenceTitle
                    ? {
                        title: evidenceTitle,
                        type: "Payment Proof",
                        verified: false,
                      }
                    : i.evidence,
                }
              : i,
          ),
          notifications: [
            {
              id: createSafeId("notif"),
              title: "Renter Dispute Submitted",
              message: `A renter submitted a dispute response for case ${issueId}.`,
              timestamp: "Just now",
              category: "dispute",
              isUnread: true,
              actionHref: `/landlord/renter-history/${issueId}`,
              actionLabel: "Review Dispute",
            },
            ...s.notifications,
          ],
        })),

      addInquiry: (input) => {
        const inquiry: LandlordInquiry = {
          ...input,
          id: createSafeId("inq"),
          createdAt: "Just now",
          status: "New",
          replies: [],
        };
        set((s) => ({
          inquiries: [inquiry, ...s.inquiries],
          notifications: [
            {
              id: createSafeId("notif"),
              title: "New Property Inquiry",
              message: `${inquiry.senderName} inquired about ${inquiry.propertyName}.`,
              timestamp: "Just now",
              category: "inquiry",
              isUnread: true,
              actionHref: "/landlord/inquiries",
              actionLabel: "View Inquiry",
            },
            ...s.notifications,
          ],
        }));
        return inquiry;
      },

      replyToInquiry: (inquiryId, text, sender = "landlord") =>
        set((s) => ({
          inquiries: s.inquiries.map((inq) =>
            inq.id === inquiryId
              ? {
                  ...inq,
                  status: sender === "landlord" ? ("Replied" as const) : ("New" as const),
                  replies: [
                    ...inq.replies,
                    {
                      id: createSafeId("rep"),
                      sender,
                      text,
                      timestamp: "Just now",
                    },
                  ],
                }
              : inq,
          ),
        })),

      updateInquiryStatus: (inquiryId, status) =>
        set((s) => ({
          inquiries: s.inquiries.map((inq) =>
            inq.id === inquiryId ? { ...inq, status } : inq,
          ),
        })),

      addViewingRequest: (input) => {
        const viewing: ViewingRequest = {
          ...input,
          id: createSafeId("view"),
          createdAt: "Just now",
          status: "Pending",
        };
        set((s) => ({
          viewings: [viewing, ...s.viewings],
          notifications: [
            {
              id: createSafeId("notif"),
              title: "New Viewing Request",
              message: `${viewing.requesterName} requested a viewing for ${viewing.propertyName} on ${viewing.preferredDate}.`,
              timestamp: "Just now",
              category: "viewing",
              isUnread: true,
              actionHref: "/landlord/viewings",
              actionLabel: "Manage Viewing",
            },
            ...s.notifications,
          ],
        }));
        return viewing;
      },

      confirmViewing: (viewingId) =>
        set((s) => ({
          viewings: s.viewings.map((v) =>
            v.id === viewingId ? { ...v, status: "Confirmed" as const } : v,
          ),
        })),

      rescheduleViewing: (viewingId, preferredDate, preferredTime) =>
        set((s) => ({
          viewings: s.viewings.map((v) =>
            v.id === viewingId
              ? {
                  ...v,
                  preferredDate,
                  preferredTime,
                  status: "Rescheduled" as const,
                }
              : v,
          ),
        })),

      rejectViewing: (viewingId, rejectionReason) =>
        set((s) => ({
          viewings: s.viewings.map((v) =>
            v.id === viewingId
              ? { ...v, status: "Rejected" as const, rejectionReason }
              : v,
          ),
        })),

      cancelViewingRequest: (viewingId) =>
        set((s) => ({
          viewings: s.viewings.filter((v) => v.id !== viewingId),
        })),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, isUnread: false } : n,
          ),
        })),

      toggleNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, isUnread: !n.isUnread } : n,
          ),
        })),

      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, isUnread: false })),
        })),

      dismissNotification: (id) =>
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: "urugo-landlord-workspace",
      skipHydration: true,
    },
  ),
);
