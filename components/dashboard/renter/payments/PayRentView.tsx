"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { PaymentMethod } from "@/data/payment-methods-data";
import { usePayRent } from "@/hooks/mutate/useRenterMutations";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { summarizeRenterPayments } from "@/utils/renter-helpers";
import { PayRentHeader } from "./PayRentHeader";
import { PaymentTypeSelector } from "./PaymentTypeSelector";
import { PaymentAmountCard } from "./PaymentAmountCard";
import { PaymentConfirmationUpload } from "./PaymentConfirmationUpload";
import { PayRentFooterActions } from "./PayRentFooterActions";

interface PayRentFormValues {
  paymentMethod: PaymentMethod;
  amountRwf: number;
  phone: string;
  referenceNumber: string;
}

export function PayRentView() {
  const t = useTranslations("renter.payments.payRent");
  const tWorkspace = useTranslations("renter.workspace");
  const router = useRouter();
  const payRentMutation = usePayRent();
  const profile = useRenterWorkspace((s) => s.profile);
  const property = useRenterWorkspace((s) => s.property);
  const payments = useRenterWorkspace((s) => s.payments);
  const { pendingPayment } = summarizeRenterPayments(payments);

  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const defaultAmount = pendingPayment?.amountRwf ?? property.monthlyRentRwf;
  const targetPeriod = pendingPayment?.period ?? t("currentMonthFallback");

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PayRentFormValues>({
    defaultValues: {
      paymentMethod: "MTN Mobile Money",
      amountRwf: defaultAmount,
      phone: profile.phone,
      referenceNumber: "",
    },
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const amountRwf = useWatch({ control, name: "amountRwf" });
  const isMobileMoney =
    paymentMethod === "MTN Mobile Money" || paymentMethod === "AIRTEL Money";

  const onSubmit = (vals: PayRentFormValues) => {
    payRentMutation.mutate(
      {
        paymentId: pendingPayment?.id,
        paymentMethod: vals.paymentMethod,
        phone: vals.phone.trim(),
        amountRwf: Number(vals.amountRwf),
        referenceNumber: vals.referenceNumber.trim() || undefined,
        receiptName: receiptFile?.name,
        period: targetPeriod,
      },
      { onSuccess: () => router.push("/renter/payments") },
    );
  };

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <PayRentHeader />

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 border border-line bg-white p-5 shadow-2xs sm:p-8"
        >
          <PaymentTypeSelector
            selected={paymentMethod}
            onSelect={(method) => setValue("paymentMethod", method)}
          />

          <PaymentAmountCard
            amountRwf={Number(amountRwf) || 0}
            period={targetPeriod}
            unitNumber={tWorkspace("unitLabel", { unit: property.unitNumber })}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="pay-amount">
                {t("amountPaidLabel")}
              </FieldLabel>
              <Input
                id="pay-amount"
                type="number"
                min={1000}
                step={1000}
                className="h-10 rounded-none font-ibm"
                {...register("amountRwf", {
                  valueAsNumber: true,
                  validate: (v) =>
                    (Number.isFinite(v) && v >= 1000) || t("amountError"),
                })}
              />
              <FieldError>{errors.amountRwf?.message}</FieldError>
            </Field>

            {isMobileMoney ? (
              <Field>
                <FieldLabel htmlFor="pay-phone">
                  {t("momoPhoneLabel")}
                </FieldLabel>
                <Input
                  id="pay-phone"
                  type="tel"
                  placeholder={t("phonePlaceholder")}
                  className="h-10 rounded-none"
                  {...register("phone", {
                    validate: (v) =>
                      !isMobileMoney ||
                      v.replace(/\s+/g, "").length >= 10 ||
                      t("phoneError"),
                  })}
                />
                <FieldError>{errors.phone?.message}</FieldError>
              </Field>
            ) : (
              <Field>
                <FieldLabel htmlFor="pay-ref">{t("bankRefLabel")}</FieldLabel>
                <Input
                  id="pay-ref"
                  type="text"
                  placeholder={t("bankRefPlaceholder")}
                  className="h-10 rounded-none"
                  {...register("referenceNumber", {
                    validate: (v) =>
                      isMobileMoney ||
                      v.trim().length >= 4 ||
                      t("bankRefError"),
                  })}
                />
                <FieldError>{errors.referenceNumber?.message}</FieldError>
              </Field>
            )}
          </div>

          {isMobileMoney && (
            <Field>
              <FieldLabel htmlFor="pay-momo-ref">
                {t("momoRefLabel")}
              </FieldLabel>
              <Input
                id="pay-momo-ref"
                type="text"
                placeholder={t("momoRefPlaceholder")}
                className="h-10 rounded-none"
                {...register("referenceNumber")}
              />
            </Field>
          )}

          <PaymentConfirmationUpload onFileSelect={setReceiptFile} />

          <p className="border-l-2 border-brand-blue bg-brand-tint/30 px-3 py-2 text-xs text-body">
            {t("previewNotice")}
          </p>

          <PayRentFooterActions isPending={payRentMutation.isPending} />
        </form>
      </div>
    </div>
  );
}
