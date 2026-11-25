"use client";

import { useTranslations } from "next-intl";

interface FilterPillsProps {
  options: readonly string[];
  selected: string | string[];
  multiSelect?: boolean;
  onSelect: (option: string) => void;
  getLabel?: (option: string) => string;
}

function FilterPills({
  options,
  selected,
  multiSelect = false,
  onSelect,
  getLabel,
}: FilterPillsProps) {
  const t = useTranslations("properties.filters");

  const isOptionSelected = (option: string) =>
    Array.isArray(selected) ? selected.includes(option) : selected === option;

  return (
    <div
      role="group"
      aria-label={multiSelect ? t("pillsMultiAria") : t("pillsSingleAria")}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const active = isOptionSelected(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option)}
            className={`cursor-pointer select-none rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors duration-150 ${
              active
                ? "border-brand bg-brand-tint font-semibold text-brand"
                : "border-line bg-white text-body hover:border-brand/40 hover:text-ink"
            }`}
          >
            {getLabel ? getLabel(option) : option}
          </button>
        );
      })}
    </div>
  );
}

export default FilterPills;
