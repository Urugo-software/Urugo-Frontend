"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  FileText,
  ChevronRight,
} from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockLandlordNotifications } from "@/data/landlord-data";
import { LandlordNotificationItem } from "@/types/landlord";

export function LandlordNotificationsView() {
  const [notifications, setNotifications] = useState<LandlordNotificationItem[]>(mockLandlordNotifications);
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    return n.category === activeTab;
  });

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-7 bg-surface/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-bold bg-brand text-white border border-brand rounded-none">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-body">
            Stay updated on rent payments, tenancy renewals, disputes, and system alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <CustomButton
            title="Mark All as Read"
            variant="light"
            onClick={handleMarkAllRead}
            className="rounded-none"
          >
            <CheckCircle2 className="h-4 w-4" />
          </CustomButton>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-line bg-white p-2 shadow-2xs overflow-x-auto">
        {[
          { id: "all", label: "All Notifications" },
          { id: "payment", label: "Payments" },
          { id: "tenancy", label: "Tenancies" },
          { id: "dispute", label: "Disputes" },
          { id: "system", label: "System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap rounded-none ${
              activeTab === tab.id
                ? "bg-brand text-white border border-brand"
                : "text-body hover:text-ink hover:bg-surface border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="border border-line bg-white p-12 text-center shadow-2xs">
            <Bell className="mx-auto h-10 w-10 text-faint mb-3" />
            <h3 className="text-base font-bold text-ink">No notifications found</h3>
            <p className="text-xs text-faint mt-1">
              You are all caught up in this category!
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const getIcon = () => {
              switch (notif.category) {
                case "payment":
                  return <DollarSign className="h-5 w-5 text-emerald-600" />;
                case "dispute":
                  return <AlertTriangle className="h-5 w-5 text-amber-600" />;
                case "tenancy":
                  return <FileText className="h-5 w-5 text-brand" />;
                default:
                  return <Bell className="h-5 w-5 text-body" />;
              }
            };

            return (
              <div
                key={notif.id}
                className={`border p-5 shadow-2xs flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors rounded-none ${
                  notif.isUnread
                    ? "bg-white border-brand/50 border-l-4 border-l-brand"
                    : "bg-white border-line"
                }`}
              >
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center border rounded-none ${
                      notif.category === "payment"
                        ? "bg-emerald-50 border-emerald-200"
                        : notif.category === "dispute"
                        ? "bg-amber-50 border-amber-200"
                        : notif.category === "tenancy"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-surface border-line"
                    }`}
                  >
                    {getIcon()}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-ink truncate">
                        {notif.title}
                      </h3>
                      {notif.isUnread && (
                        <span className="h-2 w-2 rounded-none bg-brand shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-body leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="text-[11px] text-faint block pt-1">
                      {notif.timestamp}
                    </span>
                  </div>
                </div>

                {notif.actionHref && (
                  <Link href={notif.actionHref} className="shrink-0 self-end sm:self-center">
                    <CustomButton
                      title={notif.actionLabel || "View"}
                      variant="colored"
                      className="h-8 text-xs rounded-none"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </CustomButton>
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
