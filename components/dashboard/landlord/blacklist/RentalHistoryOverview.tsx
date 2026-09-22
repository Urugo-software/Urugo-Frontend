import Link from "next/link";
import { RentalIssue } from "@/types/landlord";
import { ArrowRight } from "lucide-react";

interface RentalHistoryOverviewProps {
  issues: RentalIssue[];
}

function getStatusBadge(status: RentalIssue["status"]) {
  switch (status) {
    case "Disputed":
      return { label: "Renter disagrees", style: "bg-amber-50 text-amber-700 border-amber-200" };
    case "Reported":
      return { label: "Waiting for review", style: "bg-brand-tint text-brand border-blue-200" };
    case "Resolved":
      return { label: "Resolved", style: "bg-brand-tint text-brand border-blue-200" };
    case "Confirmed":
    case "Unresolved":
    default:
      return { label: "Confirmed", style: "bg-rose-50 text-rose-700 border-rose-200" };
  }
}

function getSimplifiedTitle(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("water")) return "Water bill not paid";
  if (lower.includes("electricity")) return "Electricity bill not paid";
  return title;
}

export function RentalHistoryOverview({ issues }: RentalHistoryOverviewProps) {
  return (
    <div className="space-y-5">
      {issues.map((issue) => {
        const badge = getStatusBadge(issue.status);
        const title = getSimplifiedTitle(issue.issueTitle);
        const summaryText =
          issue.status === "Disputed" && issue.renterResponse
            ? issue.renterResponse
            : issue.status === "Resolved"
              ? "This issue has been resolved."
              : issue.landlordReport;

        return (
          <div
            key={issue.id}
            className="border border-line bg-white p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-4"
          >
            {/* 1. Renter & Property Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-ink">{issue.renterName}</h2>
                <p className="mt-0.5 text-sm font-medium text-body">{issue.propertyName}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold border ${badge.style}`}>
                {badge.label}
              </span>
            </div>

            {/* 2. Issue Title & Amount / Date */}
            <div className="pt-2 border-t border-line/60">
              <h3 className="text-base font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm font-semibold text-brand">
                {issue.amountRwf.toLocaleString()} RWF · <span className="text-faint font-normal">{issue.createdDate}</span>
              </p>
            </div>

            {/* 3. Short Summary */}
            {summaryText && (
              <p className="text-sm text-body bg-surface p-3.5 border border-line/50 leading-relaxed">
                {summaryText}
              </p>
            )}

            {/* 4. Action Button */}
            <div className="pt-3 border-t border-line/60 flex items-center justify-between">
              <span className="text-xs font-medium text-faint">
                Tenancy: {issue.tenancyPeriod}
              </span>
              <Link
                href={`/landlord/blacklist-check/${issue.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
              >
                <span>Review details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
