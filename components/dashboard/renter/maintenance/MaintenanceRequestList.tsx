import { Wrench } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import type { RenterMaintenance } from "@/types/renter";
import { MaintenanceRequestItem } from "./MaintenanceRequestItem";

interface MaintenanceRequestListProps {
  items: RenterMaintenance[];
  onSelect: (item: RenterMaintenance) => void;
  onClearFilters?: () => void;
}

export function MaintenanceRequestList({
  items,
  onSelect,
  onClearFilters,
}: MaintenanceRequestListProps) {
  if (items.length === 0) {
    return (
      <EmptyStateBox
        icon={Wrench}
        title="No maintenance requests found"
        description={
          onClearFilters
            ? "No requests match your search or status filter."
            : "Submit a request if you encounter any issue in your apartment."
        }
        action={
          onClearFilters ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="cursor-pointer border border-line bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-surface"
            >
              Clear filters
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <MaintenanceRequestItem
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
