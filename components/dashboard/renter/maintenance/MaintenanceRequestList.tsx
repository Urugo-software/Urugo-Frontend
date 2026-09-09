import React from "react";
import { Wrench } from "lucide-react";
import { RenterMaintenance } from "@/types/renter";
import { MaintenanceRequestItem } from "./MaintenanceRequestItem";

export function MaintenanceRequestList({ items }: { items: RenterMaintenance[] }) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-line bg-surface p-8 text-center">
        <Wrench className="size-8 text-faint mb-2" />
        <p className="text-sm font-semibold text-ink">No maintenance requests yet.</p>
        <p className="text-xs text-body mt-0.5">Submit a request if you encounter any issue in your apartment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item) => (
        <MaintenanceRequestItem key={item.id} item={item} />
      ))}
    </div>
  );
}
