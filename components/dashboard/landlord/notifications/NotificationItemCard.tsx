"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Calendar,
  Check,
  DollarSign,
  FileText,
  MailOpen,
  MessageSquare,
  Settings2,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { localizeRelativeTime } from "@/i18n/display-format";
import { cn } from "@/lib/utils";
import type { LandlordNotificationItem } from "@/types/landlord";

const SEED_NOTIF_IDS = new Set([
  "notif-1",
  "notif-2",
  "notif-3",
  "notif-4",
  "notif-5",
  "notif-6",
]);

const CATEGORY_META = {
  payment: { icon: DollarSign, key: "payment", tone: "text-success" },
  dispute: { icon: AlertTriangle, key: "dispute", tone: "text-amber-700" },
  tenancy: { icon: FileText, key: "tenancy", tone: "text-brand-blue" },
  inquiry: { icon: MessageSquare, key: "inquiry", tone: "text-brand-blue" },
  viewing: { icon: Calendar, key: "viewing", tone: "text-brand" },
  system: { icon: Settings2, key: "system", tone: "text-faint" },
} as const;

interface NotificationItemCardProps {
  notif: LandlordNotificationItem;
  onMarkRead: (id: string) => void;
  onToggleRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationItemCard({
  notif,
  onMarkRead,
  onToggleRead,
  onDismiss,
}: NotificationItemCardProps) {
  const t = useTranslations("landlord.notifications");
  const tSeed = useTranslations("landlord.seed.notifications");
  const locale = useLocale() as AppLocale;
  const isSeed = SEED_NOTIF_IDS.has(notif.id);
  const title = isSeed ? tSeed(`${notif.id}.title`) : notif.title;
  const message = isSeed ? tSeed(`${notif.id}.message`) : notif.message;
  const actionLabel =
    isSeed && notif.actionLabel
      ? tSeed(`${notif.id}.actionLabel`)
      : notif.actionLabel || t("viewDetailsFallback");
  const meta = CATEGORY_META[notif.category] ?? {
    icon: Bell,
    key: "fallback",
    tone: "text-faint",
  };
  const Icon = meta.icon;

  return (
    <article
      className={cn(
        "flex flex-col justify-between gap-4 p-5 transition-colors sm:flex-row sm:items-start",
        notif.isUnread
          ? "border-l-2 border-l-brand-blue bg-brand-tint/30"
          : "bg-white hover:bg-surface/40",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center border border-line bg-white">
          <Icon className={cn("size-4", meta.tone)} />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[13px]">
            <span className={cn("font-semibold", meta.tone)}>
              {t(`categories.${meta.key}`)}
            </span>
            <span aria-hidden="true" className="text-line">&middot;</span>
            <span className="text-faint">
              {localizeRelativeTime(notif.timestamp, locale)}
            </span>
            {notif.isUnread && (
              <>
                <span aria-hidden="true" className="text-line">&middot;</span>
                <span className="font-semibold text-brand-blue">
                  {t("unreadBadge")}
                </span>
              </>
            )}
          </div>

          <h2 className="text-[15px] font-semibold leading-snug text-ink">
            {title}
          </h2>

          <p className="text-sm leading-relaxed text-body">{message}</p>

          {notif.actionHref && (
            <div className="pt-1">
              <Link
                href={notif.actionHref}
                onClick={() => onMarkRead(notif.id)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                <span>{actionLabel}</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title={notif.isUnread ? t("markAsRead") : t("markAsUnread")}
          aria-label={notif.isUnread ? t("markAsRead") : t("markAsUnread")}
          onClick={() => onToggleRead(notif.id)}
          className="size-8 cursor-pointer rounded-none text-faint hover:text-ink"
        >
          {notif.isUnread ? (
            <Check className="size-4" />
          ) : (
            <MailOpen className="size-4" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title={t("dismissAria")}
          aria-label={t("dismissAria")}
          onClick={() => onDismiss(notif.id)}
          className="size-8 cursor-pointer rounded-none text-faint hover:text-ink"
        >
          <X className="size-4" />
        </Button>
      </div>
    </article>
  );
}
