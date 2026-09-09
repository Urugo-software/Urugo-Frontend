"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { X, Smartphone } from "lucide-react";
import { usePayRent } from "@/hooks/mutations/useRenterMutations";
import CustomButton from "@/components/shared/CustomButton";

interface PayFormInputs {
  paymentMethod: "MTN Mobile Money" | "AIRTEL Money";
  phone: string;
}

export function PayRentModal({
  amountRwf,
  onClose,
}: {
  amountRwf: number;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm<PayFormInputs>({
    defaultValues: { paymentMethod: "MTN Mobile Money", phone: "0788123456" },
  });
  const payRentMutation = usePayRent();

  const onSubmit = (data: PayFormInputs) => {
    payRentMutation.mutate({ ...data, amountRwf }, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-base font-bold text-ink flex items-center gap-2">
            <Smartphone className="size-5 text-brand" /> Pay Rent via Mobile
            Money
          </h3>
          <button onClick={onClose} className="p-1 text-faint hover:text-ink">
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-4 text-xs"
        >
          <div className="rounded-lg bg-surface p-3 text-center">
            <span className="text-faint">Amount Due</span>
            <div className="text-xl font-bold text-ink">
              RWF {amountRwf.toLocaleString()}
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-ink">
              Select Payment Method
            </label>
            <select
              {...register("paymentMethod")}
              className="w-full rounded-lg border border-line p-2.5 text-xs text-ink bg-white focus:outline-brand"
            >
              <option value="MTN Mobile Money">MTN Mobile Money</option>
              <option value="AIRTEL Money">AIRTEL Money</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-ink">
              Mobile Phone Number
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="e.g. 0788123456"
              className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-brand"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-4 py-2 font-semibold text-body hover:bg-surface"
            >
              Cancel
            </button>
            <CustomButton
              type="submit"
              disabled={payRentMutation.isPending}
              className="px-5 py-2"
            >
              {payRentMutation.isPending ? "Processing..." : "Confirm & Pay"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
