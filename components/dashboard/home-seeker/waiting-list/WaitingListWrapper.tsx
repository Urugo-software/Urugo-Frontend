"use client";

import { useState } from "react";
import { fullWaitingListData } from "@/data/waiting-list-data";
import { WaitingListHeader } from "./WaitingListHeader";
import { WaitingListInfoBanner } from "./WaitingListInfoBanner";
import { WaitingListContainer } from "./WaitingListContainer";

export function WaitingListWrapper() {
  const [items, setItems] = useState(fullWaitingListData);

  const handleLeave = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <WaitingListHeader />
      <WaitingListInfoBanner />
      <WaitingListContainer items={items} onLeave={handleLeave} />
    </>
  );
}
