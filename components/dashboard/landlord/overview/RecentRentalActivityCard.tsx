import Link from "next/link";
import { ArrowRight, MoreHorizontal, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { RecentActivityItem } from "@/types/landlord";

interface RecentRentalActivityCardProps {
  activities: RecentActivityItem[];
}

export function RecentRentalActivityCard({ activities }: RecentRentalActivityCardProps) {
  const getStatusBadge = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "payment_pending":
        return { label: "In Review", style: "bg-amber-50 text-amber-700 border-amber-200" };
      case "dispute_submitted":
      case "issue_reported":
        return { label: "Disputed", style: "bg-rose-50 text-rose-700 border-rose-200" };
      case "payment_approved":
      case "issue_resolved":
      default:
        return { label: "Approved", style: "bg-brand-tint text-brand border-blue-200" };
    }
  };

  const getActivityIcon = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "payment_pending":
        return <Clock className="h-5 w-5 text-amber-600" />;
      case "dispute_submitted":
      case "issue_reported":
        return <AlertTriangle className="h-5 w-5 text-rose-600" />;
      case "payment_approved":
      case "issue_resolved":
      default:
        return <CheckCircle2 className="h-5 w-5 text-brand" />;
    }
  };

  return (
    <div className="border border-line bg-white p-6 sm:p-7 shadow-2xs space-y-5">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-ink">Recent Rental Activity</h2>
          <p className="text-sm text-body mt-1">
            Latest tenant actions, payment submissions, and dispute updates.
          </p>
        </div>
      </div>

      {/* Rows Container */}
      <div className="space-y-3.5">
        {activities.map((item) => {
          const badge = getStatusBadge(item.type);

          return (
            <div
              key={item.id}
              className="border border-line bg-surface/40 hover:bg-surface p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 transition-colors"
            >
              {/* Left Column: Avatar & Event Info */}
              <div className="flex items-center gap-4 min-w-[260px] flex-1">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-white border border-line shadow-2xs">
                  {getActivityIcon(item.type)}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-ink">{item.title}</h4>
                  <p className="text-sm text-body mt-0.5">
                    <span className="font-semibold text-ink">{item.renterName}</span> · {item.propertyTitle}
                  </p>
                </div>
              </div>

              {/* Middle Column: Date */}
              <div className="text-left sm:text-right min-w-[130px]">
                <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
                  Date
                </span>
                <span className="text-sm font-semibold text-ink block mt-0.5">
                  {item.timestamp}
                </span>
              </div>

              {/* Status Badge */}
              <div className="min-w-[110px] flex justify-start sm:justify-center">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold border ${badge.style}`}
                >
                  {badge.label}
                </span>
              </div>

              {/* Actions Button */}
              <div className="flex items-center justify-end">
                <Link
                  href="/landlord/tenancies"
                  className="p-1.5 text-faint hover:text-ink transition-colors"
                  title="View details"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-line text-center">
        <Link
          href="/landlord/tenancies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <span>View all rental activity history</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
