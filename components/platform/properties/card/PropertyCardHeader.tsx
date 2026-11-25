"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

import type { PropertyCardHeaderProps } from "@/types";

function PropertyCardHeader({
  viewMode = "list",
  id,
  headline,
  ownerName,
  location,
  price,
  currency,
  period,
}: PropertyCardHeaderProps & { viewMode?: "grid" | "list" }) {
  const t = useTranslations("properties");
  const displayPeriod =
    period.toLowerCase() === "month" ? t("periods.month") : period;

  return (
    <div>
      <div
        className={`flex ${viewMode === "grid" ? "flex-col" : ""} items-start justify-between gap-3`}
      >
        <div className="min-w-0 flex-1">
          <Link href={`/properties/${id}`}>
            <h3 className="truncate text-base font-bold capitalize tracking-tight text-ink transition-colors group-hover:text-brand sm:text-[17px]">
              {headline}
            </h3>
          </Link>

          <div className="mt-1 flex flex-col items-start gap-2 text-xs text-body">
            <span className="flex items-center gap-1 text-faint">
              <MapPin
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-brand"
              />
              <span className="truncate font-medium text-ink">{location}</span>
            </span>

            <span className="truncate text-faint">
              {t("card.byOwner", { owner: ownerName })}
            </span>
          </div>
        </div>

        {/* Price Badge */}
        <div
          className={`shrink-0 ${viewMode === "grid" ? "text-left" : "text-right"}`}
        >
          <div className="text-base font-extrabold tracking-tight text-brand sm:text-lg">
            {price}
          </div>
          <div className="text-[12.5px] font-medium text-body">
            {currency} / {displayPeriod}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCardHeader;
