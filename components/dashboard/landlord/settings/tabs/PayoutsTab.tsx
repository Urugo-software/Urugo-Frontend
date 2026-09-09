"use client";

import { useState } from "react";
import { Save, Smartphone, Building } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockLandlordSettings } from "@/data/landlord-data";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-ink">Payout & Rent Collection Accounts</h3>
        <p className="text-xs text-faint mt-0.5">
          Set default channels where tenant rent disbursements are received.
        </p>
      </div>

      <div className="space-y-5">
        <div className="p-4 border border-line bg-surface/30 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-ink">
            <Smartphone className="h-4 w-4 text-emerald-600" />
            <span>MTN Mobile Money Payout Number</span>
          </div>
          <input
            type="text"
            value={momoNumber}
            onChange={(e) => setMomoNumber(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
            placeholder="e.g. 0788XXXXXX"
          />
        </div>

        <div className="p-4 border border-line bg-surface/30 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-ink">
            <Building className="h-4 w-4 text-brand" />
            <span>Bank Account Details</span>
          </div>
          <input
            type="text"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
            placeholder="e.g. Bank of Kigali - 000XXXXX"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-line flex justify-end">
        <CustomButton title="Save Payout Details" variant="colored" type="submit" className="rounded-none">
          <Save className="h-4 w-4" />
        </CustomButton>
      </div>
    </form>
  );
}
