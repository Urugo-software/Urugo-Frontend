"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight } from "lucide-react";
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
import { DashboardNotificationsDropdownProps } from "@/types/dashboard-notifications.types";

export function DashboardNotificationsDropdown({
  pathname,
}: DashboardNotificationsDropdownProps) {
  const router = useRouter();
  const { items, unreadCount, hasUnread, viewAllHref } =
    useDashboardNotifications(pathname);

  const handleSelect = (href: string) => {
    router.push(href);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open notifications menu"
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
        className="w-[calc(100vw-2rem)] sm:w-96 rounded-none border border-line bg-white p-0 shadow-lg ring-0"
      >
        <DropdownMenuGroup>
          <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-white">
            <div className="flex items-center gap-2">
              <DropdownMenuLabel className="p-0 text-xs font-bold uppercase tracking-wider text-ink">
                Notifications
              </DropdownMenuLabel>
              {unreadCount > 0 && (
                <span className="inline-flex items-center border border-blue-200 bg-brand-tint px-2 py-0.5 text-[12.5px] font-semibold text-brand-blue">
                  {unreadCount} new
                </span>
              )}
            </div>
            <Link
              href={viewAllHref}
              className="text-xs font-semibold text-brand-blue hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-line">
            {items.length === 0 ? (
              <div className="p-6 text-center text-xs text-faint">
                No notifications right now.
              </div>
            ) : (
              items.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
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
                        {item.title}
                      </span>
                      <span className="shrink-0 text-[12.5px] text-faint">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-body">
                      {item.message}
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
              View all notifications &rarr;
            </Link>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
