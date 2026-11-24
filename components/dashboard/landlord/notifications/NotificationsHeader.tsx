"use client";

import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationsHeaderProps {
  unreadCount: number;
  unreadOnly: boolean;
  onToggleUnreadOnly: () => void;
  onMarkAllRead: () => void;
}

export function NotificationsHeader({
  unreadOnly,
  unreadCount,
  onToggleUnreadOnly,
  onMarkAllRead,
}: NotificationsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Notifications
          </h1>
        </div>
        <p className="mt-1.5 text-[15px] text-body">
          Track rent payments, tenancy reminders, disputes, and account updates.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={unreadOnly ? "default" : "outline"}
          aria-pressed={unreadOnly}
          onClick={onToggleUnreadOnly}
          className="h-9 cursor-pointer rounded-none px-3.5 text-sm"
        >
          Unread only
        </Button>

        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onMarkAllRead}
            className="h-9 cursor-pointer rounded-none px-3.5 text-sm"
          >
            <CheckCheck aria-hidden="true" className="size-4" />
            <span>Mark all read</span>
          </Button>
        )}
      </div>
    </div>
  );
}
