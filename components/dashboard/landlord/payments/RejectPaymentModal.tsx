"use client";

import { useLocale, useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type {
  PaymentRejectionCategory,
  TenancyPayment,
} from "@/types/landlord";
import { PAYMENT_REJECTION_OPTIONS } from "@/utils/rental-debt";

interface RejectFormValues {
  category: PaymentRejectionCategory;
  reason: string;
}

interface RejectPaymentModalProps {
  payment: TenancyPayment | null;
  onClose: () => void;
  onConfirm: (
    paymentId: string,
    category: PaymentRejectionCategory,
    reason: string,
  ) => void;
}

export function RejectPaymentModal({
  payment,
  onClose,
  onConfirm,
}: RejectPaymentModalProps) {
  const t = useTranslations("landlord.payments.rejectModal");
  const tPayments = useTranslations("landlord.payments");
  const locale = useLocale() as AppLocale;
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectFormValues>({
    defaultValues: { category: "invalid_receipt", reason: "" },
  });

  const selectedCategory = useWatch({ control, name: "category" });
  const selectedMeta = PAYMENT_REJECTION_OPTIONS.find(
    (opt) => opt.value === selectedCategory,
  );

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values: RejectFormValues) => {
    if (!payment) return;
    onConfirm(payment.id, values.category, values.reason.trim());
    reset();
    onClose();
  };

  return (
    <ModalDialog
      open={Boolean(payment)}
      onClose={handleClose}
      variant="alert"
      title={t("title")}
      description={
        payment
          ? `${payment.renterName ?? tPayments("tenantFallback")} · ${payment.period} · ${formatRwfLocalized(payment.amountRwf, locale)}`
          : undefined
      }
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="cursor-pointer rounded-none"
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            form="reject-payment-form"
            variant="destructive"
            className="cursor-pointer rounded-none"
          >
            {t("confirmBtn")}
          </Button>
        </>
      }
    >
      <form
        id="reject-payment-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Field>
          <FieldLabel htmlFor="reject-category" className="text-xs font-semibold">
            {t("categoryLabel")} <span className="text-rose-600">*</span>
          </FieldLabel>
          <select
            id="reject-category"
            className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            {...register("category", { required: true })}
          >
            {PAYMENT_REJECTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(`categories.${opt.value}.label`)}
              </option>
            ))}
          </select>
          {selectedMeta && (
            <p
              className={`mt-1 text-xs ${
                selectedMeta.createsUnpaidBalance
                  ? "font-medium text-amber-800"
                  : "text-body"
              }`}
            >
              {t(`categories.${selectedMeta.value}.helper`)}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="reject-reason" className="text-xs font-semibold">
            {t("explanationLabel")} <span className="text-rose-600">*</span>
          </FieldLabel>
          <textarea
            id="reject-reason"
            rows={3}
            placeholder={t("explanationPlaceholder")}
            aria-invalid={!!errors.reason}
            className="w-full rounded-none border border-input bg-white p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            {...register("reason", {
              validate: (v) =>
                v.trim().length >= 6 || t("explanationRequired"),
            })}
          />
          <FieldError>{errors.reason?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
