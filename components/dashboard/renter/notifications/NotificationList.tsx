"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("renter.notifications");

  if (items.length === 0) {
    return (
      <EmptyStateBox
        icon={Bell}
        title={t("emptyTitle")}
        description={hasFilters ? t("emptyFiltered") : t("emptyDefault")}
        action={
          hasFilters ? (
            <Button
              type="button"
              variant="outline"
              onClick={onResetFilters}
              className="cursor-pointer rounded-none"
            >
              {t("showAll")}
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
