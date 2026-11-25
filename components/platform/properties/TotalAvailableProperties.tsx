"use client";

import { useTranslations } from "next-intl";

function TotalAvailableProperties({
  total,
  hasActiveFilters = false,
}: {
  total: number;
  hasActiveFilters?: boolean;
}) {
  const t = useTranslations("properties.counts");
  const key = hasActiveFilters
    ? total === 1
      ? "matchingOne"
      : "matchingOther"
    : total === 1
      ? "availableOne"
      : "availableOther";

  return (
    <span className="text-[14px] tracking-wide text-body">
      {t.rich(key, {
        count: total,
        bold: (chunks) => <b className="text-ink">{chunks}</b>,
      })}
    </span>
  );
}

export default TotalAvailableProperties;
