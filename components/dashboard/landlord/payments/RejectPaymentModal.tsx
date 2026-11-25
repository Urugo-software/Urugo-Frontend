"use client";

import { useForm, useWatch } from "react-hook-form";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type {
  PaymentRejectionCategory,
  TenancyPayment,
} from "@/types/landlord";
import { formatRwf } from "@/utils/format";
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
      title="Reject payment submission"
      description={
        payment
          ? `${payment.renterName ?? "Tenant"} · ${payment.period} · ${formatRwf(payment.amountRwf)}`
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
            Cancel
          </Button>
          <Button
            type="submit"
            form="reject-payment-form"
            variant="destructive"
            className="cursor-pointer rounded-none"
          >
            Confirm Rejection
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
            Rejection category <span className="text-rose-600">*</span>
          </FieldLabel>
          <select
            id="reject-category"
            className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            {...register("category", { required: true })}
          >
            {PAYMENT_REJECTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
              {selectedMeta.helper}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="reject-reason" className="text-xs font-semibold">
            Explanation for tenant <span className="text-rose-600">*</span>
          </FieldLabel>
          <textarea
            id="reject-reason"
            rows={3}
            placeholder="Explain clearly why this payment proof could not be accepted..."
            aria-invalid={!!errors.reason}
            className="w-full rounded-none border border-input bg-white p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            {...register("reason", {
              validate: (v) =>
                v.trim().length >= 6 ||
                "Provide a brief explanation (at least 6 characters).",
            })}
          />
          <FieldError>{errors.reason?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
