"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { PasswordResetUnavailableError } from "@/api/password-reset.api";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/utils/auth-helpers";

import { AuthFormHeader } from "../AuthFormHeader";
import {
  AUTH_CARD_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PRIMARY_BUTTON_CLASS,
} from "../auth-styles";

type ForgotPasswordFormProps = {
  requestCode: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<string>;
  resetPassword: (password: string, proof: string) => Promise<void>;
};

type Step = "email" | "code" | "password" | "success";

type ServerErrorKey =
  | "unavailable"
  | "requestFailed"
  | "verifyFailed"
  | "resetFailed";

interface ForgotPasswordValues {
  email: string;
  code: string;
  password: string;
  confirmation: string;
}

export function ForgotPasswordForm({
  requestCode,
  verifyCode,
  resetPassword,
}: ForgotPasswordFormProps) {
  const t = useTranslations("auth.forgotPassword");

  const [step, setStep] = useState<Step>("email");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [proof, setProof] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pending, setPending] = useState(false);
  const [serverErrorKey, setServerErrorKey] = useState<ServerErrorKey | null>(
    null,
  );
  const [showResendNotice, setShowResendNotice] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasChangedStepRef = useRef(false);

  const {
    register,
    trigger,
    getValues,
    setValue,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    defaultValues: {
      email: "",
      code: "",
      password: "",
      confirmation: "",
    },
    mode: "onTouched",
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!hasChangedStepRef.current) return;
    headingRef.current?.focus();
  }, [step]);

  const moveToStep = (next: Step) => {
    hasChangedStepRef.current = true;
    setStep(next);
  };

  const startOver = () => {
    resetField("code");
    resetField("password");
    resetField("confirmation");
    clearErrors();
    setProof("");
    setServerErrorKey(null);
    setShowResendNotice(false);
    moveToStep("email");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;

    setServerErrorKey(null);
    setShowResendNotice(false);

    if (step === "email") {
      const valid = await trigger("email", { shouldFocus: true });
      if (!valid) return;

      const trimmedEmail = getValues("email").trim();
      setPending(true);
      try {
        await requestCode(trimmedEmail);
        setVerifiedEmail(trimmedEmail);
        setValue("email", trimmedEmail);
        resetField("code");
        moveToStep("code");
      } catch (caught) {
        setServerErrorKey(
          caught instanceof PasswordResetUnavailableError
            ? "unavailable"
            : "requestFailed",
        );
      } finally {
        setPending(false);
      }
      return;
    }

    if (step === "code") {
      const valid = await trigger("code", { shouldFocus: true });
      if (!valid) return;

      const trimmedCode = getValues("code").trim();
      setPending(true);
      try {
        const resetProof = await verifyCode(verifiedEmail, trimmedCode);
        if (!resetProof) throw new Error("Missing reset authorization");
        setProof(resetProof);
        resetField("code");
        moveToStep("password");
      } catch (caught) {
        setServerErrorKey(
          caught instanceof PasswordResetUnavailableError
            ? "unavailable"
            : "verifyFailed",
        );
      } finally {
        setPending(false);
      }
      return;
    }

    if (step === "password") {
      const valid = await trigger(["password", "confirmation"], {
        shouldFocus: true,
      });
      if (!valid) return;

      const nextPassword = getValues("password");
      setPending(true);
      try {
        await resetPassword(nextPassword, proof);
        resetField("password");
        resetField("confirmation");
        setProof("");
        moveToStep("success");
      } catch (caught) {
        setServerErrorKey(
          caught instanceof PasswordResetUnavailableError
            ? "unavailable"
            : "resetFailed",
        );
      } finally {
        setPending(false);
      }
    }
  };

  const handleResend = async () => {
    if (pending || !verifiedEmail) return;
    setServerErrorKey(null);
    setShowResendNotice(false);
    setPending(true);
    try {
      await requestCode(verifiedEmail);
      resetField("code");
      setShowResendNotice(true);
    } catch (caught) {
      setServerErrorKey(
        caught instanceof PasswordResetUnavailableError
          ? "unavailable"
          : "requestFailed",
      );
    } finally {
      setPending(false);
    }
  };

  const eyebrow =
    step === "code"
      ? t("stepCounter", { current: 2, total: 3 })
      : step === "password"
        ? t("stepCounter", { current: 3, total: 3 })
        : undefined;

  const submitLabel = pending
    ? t("actions.pleaseWait")
    : step === "email"
      ? t("actions.sendCode")
      : step === "code"
        ? t("actions.verifyCode")
        : t("actions.resetPassword");

  return (
    <form noValidate onSubmit={handleSubmit} className={AUTH_CARD_CLASS}>
      <div className="flex flex-col gap-6 sm:gap-7">
        <AuthFormHeader
          eyebrow={eyebrow}
          title={t(`steps.${step}.title`)}
          description={t(`steps.${step}.description`)}
          headingRef={headingRef}
        />

        <FieldGroup className="gap-4 sm:gap-5" aria-busy={pending}>
          {step === "email" && (
            <Field data-invalid={Boolean(errors.email) || undefined}>
              <FieldLabel htmlFor="recovery-email" className={AUTH_LABEL_CLASS}>
                {t("fields.emailLabel")}
              </FieldLabel>
              <Input
                id="recovery-email"
                type="email"
                autoComplete="email"
                disabled={pending}
                placeholder={t("fields.emailPlaceholder")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "recovery-email-error" : undefined
                }
                className={AUTH_INPUT_CLASS}
                {...register("email", {
                  required: t("validation.emailRequired"),
                  validate: (value) =>
                    isValidEmail(value) || t("validation.emailInvalid"),
                })}
              />
              {errors.email?.message && (
                <FieldError
                  id="recovery-email-error"
                  className="text-xs font-medium"
                >
                  {errors.email.message}
                </FieldError>
              )}
            </Field>
          )}

          {step === "code" && (
            <>
              <Field data-invalid={Boolean(errors.code) || undefined}>
                <FieldLabel
                  htmlFor="recovery-code"
                  className={AUTH_LABEL_CLASS}
                >
                  {t("fields.codeLabel")}
                </FieldLabel>
                <Input
                  id="recovery-code"
                  type="text"
                  autoComplete="one-time-code"
                  disabled={pending}
                  placeholder={t("fields.codePlaceholder")}
                  aria-invalid={Boolean(errors.code)}
                  aria-describedby={
                    errors.code ? "recovery-code-error" : undefined
                  }
                  className={AUTH_INPUT_CLASS}
                  {...register("code", {
                    required: t("validation.codeRequired"),
                    validate: (value) =>
                      value.trim().length > 0 || t("validation.codeRequired"),
                  })}
                />
                {errors.code?.message && (
                  <FieldError
                    id="recovery-code-error"
                    className="text-xs font-medium"
                  >
                    {errors.code.message}
                  </FieldError>
                )}
              </Field>
              <p className="text-xs text-body">
                {t("actions.didntReceiveCode")}{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={pending}
                  className="cursor-pointer font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t("actions.resendCode")}
                </button>
              </p>
            </>
          )}

          {step === "password" && (
            <>
              <Field data-invalid={Boolean(errors.password) || undefined}>
                <FieldLabel htmlFor="new-password" className={AUTH_LABEL_CLASS}>
                  {t("fields.newPasswordLabel")}
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={pending}
                    placeholder={t("fields.newPasswordPlaceholder")}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "new-password-error" : undefined
                    }
                    className={`${AUTH_INPUT_CLASS} pr-11`}
                    {...register("password", {
                      required: t("validation.passwordRequired"),
                      minLength: {
                        value: 8,
                        message: t("validation.passwordMin"),
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={pending}
                    aria-label={
                      showPassword
                        ? t("visibility.hideNewPassword")
                        : t("visibility.showNewPassword")
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
                  <FieldError
                    id="new-password-error"
                    className="text-xs font-medium"
                  >
                    {errors.password.message}
                  </FieldError>
                )}
              </Field>

              <Field data-invalid={Boolean(errors.confirmation) || undefined}>
                <FieldLabel
                  htmlFor="confirm-new-password"
                  className={AUTH_LABEL_CLASS}
                >
                  {t("fields.confirmPasswordLabel")}
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    type={showConfirmation ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={pending}
                    placeholder={t("fields.confirmPasswordPlaceholder")}
                    aria-invalid={Boolean(errors.confirmation)}
                    aria-describedby={
                      errors.confirmation
                        ? "confirm-new-password-error"
                        : undefined
                    }
                    className={`${AUTH_INPUT_CLASS} pr-11`}
                    {...register("confirmation", {
                      required: t("validation.confirmationRequired"),
                      validate: (value) =>
                        value === getValues("password") ||
                        t("validation.passwordsMismatch"),
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmation((value) => !value)}
                    disabled={pending}
                    aria-label={
                      showConfirmation
                        ? t("visibility.hideConfirmation")
                        : t("visibility.showConfirmation")
                    }
                    aria-pressed={showConfirmation}
                    className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-xl text-faint transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {showConfirmation ? (
                      <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                      <Eye aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
                {errors.confirmation?.message && (
                  <FieldError
                    id="confirm-new-password-error"
                    className="text-xs font-medium"
                  >
                    {errors.confirmation.message}
                  </FieldError>
                )}
              </Field>
            </>
          )}

          {serverErrorKey && (
            <p
              id="reset-error"
              role="alert"
              className="rounded-xl border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-destructive"
            >
              {t(`errors.${serverErrorKey}`)}
            </p>
          )}

          {showResendNotice && (
            <p
              role="status"
              className="rounded-xl border border-brand/20 bg-brand-tint/60 px-3.5 py-2.5 text-xs leading-relaxed text-brand-deep"
            >
              {t("notices.codeResent")}
            </p>
          )}

          {step !== "success" ? (
            <Field className="pt-1">
              <Button
                type="submit"
                disabled={pending}
                className={AUTH_PRIMARY_BUTTON_CLASS}
              >
                {submitLabel}
              </Button>
            </Field>
          ) : (
            <Field className="pt-1">
              <Link
                href="/auth/sign-in"
                className={`${AUTH_PRIMARY_BUTTON_CLASS} inline-flex items-center justify-center`}
              >
                {t("actions.continueToSignIn")}
              </Link>
            </Field>
          )}

          {(step === "code" || step === "password") && (
            <button
              type="button"
              onClick={startOver}
              disabled={pending}
              className="cursor-pointer text-center text-xs font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === "code"
                ? t("actions.useDifferentEmail")
                : t("actions.startOver")}
            </button>
          )}

          {step !== "success" && (
            <FieldDescription className="pt-1 text-center text-sm text-body">
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                <span>{t("actions.backToSignIn")}</span>
              </Link>
            </FieldDescription>
          )}
        </FieldGroup>
      </div>
    </form>
  );
}
