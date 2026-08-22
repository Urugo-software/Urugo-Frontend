"use client";

import { FullWaitingListItem } from "@/data/waiting-list-data";
import { WaitingListCard } from "./WaitingListCard";

interface WaitingListContainerProps {
  items: FullWaitingListItem[];
  onLeave: (id: string) => void;
}

export function WaitingListContainer({
  items,
  onLeave,
}: WaitingListContainerProps) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-line rounded-2xl">
        <p className="text-[14px] text-body">
          You are not on any waiting lists currently.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <WaitingListCard key={item.id} item={item} onLeave={onLeave} />
      ))}
    </div>
  );
}
