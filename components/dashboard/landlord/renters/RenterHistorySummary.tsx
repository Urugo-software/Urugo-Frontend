import Link from "next/link";
import { RentalIssue } from "@/types/landlord";
import { ArrowRight } from "lucide-react";

interface RenterHistorySummaryProps {
  issues: RentalIssue[];
}

export function RenterHistorySummary({ issues }: RenterHistorySummaryProps) {
  const previousLeasesCount = 3;
  const completedCleanCount = 2;
  const issueCount = issues.length;
  const disputedCount = issues.filter((i) => i.status === "Disputed").length;

  return (
    <div className="border border-line bg-white shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
          Renter History Summary
        </h3>
        <Link
          href="/landlord/blacklist-check"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <span>View Renter History</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
        {[
          { label: "Previous Leases", value: previousLeasesCount, color: "text-ink" },
          { label: "Completed Clean", value: completedCleanCount, color: "text-brand" },
          { label: "Reported Issues", value: issueCount, color: "text-amber-700" },
          { label: "Renter Disagrees", value: disputedCount, color: "text-rose-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white px-6 py-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
              {label}
            </span>
            <span className={`mt-2 text-2xl sm:text-3xl font-bold block ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {issues.length > 0 && (
        <div className="border-t border-line">
          <div className="px-6 py-4 bg-surface/50 border-b border-line/60">
            <span className="text-xs font-semibold uppercase tracking-wider text-faint block">
              Past Reported Issues
            </span>
          </div>
          <div className="divide-y divide-line">
            {issues.map((issue) => (
              <div key={issue.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                <div>
                  <h4 className="text-sm font-bold text-ink">{issue.issueTitle}</h4>
                  <p className="mt-1 text-sm text-body">
                    {issue.propertyName} &middot;{" "}
                    <span className="font-bold text-brand">{issue.amountRwf.toLocaleString()} RWF</span>
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold border bg-amber-50 text-amber-700 border-amber-200">
                  {issue.status === "Disputed" ? "Renter disagrees" : issue.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
