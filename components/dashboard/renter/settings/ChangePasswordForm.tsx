"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface PasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function ChangePasswordForm() {
  const t = useTranslations("renter.settings.password");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInputs>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    // Backend authentication endpoint is not connected yet.
    toast.success(t("toastSuccess"));
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field>
        <FieldLabel htmlFor="renter-current-password">
          {t("currentLabel")}
        </FieldLabel>
        <Input
          id="renter-current-password"
          type="password"
          autoComplete="current-password"
          placeholder={t("currentPlaceholder")}
          className="h-10 rounded-none border-line bg-white"
          {...register("currentPassword", {
            required: t("currentRequired"),
          })}
        />
        <FieldError errors={[errors.currentPassword]} />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="renter-new-password">{t("newLabel")}</FieldLabel>
          <Input
            id="renter-new-password"
            type="password"
            autoComplete="new-password"
            placeholder={t("newPlaceholder")}
            className="h-10 rounded-none border-line bg-white"
            {...register("newPassword", {
              required: t("newRequired"),
              minLength: {
                value: 8,
                message: t("newMin"),
              },
            })}
          />
          <FieldError errors={[errors.newPassword]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="renter-confirm-password">
            {t("confirmLabel")}
          </FieldLabel>
          <Input
            id="renter-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder={t("confirmPlaceholder")}
            className="h-10 rounded-none border-line bg-white"
            {...register("confirmPassword", {
              required: t("confirmRequired"),
              validate: (value) =>
                value === getValues("newPassword") || t("confirmMismatch"),
            })}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>
      </div>

      <p className="border border-line bg-surface px-3.5 py-2.5 text-xs text-body">
        {t("previewNotice")}
      </p>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-none px-6"
        >
          {t("updateButton")}
        </Button>
      </div>
    </form>
  );
}
