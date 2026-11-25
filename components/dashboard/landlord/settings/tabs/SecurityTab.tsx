"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface SecurityValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function SecurityTab({ onSave }: { onSave: () => void }) {
  const t = useTranslations("landlord.settings.security");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SecurityValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    toast.success(t("toastUpdated"));
    reset();
    onSave();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-ink">{t("title")}</h3>
        <p className="mt-1 text-xs text-body">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        <Field>
          <FieldLabel htmlFor="current-password">
            {t("currentPasswordLabel")}{" "}
            <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="current-password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.currentPassword}
            className="h-10 rounded-none"
            {...register("currentPassword", {
              validate: (v) => v.length > 0 || t("currentPasswordRequired"),
            })}
          />
          <FieldError>{errors.currentPassword?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="new-password">
            {t("newPasswordLabel")} <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="new-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.newPassword}
            className="h-10 rounded-none"
            {...register("newPassword", {
              validate: (v) => v.length >= 8 || t("newPasswordMin"),
            })}
          />
          <FieldError>{errors.newPassword?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">
            {t("confirmPasswordLabel")}{" "}
            <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            className="h-10 rounded-none"
            {...register("confirmPassword", {
              validate: (v) =>
                v === getValues("newPassword") || t("confirmPasswordMismatch"),
            })}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </Field>
      </div>

      <div className="flex justify-end border-t border-line pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-none"
        >
          {t("updateBtn")}
        </Button>
      </div>
    </form>
  );
}
