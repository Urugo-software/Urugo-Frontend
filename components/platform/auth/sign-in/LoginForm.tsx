"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/mutate/useLogin";
import { useGoogleAuth } from "@/hooks/mutate/useGoogleAuth";
import { cn } from "@/lib/utils";
import type { LoginProps } from "@/types";

import {
  AUTH_CARD_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PRIMARY_BUTTON_CLASS,
} from "../auth-styles";
import { GoogleIdentityButton } from "../GoogleIdentityButton";
import LoginFormHeader from "./LoginFormHeader";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const t = useTranslations("auth.login");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: { identifier: "", password: "" },
    mode: "onTouched",
  });

  const { mutate, isPending } = useLogin();
  const googleAuth = useGoogleAuth();

  const onSubmit = (data: LoginProps) => {
    mutate({
      identifier: (data.identifier ?? "").trim(),
      password: data.password ?? "",
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn(AUTH_CARD_CLASS, className)}
      {...props}
    >
      <div className="flex flex-col gap-6 sm:gap-7">
        <LoginFormHeader />

        <FieldGroup className="gap-4 sm:gap-5" aria-busy={isPending || googleAuth.isPending}>
          <Field data-invalid={Boolean(errors.identifier) || undefined}>
            <FieldLabel htmlFor="identifier" className={AUTH_LABEL_CLASS}>
              {t("identifierLabel")}
            </FieldLabel>
            <Input
              id="identifier"
              type="text"
              autoComplete="username"
              disabled={isPending || googleAuth.isPending}
              placeholder={t("identifierPlaceholder")}
              aria-invalid={Boolean(errors.identifier)}
              aria-describedby={
                errors.identifier ? "identifier-error" : undefined
              }
              className={AUTH_INPUT_CLASS}
              {...register("identifier", {
                required: t("errors.identifierRequired"),
                validate: (value) =>
                  (value ?? "").trim().length > 0 ||
                  t("errors.identifierRequired"),
              })}
            />
            {errors.identifier?.message && (
              <FieldError id="identifier-error" className="text-xs font-medium">
                {errors.identifier.message}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={Boolean(errors.password) || undefined}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <FieldLabel htmlFor="password" className={AUTH_LABEL_CLASS}>
                {t("passwordLabel")}
              </FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
              >
                {t("forgotPassword")}
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                disabled={isPending || googleAuth.isPending}
                placeholder={t("passwordPlaceholder")}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`${AUTH_INPUT_CLASS} pr-11`}
                {...register("password", {
                  required: t("errors.passwordRequired"),
                })}
              />
              <button
                type="button"
                disabled={isPending || googleAuth.isPending}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? t("hidePassword") : t("showPassword")
                }
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-xl text-faint transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="size-4" />
                ) : (
                  <Eye aria-hidden="true" className="size-4" />
                )}
              </button>
            </div>
            {errors.password?.message && (
              <FieldError id="password-error" className="text-xs font-medium">
                {errors.password.message}
              </FieldError>
            )}
          </Field>

          <Field className="pt-1">
            <Button
              type="submit"
              disabled={isPending || googleAuth.isPending}
              className={AUTH_PRIMARY_BUTTON_CLASS}
            >
              {isPending ? t("submitting") : t("submit")}
            </Button>
          </Field>

          <FieldSeparator className="text-xs text-faint">
            {t("orContinueWith")}
          </FieldSeparator>

          <Field>
            <GoogleIdentityButton
              mode="signin_with"
              disabled={isPending || googleAuth.isPending}
              onCredential={(idToken) => googleAuth.mutate({ idToken, intent: "sign_in" })}
            />
          </Field>

          <FieldDescription className="pt-1 text-center text-sm text-body">
            {t("noAccount")}{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline"
            >
              {t("signUpLink")}
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
