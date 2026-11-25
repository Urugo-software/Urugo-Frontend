"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { X, Smartphone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePayRent } from "@/hooks/mutate/useRenterMutations";
import CustomButton from "@/components/shared/CustomButton";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";

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
  const t = useTranslations("renter.payments.payRent");
  const tActions = useTranslations("common.actions");
  const locale = useLocale() as AppLocale;
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
            <Smartphone className="size-5 text-brand" /> {t("modal.title")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={tActions("closeDialog")}
            className="p-1 text-faint hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-4 text-xs"
        >
          <div className="rounded-lg bg-surface p-3 text-center">
            <span className="text-faint">{t("amountDue")}</span>
            <div className="text-xl font-bold text-ink">
              {formatRwfLocalized(amountRwf, locale)}
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-ink">
              {t("modal.selectMethod")}
            </label>
            <select
              {...register("paymentMethod")}
              className="w-full rounded-lg border border-line p-2.5 text-xs text-ink bg-white focus:outline-brand"
            >
              <option value="MTN Mobile Money">{t("methods.mtnName")}</option>
              <option value="AIRTEL Money">{t("methods.airtelName")}</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-ink">
              {t("phoneLabelSimple")}
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder={t("phoneExamplePlaceholder")}
              className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-brand"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-4 py-2 font-semibold text-body hover:bg-surface"
            >
              {tActions("cancel")}
            </button>
            <CustomButton
              type="submit"
              disabled={payRentMutation.isPending}
              className="px-5 py-2"
            >
              {payRentMutation.isPending
                ? t("modal.processing")
                : t("modal.confirmPay")}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
