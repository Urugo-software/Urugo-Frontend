"use client";

import Image from "next/image";
import Link from "next/link";
import { waitingListData } from "@/data/dashboard-data";
import { SectionCard } from "./SectionCard";

export function WaitingListSection() {
  const item = waitingListData[0];
  return (
    <SectionCard
      title="Waiting List"
      className="tracking-wide"
      subtitle="You'll be notified the moment a spot opens"
      action={
        <Link
          href="/home-seeker/waiting-list"
          className="text-[13.5px] font-semibold text-brand transition hover:underline"
        >
          View all →
        </Link>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border hover:shadow-brand/30 hover:shadow-sm duration-300 hover:-translate-y-0.5  border-line px-5 py-4">
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
        <span className="rounded-full bg-brand-tint px-3 py-1.5 text-[12px] font-bold text-brand">
          {item.queueBadge}
        </span>
      </div>
    </SectionCard>
  );
}
