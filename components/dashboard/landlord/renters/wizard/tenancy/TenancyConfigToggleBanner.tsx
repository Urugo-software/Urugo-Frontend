"use client";

import { Building2, Check } from "lucide-react";

interface TenancyConfigToggleBannerProps {
  isConfigured: boolean;
  onToggle: (checked: boolean) => void;
}

export function TenancyConfigToggleBanner({
  isConfigured,
  onToggle,
}: TenancyConfigToggleBannerProps) {
  return (
    <div className="border border-line bg-surface/60 p-4 sm:p-5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="flex size-10 shrink-0 items-center justify-center border border-line bg-white text-ink shadow-2xs">
            <Building2 className="size-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                Tenancy & Lease Terms
              </h3>
              <span
                className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[11px] font-medium transition-colors ${
                  isConfigured
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-neutral-200 bg-white text-body"
                }`}
              >
                {isConfigured ? (
                  <>
                    <Check className="size-3" />
                    <span>Enabled</span>
                  </>
                ) : (
                  "Optional / Skipped"
                )}
              </span>
            </div>
            <p className="mt-1 text-xs text-body leading-relaxed max-w-xl">
              Connect this renter to a specific property unit, configure recurring
              monthly rent, and calculate move-in payments.
            </p>
          </div>
        </div>

        {/* Custom Toggle Switch */}
        <label className="flex items-center gap-2.5 cursor-pointer self-start sm:self-auto select-none border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink hover:bg-surface/80 transition-all shadow-2xs">
          <input
            type="checkbox"
            checked={isConfigured}
            onChange={(e) => onToggle(e.target.checked)}
            className="size-4 accent-black rounded-none cursor-pointer"
          />
          <span>{isConfigured ? "Terms Active" : "Enable Terms"}</span>
        </label>
      </div>
    </div>
  );
}
