"use client";

import { VisitItem } from "@/data/visits-data";
import { UpcomingVisitCard } from "./UpcomingVisitCard";
import { PastVisitCard } from "./PastVisitCard";

interface VisitsListProps {
  activeTab: "upcoming" | "past";
  visits: VisitItem[];
  onCancelVisit: (id: string) => void;
}

export function VisitsList({
  activeTab,
  visits,
  onCancelVisit,
}: VisitsListProps) {
  const filtered = visits.filter((v) => v.type === activeTab);

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-line rounded-2xl">
        <p className="text-[14px] text-body">
          No {activeTab} visits scheduled.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((item) =>
        item.type === "upcoming" ? (
          <UpcomingVisitCard
            key={item.id}
            visit={item}
            onCancel={onCancelVisit}
          />
        ) : (
          <PastVisitCard key={item.id} visit={item} />
        )
      )}
    </div>
  );
}
