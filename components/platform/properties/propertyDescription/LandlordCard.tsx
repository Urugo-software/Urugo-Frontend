"use client";

import { ShieldCheck } from "lucide-react";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { Landlord } from "@/types/properties";

interface LandlordCardProps {
  landlord: Landlord;
}

export default function LandlordCard({ landlord }: LandlordCardProps) {
  const showPhone = useLandlordWorkspace((s) => s.contactVisibility.showPhone);

  return (
    <div className="flex items-start gap-3">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-sm font-bold text-brand">
        {landlord.initials}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[14.5px] font-bold text-ink">
          <span className="truncate">{landlord.name}</span>
          {landlord.isVerified && (
            <ShieldCheck
              aria-label="Verified landlord"
              className="size-4 shrink-0 text-brand"
            />
          )}
        </div>

        <div className="text-[12.5px] text-body">
          {landlord.isVerified ? "Verified landlord" : "Property owner"}
        </div>

        {showPhone && landlord.phone && (
          <a
            href={`tel:${landlord.phone}`}
            className="mt-0.5 inline-block text-[12.5px] font-medium text-body transition-colors hover:text-brand hover:underline"
          >
            {landlord.phone}
          </a>
        )}
      </div>
    </div>
  );
}
