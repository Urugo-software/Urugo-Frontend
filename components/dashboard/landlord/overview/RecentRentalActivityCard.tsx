import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import type { RecentActivityItem } from "@/types/landlord";

interface RecentRentalActivityCardProps {
  activities: RecentActivityItem[];
}

function getActivityMeta(type: RecentActivityItem["type"]): {
  label: string;
  tone: StatusTone;
  Icon: typeof Clock;
} {
  switch (type) {
    case "payment_pending":
      return { label: "Pending", tone: "warning", Icon: Clock };
    case "payment_approved":
      return { label: "Approved", tone: "success", Icon: CheckCircle2 };
    case "tenancy_ending":
      return { label: "Ending Soon", tone: "warning", Icon: CalendarClock };
    case "dispute_submitted":
      return { label: "Disputed", tone: "warning", Icon: AlertCircle };
    case "issue_reported":
      return { label: "Reported", tone: "info", Icon: AlertCircle };
    case "issue_resolved":
      return { label: "Resolved", tone: "success", Icon: CheckCircle2 };
    case "inquiry_received":
      return { label: "Inquiry", tone: "info", Icon: MessageSquare };
    case "viewing_requested":
      return { label: "Viewing", tone: "info", Icon: CalendarClock };
  }
}

export function RecentRentalActivityCard({
  activities,
}: RecentRentalActivityCardProps) {
  return (
    <div className="space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          Recent Activity
        </h3>
        <Link
          href="/landlord/notifications"
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
        >
          <span>View notifications</span>
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>

      {activities.length === 0 ? (
        <p className="py-8 text-center text-xs text-body">
          No recent rental activity yet.
        </p>
      ) : (
        <div className="divide-y divide-line">
          {activities.map((item) => {
            const { label, tone, Icon } = getActivityMeta(item.type);
            const href = item.href ?? "/landlord/tenancies";

            return (
              <Link
                key={item.id}
                href={href}
                className="flex flex-col gap-3 py-3.5 transition-colors hover:bg-surface/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-line bg-surface text-body">
                    <Icon aria-hidden="true" className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-body">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-faint">
                      {item.renterName} · {item.propertyTitle}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 pl-11 sm:justify-end sm:pl-0">
                  <span className="text-xs text-faint">{item.timestamp}</span>
                  <StatusBadge label={label} tone={tone} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
