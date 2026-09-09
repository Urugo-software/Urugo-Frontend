"use client";

import React from "react";
import { PaymentMethod } from "@/data/payment-methods-data";

interface Props {
  amountRwf: number;
  onAmountChange: (val: number) => void;
  paymentMethod: PaymentMethod;
  phone: string;
  onPhoneChange: (val: string) => void;
  referenceNumber: string;
  onReferenceChange: (val: string) => void;
}

export function PaymentInputsSection({
  amountRwf,
  onAmountChange,
  paymentMethod,
  phone,
  onPhoneChange,
  referenceNumber,
  onReferenceChange,
}: Props) {
  const isMobileMoney =
    paymentMethod === "MTN Mobile Money" || paymentMethod === "AIRTEL Money";

  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block text-[15px] font-bold text-ink">
          Amount Paid (RWF)
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-faint text-xs font-semibold">
            RWF
          </div>
          <input
            type="number"
            value={amountRwf || ""}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            placeholder="e.g. 250000"
            className="w-full  border placeholder-gray-400  border-line bg-white pl-12 p-3 rounded-sm text-xs text-ink placeholder:text-md focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      {isMobileMoney ? (
        <div>
          <label className="mb-1.5 block text-[15px] font-bold text-ink">
            Mobile Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="e.g. 0788123456"
            className="w-full rounded-sm border border-line bg-white p-3 text-xs text-ink placeholder:text-faint focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20"
          />
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-[15px] font-bold text-ink">
            Transaction Reference / Note
          </label>
          <input
            type="text"
            value={referenceNumber}
            onChange={(e) => onReferenceChange(e.target.value)}
            placeholder="e.g. TXN-984210"
            className="w-full rounded-sm border border-line bg-white p-3 text-xs text-ink placeholder:text-faint focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20"
          />
        </div>
      )}
    </div>
  );
}
