import { Calendar } from "lucide-react";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import type { MaintenanceStatus, RenterMaintenance } from "@/types/renter";

const TONE: Record<MaintenanceStatus, StatusTone> = {
  Pending: "warning",
  "In Progress": "info",
  Resolved: "success",
  Rejected: "danger",
};

interface MaintenanceRequestItemProps {
  item: RenterMaintenance;
  onSelect: (item: RenterMaintenance) => void;
}

export function MaintenanceRequestItem({
  item,
  onSelect,
}: MaintenanceRequestItemProps) {
  return (
    <article className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs transition-colors hover:border-ink/40">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line pb-3">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-ink">{item.title}</h3>
            <span className="text-xs text-faint">
              {item.category} &middot; Priority: {item.priority}
            </span>
          </div>
          <StatusBadge label={item.status} tone={TONE[item.status]} />
        </div>

        <p className="my-3 line-clamp-2 text-sm leading-relaxed text-body">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-3 text-xs">
        <span className="inline-flex items-center gap-1.5 text-faint">
          <Calendar aria-hidden="true" className="size-3.5" />
          Submitted {item.createdAt}
        </span>
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="cursor-pointer font-semibold text-brand-blue hover:underline"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
