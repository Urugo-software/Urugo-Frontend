"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePayRent } from "@/hooks/mutations/useRenterMutations";
import { PaymentMethod } from "@/data/payment-methods-data";
import { PayRentHeader } from "./PayRentHeader";
import { PaymentTypeSelector } from "./PaymentTypeSelector";
import { PaymentAmountSection } from "./PaymentAmountSection";
import { PaymentConfirmationUpload } from "./PaymentConfirmationUpload";
import { PayRentFooterActions } from "./PayRentFooterActions";

export function PayRentView() {
  const router = useRouter();
  const payRentMutation = usePayRent();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("MTN Mobile Money");
  const [amountRwf, setAmountRwf] = useState<number>(250000);
  const [phone, setPhone] = useState<string>("0788123456");
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [, setReceiptFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    payRentMutation.mutate(
      { paymentMethod, phone, amountRwf },
      { onSuccess: () => router.push("/renter/payments") },
    );
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <PayRentHeader />
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-line bg-white p-6 shadow-2xs sm:p-8"
        >
          <PaymentTypeSelector
            selected={paymentMethod}
            onSelect={setPaymentMethod}
          />
          <PaymentAmountSection
            amountRwf={amountRwf}
            onAmountChange={setAmountRwf}
            paymentMethod={paymentMethod}
            phone={phone}
            onPhoneChange={setPhone}
            referenceNumber={referenceNumber}
            onReferenceChange={setReferenceNumber}
          />
          <PaymentConfirmationUpload onFileSelect={setReceiptFile} />
          <PayRentFooterActions isPending={payRentMutation.isPending} />
        </form>
      </div>
    </div>
  );
}
