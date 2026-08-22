"use client";

import { Info } from "lucide-react";

export function WaitingListInfoBanner() {
  return (
    <div className="mb-7 flex items-start gap-3.5 rounded-2xl border border-line bg-surface p-5">
      <Info className="mt-0.5 size-5 shrink-0 text-brand" />
      <p className="text-[13px] leading-relaxed text-body">
        <strong className="text-ink">How the waiting list works:</strong> when a
        property&apos;s current tenant gives notice, everyone on the list is
        notified by SMS and email in the order they joined — first come, first
        served. You can leave the list anytime.
      </p>
    </div>
  );
}
