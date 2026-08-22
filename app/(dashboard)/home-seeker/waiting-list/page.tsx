"use client";

import { useState } from "react";
import { fullWaitingListData } from "@/data/waiting-list-data";
import { WaitingListHeader } from "@/components/dashboard/home-seeker/waiting-list/WaitingListHeader";
import { WaitingListInfoBanner } from "@/components/dashboard/home-seeker/waiting-list/WaitingListInfoBanner";
import { WaitingListContainer } from "@/components/dashboard/home-seeker/waiting-list/WaitingListContainer";

export default function WaitingListPage() {
  const [items, setItems] = useState(fullWaitingListData);

  const handleLeave = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
      <WaitingListHeader />
      <WaitingListInfoBanner />
      <WaitingListContainer items={items} onLeave={handleLeave} />
    </div>
  );
}
