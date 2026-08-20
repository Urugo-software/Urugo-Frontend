"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { nextViewingData } from "@/data/dashboard-data";

export function NextViewingCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[14.5px] font-bold text-ink">Next Viewing</div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous viewing"
            className="grid size-6 place-items-center rounded-md border border-line text-body transition hover:bg-surface"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="Next viewing"
            className="grid size-6 place-items-center rounded-md border border-line text-body transition hover:bg-surface"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mb-3.5 text-[13px] font-semibold text-body">
        {nextViewingData.date}
      </div>

      <div className="mb-3 flex items-center gap-2.5 rounded-[10px] bg-brand-tint p-3.5">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-surface">
          <Image
            src={nextViewingData.propertyImage}
            alt={nextViewingData.propertyName}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[12.5px] font-bold text-ink">
            {nextViewingData.propertyName}
          </div>
          <div className="text-[11px] text-body">
            {nextViewingData.time} · {nextViewingData.agent}
          </div>
        </div>
      </div>

      <div className="rounded-[9px] bg-surface p-3.5 text-[12px] leading-relaxed text-body">
        {nextViewingData.note}
      </div>
    </div>
  );
}
