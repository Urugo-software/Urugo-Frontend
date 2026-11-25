"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Bath, BedDouble, CarFront } from "lucide-react";

import type { PropertyCardSpecsProps } from "@/types";

function PropertyCardSpecs({
  id,
  beds,
  baths,
  parking,
}: PropertyCardSpecsProps) {
  const t = useTranslations("properties.card");

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line/50 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        {beds > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
            <BedDouble aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
            {t("beds", { count: beds })}
          </span>
        )}

        {baths > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
            <Bath aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
            {t("baths", { count: baths })}
          </span>
        )}

        {parking && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
            <CarFront aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
            {t("parking")}
          </span>
        )}
      </div>

      <Link
        href={`/properties/${id}`}
        className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-brand transition-colors hover:text-brand-deep hover:underline"
      >
        {t("viewDetails")} &rarr;
      </Link>
    </div>
  );
}

export default PropertyCardSpecs;
