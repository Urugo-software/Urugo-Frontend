"use client";

import { useState } from "react";
import { Save, Smartphone, Building } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockLandlordSettings } from "@/data/landlord-data";
import { SettingsField } from "../SettingsField";

interface PayoutsTabProps {
  onSave: () => void;
}

export function PayoutsTab({ onSave }: PayoutsTabProps) {
  const [momoNumber, setMomoNumber] = useState(mockLandlordSettings.momoNumber);
  const [bankAccount, setBankAccount] = useState(mockLandlordSettings.bankAccount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-ink">Payout accounts</h3>
        <p className="mt-1 text-sm text-body">
          Set default channels where tenant rent disbursements are received.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-line p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Smartphone className="h-4 w-4 text-emerald-600" /><span>Mobile Money</span>
          </div>
          <SettingsField label="MTN payout number" value={momoNumber} onChange={setMomoNumber} placeholder="e.g. 0788 000 000" />
        </div>

        <div className="space-y-4 rounded-xl border border-line p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Building className="h-4 w-4 text-brand" /><span>Bank account</span>
          </div>
          <SettingsField label="Account details" value={bankAccount} onChange={setBankAccount} placeholder="Bank and account number" />
        </div>
      </div>

      <div className="flex justify-end border-t border-line pt-6">
        <CustomButton title="Save payout details" variant="colored" type="submit" className="rounded-lg">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
