"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { EmptyStateBox } from "@/components/dashboard/landlord/tenancies/EmptyStateBox";
import type { LandlordNotificationItem } from "@/types/landlord";
import { NotificationItemCard } from "./NotificationItemCard";

interface NotificationListProps {
  items: LandlordNotificationItem[];
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
  const t = useTranslations("landlord.notifications");

  if (items.length === 0) {
    return (
      <EmptyStateBox
        icon={Bell}
        title={t("emptyTitle")}
        description={
          hasFilters ? t("emptyFilteredDesc") : t("emptyDefaultDesc")
        }
        action={
          hasFilters ? (
            <Button
              type="button"
              variant="outline"
              onClick={onResetFilters}
              className="cursor-pointer rounded-none"
            >
              {t("showAllBtn")}
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
