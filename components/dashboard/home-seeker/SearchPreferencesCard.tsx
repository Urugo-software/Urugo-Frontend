"use client";

import { searchPreferencesData } from "@/data/dashboard-data";

interface SearchPreferencesCardProps {
  onOpenAIWidget?: () => void;
}

export function SearchPreferencesCard({
  onOpenAIWidget,
}: SearchPreferencesCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[14.5px] font-bold text-ink">
          Your Search Preferences
        </div>
        <button
          type="button"
          onClick={onOpenAIWidget}
          className="text-[12px] font-semibold text-brand transition hover:underline cursor-pointer"
        >
          Update →
        </button>
      </div>
      <p className="mb-4 text-[12.5px] text-faint">
        Learned from your conversations with the AI Assistant
      </p>
      <div className="flex flex-col gap-3">
        {searchPreferencesData.map(({ label, value }) => (
          <div key={label}>
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="text-body">{label}</span>
              <span className="font-semibold text-ink">{value}</span>
            </div>
            <div className="mt-3 h-px bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
