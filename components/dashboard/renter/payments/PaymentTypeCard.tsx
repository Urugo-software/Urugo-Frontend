"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  type PaymentMethod,
  type PaymentMethodOption,
} from "@/data/payment-methods-data";

const METHOD_KEY_MAP: Record<PaymentMethod, { name: string; desc: string }> = {
  "MTN Mobile Money": { name: "mtnName", desc: "mtnDesc" },
  "AIRTEL Money": { name: "airtelName", desc: "airtelDesc" },
  "Bank Transfer": { name: "bankName", desc: "bankDesc" },
  Card: { name: "cardName", desc: "cardDesc" },
};

interface Props {
  method: PaymentMethodOption;
  isSelected: boolean;
  onSelect: (id: PaymentMethodOption["id"]) => void;
}

export function PaymentTypeCard({ method, isSelected, onSelect }: Props) {
  const t = useTranslations("renter.payments.payRent.methods");
  const keys = METHOD_KEY_MAP[method.id];

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
        <span className="text-[16px] font-bold text-ink">
          {keys ? t(keys.name) : method.name}
        </span>
        <p className="text-[13px] text-body mt-0.5 truncate">
          {keys ? t(keys.desc) : method.description}
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
