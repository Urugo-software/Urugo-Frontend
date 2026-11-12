"use client";

import { Calendar } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
            Monthly Rent Due Date{" "}
            <span className="text-red-500 text-lg"> </span>
          </FieldLabel>
          <span className="text-[12.5px] font-medium text-faint">
            Day 1 - 31
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
              const suffix = getOrdinalSuffix(day);
              const isMonthEnd = day >= 29;
              return (
                <option key={day} value={day}>
                  {day}
                  {suffix} of each month
                  {isMonthEnd
                    ? day === 31
                      ? " (or last day of shorter months)"
                      : " (or last day of February)"
                    : ""}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-faint pr-3">
            <Calendar className="size-4" />
          </div>
        </div>

        <FieldDescription className="text-[12.5px] text-body leading-relaxed">
          Select the day of each month when rent is expected, as agreed between
          the landlord and renter.
        </FieldDescription>

        {currentDay >= 29 && (
          <div className="rounded-none border border-amber-200 bg-amber-50/60 p-2 text-[12.5px] text-amber-900 leading-snug">
            <strong>Shorter Months:</strong> In months that have fewer than{" "}
            {currentDay} days (such as February or 30-day months), recurring
            rent is payable on the final calendar day of that month.
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
            Initial Advance Rent
          </FieldLabel>
          <span className="text-[12.5px] font-medium text-faint">
            Move-in payment
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
                {months} {months === 1 ? "Mo" : "Mos"}
              </button>
            );
          })}
        </div>
        <FieldDescription className="text-[12.5px] text-body leading-relaxed">
          Advance rent collected prior to tenancy commencement.
        </FieldDescription>
      </Field>
    </div>
  );
}
