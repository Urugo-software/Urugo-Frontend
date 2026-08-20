"use client";

import Image from "next/image";
import Link from "next/link";
import { SavedPropertyItem as SavedPropertyItemData } from "@/data/dashboard-data";

const statusStyles: Record<
  SavedPropertyItemData["status"],
  { label: string; className: string }
> = {
  Available: {
    label: "Available",
    className: "bg-success-tint text-success",
  },
  Occupied: {
    label: "Occupied",
    className: "bg-warn-tint text-warn",
  },
};

export function SavedPropertyItem({ item }: { item: SavedPropertyItemData }) {
  const status = statusStyles[item.status];
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-5 py-4">
      <div className="flex items-center gap-3.5 min-w-55">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-white">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-[14px] font-bold text-ink">{item.name}</div>
          <div className="text-[12.5px] text-faint">{item.details}</div>
        </div>
      </div>
      <span
        className={`rounded-full px-3 py-1.5 text-[11.5px] font-bold ${status.className}`}
      >
        {status.label}
      </span>
      <Link
        href="/properties"
        className="rounded-lg border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-brand transition hover:bg-brand-tint"
      >
        View
      </Link>
    </div>
  );
}
