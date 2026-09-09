"use client";

import React from "react";
import { PaymentMethod } from "@/data/payment-methods-data";
import { PaymentAmountCard } from "./PaymentAmountCard";
import { PaymentInputsSection } from "./PaymentInputsSection";

interface PaymentAmountSectionProps {
  amountRwf: number;
  onAmountChange: (amount: number) => void;
  paymentMethod: PaymentMethod;
  phone: string;
  onPhoneChange: (phone: string) => void;
  referenceNumber: string;
  onReferenceChange: (ref: string) => void;
  period?: string;
  unitNumber?: string;
}

export function PaymentAmountSection({
  amountRwf,
  onAmountChange,
  paymentMethod,
  phone,
  onPhoneChange,
  referenceNumber,
  onReferenceChange,
  period = "September 2026",
  unitNumber = "Unit 3B",
}: PaymentAmountSectionProps) {
  return (
    <div className="space-y-4 ">
      <PaymentAmountCard
        amountRwf={amountRwf}
        period={period}
        unitNumber={unitNumber}
      />
      <PaymentInputsSection
        amountRwf={amountRwf}
        onAmountChange={onAmountChange}
        paymentMethod={paymentMethod}
        phone={phone}
        onPhoneChange={onPhoneChange}
        referenceNumber={referenceNumber}
        onReferenceChange={onReferenceChange}
      />
    </div>
  );
}
