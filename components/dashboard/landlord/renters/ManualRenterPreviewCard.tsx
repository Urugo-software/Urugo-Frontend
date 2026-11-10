"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ManualRenterPreviewCardProps } from "./types/renter-registration.types";

export function ManualRenterPreviewCard({
  draft,
  propertyName,
  onReset,
  onDone,
}: ManualRenterPreviewCardProps) {
  const maskedId = `${draft.nationalId.slice(0, 4)}********${draft.nationalId.slice(-4)}`;
  const summaryRows = [
    { label: "Full Name", value: draft.fullName, mono: false },
    { label: "Email Address", value: draft.email, mono: false },
    { label: "Phone Number", value: draft.phoneNumber, mono: false },
    { label: "National ID (Masked)", value: maskedId, mono: true },
    {
      label: "Selected Property",
      value: propertyName || "Not assigned (General Registration)",
      mono: false,
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-9">
      <div className="border border-line bg-surface p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-ink" />
          <div>
            <h3 className="text-base font-bold text-ink">
              Manual Registration Prepared
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-body">
              This record is stored in local UI state only. No backend request
              or renter account has been created yet.
            </p>
          </div>
        </div>
      </div>

      <div className="border border-line bg-surface/60 p-6 sm:p-7 space-y-4 text-sm">
        {summaryRows.map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-3 ${
              idx < summaryRows.length - 1 ? "border-b border-line pb-3.5" : ""
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-faint">
              {row.label}
            </span>
            <span
              className={
                row.mono
                  ? "font-mono text-xs font-semibold text-ink"
                  : "font-medium text-ink"
              }
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="h-11 cursor-pointer rounded-none border-line px-5 text-sm font-semibold text-ink"
        >
          Register Another Renter
        </Button>
        {onDone && (
          <Button
            type="button"
            onClick={onDone}
            className="h-11 cursor-pointer rounded-none bg-ink px-6 text-sm font-semibold text-white hover:bg-black transition-colors"
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
