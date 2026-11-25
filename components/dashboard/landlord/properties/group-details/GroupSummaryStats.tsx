"use client";

import { Building2, CheckCircle2, DoorOpen, Wallet } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";

interface GroupSummaryStatsProps {
  propertyCount: number;
  totalUnits?: number;
  occupiedUnits?: number;
  expectedRentRwf?: number;
  collectedRentRwf?: number;
}

interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "default" | "success";
  progressPercent?: number;
}

function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  accent = "default",
  progressPercent,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-faint">
          {label}
        </span>
        <Icon className="size-4 shrink-0 text-faint" />
      </div>

      <div className="mt-2.5 space-y-1">
        <p
          className={`font-ibm text-xl font-bold tracking-tight sm:text-2xl ${
            accent === "success" ? "text-emerald-700" : "text-ink"
          }`}
        >
          {value}
        </p>
        <p className="text-xs text-body">{helper}</p>
      </div>

      {progressPercent !== undefined && (
        <div
          aria-hidden="true"
          className="mt-3 h-1.5 w-full overflow-hidden bg-surface"
        >
          <div
            className={`h-full transition-all ${
              accent === "success" ? "bg-emerald-600" : "bg-brand"
            }`}
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function GroupSummaryStats({
  propertyCount,
  totalUnits,
  occupiedUnits,
  expectedRentRwf,
  collectedRentRwf,
}: GroupSummaryStatsProps) {
  const t = useTranslations("landlord.properties.groupStats");
  const locale = useLocale() as AppLocale;
  const hasUnits =
    totalUnits !== undefined && occupiedUnits !== undefined && totalUnits > 0;
  const occupancyPercent = hasUnits
    ? Math.round((occupiedUnits / totalUnits) * 100)
    : undefined;

  const collectionPercent =
    expectedRentRwf !== undefined &&
    collectedRentRwf !== undefined &&
    expectedRentRwf > 0
      ? Math.round((collectedRentRwf / expectedRentRwf) * 100)
      : undefined;

  return (
    <section
      aria-label={t("sectionAria")}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4"
    >
      <StatCard
        label={t("properties")}
        value={String(propertyCount)}
        helper={
          propertyCount === 1 ? t("propertyInGroup") : t("propertiesInGroup")
        }
        icon={Building2}
      />

      {hasUnits && occupancyPercent !== undefined && (
        <StatCard
          label={t("unitsOccupied")}
          value={`${occupiedUnits} / ${totalUnits}`}
          helper={t("occupancyRate", { percent: occupancyPercent })}
          icon={DoorOpen}
          progressPercent={occupancyPercent}
        />
      )}

      {expectedRentRwf !== undefined && (
        <StatCard
          label={t("expectedRent")}
          value={formatRwfLocalized(expectedRentRwf, locale)}
          helper={t("monthlyProjected")}
          icon={Wallet}
        />
      )}

      {collectedRentRwf !== undefined && (
        <StatCard
          label={t("rentCollected")}
          value={formatRwfLocalized(collectedRentRwf, locale)}
          helper={
            collectionPercent !== undefined
              ? t("collectedPercentMonth", { percent: collectionPercent })
              : t("collectedThisMonth")
          }
          icon={CheckCircle2}
          accent="success"
          progressPercent={collectionPercent}
        />
      )}
    </section>
  );
}
