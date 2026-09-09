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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-ink">Notification Preferences</h3>
        <p className="text-xs text-faint mt-0.5">
          Choose how and when you receive rent collection alerts.
        </p>
      </div>

      <div className="space-y-4">
        {mockNotificationPreferences.map((item) => (
          <label key={item.id} className="flex items-start gap-3 p-4 border border-line bg-white cursor-pointer hover:bg-surface/30">
            <input type="checkbox" defaultChecked={item.defaultChecked} className="mt-1 accent-brand rounded-none" />
            <div>
              <span className="text-sm font-bold text-ink block">{item.title}</span>
              <span className="text-xs text-faint block mt-0.5">{item.desc}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="pt-4 border-t border-line flex justify-end">
        <CustomButton title="Save Preferences" variant="colored" type="submit" className="rounded-none">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
