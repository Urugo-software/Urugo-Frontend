"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { SETTINGS_TABS } from "./settings-config";

export function LandlordSettingsView() {
  const searchParams = useSearchParams();
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const visibleTabs =
    serviceMode === "listing_only"
      ? SETTINGS_TABS.filter((tab) => !tab.managedOnly)
      : SETTINGS_TABS;

  const requestedTab = searchParams.get("tab");
  const [manualSelection, setManualSelection] = useState<{
    param: string | null;
    tabId: string;
  } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeTabId =
    manualSelection && manualSelection.param === requestedTab
      ? manualSelection.tabId
      : (visibleTabs.find((t) => t.id === requestedTab)?.id ?? "profile");

  const setActiveTabId = (tabId: string) =>
    setManualSelection({ param: requestedTab, tabId });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSave = () => {
    setIsSaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsSaved(false), 3000);
  };

  const activeTab =
    visibleTabs.find((t) => t.id === activeTabId) || visibleTabs[0];
  const ActiveComponent = activeTab.component;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Settings
            </h2>
            <p className="mt-1 text-sm text-body">
              Manage your landlord service plan, profile, contact visibility,
              notifications, and security.
            </p>
          </div>

          {isSaved && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-1.5 text-xs font-semibold text-success"
            >
              <CheckCircle2 aria-hidden="true" className="size-4" />
              <span>Changes saved</span>
            </div>
          )}
        </div>

        <div className="grid min-h-[520px] grid-cols-1 overflow-hidden border border-line bg-white shadow-2xs md:grid-cols-[240px_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Settings sections"
            className="flex gap-1.5 overflow-x-auto border-b border-line bg-surface/40 p-3 md:flex-col md:overflow-visible md:border-b-0 md:border-r md:p-4"
          >
            {visibleTabs.map(({ id, label, icon: Icon }) => {
              const selected = activeTab.id === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTabId(id)}
                  className={`flex shrink-0 cursor-pointer items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition-colors md:w-full ${
                    selected
                      ? "bg-brand-tint font-semibold text-brand-blue"
                      : "text-body hover:bg-surface hover:text-ink"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="min-w-0 p-5 sm:p-8 lg:p-10">
            <ActiveComponent onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
