import React from "react";
import { Wrench, Calendar } from "lucide-react";
import { RenterMaintenance } from "@/types/renter";

export function MaintenanceRequestItem({ item }: { item: RenterMaintenance }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className=" border border-line bg-white p-5 shadow-xs transition hover:border-brand/40">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <div>
            <h4 className="text-lg font-bold text-ink">{item.title}</h4>
            <span className="text-[15px] text-faint">
              {item.category} · Priority: {item.priority}
            </span>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(item.status)}`}
        >
          {item.status}
        </span>
      </div>
      <p className=" my-3 text-[14px] text-body leading-relaxed">
        {item.description}
      </p>
      <div className="flex items-center gap-1 text-[12px] text-faint">
        <Calendar className="size-3.5" />
        <span>Submitted: {item.createdAt}</span>
      </div>
    </div>
  );
}
