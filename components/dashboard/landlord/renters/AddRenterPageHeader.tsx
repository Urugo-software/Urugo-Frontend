"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export function AddRenterPageHeader() {
  const t = useTranslations("landlord.renters");

  return (
    <header className="space-y-3.5">
      <Link
        href="/landlord/renters"
        className="inline-flex items-center gap-2 text-sm font-semibold text-faint transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
      >
        <ArrowLeft className="size-4" />
        <span>{t("backToRenters")}</span>
      </Link>
    </header>
  );
}
