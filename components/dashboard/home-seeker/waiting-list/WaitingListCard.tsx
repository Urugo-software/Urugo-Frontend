"use client";

import Image from "next/image";
import Link from "next/link";
import { FullWaitingListItem } from "@/data/waiting-list-data";

interface WaitingListCardProps {
  item: FullWaitingListItem;
  onLeave: (id: string) => void;
}

export function WaitingListCard({ item, onLeave }: WaitingListCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 transition hover:shadow-xs">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-xl bg-surface sm:w-[140px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[15.5px] font-bold text-ink">
                {item.title}
              </div>
              <div className="text-[13px] text-body">
                {item.location} · {item.price}
              </div>
            </div>
            <span className="rounded-full bg-brand-tint px-3.5 py-1.5 text-[12px] font-bold text-brand whitespace-nowrap">
              {item.queueBadge}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
            <div>
              <span className="text-faint">Status</span>
              <div className="font-semibold text-ink">{item.status}</div>
            </div>
            <div>
              <span className="text-faint">Joined waiting list</span>
              <div className="font-semibold text-ink">{item.joinedDate}</div>
            </div>
            <div>
              <span className="text-faint">People ahead of you</span>
              <div className="font-semibold text-ink">{item.peopleAhead}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              href="/properties"
              className="rounded-lg border border-line px-4 py-2 text-[13px] font-semibold text-ink transition hover:bg-surface"
            >
              View property
            </Link>
            <button
              type="button"
              onClick={() => onLeave(item.id)}
              className="rounded-lg border border-line px-4 py-2 text-[13px] font-semibold text-danger transition hover:bg-red-50 cursor-pointer"
            >
              Leave waiting list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
