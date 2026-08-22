"use client";

import { useState } from "react";
import { fullSavedProperties } from "@/data/saved-properties-data";
import { SavedPropertiesHeader } from "@/components/dashboard/home-seeker/saved-properties/SavedPropertiesHeader";
import { SavedPropertiesGrid } from "@/components/dashboard/home-seeker/saved-properties/SavedPropertiesGrid";

export default function SavedPropertiesPage() {
  const [items, setItems] = useState(fullSavedProperties);
  const [sortBy, setSortBy] = useState("recent");

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "price_low") {
      return (
        parseInt(a.price.replace(/,/g, "")) -
        parseInt(b.price.replace(/,/g, ""))
      );
    }
    return 0;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
      <SavedPropertiesHeader
        totalCount={sortedItems.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <SavedPropertiesGrid properties={sortedItems} onRemove={handleRemove} />
    </div>
  );
}
