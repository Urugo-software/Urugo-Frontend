"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardNotifications } from "@/hooks/query/useDashboardNotifications";
import type { AppLocale } from "@/i18n/config";
import { localizeRelativeTime } from "@/i18n/display-format";
import type { DashboardNotificationsDropdownProps } from "@/types/dashboard-notifications.types";

const LANDLORD_SEED_NOTIF_IDS = new Set([
  "notif-1",
  "notif-2",
  "notif-3",
  "notif-4",
  "notif-5",
  "notif-6",
]);

export function DashboardNotificationsDropdown({
  pathname,
}: DashboardNotificationsDropdownProps) {
  const router = useRouter();
  const t = useTranslations("common.notificationsDropdown");
  const tActions = useTranslations("common.actions");
  const tStates = useTranslations("common.states");
  const tLandlordSeed = useTranslations("landlord.seed.notifications");
  const locale = useLocale() as AppLocale;
  const isLandlordPath = pathname.startsWith("/landlord");

  const { items, unreadCount, hasUnread, viewAllHref, onMarkRead, onMarkAllRead } =
    useDashboardNotifications(pathname);

  const handleSelect = (id: string, href: string) => {
    onMarkRead?.(id);
    router.push(href);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={t("openAria")}
            className="relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line transition hover:bg-surface focus:outline-none max-md:border-none"
          >
            <Bell className="size-4 text-ink max-md:size-5" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 size-2 animate-pulse rounded-full bg-red-600" />
            )}
          </button>
        }
      />

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[calc(100vw-2rem)] rounded-none border border-line bg-white p-0 shadow-lg ring-0 sm:w-96"
      >
        <DropdownMenuGroup>
          <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <DropdownMenuLabel className="p-0 text-xs font-bold uppercase tracking-wider text-ink">
                {t("title")}
              </DropdownMenuLabel>
              {unreadCount > 0 && (
                <span className="text-[12.5px] font-semibold text-brand-blue">
                  {t("newCount", { count: unreadCount })}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {onMarkAllRead && unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="cursor-pointer text-xs font-semibold text-body hover:text-ink"
                >
                  {tActions("markAllRead")}
                </button>
              )}
              <Link
                href={viewAllHref}
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                {tActions("viewAll")}
              </Link>
            </div>
          </div>

          <div className="max-h-80 divide-y divide-line overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-6 text-center text-xs text-faint">
                {tStates("emptyNotifications")}
              </div>
            ) : (
              items.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleSelect(item.id, item.href)}
                  className={`flex cursor-pointer items-start gap-3 rounded-none p-3.5 focus:bg-surface ${
                    item.isUnread ? "bg-brand-tint/20" : "bg-white"
                  }`}
                >
                  <div className="mt-1 flex size-2 shrink-0 items-center justify-center">
                    {item.isUnread ? (
                      <span className="size-2 rounded-full bg-brand-blue" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-line" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-semibold text-ink">
                        {isLandlordPath && LANDLORD_SEED_NOTIF_IDS.has(item.id)
                          ? tLandlordSeed(`${item.id}.title`)
                          : item.title}
                      </span>
                      <span className="shrink-0 text-[12.5px] text-faint">
                        {localizeRelativeTime(item.timestamp, locale)}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-body">
                      {isLandlordPath && LANDLORD_SEED_NOTIF_IDS.has(item.id)
                        ? tLandlordSeed(`${item.id}.message`)
                        : item.message}
                    </p>
                  </div>

                  <ChevronRight className="mt-1 size-3.5 shrink-0 text-faint" />
                </DropdownMenuItem>
              ))
            )}
          </div>

          <DropdownMenuSeparator className="my-0 bg-line" />

          <div className="bg-surface/50 p-2.5 text-center">
            <Link
              href={viewAllHref}
              className="block text-xs font-semibold text-brand-blue hover:underline"
            >
              {t("viewAllLink")}
            </Link>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
