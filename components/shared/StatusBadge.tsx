"use client";

import { useTranslations } from "next-intl";

import { getStatusTranslationKey } from "@/i18n/status-map";
import { cn } from "@/lib/utils";

export type StatusTone = "success" | "info" | "warning" | "danger" | "neutral";

const TONE_STYLES: Record<StatusTone, string> = {
  success: "text-success",
  info: "text-brand-blue",
  warning: "text-amber-700",
  danger: "text-rose-700",
  neutral: "text-faint",
};

interface StatusBadgeProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

export function StatusBadge({
  label,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  const t = useTranslations("common.statuses");
  const statusKey = getStatusTranslationKey(label);
  const displayLabel = statusKey ? t(statusKey) : label;

  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap text-xs font-semibold",
        TONE_STYLES[tone],
        className,
      )}
    >
      {displayLabel}
    </span>
  );
}
