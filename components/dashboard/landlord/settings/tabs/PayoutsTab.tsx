"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("landlord.settings.payouts");
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
    toast.success(t("toastSaved"));
    onSave();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-ink">{t("title")}</h3>
        <p className="mt-1 text-xs text-body">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="momo-number">
            {t("momoLabel")} <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="momo-number"
            placeholder={t("momoPlaceholder")}
            aria-invalid={!!errors.momoNumber}
            className="h-10 rounded-none"
            {...register("momoNumber", {
              validate: (v) =>
                v.replace(/\D/g, "").length >= 9 || t("momoInvalid"),
            })}
          />
          <FieldError>{errors.momoNumber?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="bank-account">
            {t("bankLabel")} <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="bank-account"
            placeholder={t("bankPlaceholder")}
            aria-invalid={!!errors.bankAccount}
            className="h-10 rounded-none"
            {...register("bankAccount", {
              validate: (v) => v.trim().length >= 6 || t("bankInvalid"),
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
          {t("saveBtn")}
        </Button>
      </div>
    </form>
  );
}
