import Link from "next/link";
import { ArrowRight, Bell, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { RenterNotification } from "@/types/renter";

interface RenterRecentUpdatesCardProps {
  notifications: RenterNotification[];
  actionableIssuesCount: number;
}

export function RenterRecentUpdatesCard({
  notifications,
  actionableIssuesCount,
}: RenterRecentUpdatesCardProps) {
  const recent = notifications.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <section className="border border-line bg-white p-5 shadow-2xs lg:col-span-2">
        <div className="mb-4 flex items-center justify-between gap-2 border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <Bell aria-hidden="true" className="size-4 text-faint" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Upcoming Reminders &amp; Alerts
            </h3>
          </div>
          <Link
            href="/renter/notifications"
            className="text-xs font-semibold text-brand-blue hover:underline"
          >
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="py-6 text-center text-xs text-faint">
            No recent reminders right now.
          </p>
        ) : (
          <div className="divide-y divide-line">
            {recent.map((item) => (
              <Link
                key={item.id}
                href={item.href || "/renter/notifications"}
                className="flex items-start justify-between gap-3 py-3 transition-colors hover:bg-surface/50"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-ink">
                      {item.title}
                    </span>
                    {!item.read && (
                      <StatusBadge label="Unread" tone="info" />
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-body">
                    {item.message}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-faint">{item.date}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint">
              Rental Standing
            </span>
            <ShieldCheck aria-hidden="true" className="size-4 text-success" />
          </div>
          <StatusBadge
            label={
              actionableIssuesCount > 0
                ? `${actionableIssuesCount} Notice Pending Review`
                : "Good Standing"
            }
            tone={actionableIssuesCount > 0 ? "warning" : "success"}
            className="text-sm"
          />
          <p className="mt-2 text-xs leading-relaxed text-body">
            {actionableIssuesCount > 0
              ? "Review open landlord notices or submit payment proof within the 3-day notice window."
              : "No confirmed unpaid obligations on your rental history."}
          </p>
        </div>

        <Link
          href="/renter/rental-history"
          className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand-blue hover:underline"
        >
          <span>View Rental History</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </section>
    </div>
  );
}
