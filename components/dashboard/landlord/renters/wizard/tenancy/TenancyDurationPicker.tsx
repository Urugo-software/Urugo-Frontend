"use client";

import { useTranslations } from "next-intl";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TenancyDurationOption } from "@/types/renter-wizard.types";

const DURATION_OPTION_KEYS: {
  id: TenancyDurationOption;
  labelKey: string;
  tagKey?: string;
}[] = [
  { id: "6", labelKey: "m6Label" },
  { id: "12", labelKey: "m12Label", tagKey: "m12Tag" },
  { id: "24", labelKey: "m24Label", tagKey: "m24Tag" },
  { id: "open", labelKey: "openLabel", tagKey: "openTag" },
  { id: "custom", labelKey: "customLabel" },
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
  const t = useTranslations("landlord.renters.wizard.duration");

  return (
    <Field className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <FieldLabel className="text-[12.5px] font-semibold text-ink">
          {t("label")}
        </FieldLabel>
        <span className="text-[12.5px] font-medium text-faint">{t("hint")}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {DURATION_OPTION_KEYS.map((opt) => {
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
              <span className="text-[12.5px] font-medium">{t(opt.labelKey)}</span>
              {opt.tagKey && (
                <span
                  className={`text-[12.5px] transition-colors ${
                    isSelected ? "text-neutral-300" : "text-faint group-hover:text-body"
                  }`}
                >
                  {t(opt.tagKey)}
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
              placeholder={t("customPlaceholder")}
              value={customDurationMonths}
              onChange={(e) =>
                onChangeCustomMonths(
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              className="h-10 rounded-none border-line bg-white px-3.5 pr-14 font-mono text-[13px] text-ink focus-visible:border-ink focus-visible:ring-1 focus-visible:ring-ink"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[12.5px] text-faint">
              {t("monthsUnit")}
            </span>
          </div>
          <span className="text-[12.5px] text-body">{t("customHelper")}</span>
        </div>
      )}
      {error && <FieldError className="mt-1 text-[12.5px]">{error}</FieldError>}
    </Field>
  );
}
