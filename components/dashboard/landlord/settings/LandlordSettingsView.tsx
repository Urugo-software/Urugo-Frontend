"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SETTINGS_TABS } from "./settings-config";

export function LandlordSettingsView() {
  const [activeTabId, setActiveTabId] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const activeTab = SETTINGS_TABS.find((t) => t.id === activeTabId) || SETTINGS_TABS[0];
  const ActiveComponent = activeTab.component;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-7 bg-surface/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Account & Settings
          </h1>
          <p className="mt-1 text-sm text-body">
            Manage your landlord profile, payout accounts, notification alerts, and security.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-none">
            <CheckCircle2 className="h-4 w-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <div className="border border-line bg-white shadow-2xs grid grid-cols-1 md:grid-cols-4 rounded-none min-h-[500px]">
        <div className="border-b md:border-b-0 md:border-r border-line bg-surface/40 p-4 space-y-1">
          {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTabId(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold transition-colors text-left rounded-none ${
                activeTabId === id
                  ? "bg-brand text-white border border-brand"
                  : "text-body hover:text-ink hover:bg-surface border border-transparent"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-3 p-6 sm:p-8">
          <ActiveComponent onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
