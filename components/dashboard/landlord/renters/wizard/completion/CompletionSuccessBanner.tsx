"use client";

import { Check } from "lucide-react";

export function CompletionSuccessBanner() {
  return (
    <div className="border border-line bg-surface/50 p-5 sm:p-6 shadow-2xs">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 shadow-2xs">
          <Check className="size-5 stroke-[2.5]" />
        </div>
        <div>
          <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-ink">
            Renter Successfully Prepared
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-body leading-relaxed max-w-xl">
            The renter record has been registered to your landlord workspace. In
            the full production environment, this triggers automated National ID
            verification, debt record cross-check, and formal tenancy contract
            setup.
          </p>
        </div>
      </div>
    </div>
  );
}
