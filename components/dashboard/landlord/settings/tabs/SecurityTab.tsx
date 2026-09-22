"use client";

import { Save } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";

interface SecurityTabProps {
  onSave: () => void;
}

export function SecurityTab({ onSave }: SecurityTabProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-ink">Security & Password</h3>
        <p className="text-xs text-faint mt-0.5">
          Update your account password and security credentials.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-faint mb-2">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-faint mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-line flex justify-end">
        <CustomButton title="Update Password" variant="colored" type="submit" className="rounded-none">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
