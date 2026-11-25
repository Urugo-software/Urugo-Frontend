"use client";

import { CheckCheck } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("landlord.notifications");

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t("title")}
          </h1>
        </div>
        <p className="mt-1.5 text-[15px] text-body">{t("subtitle")}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={unreadOnly ? "default" : "outline"}
          aria-pressed={unreadOnly}
          onClick={onToggleUnreadOnly}
          className="h-9 cursor-pointer rounded-none px-3.5 text-sm"
        >
          {t("unreadOnly")}
        </Button>

        {unreadCount > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onMarkAllRead}
            className="h-9 cursor-pointer rounded-none px-3.5 text-sm"
          >
            <CheckCheck aria-hidden="true" className="size-4" />
            <span>{t("markAllRead")}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
