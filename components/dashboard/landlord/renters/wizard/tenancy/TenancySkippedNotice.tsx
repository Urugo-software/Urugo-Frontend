"use client";

import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TenancySkippedNoticeProps {
  onEnable: () => void;
}

export function TenancySkippedNotice({ onEnable }: TenancySkippedNoticeProps) {
  return (
    <div className="border border-dashed border-neutral-300 bg-surface/40 p-8 sm:p-10 text-center">
      <div className="mx-auto flex size-12 items-center justify-center border border-line bg-white text-body shadow-2xs">
        <Building2 className="size-5 text-ink" />
      </div>
      <div className="mt-4 max-w-md mx-auto space-y-1.5">
        <h3 className="text-sm font-semibold text-ink">
          Tenancy Terms Currently Skipped
        </h3>
        <p className="text-[12.5px] text-body leading-relaxed">
          This renter will be added as an unassigned directory profile without
          an active lease or scheduled payment obligation. You can assign them to a
          property anytime later.
        </p>
      </div>
      <div className="mt-6">
        <Button
          type="button"
          onClick={onEnable}
          className="inline-flex h-9.5 cursor-pointer items-center gap-2 rounded-none border border-line bg-white px-4 text-[12.5px] font-medium text-ink hover:bg-surface shadow-2xs transition-colors"
        >
          <Plus className="size-3.5" />
          <span>Configure Tenancy Terms</span>
        </Button>
      </div>
    </div>
  );
}
