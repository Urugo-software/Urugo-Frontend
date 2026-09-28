"use client";

import { Save } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { SettingsField } from "../SettingsField";

interface SecurityTabProps {
  onSave: () => void;
}

export function SecurityTab({ onSave }: SecurityTabProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-ink">Security</h3>
        <p className="mt-1 text-sm text-body">
          Update your account password and security credentials.
        </p>
      </div>

      <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
        <SettingsField label="Current password" type="password" placeholder="Enter current password" />
        <SettingsField label="New password" type="password" placeholder="Enter new password" />
      </div>

      <div className="flex justify-end border-t border-line pt-6">
        <CustomButton title="Update password" variant="colored" type="submit" className="rounded-lg">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
