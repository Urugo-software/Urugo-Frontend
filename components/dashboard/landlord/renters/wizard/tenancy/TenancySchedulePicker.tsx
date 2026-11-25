"use client";

import { Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { AppLocale } from "@/i18n/config";
import { getOrdinalSuffix } from "@/utils/rent-schedule-utils";

const INITIAL_MONTH_OPTIONS = [1, 2, 3, 6];

interface TenancySchedulePickerProps {
  paymentDueDay: number;
  initialPaymentMonths: number;
  onChangeDueDay: (day: number) => void;
  onChangeInitialMonths: (months: number) => void;
  error?: string;
}

export function TenancySchedulePicker({
  paymentDueDay,
  initialPaymentMonths,
  onChangeDueDay,
  onChangeInitialMonths,
  error,
}: TenancySchedulePickerProps) {
  const t = useTranslations("landlord.renters.wizard.schedule");
  const locale = useLocale() as AppLocale;
  const currentDay = paymentDueDay || 1;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-[12.5px]">
      {/* Monthly Rent Due Date */}
      <Field className="space-y-2">
        <div className="flex items-center justify-between">
          <FieldLabel
            htmlFor="monthly-rent-due-day"
            className="text-[12.5px] font-semibold text-ink"
          >
            {t("dueDateLabel")}{" "}
            <span className="text-red-500 text-lg"> </span>
          </FieldLabel>
          <span className="text-[12.5px] font-medium text-faint">
            {t("dayRange")}
          </span>
        </div>

        <div className="relative">
          <select
            id="monthly-rent-due-day"
            value={currentDay}
            onChange={(e) => onChangeDueDay(Number(e.target.value))}
            className="h-10 w-full cursor-pointer rounded-none border border-line bg-white px-3 pr-10 font-mono text-[12.5px] font-medium text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const ordinal =
                locale === "en" ? `${day}${getOrdinalSuffix(day)}` : String(day);
              const optionText =
                day === 31
                  ? t("dayOfMonthShortEnd", { ordinal })
                  : day >= 29
                    ? t("dayOfMonthFebEnd", { ordinal })
                    : t("dayOfMonth", { ordinal });
              return (
                <option key={day} value={day}>
                  {optionText}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-faint pr-3">
            <Calendar className="size-4" />
          </div>
        </div>

        <FieldDescription className="text-[12.5px] text-body leading-relaxed">
          {t("dueDateDesc")}
        </FieldDescription>

        {currentDay >= 29 && (
          <div className="rounded-none border border-amber-200 bg-amber-50/60 p-2 text-[12.5px] text-amber-900 leading-snug">
            <strong>{t("shorterMonthsTitle")}</strong>{" "}
            {t("shorterMonthsDesc", { day: currentDay })}
          </div>
        )}

        {error && (
          <p className="text-[12.5px] text-red-600 font-medium">{error}</p>
        )}
      </Field>

      {/* Initial Rent Advance */}
      <Field className="space-y-2">
        <div className="flex items-center justify-between">
          <FieldLabel className="text-[12.5px] font-semibold text-ink">
            {t("initialAdvanceLabel")}
          </FieldLabel>
          <span className="text-[12.5px] font-medium text-faint">
            {t("moveInPayment")}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {INITIAL_MONTH_OPTIONS.map((months) => {
            const isSelected = initialPaymentMonths === months;
            return (
              <button
                key={months}
                type="button"
                onClick={() => onChangeInitialMonths(months)}
                className={`h-10 cursor-pointer border px-2 text-[12.5px] font-medium transition-all ${
                  isSelected
                    ? "border-ink bg-ink text-white shadow-xs"
                    : "border-line bg-white text-ink hover:border-neutral-400 hover:bg-surface/50"
                }`}
              >
                {t(months === 1 ? "monthShortSingle" : "monthShortPlural", {
                  count: months,
                })}
              </button>
            );
          })}
        </div>
        <FieldDescription className="text-[12.5px] text-body leading-relaxed">
          {t("initialAdvanceDesc")}
        </FieldDescription>
      </Field>
    </div>
  );
}
