"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { localizeRelativeTime } from "@/i18n/display-format";
import type { RecentActivityItem } from "@/types/landlord";

const SEED_ACTIVITY_IDS = new Set(["act-1", "act-2", "act-3", "act-4"]);

interface RecentRentalActivityCardProps {
  activities: RecentActivityItem[];
}

export function RecentRentalActivityCard({
  activities,
}: RecentRentalActivityCardProps) {
  const t = useTranslations("landlord.overview.activity");
  const tSeed = useTranslations("landlord.seed.activities");
  const locale = useLocale() as AppLocale;

  const getActivityMeta = (
    type: RecentActivityItem["type"],
  ): {
    label: string;
    tone: StatusTone;
    Icon: typeof Clock;
  } => {
    switch (type) {
      case "payment_pending":
        return { label: "Pending", tone: "warning", Icon: Clock };
      case "payment_approved":
        return { label: "Approved", tone: "success", Icon: CheckCircle2 };
      case "tenancy_ending":
        return {
          label: t("badges.endingSoon"),
          tone: "warning",
          Icon: CalendarClock,
        };
      case "dispute_submitted":
        return { label: "Disputed", tone: "warning", Icon: AlertCircle };
      case "issue_reported":
        return { label: "Reported", tone: "info", Icon: AlertCircle };
      case "issue_resolved":
        return { label: "Resolved", tone: "success", Icon: CheckCircle2 };
      case "inquiry_received":
        return {
          label: t("badges.inquiry"),
          tone: "info",
          Icon: MessageSquare,
        };
      case "viewing_requested":
        return {
          label: t("badges.viewing"),
          tone: "info",
          Icon: CalendarClock,
        };
    }
  };

  return (
    <div className="space-y-5 border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          {t("heading")}
        </h3>
        <Link
          href="/landlord/notifications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
        >
          <span>{t("viewNotifications")}</span>
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      {activities.length === 0 ? (
        <p className="py-8 text-center text-xs text-body">{t("empty")}</p>
      ) : (
        <div className="divide-y divide-line">
          {activities.map((item) => {
            const { label, tone, Icon } = getActivityMeta(item.type);
            const href = item.href ?? "/landlord/tenancies";
            const isSeed = SEED_ACTIVITY_IDS.has(item.id);
            const title = isSeed ? tSeed(`${item.id}.title`) : item.title;
            const description = isSeed
              ? tSeed(`${item.id}.description`)
              : item.description;

            return (
              <Link
                key={item.id}
                href={href}
                className="flex flex-col gap-3.5 py-4 transition-colors hover:bg-surface/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3.5">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-line bg-surface text-body">
                    <Icon aria-hidden="true" className="size-4" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-semibold leading-snug text-ink">
                      {title}
                    </p>
                    <p className="text-xs leading-relaxed text-body">
                      {description}
                    </p>
                    <p className="pt-0.5 text-xs text-faint">
                      {item.renterName} · {item.propertyTitle}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 pl-12 sm:justify-end sm:pl-0">
                  <span className="text-xs text-faint">
                    {localizeRelativeTime(item.timestamp, locale)}
                  </span>
                  <StatusBadge label={label} tone={tone} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
