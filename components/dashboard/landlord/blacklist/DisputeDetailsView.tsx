"use client";

import { useState } from "react";
import { RentalIssue } from "@/types/landlord";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DisputeDetailsViewProps {
  issue: RentalIssue;
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

export function DisputeDetailsView({ issue }: DisputeDetailsViewProps) {
  const [currentStatus, setCurrentStatus] = useState(issue.status);

  const badge = getStatusBadge(currentStatus);
  const title = getSimplifiedTitle(issue.issueTitle);

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Card */}
      <div className="border border-line bg-white p-6 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-ink">{issue.renterName}</h1>
            <p className="mt-0.5 text-sm font-medium text-body">{issue.propertyName}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold border ${badge.style}`}>
            {badge.label}
          </span>
        </div>

        <div className="pt-3 border-t border-line/60 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-bold text-ink">{title}</h2>
          <span className="text-sm font-bold text-brand">
            {issue.amountRwf.toLocaleString()} RWF · <span className="text-faint font-normal">{issue.createdDate}</span>
          </span>
        </div>
      </div>

      {/* 2. Landlord & Renter Explanations Side-by-Side */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Landlord Side */}
        <div className="flex flex-col border border-line bg-white shadow-2xs">
          <div className="border-b border-line px-5 py-4 bg-surface/50">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Landlord Says
            </h3>
          </div>
          <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
            <p className="text-sm text-body leading-relaxed">{issue.landlordReport}</p>
            <p className="text-xs text-faint">
              Reported by {issue.landlordName} · {issue.createdDate}
            </p>
          </div>
        </div>

        {/* Renter Side */}
        <div className="flex flex-col border border-line bg-white shadow-2xs">
          <div className="border-b border-line px-5 py-4 bg-surface/50">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Renter Says
            </h3>
          </div>
          <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
            {issue.renterResponse ? (
              <p className="text-sm text-body leading-relaxed">{issue.renterResponse}</p>
            ) : (
              <p className="text-sm italic text-faint">No explanation submitted yet.</p>
            )}

            {issue.evidence && (
              <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                <span className="text-xs font-medium text-ink">
                  {issue.evidence.title}
                </span>
                <button className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View receipt</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Actions Card */}
      <div className="border border-line bg-white p-6 shadow-2xs space-y-4">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Take Action
          </h3>
          <p className="mt-1 text-sm text-body">
            Review the renter&apos;s explanation or receipt before deciding.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            className="bg-brand text-white hover:bg-brand-deep"
            onClick={() => setCurrentStatus("Resolved")}
          >
            Accept proof & resolve
          </Button>
          <Button
            variant="outline"
            className="border-amber-200 text-amber-700 hover:bg-amber-50"
            onClick={() => setCurrentStatus("Confirmed")}
          >
            Confirm bill not paid
          </Button>
        </div>
      </div>
    </div>
  );
}
