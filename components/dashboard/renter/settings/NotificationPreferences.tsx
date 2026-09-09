"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Pref {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

const prefs: Pref[] = [
  {
    id: "rent_due",
    label: "Rent Due Reminders",
    description: "Get notified before your rent is due.",
    defaultOn: true,
  },
  {
    id: "electricity",
    label: "Electricity Alerts",
    description: "Alerts when usage approaches your monthly limit.",
    defaultOn: true,
  },
  {
    id: "maintenance",
    label: "Maintenance Updates",
    description: "Status updates on submitted maintenance requests.",
    defaultOn: true,
  },
  {
    id: "lease",
    label: "Lease & Document Notices",
    description: "Reminders about lease renewals and new documents.",
    defaultOn: false,
  },
];

export function NotificationPreferences() {
  const [rentDue, setRentDue] = useState(true);
  const [electricity, setElectricity] = useState(true);
  const [maintenance, setMaintenance] = useState(true);
  const [lease, setLease] = useState(false);

  const states: Record<string, { value: boolean; set: (v: boolean) => void }> = {
    rent_due: { value: rentDue, set: setRentDue },
    electricity: { value: electricity, set: setElectricity },
    maintenance: { value: maintenance, set: setMaintenance },
    lease: { value: lease, set: setLease },
  };

  const toggle = (id: string) => {
    const current = states[id];
    current.set(!current.value);
    toast.success("Preference saved.");
  };

  return (
    <div className="space-y-4">
      {prefs.map((pref) => (
        <div
          key={pref.id}
          className="flex items-center justify-between border border-line bg-white p-4"
        >
          <div className="pr-6">
            <div className="text-sm font-bold text-ink">{pref.label}</div>
            <p className="text-xs text-body mt-0.5">{pref.description}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={states[pref.id].value}
            onClick={() => toggle(pref.id)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              states[pref.id].value ? "bg-brand" : "bg-slate-200"
            }`}
          >
            <span
              className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform ${
                states[pref.id].value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
