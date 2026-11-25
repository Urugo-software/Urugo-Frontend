"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";

interface PayoutValues {
  momoNumber: string;
  bankAccount: string;
}

export function PayoutsTab({ onSave }: { onSave: () => void }) {
  const { profile, updateProfile } = useLandlordWorkspace();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PayoutValues>({
    defaultValues: {
      momoNumber: profile.momoNumber,
      bankAccount: profile.bankAccount,
    },
  });

  const onSubmit = (vals: PayoutValues) => {
    updateProfile({
      momoNumber: vals.momoNumber.trim(),
      bankAccount: vals.bankAccount.trim(),
    });
    toast.success("Payout details saved.");
    onSave();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-ink">Payout Accounts</h3>
        <p className="mt-1 text-xs text-body">
          Configure where rent transfers and payment references should be
          directed.
        </p>
      </div>

      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="momo-number">
            MTN Mobile Money / Airtel Money Number{" "}
            <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="momo-number"
            placeholder="e.g., 0788123456"
            aria-invalid={!!errors.momoNumber}
            className="h-10 rounded-none"
            {...register("momoNumber", {
              validate: (v) =>
                v.replace(/\D/g, "").length >= 9 ||
                "Enter a valid Rwandan mobile money number.",
            })}
          />
          <FieldError>{errors.momoNumber?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="bank-account">
            Bank Account (IBAN / Local Account){" "}
            <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="bank-account"
            placeholder="e.g., BK — 00012345678"
            aria-invalid={!!errors.bankAccount}
            className="h-10 rounded-none"
            {...register("bankAccount", {
              validate: (v) =>
                v.trim().length >= 6 || "Enter a valid bank account reference.",
            })}
          />
          <FieldError>{errors.bankAccount?.message}</FieldError>
        </Field>
      </div>

      <div className="flex justify-end border-t border-line pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-none"
        >
          Save Payout Accounts
        </Button>
      </div>
    </form>
  );
}
