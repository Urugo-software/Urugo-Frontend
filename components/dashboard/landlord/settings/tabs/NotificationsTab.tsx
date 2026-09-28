"use client";

import { Save } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockNotificationPreferences } from "@/data/landlord-data";

interface NotificationsTabProps {
  onSave: () => void;
}

export function NotificationsTab({ onSave }: NotificationsTabProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-ink">Notification preferences</h3>
        <p className="mt-1 text-sm text-body">
          Choose how and when you receive rent collection alerts.
        </p>
      </div>

      <div className="space-y-3">
        {mockNotificationPreferences.map((item) => (
          <label key={item.id} className="flex cursor-pointer items-start gap-4 rounded-xl border border-line p-4 transition hover:bg-surface/30 sm:p-5">
            <input type="checkbox" defaultChecked={item.defaultChecked} className="mt-1 h-4 w-4 accent-brand" />
            <div>
              <span className="text-sm font-bold text-ink block">{item.title}</span>
              <span className="text-xs text-faint block mt-0.5">{item.desc}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-end border-t border-line pt-6">
        <CustomButton title="Save preferences" variant="colored" type="submit" className="rounded-lg">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
