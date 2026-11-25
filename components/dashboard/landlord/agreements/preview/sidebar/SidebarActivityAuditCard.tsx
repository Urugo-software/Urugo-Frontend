"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized } from "@/i18n/formatting";
import type { ActivityItem } from "@/types/agreement.types";

interface Props {
  activities: ActivityItem[];
}

export function SidebarActivityAuditCard({ activities }: Props) {
  const t = useTranslations("landlord.agreements.preview.sidebar");
  const locale = useLocale() as AppLocale;

  return (
    <div className="space-y-3.5 border border-line bg-white p-5 text-[12.5px]">
      <div className="flex items-center justify-between border-b border-line pb-2.5">
        <h3 className="font-semibold uppercase tracking-wider text-faint">
          {t("activityHistory")}
        </h3>
        <span className="font-mono text-faint">{t("auditTrail")}</span>
      </div>

      <div className="relative space-y-4 pl-4 before:absolute before:bottom-1.5 before:left-1.5 before:top-1.5 before:w-0.5 before:bg-line">
        {activities.map((act, i) => (
          <div key={`${act.title}-${i}`} className="relative text-[13px]">
            <span
              className={`absolute -left-4 top-1 size-2 rounded-full ${
                act.status === "completed"
                  ? "bg-emerald-600 ring-2 ring-white"
                  : act.status === "attention"
                    ? "bg-amber-500 ring-2 ring-white"
                    : "bg-neutral-300 ring-2 ring-white"
              }`}
            />
            <div className="space-y-0.5">
              <span className="block font-medium leading-snug text-ink">
                {act.title}
              </span>
              <span className="block text-[12.5px] leading-relaxed text-body">
                {act.detail}
              </span>
              {act.date && (
                <span className="block font-mono text-[12.5px] text-faint">
                  {formatDateLocalized(act.date, locale)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
