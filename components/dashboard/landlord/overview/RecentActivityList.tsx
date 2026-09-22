import { RecentActivityItem } from "@/types/landlord";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface RecentActivityListProps {
  activities: RecentActivityItem[];
}

function ActivityIcon({ type }: { type: RecentActivityItem["type"] }) {
  if (type === "payment_approved" || type === "issue_resolved") {
    return <CheckCircle2 className="size-5 text-success" />;
  }
  if (type === "payment_pending" || type === "tenancy_ending") {
    return <Clock className="size-5 text-warn" />;
  }
  return <AlertTriangle className="size-5 text-destructive" />;
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  return (
    <div className="border border-line bg-white shadow-xs">
      <div className="border-b border-line px-5 py-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          Recent Activity
        </h3>
      </div>

      <div className="divide-y divide-line">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-4 px-5 py-5">
            <div className="mt-0.5 shrink-0">
              <ActivityIcon type={item.type} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="text-[15px] font-semibold text-ink">{item.title}</span>
                <span className="shrink-0 text-[13px] text-faint">{item.timestamp}</span>
              </div>
              <p className="mt-1 text-[14px] text-body">{item.description}</p>
              <p className="mt-1 text-[13px] text-faint">
                {item.renterName} &middot; {item.propertyTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
