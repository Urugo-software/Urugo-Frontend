"use client";

import { Check } from "lucide-react";
import { PaymentMethodOption } from "@/data/payment-methods-data";

interface Props {
  method: PaymentMethodOption;
  isSelected: boolean;
  onSelect: (id: PaymentMethodOption["id"]) => void;
}

export function PaymentTypeCard({ method, isSelected, onSelect }: Props) {
  const Icon = method.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      className={`relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        isSelected
          ? "border-brand bg-brand-tint/20 ring-2 ring-brand/20"
          : "border-line bg-white hover:border-slate-300 hover:bg-slate-50/50"
      }`}
    >
      <div className="flex-1 min-w-0 pr-4">
        <span className="text-[16px] font-bold text-ink">{method.name}</span>
        <p className="text-[13px] text-body mt-0.5 truncate">
          {method.description}
        </p>
      </div>
      {isSelected && (
        <div className="absolute top-3 right-3 grid size-4 place-items-center rounded-full bg-brand text-white">
          <Check className="size-3 stroke-[3]" />
        </div>
      )}
    </button>
  );
}
