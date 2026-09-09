"use client";

import React from "react";
import { paymentMethodsData, PaymentMethod } from "@/data/payment-methods-data";
import { PaymentTypeCard } from "./PaymentTypeCard";

interface Props {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentTypeSelector({ selected, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <label className="block text-xs lg:text-md font-bold uppercase tracking-wider text-faint">
        Select Payment Type
      </label>
      <div className="grid grid-cols-1 gap-3 lg:gap-5 sm:grid-cols-2">
        {paymentMethodsData.map((method) => (
          <PaymentTypeCard
            key={method.id}
            method={method}
            isSelected={selected === method.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
