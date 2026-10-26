"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockLandlordSettings } from "@/data/landlord-data";
import { SettingsField } from "../SettingsField";

interface ProfileTabProps {
  onSave: () => void;
}

export function ProfileTab({ onSave }: ProfileTabProps) {
  const [fullName, setFullName] = useState(mockLandlordSettings.fullName);
  const [email, setEmail] = useState(mockLandlordSettings.email);
  const [phone, setPhone] = useState(mockLandlordSettings.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-ink">Personal information</h3>
        <p className="mt-1 text-sm text-body">
          Update your contact info used on tenancy receipts & agreement contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SettingsField label="Full legal name" value={fullName} onChange={setFullName} />
        <SettingsField label="Phone number" value={phone} onChange={setPhone} />
        <div className="sm:col-span-2"><SettingsField label="Email address" type="email" value={email} onChange={setEmail} /></div>
      </div>

      <div className="flex justify-end border-t border-line pt-6">
        <CustomButton title="Save changes" variant="colored" type="submit" className="rounded-lg">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
