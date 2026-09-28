"use client";

import { useState } from "react";
import { CheckCircle2, Settings2 } from "lucide-react";
import { SETTINGS_TABS } from "./settings-config";

export function LandlordSettingsView() {
  const [activeTabId, setActiveTabId] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const activeTab =
    SETTINGS_TABS.find((t) => t.id === activeTabId) || SETTINGS_TABS[0];
  const ActiveComponent = activeTab.component;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[#f7f8fa] p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mx-auto max-w-7xl space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-body">
              Manage your profile, payouts, notifications, and account security.
            </p>
          </div>

          {isSaved && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-none">
              <CheckCircle2 className="h-4 w-4" />
              <span>Changes saved</span>
            </div>
          )}
        </div>

        <div className="grid min-h-[520px] grid-cols-1 overflow-hidden   border border-line bg-white shadow-sm md:grid-cols-[240px_minmax(0,1fr)]">
          <nav
            aria-label="Settings sections"
            className="flex gap-2 overflow-x-auto border-b border-line bg-[#fbfcfd] p-3 md:flex-col md:overflow-visible md:border-b-0 md:border-r md:p-4"
          >
            {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-current={activeTabId === id ? "page" : undefined}
                onClick={() => setActiveTabId(id)}
                className={`flex shrink-0 items-center gap-3  px-3 py-3 text-left text-sm font-medium transition-colors md:w-full ${
                  activeTabId === id
                    ? "bg-brand/10 text-brand"
                    : "text-body hover:bg-surface hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="min-w-0 p-5 sm:p-8 lg:p-10">
            <ActiveComponent onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
