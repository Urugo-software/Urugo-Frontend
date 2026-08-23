"use client";

import { useState } from "react";
import { visitsData, VisitItem } from "@/data/visits-data";
import { VisitsHeader } from "./VisitsHeader";
import { VisitsTabs } from "./VisitsTabs";
import { VisitsList } from "./VisitsList";

export function VisitsWrapper() {
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
    <>
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
    </>
  );
}
