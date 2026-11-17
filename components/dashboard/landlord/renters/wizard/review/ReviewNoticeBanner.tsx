"use client";

import { CheckCircle2 } from "lucide-react";

export function ReviewNoticeBanner() {
  return (
    <div className="border border-line bg-surface p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center border border-line bg-white text-ink">
          <CheckCircle2 className="size-4.5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-ink">
            Ready for Final Registration Review
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-body">
            Please inspect the renter identity details and configured tenancy
            terms below. You can navigate back to modify any section prior to
            confirming.
          </p>
        </div>
      </div>
    </div>
  );
}
