"use client";

import { Bell } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Button } from "@/components/ui/button";
import type { RenterNotification } from "@/types/renter";
import { NotificationItemCard } from "./NotificationItemCard";

interface NotificationListProps {
  items: RenterNotification[];
  hasFilters: boolean;
  onResetFilters: () => void;
  onMarkRead: (id: string) => void;
  onToggleRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationList({
  items,
  hasFilters,
  onResetFilters,
  onMarkRead,
  onToggleRead,
  onDismiss,
}: NotificationListProps) {
  if (items.length === 0) {
    return (
      <EmptyStateBox
        icon={Bell}
        title="You're all caught up"
        description={
          hasFilters
            ? "No notifications match your current filter."
            : "Rent reminders, maintenance updates, and lease notices will appear here."
        }
        action={
          hasFilters ? (
            <Button
              type="button"
              variant="outline"
              onClick={onResetFilters}
              className="cursor-pointer rounded-none"
            >
              Show all notifications
            </Button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="divide-y divide-line border border-line bg-white shadow-2xs">
      {items.map((notif) => (
        <NotificationItemCard
          key={notif.id}
          notif={notif}
          onMarkRead={onMarkRead}
          onToggleRead={onToggleRead}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
