"use client";

import { useState } from "react";
import { visitsData, VisitItem } from "@/data/visits-data";
import { VisitsHeader } from "@/components/dashboard/home-seeker/visits/VisitsHeader";
import { VisitsTabs } from "@/components/dashboard/home-seeker/visits/VisitsTabs";
import { VisitsList } from "@/components/dashboard/home-seeker/visits/VisitsList";

export default function VisitsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [list, setList] = useState<VisitItem[]>(visitsData);

  const handleCancelVisit = (id: string) => {
    setList((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: "Cancelled", type: "past" } : v
      )
    );
  };

  const upcomingCount = list.filter((v) => v.type === "upcoming").length;
  const pastCount = list.filter((v) => v.type === "past").length;

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
      <VisitsHeader />
      <VisitsTabs
        activeTab={activeTab}
        upcomingCount={upcomingCount}
        pastCount={pastCount}
        onTabChange={setActiveTab}
      />
      <VisitsList
        activeTab={activeTab}
        visits={list}
        onCancelVisit={handleCancelVisit}
      />
    </div>
  );
}
