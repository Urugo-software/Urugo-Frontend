"use client";

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
    toast.success(
      "Password validated (preview mode — backend auth required to persist).",
    );
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field>
        <FieldLabel htmlFor="renter-current-password">
          Current Password
        </FieldLabel>
        <Input
          id="renter-current-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter current password"
          className="h-10 rounded-none border-line bg-white"
          {...register("currentPassword", {
            required: "Current password is required.",
          })}
        />
        <FieldError errors={[errors.currentPassword]} />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="renter-new-password">New Password</FieldLabel>
          <Input
            id="renter-new-password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            className="h-10 rounded-none border-line bg-white"
            {...register("newPassword", {
              required: "New password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />
          <FieldError errors={[errors.newPassword]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="renter-confirm-password">
            Confirm New Password
          </FieldLabel>
          <Input
            id="renter-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat new password"
            className="h-10 rounded-none border-line bg-white"
            {...register("confirmPassword", {
              required: "Please confirm your new password.",
              validate: (value) =>
                value === getValues("newPassword") ||
                "New passwords do not match.",
            })}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>
      </div>

      <p className="border border-line bg-surface px-3.5 py-2.5 text-xs text-body">
        Preview mode: password changes are validated locally until backend
        authentication is connected.
      </p>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-none px-6"
        >
          Update Password
        </Button>
      </div>
    </form>
  );
}
