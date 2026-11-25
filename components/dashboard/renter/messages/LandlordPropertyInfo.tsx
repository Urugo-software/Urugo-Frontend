"use client";

import React from "react";
import { Building } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  property: string;
  unit: string;
}

export function LandlordPropertyInfo({ property, unit }: Props) {
  const t = useTranslations("renter.messages");

  return (
    <div className="rounded-xl border border-line bg-surface p-4 space-y-2.5">
      <div className="text-[12.5px] font-bold uppercase tracking-wider text-faint flex items-center gap-1.5">
        <Building className="size-3.5 text-brand" /> {t("propertyAndUnit")}
      </div>
      <div>
        <div className="text-xs font-bold text-ink">{property}</div>
        <div className="text-xs text-body mt-0.5">{unit}</div>
      </div>
    </div>
  );
}
