"use client";

import { useTranslations } from "next-intl";

interface FilterActionsProps {
  onApply: () => void;
  onReset: () => void;
}

function FilterActions({ onApply, onReset }: FilterActionsProps) {
  const t = useTranslations("properties.filters");

  return (
    <div className="mt-5.5 flex flex-col gap-2">
      <button
        type="button"
        onClick={onApply}
        className="w-full cursor-pointer rounded-full bg-brand px-4.5 py-2.5 text-[13.5px] font-semibold text-white shadow-xs transition-colors hover:bg-brand-deep"
      >
        {t("apply")}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="w-full cursor-pointer rounded-full border border-line px-4.5 py-2.5 text-[13.5px] font-semibold text-body transition-colors hover:border-brand hover:bg-surface hover:text-ink"
      >
        {t("reset")}
      </button>
    </div>
  );
}

export default FilterActions;
