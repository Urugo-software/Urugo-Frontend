"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

const DUE_DAY_OPTIONS = [1, 5, 10, 15, 25, 28];
const INITIAL_MONTH_OPTIONS = [1, 2, 3, 6];

function getOrdinalSuffix(day: number): string {
  if (day === 1) return "st";
  if (day === 2) return "nd";
  if (day === 3) return "rd";
  return "th";
}

interface TenancySchedulePickerProps {
  paymentDueDay: number;
  initialPaymentMonths: number;
  onChangeDueDay: (day: number) => void;
  onChangeInitialMonths: (months: number) => void;
}

export function TenancySchedulePicker({
  paymentDueDay,
  initialPaymentMonths,
  onChangeDueDay,
  onChangeInitialMonths,
}: TenancySchedulePickerProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Monthly Rent Due Day */}
      <Field>
        <div className="flex items-center justify-between mb-2">
          <FieldLabel className="text-xs font-medium text-ink">
            Monthly Rent Due Day
          </FieldLabel>
          <span className="text-[11px] text-faint">Monthly cycle</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {DUE_DAY_OPTIONS.map((day) => {
            const isSelected = paymentDueDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => onChangeDueDay(day)}
                className={`h-10 cursor-pointer border px-1 text-center transition-all ${
                  isSelected
                    ? "border-ink bg-ink text-white shadow-xs"
                    : "border-line bg-white text-ink hover:border-neutral-400 hover:bg-surface/50"
                }`}
              >
                <span className="font-mono text-xs font-medium">{day}</span>
                <span className="text-[10px] text-faint ml-0.5">
                  {getOrdinalSuffix(day)}
                </span>
              </button>
            );
          })}
        </div>
        <FieldDescription className="mt-1.5 text-xs text-body/80">
          Recurring date each calendar month rent is expected.
        </FieldDescription>
      </Field>

      {/* Initial Rent Advance */}
      <Field>
        <div className="flex items-center justify-between mb-2">
          <FieldLabel className="text-xs font-medium text-ink">
            Initial Advance Rent
          </FieldLabel>
          <span className="text-[11px] text-faint">Move-in payment</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {INITIAL_MONTH_OPTIONS.map((months) => {
            const isSelected = initialPaymentMonths === months;
            return (
              <button
                key={months}
                type="button"
                onClick={() => onChangeInitialMonths(months)}
                className={`h-10 cursor-pointer border px-2 text-xs font-medium transition-all ${
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
        <FieldDescription className="mt-1.5 text-xs text-body/80">
          Advance rent collected prior to tenancy commencement.
        </FieldDescription>
      </Field>
    </div>
  );
}
