"use client";

import { AlertCircle, DoorOpen, Wallet } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { PropertyTenancySummary } from "@/utils/property-tenancies";

interface PropertyTenancyStatsProps {
  summary: PropertyTenancySummary;
}

export function PropertyTenancyStats({ summary }: PropertyTenancyStatsProps) {
  const t = useTranslations("landlord.tenancies.propertyView");
  const locale = useLocale() as AppLocale;
  const occupancyPercent =
    summary.totalUnits > 0
      ? Math.round((summary.occupiedUnits / summary.totalUnits) * 100)
      : 0;

  return (
    <section
      aria-label={t("statsAria")}
      className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
    >
      <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
            {t("occupancyLabel")}
          </span>
          <DoorOpen className="size-4 shrink-0 text-faint" />
        </div>
        <div className="mt-2.5 space-y-1">
          <p className="font-ibm text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {t("unitsRatio", {
              occupied: summary.occupiedUnits,
              total: summary.totalUnits,
            })}
          </p>
          <p className="text-sm text-body">
            {summary.vacantUnits === 0
              ? t("fullyOccupied", { percent: occupancyPercent })
              : t(
                  summary.vacantUnits === 1 ? "vacantSingle" : "vacantPlural",
                  {
                    percent: occupancyPercent,
                    count: summary.vacantUnits,
                  },
                )}
          </p>
        </div>
        <div aria-hidden="true" className="mt-3 h-1.5 w-full overflow-hidden bg-surface">
          <div
            className="h-full bg-brand transition-all"
            style={{ width: `${Math.min(100, Math.max(0, occupancyPercent))}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
            {t("monthlyRentLabel")}
          </span>
          <Wallet className="size-4 shrink-0 text-faint" />
        </div>
        <div className="mt-2.5 space-y-1">
          <p className="font-ibm text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {formatRwfLocalized(summary.monthlyRentRwf, locale)}
          </p>
          <p className="text-sm text-body">{t("fromActiveLeases")}</p>
        </div>
      </div>

      <div className="flex flex-col justify-between border border-line bg-white p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
            {t("needsAttentionLabel")}
          </span>
          <AlertCircle className="size-4 shrink-0 text-faint" />
        </div>
        <div className="mt-2.5 space-y-1">
          <p
            className={`font-ibm text-xl font-bold tracking-tight sm:text-2xl ${
              summary.attentionCount > 0 ? "text-amber-700" : "text-emerald-700"
            }`}
          >
            {summary.attentionCount}
          </p>
          <p className="text-sm text-body">
            {summary.attentionCount === 0
              ? t("allGoodStanding")
              : t("attentionHelper")}
          </p>
        </div>
      </div>
    </section>
  );
}
