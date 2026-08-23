"use client";

interface VisitsTabsProps {
  activeTab: "upcoming" | "past";
  upcomingCount: number;
  pastCount: number;
  onTabChange: (tab: "upcoming" | "past") => void;
}

export function VisitsTabs({
  activeTab,
  upcomingCount,
  pastCount,
  onTabChange,
}: VisitsTabsProps) {
  return (
    <div className="flex gap-2 mb-7">
      <button
        type="button"
        onClick={() => onTabChange("upcoming")}
        className={`text-[13.5px] font-semibold px-5 py-2.5 rounded-full transition cursor-pointer ${
          activeTab === "upcoming"
            ? "bg-brand text-white shadow-xs"
            : "border border-line text-ink hover:bg-surface"
        }`}
      >
        Upcoming ({upcomingCount})
      </button>
      <button
        type="button"
        onClick={() => onTabChange("past")}
        className={`text-[13.5px] font-semibold px-5 py-2.5 rounded-full transition cursor-pointer ${
          activeTab === "past"
            ? "bg-brand text-white shadow-xs"
            : "border border-line text-ink hover:bg-surface"
        }`}
      >
        Past ({pastCount})
      </button>
    </div>
  );
}
