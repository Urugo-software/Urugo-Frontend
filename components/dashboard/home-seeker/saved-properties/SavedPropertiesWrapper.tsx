"use client";

import { useState } from "react";
import { fullSavedProperties } from "@/data/saved-properties-data";
import { SavedPropertiesHeader } from "./SavedPropertiesHeader";
import { SavedPropertiesGrid } from "./SavedPropertiesGrid";

export function SavedPropertiesWrapper() {
  const [items, setItems] = useState(fullSavedProperties);
  const [sortBy, setSortBy] = useState("Recently saved");

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <SavedPropertiesHeader
        totalCount={items.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <SavedPropertiesGrid properties={items} onRemove={handleRemove} />
    </>
  );
}
