"use client";

import Image from "next/image";
import { VisitItem } from "@/data/visits-data";

export function PastVisitCard({ visit }: { visit: VisitItem }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 opacity-80 transition hover:opacity-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface">
          <Image
            src={visit.image}
            alt={visit.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="text-[14.5px] font-bold text-ink">{visit.title}</div>
          <div className="text-[13px] text-body">{visit.location}</div>
        </div>
        <span className="rounded-full bg-surface px-3 py-1.5 text-[11.5px] font-bold text-faint self-start sm:self-center">
          {visit.status}
        </span>
      </div>
    </div>
  );
}
