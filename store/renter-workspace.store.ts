import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockInitialMessages } from "@/data/messages-data";
import {
  mockRenterLease,
  mockRenterPayments,
  mockRenterProfile,
  mockRenterProperty,
} from "@/data/renter-data";
import {
  mockRenterDocuments,
  mockRenterMaintenance,
  mockRenterNotificationPrefs,
  mockRenterNotifications,
} from "@/data/renter-extra-data";
import type { ChatMessage } from "@/types/messages";
import type {
  RenterDocument,
  RenterLease,
  RenterMaintenance,
  RenterNotification,
  RenterPayment,
  RenterProfile,
  RenterProperty,
  RenterSupportTicket,
} from "@/types/renter";
import { createSafeId, formatRwf } from "@/utils/format";

const initialNotifPrefs: Record<string, boolean> = Object.fromEntries(
  mockRenterNotificationPrefs.map((pref) => [pref.id, pref.defaultOn]),
);

function formatToday(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface RenterWorkspaceStore {
  profile: RenterProfile;
  property: RenterProperty;
  lease: RenterLease;
  payments: RenterPayment[];
  maintenance: RenterMaintenance[];
  documents: RenterDocument[];
  notifications: RenterNotification[];
  notificationPrefs: Record<string, boolean>;
  messages: ChatMessage[];
  supportTickets: RenterSupportTicket[];

  updateProfile: (changes: Partial<RenterProfile>) => void;
  updateNotificationPrefs: (prefs: Record<string, boolean>) => void;

  recordRentPayment: (input: {
    paymentId?: string;
    paymentMethod: string;
    amountRwf: number;
    referenceNumber?: string;
    receiptName?: string;
    period?: string;
  }) => RenterPayment;

  addMaintenanceRequest: (input: {
    title: string;
    category: string;
    priority: RenterMaintenance["priority"];
    description: string;
  }) => RenterMaintenance;
  cancelMaintenanceRequest: (id: string) => void;

  markNotificationRead: (id: string) => void;
  toggleNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
  addNotification: (notif: Omit<RenterNotification, "id">) => void;

  sendMessage: (text: string) => ChatMessage;
  addSupportTicket: (input: {
    subject: string;
    category: string;
    message: string;
  }) => RenterSupportTicket;
}

export const useRenterWorkspace = create<RenterWorkspaceStore>()(
  persist(
    (set, get) => ({
      profile: mockRenterProfile,
      property: mockRenterProperty,
      lease: mockRenterLease,
      payments: mockRenterPayments,
      maintenance: mockRenterMaintenance,
      documents: mockRenterDocuments,
      notifications: mockRenterNotifications,
      notificationPrefs: initialNotifPrefs,
      messages: mockInitialMessages,
      supportTickets: [],

      updateProfile: (changes) =>
        set((s) => ({ profile: { ...s.profile, ...changes } })),

      updateNotificationPrefs: (notificationPrefs) =>
        set({ notificationPrefs }),

      recordRentPayment: (input) => {
        const today = formatToday();
        const state = get();
        const target =
          (input.paymentId
            ? state.payments.find((p) => p.id === input.paymentId)
            : state.payments.find((p) => p.status !== "Paid")) ?? undefined;

        const referenceNumber =
          input.referenceNumber?.trim() ||
          createSafeId("REF").toUpperCase();

        const updatedPayment: RenterPayment = target
          ? {
              ...target,
              amountRwf: input.amountRwf,
              status: "Paid",
              paymentType: input.paymentMethod,
              paidAt: today,
              referenceNumber,
              receiptName: input.receiptName,
            }
          : {
              id: createSafeId("pay"),
              amountRwf: input.amountRwf,
              dueDate: today,
              paidAt: today,
              status: "Paid",
              paymentType: input.paymentMethod,
              period: input.period || "Current Month",
              referenceNumber,
              receiptName: input.receiptName,
            };

        const payments = target
          ? state.payments.map((p) => (p.id === target.id ? updatedPayment : p))
          : [updatedPayment, ...state.payments];

        const receiptDoc: RenterDocument = {
          id: createSafeId("doc"),
          title: `Rent Receipt — ${updatedPayment.period}`,
          category: "Payment Receipt",
          date: today,
          size: "240 KB",
          referenceId: updatedPayment.id,
          summary: `Payment of ${formatRwf(updatedPayment.amountRwf)} via ${input.paymentMethod} (Ref: ${referenceNumber}).`,
        };

        const notif: RenterNotification = {
          id: createSafeId("rnotif"),
          title: "Rent Payment Submitted",
          message: `Payment of ${formatRwf(updatedPayment.amountRwf)} for ${updatedPayment.period} was recorded via ${input.paymentMethod}.`,
          date: today,
          read: false,
          category: "rent",
          href: "/renter/payments",
          actionLabel: "View Receipt",
        };

        set({
          payments,
          documents: [receiptDoc, ...state.documents],
          notifications: [notif, ...state.notifications],
        });

        return updatedPayment;
      },

      addMaintenanceRequest: (input) => {
        const today = formatToday();
        const item: RenterMaintenance = {
          id: createSafeId("maint"),
          title: input.title.trim(),
          category: input.category,
          priority: input.priority,
          description: input.description.trim(),
          status: "Pending",
          createdAt: today,
        };
        set((s) => ({
          maintenance: [item, ...s.maintenance],
          notifications: [
            {
              id: createSafeId("rnotif"),
              title: "Maintenance Request Submitted",
              message: `Your ${item.priority.toLowerCase()}-priority request "${item.title}" has been logged.`,
              date: today,
              read: false,
              category: "maintenance",
              href: "/renter/maintenance",
              actionLabel: "View Request",
            },
            ...s.notifications,
          ],
        }));
        return item;
      },

      cancelMaintenanceRequest: (id) =>
        set((s) => ({
          maintenance: s.maintenance.filter(
            (item) => !(item.id === id && item.status === "Pending"),
          ),
        })),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),

      toggleNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: !n.read } : n,
          ),
        })),

      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      dismissNotification: (id) =>
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        })),

      addNotification: (notif) =>
        set((s) => ({
          notifications: [
            { ...notif, id: createSafeId("rnotif") },
            ...s.notifications,
          ],
        })),

      sendMessage: (text) => {
        const profile = get().profile;
        const msg: ChatMessage = {
          id: createSafeId("msg"),
          senderId: profile.id,
          senderName: profile.name,
          senderRole: "renter",
          text: text.trim(),
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        set((s) => ({ messages: [...s.messages, msg] }));
        return msg;
      },

      addSupportTicket: (input) => {
        const ticket: RenterSupportTicket = {
          id: createSafeId("sup"),
          subject: input.subject.trim(),
          category: input.category,
          message: input.message.trim(),
          createdAt: formatToday(),
          status: "Submitted",
        };
        set((s) => ({ supportTickets: [ticket, ...s.supportTickets] }));
        return ticket;
      },
    }),
    {
      name: "urugo-renter-workspace-v3",
      skipHydration: true,
    },
  ),
);
