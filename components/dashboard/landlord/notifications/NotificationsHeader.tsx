"use client";

import { CheckCircle2 } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";

export function NotificationsHeader({
  unreadCount,
  onMarkAllRead,
}: {
  unreadCount: number;
  onMarkAllRead: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center gap-1.5 border border-brand bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">
              {unreadCount} Unread
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-body">
          Stay updated on rent payments, tenancy renewals, disputes, and system
          alerts.
        </p>
      </div>

      {unreadCount > 0 && (
        <div className="border border-line w-fit h-fit ">
          <CustomButton
            title="Mark All as Read"
            variant="light"
            onClick={onMarkAllRead}
            className="h-9 w-fit rounded-none border border-line text-xs font-semibold"
          >
            <CheckCircle2 className="h-4 w-4" />
          </CustomButton>
        </div>
      )}
    </div>
  );
}
