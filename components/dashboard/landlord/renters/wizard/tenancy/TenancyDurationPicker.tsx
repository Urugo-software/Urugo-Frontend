"use client";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TenancyDurationOption } from "@/types/renter-wizard.types";

export const DURATION_OPTIONS: {
  id: TenancyDurationOption;
  label: string;
  tag?: string;
}[] = [
  { id: "6", label: "6 Months" },
  { id: "12", label: "12 Months", tag: "1 Year" },
  { id: "24", label: "24 Months", tag: "2 Years" },
  { id: "open", label: "Open-ended", tag: "Flexible" },
  { id: "custom", label: "Custom" },
];

interface TenancyDurationPickerProps {
  durationOption: TenancyDurationOption;
  customDurationMonths: number | "";
  error?: string;
  onChangeDuration: (option: TenancyDurationOption) => void;
  onChangeCustomMonths: (months: number | "") => void;
}

export function TenancyDurationPicker({
  durationOption,
  customDurationMonths,
  error,
  onChangeDuration,
  onChangeCustomMonths,
}: TenancyDurationPickerProps) {
  return (
    <Field className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <FieldLabel className="text-[12.5px] font-semibold text-ink">
          Tenancy Duration
        </FieldLabel>
        <span className="text-[12.5px] font-medium text-faint">Standard or flexible terms</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {DURATION_OPTIONS.map((opt) => {
          const isSelected = durationOption === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChangeDuration(opt.id)}
              className={`group relative flex flex-col items-center justify-center h-13 cursor-pointer border px-2 py-1 text-center transition-all ${
                isSelected
                  ? "border-ink bg-ink text-white shadow-xs"
                  : "border-line bg-white text-ink hover:border-neutral-400 hover:bg-surface/50"
              }`}
            >
              <span className="text-[12.5px] font-medium">{opt.label}</span>
              {opt.tag && (
                <span
                  className={`text-[12.5px] transition-colors ${
                    isSelected ? "text-neutral-300" : "text-faint group-hover:text-body"
                  }`}
                >
                  {opt.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {durationOption === "custom" && (
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Input
              type="number"
              min={1}
              max={120}
              placeholder="e.g. 18"
              value={customDurationMonths}
              onChange={(e) =>
                onChangeCustomMonths(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              className="h-10 rounded-none border-line bg-white px-3.5 pr-14 font-mono text-[13px] text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12.5px] text-faint">
              months
            </span>
          </div>
          <span className="text-[12.5px] text-body">
            Custom agreed duration for this lease
          </span>
        </div>
      )}
      {error && <FieldError className="mt-1 text-[12.5px]">{error}</FieldError>}
    </Field>
  );
}
