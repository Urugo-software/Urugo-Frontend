"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockLandlordSettings } from "@/data/landlord-data";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-ink">Personal & Business Information</h3>
        <p className="text-xs text-faint mt-0.5">
          Update your contact info used on tenancy receipts & agreement contracts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-faint mb-2">
            Full Legal Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-faint mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-faint mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-line flex justify-end">
        <CustomButton title="Save Changes" variant="colored" type="submit" className="rounded-none">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
