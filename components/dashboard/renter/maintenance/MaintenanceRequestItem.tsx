"use client";

import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { getStatusTranslationKey } from "@/i18n/status-map";
import type { MaintenanceStatus, RenterMaintenance } from "@/types/renter";

const TONE: Record<MaintenanceStatus, StatusTone> = {
  Pending: "warning",
  "In Progress": "info",
  Resolved: "success",
  Rejected: "danger",
};

const CATEGORY_KEYS: Record<string, string> = {
  Plumbing: "plumbing",
  Electrical: "electrical",
  Structural: "structural",
  Appliance: "appliance",
  Other: "other",
};

interface MaintenanceRequestItemProps {
  item: RenterMaintenance;
  onSelect: (item: RenterMaintenance) => void;
}

export function MaintenanceRequestItem({
  item,
  onSelect,
}: MaintenanceRequestItemProps) {
  const t = useTranslations("renter.maintenance");
  const tStatuses = useTranslations("common.statuses");

  const categoryKey = CATEGORY_KEYS[item.category];
  const categoryLabel = categoryKey
    ? t(`categories.${categoryKey}`)
    : item.category;
  const priorityKey = getStatusTranslationKey(item.priority);
  const priorityLabel = priorityKey ? tStatuses(priorityKey) : item.priority;

  return (
    <article className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs transition-colors hover:border-ink/40">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-ink">{item.title}</h3>
            <span className="text-xs text-faint">
              {t("categoryAndPriority", {
                category: categoryLabel,
                priority: priorityLabel,
              })}
            </span>
          </div>
          <StatusBadge label={item.status} tone={TONE[item.status]} />
        </div>

        <p className="my-3 line-clamp-2 text-sm leading-relaxed text-body">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-3 text-xs">
        <span className="inline-flex items-center gap-1.5 text-faint">
          <Calendar aria-hidden="true" className="size-3.5" />
          {t("submittedDate", { date: item.createdAt })}
        </span>
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="cursor-pointer font-semibold text-brand-blue hover:underline"
        >
          {t("viewDetails")}
        </button>
      </div>
    </article>
  );
}
