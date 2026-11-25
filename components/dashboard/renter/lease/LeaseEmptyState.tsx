"use client";

import { ScrollText } from "lucide-react";
import { useTranslations } from "next-intl";

export function LeaseEmptyState() {
  const t = useTranslations("renter.lease");

  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-line bg-surface p-8 text-center">
      <ScrollText className="mb-2 size-8 text-faint" />
      <p className="text-sm font-semibold text-ink">{t("emptyTitle")}</p>
      <p className="mt-0.5 text-xs text-body">{t("emptyDescription")}</p>
    </div>
  );
}
