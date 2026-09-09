"use client";

import React from "react";
import { Building } from "lucide-react";

interface Props {
  property: string;
  unit: string;
}

export function LandlordPropertyInfo({ property, unit }: Props) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 space-y-2.5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-faint flex items-center gap-1.5">
        <Building className="size-3.5 text-brand" /> Property & Unit
      </div>
      <div>
        <div className="text-xs font-bold text-ink">{property}</div>
        <div className="text-xs text-body mt-0.5">{unit}</div>
      </div>
    </div>
  );
}
