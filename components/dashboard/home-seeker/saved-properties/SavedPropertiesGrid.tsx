"use client";

import { FullSavedProperty } from "@/data/saved-properties-data";
import { SavedPropertyCard } from "./SavedPropertyCard";

interface SavedPropertiesGridProps {
  properties: FullSavedProperty[];
  onRemove: (id: string) => void;
}

export function SavedPropertiesGrid({
  properties,
  onRemove,
}: SavedPropertiesGridProps) {
  if (properties.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-line rounded-2xl">
        <p className="text-[14px] text-body">No saved properties left.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {properties.map((item) => (
        <SavedPropertyCard key={item.id} property={item} onRemove={onRemove} />
      ))}
    </div>
  );
}
