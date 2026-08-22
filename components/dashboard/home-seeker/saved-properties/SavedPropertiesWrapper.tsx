"use client";

import { useState } from "react";
import { fullSavedProperties } from "@/data/saved-properties-data";
import { SavedPropertiesHeader } from "./SavedPropertiesHeader";
import { SavedPropertiesGrid } from "./SavedPropertiesGrid";

export function SavedPropertiesWrapper() {
  const [items, setItems] = useState(fullSavedProperties);
  const [sortBy, setSortBy] = useState("Sort: Recently saved");

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "Sort: Price — low to high") {
      return (
        parseInt(a.price.replace(/,/g, "")) -
        parseInt(b.price.replace(/,/g, ""))
      );
    }
    return 0;
  });

  return (
    <>
      <SavedPropertiesHeader
        totalCount={sortedItems.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <SavedPropertiesGrid properties={sortedItems} onRemove={handleRemove} />
    </>
  );
}
